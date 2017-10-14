// Initialize Firebase
var config = {
	apiKey: "AIzaSyBFiMEDtHlI07y-IvqL1CequneBdHJqz88",
	authDomain: "train-time-ac403.firebaseapp.com",
	databaseURL: "https://train-time-ac403.firebaseio.com",
	projectId: "train-time-ac403",
	storageBucket: "train-time-ac403.appspot.com",
	messagingSenderId: "846386312291"
};
firebase.initializeApp(config);

// Variable to reference the firebase database.
var database = firebase.database();

// Initial values
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";

var currentTime;

// Add current time to the page.
function getCurrentTime() {
	currentTime = moment(currentTime).format("hh:mm A");
	$("#time").text(currentTime);
}

getCurrentTime();

// When Submit button is clicked...
$("#add-train").on("click", function() {
	// Prevent form from submitting (or page from refreshing).
	event.preventDefault();

	// Get user input.
	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	firstTrainTime = $("#firstTrainTime").val().trim();
	frequency = $("#frequency").val().trim();

	// Create temporary object for holding new train data.
	var newTrain = {
		trainName: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
		frequency: frequency
	};

	// If the object is empty, do not push to the array.
	if (newTrain.trainName === "" || newTrain.destination === "" || newTrain.firstTrainTime === "" || newTrain.frequency === "") {
		// Display modal dialog informing user to fill out all form fields.
		$("#incompleteForm").modal("show");
		return;
	}

	// Upload new train data to the firebase database.
	database.ref().push(newTrain);

	// Clear the HTML input boxes for the Add Train form.
	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrainTime").val("");
	$("#frequency").val("");
});

// Create firebase event for adding a train to the database.
// Create a new row in the HTML when a user adds a new train.
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	// Store everything into a variable.
	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTrainTime = childSnapshot.val().firstTrainTime;
	var frequency = childSnapshot.val().frequency;

	// Calculate Next Arrival...
	// First train time (pushed back 1 year to make sure it comes before current time).
	var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");

	// Store the current time in a variable to calculate the difference later.
	currentTime = moment();

	// Find the difference between the times.
	var difference = moment().diff(moment(firstTrainTimeConverted), "minutes");

	// Get the remainder to find the time apart.
	var remainder = difference % frequency;

	// Calculate Minutes Away
	var minutesAway = frequency - remainder;

	// Calculate Next Arrival time
	var nextArrival = moment().add(minutesAway, "minutes");

	// Next Arrival time formatted.
	nextArrival = moment(nextArrival).format("hh:mm A");

	// Add each train's data to the HTML table.
	$("#train-table > tbody").append("<tr><td class='text-left'>" + trainName + "</td><td class='text-left'>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});