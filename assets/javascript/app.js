//firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();
var firstTimeConverted = moment(start, "HH:mm").subtract(1, "years");
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
var remainder = diffTime % frequency;
var minutesAway = frequency - remainder;
var nextTrain = moment().add(minutesAway, "minutes");

$("#add-train").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var start = $("#start").val().trim();
    var frequency = $("#frequency").val().trim();
    var newTrain = {
        name: trainName,
        destination: destination,
        start: start,
        frequency: frequency
    };

    database.ref().push(newTrain);
    $("#trainName").val("");
    $("#destination").val("");
    $("#start").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function (snapshot) {
    console.log(snapshot);
    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minutesAway)
    );

    $("#currentSchedule > tbody").append(newRow);
});