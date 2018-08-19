//firebase.initializeApp(config);

var database = firebase.database();

var nextTrain = '';
var minutesAway = '';

$("#add-train").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var start = $("#start").val().trim();
    var frequency = $("#frequency").val().trim();
    var newTrain = {
        trainName: trainName,
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

database.ref().on("child_added", function (childSnapshot) {
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var start = childSnapshot.val().start;
    console.log(start);
    console.log(frequency);
    var currentTime = moment();
    console.log('current moment: ' + currentTime);
    var firstTimeConverted = moment(start, "HH:mm").subtract(1, "years");
    console.log('first time converted: ' + firstTimeConverted);
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log('diff time: ' + diffTime);
    var remainder = diffTime % frequency;
    console.log('remainder: ' + remainder);
    var minutesAway = frequency - remainder;
    console.log('minutes away: ' + minutesAway);
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log('next train: ' + nextTrain);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain.format('HH:mm')),
        $("<td>").text(minutesAway)
    );

    $("table>tbody").append(newRow);
});