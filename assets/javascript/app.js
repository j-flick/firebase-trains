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