
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC0o2IOFe2Yvw8xfzgkaKzCM_XMNJc-L-Q",
    authDomain: "train-scheduler-27f16.firebaseapp.com",
    databaseURL: "https://train-scheduler-27f16.firebaseio.com",
    projectId: "train-scheduler-27f16",
    storageBucket: "train-scheduler-27f16.appspot.com",
    messagingSenderId: "965382404817"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train").on("click", function(event) {
    event.preventDefault();

  var trainName = $("#train").val().trim();
  var dest = $("#destination").val().trim();
  var firstTrain = moment($("#firstTrain").val().trim(), "HH.mm").format("X");
  var frequency = $("#train-frequency").val().trim();
    
   //sends data to firebase 
    database.ref().push({
        name: trainName,
        place: dest,
        start: firstTrain,
        regularity: frequency,
    });

    //clearing the fields
    $("#train").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#train-frequency").val("");


    });

    //listening event
    database.ref().on(
      "child_added", 
      function(childSnapshot) {
      
      var trainName = childSnapshot.val().name;
      var dest = childSnapshot.val().place;
      var firstTrain = childSnapshot.val().start;
      var frequency = childSnapshot.val().regularity;

      var nextArrival = "";
      
	    // get Current Time
	    var currentTime = moment();
	    //difference between the times
	    var diffTime = moment().diff(moment(firstTrain, "x"), "minutes");
	    // Time apart (remainder)
	    var timeRemainder = diffTime % frequency;
	    //minutes until Train
	    var timeInMinutesTillTrain = frequency - timeRemainder;
	    //Next Train
	    nextArrival = moment().add(timeInMinutesTillTrain, 'minutes');
      nextArrival = moment(nextArrival).format('h:mm A');
      
      
      var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(dest),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(timeInMinutesTillTrain)
      );
    
      $("#train-schedule-body").append(newRow);

      })

      
  
  