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

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
event.preventDefault();

// Grabs user input
var tName = $("#train-name-input").val().trim();
var tDest = $("#destination-input").val().trim();
var firstT = moment($("#first-train-input").val().trim(), "DD/MM/YY").format("X");
var tFreq = $("#frequency-input").val().trim();

// Creates local "temporary" object for holding employee data
var newT = {
    name: tName,
    destination: tDest,
    first: firstT,
    frequency: tFreq
};

// Uploads employee data to the database
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

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

console.log(childSnapshot.val());

// Store everything into a variable.
var tName = childSnapshot.val().name;
var tDest = childSnapshot.val().destination;
var firstT = childSnapshot.val().first;
var tFreq = childSnapshot.val().frequency;

// Employee Info
console.log(tName);
console.log(tDest);
console.log(firstT);
console.log(tFreq);

// Prettify the employee first
var firstTPretty = moment.unix(firstT).format("HH:mm");

// Calculate the months worked using hardcore math
// To calculate the months worked
var nextArrival = moment().diff(moment(firstT, "X"), "time");
console.log(nextArrival);

// Calculate the total billed frequency
var minutesAway = nextArrival * tFreq;
console.log(minutesAway);

// Add each train's data into the table
$("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" + nextArrival + "</td><td>" + tFreq + "</td><td>" + minutesAway + "</td></tr>");
});
//<td>" firstTPretty + "</td>