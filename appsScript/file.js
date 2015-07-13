function doGet(e) {
  var first_name = e.parameter.first_name;
  var last_name = e.parameter.last_name;
  var email = e.parameter.email;
  var phone = e.parameter.phone;
  var start = new Date(Number(e.parameter.start));
  var end = new Date(Number(e.parameter.end));
  
  // the event to be removed.
  var remEvent = getOpenAppsCal().getEvents(start, end);
  var r = removeEvent(remEvent);
  
  // the event to be created and added
  // to the scheduled appointments calendar.
  var crtEvent = getSchedAppsCal().createEvent(
    'Health Insurance Appointment',
    start,
    end,
    {
      description: "A health insurance meeting with Cassandra Aikman",
      location: "HSCTC office",
      guests: email,
      sendInvites: true
    }
  );
  
  var res = {
    "rem_success": r,
    "crt_success": crtEvent != undefined
  };
  
  Logger.log(res);
  return ContentService.createTextOutput(JSON.stringify(res))
    .setMimeType(ContentService.MimeType.JSON);
}

function removeEvent(events) {
  if (events.length != 1)
    return false;
  events[0].deleteEvent();
  return true;
}

function getOpenAppsCal() {
  var cal = CalendarApp.getCalendarsByName('Open Appointment Slots');
  if (cal.length > 1 || cal.length == 0)
    return;
  cal = cal[0];
  return cal;
}

function getSchedAppsCal() {
  var cal = CalendarApp.getCalendarsByName('Scheduled Appointment Slots');
  if (cal.length > 1 || cal.length == 0)
    return;
  cal = cal[0];
  return cal;
}
