// Initialize Firebase
var config = {
    apiKey: "AIzaSyAq6UNGHQ7a7s7MThb72lMs8lwajv1sd9Q",
    authDomain: "trainscheduler-81701.firebaseapp.com",
    databaseURL: "https://trainscheduler-81701.firebaseio.com",
    projectId: "trainscheduler-81701",
    storageBucket: "",
    messagingSenderId: "429505589767"
};

  
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function(event) {
event.preventDefault();

// Grabs user input
var tName = $("#train-name-input").val().trim();
var tDest = $("#destination-input").val().trim();
var firstT = moment($("#first-train-input").val().trim(), "HHmm").format("HHmm");
var tFreq = $("#frequency-input").val().trim();

// Creates local "temporary" object for holding train data
var newT = {
    name: tName,
    destination: tDest,
    first: firstT,
    frequency: tFreq
};

// Uploads train data to the database
database.ref().push(newT);

// Logs everything to console
console.log(newT.name);
console.log(newT.destination);
console.log(newT.first);
console.log(newT.frequency);

// Alert
alert("Train successfully added");

// Clears all of the text-boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#first-train-input").val("");
$("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var tName = childSnapshot.val().name;
    var tDest = childSnapshot.val().destination;
    var firstT = childSnapshot.val().first;
    var tFreq = childSnapshot.val().frequency;

    // Train Info
    console.log(tName);
    console.log(tDest);
    console.log(firstT);
    console.log(tFreq);

    //var firstTPretty = moment.unix(firstT).format("HH:mm");
    var firstTPretty = moment(firstT, "HH:mm")

    // Difference between the times
    var diffTime = moment().diff(moment(firstTPretty), "minutes");

    // Time apart
    var tRemainder = diffTime % tFreq;
    // console.log(tRemainder);

    // Minutes Until Train
    var minutesAway = tFreq - tRemainder;
        console.log(minutesAway);
    // Next Train
    var nextT = moment().add(minutesAway, "minutes");

    var nextArrival = moment(nextT).format("HH:mm");

    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" + tFreq + " min</td><td>" + nextArrival + "</td><td>" + minutesAway + " min</td></tr>");
});
