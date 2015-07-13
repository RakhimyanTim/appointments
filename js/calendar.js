$(document).ready(function() {

    // Important DOM elements
    var cal = $('#calendar');
    var mod = $('#inputModal');
    var text = $('#booking-text');
    var form = $('#booking-form');

    // The start and end times of the appointment being scheduled.
    var start;
    var end;

    // Initialize the calendar
    cal.fullCalendar({
        defaultView: "agendaWeek",
        weekends: false,
        googleCalendarApiKey: 'AIzaSyBJeKLbF9BJ1-NP0RQOXF68sU6OxUkVQgI',
        events: {
            googleCalendarId: 'hsctc.org_cnp6o1rqeh2fabeg46v57oa5mo@group.calendar.google.com'
        },
        eventClick: onEventClicked
    });
    
    // Callback for when an appointment slot is clicked.
    function onEventClicked(calEvent, jsEvent, view) {
        start = calEvent.start;
        end = calEvent.end;
        mod.modal({
            backdrop: 'static',
            keyboard: false
        });
        text[0].innerText = 'You are currently booking an appointment for ' +
            start.format('MMMM Do, YYYY') + ' at ' + start.format('h:mm a');
        return false;
    }
    
    // Remove event from 'appointments' Google cal,
    // Add event to 'scheduled' Google cal.
    // Rerender the fullCalendar.
    form.on('submit', function() {
        // make sure the start and end times are set
        if (!(start && end)) {
            alert("Error: certainly Carsten's fault.");
            return;
        }
        // the url of my Google Apps Script, along with the GET vars.
        var host = 'https://script.google.com/a/macros/hsctc.org/s/'
            + 'AKfycbywf-reXIbN_AA6VZuHdIcSc6NIhG6F-gM1Gl3gTSImFzmYSF_A/exec'
            + '?start=' + start + '&end=' + end + '&' + form.serialize();
        $.get(host, function(data) {
            if (data.rem_success == false) {
                alert("An error occurred.. could not remove event from " +
                    "appointments calendar (Google Apps Script error).");
                console.log("Unsuccessful removal of appointment :(");
            } else if (data.crt_success == false) {
                alert("An error occurred.. could not create scheduled " +
                    "appointment in calendar (Google Apps Script error).");
                console.log("Unsuccessful addition of appointment :(");
            } else {
                console.log("Successful appointment booking!");
            }
        });
        mod.modal('hide');
        document.location.reload();
        return false;
    });
});
