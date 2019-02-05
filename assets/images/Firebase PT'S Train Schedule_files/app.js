
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
    var trainName = $('#train').val().trim;
    var dest = $('#destination').val.trim;
    var firstTrain = $('#firstTrain').val().trim;
    var frequency = $('#train-frequency').val.trim;
    database.ref().push({
        train: trainName,
        destination: dest,
        firstTrain: firstTrain,
        frequency: frequency,
    })
    });


  
  