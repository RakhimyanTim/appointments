$(document).ready(function() {

    // setup a timeout to handle errors on 
    $.ajaxSetup({
        timeout: 1000
    });

    // Important DOM elements
    var cal = $('#calendar');
    var mod = $('#inputModal');
    var text = $('#booking-text');
    var form = $('#booking-form');

    // The start and end times and the navigator 
    // of the appointment being scheduled.
    var start;
    var end;
    var navigator;

    // Initialize the calendar
    cal.fullCalendar({
        defaultView: "agendaWeek",
        weekends: false,
        businessHours: true,
        googleCalendarApiKey: 'AIzaSyBmErR1--htDymI-t_1CPVT7gfgg8K0yRE',
        eventSources: [
            {
                googleCalendarId: 'hsctc.org_cnp6o1rqeh2fabeg46v57oa5mo@group.calendar.google.com'
            },
            {
                googleCalendarId: 'cornell.edu_ksu6oqga97ppovicu81k8rruss@group.calendar.google.com'
            }
        ],
        eventClick: onEventClicked
    });
    
    // Callback for when an appointment slot is clicked.
    function onEventClicked(calEvent, jsEvent, view) {
        start = calEvent.start;
        end = calEvent.end;
        navigator = calEvent.title;
        mod.modal({
            backdrop: 'static',
            keyboard: false
        });
        text[0].innerHTML = 'You are currently booking an appointment for ' +
            start.format('MMMM Do, YYYY') + ' at ' + start.format('h:mm a');
        return false;
    }
    
    // Make call to Google Apps Script on submit.
    form.on('submit', function() {
        // make sure the start and end times are set
        if (!(start && end)) {
            alert("Error: certainly Carsten's fault.");
            return;
        }
        // the url of my Google Apps Script, along with the GET vars.
        var proxy = 'proxy.php?start=' + start + '&end=' + end + 
            '&navigator=' + navigator + '&' + form.serialize();
        console.log('proxy url: ' + proxy);
        // expect a response with 'suc' and 'msg' fields.
        $.ajax({
            url: proxy,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.suc == false) {
                    alert(data.msg);
                }
                document.location.reload();
            },
            timeout: 3000,
            error: function(jq, sts, err) {
                alert("an unknown error occurred");
            },
        });
        mod.modal('hide');
        return false;
    });
});
