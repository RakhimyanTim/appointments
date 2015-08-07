// VARS

// represents open appointments
var appsCal = getOpenAppsCal();
// represents booked appointments
var bookedCal = getBookedCal();
/* Representation Invariant: the intersection of
 *   events in appsCal and bookedCal is always
 *   empty. Their union is all times that are either
 *   booked or available to be booked.
 */

// HELPERS

/* Attempts to find a unique event in calendar cal
 * that starts at start and ends at end.
 * Returns null if the specified event doesn't exist
 * or multiple events exist between start and end.
 */
function findUniqueEvent(cal, start, end) {
  var es = cal.getEvents(start, end);
  if (es.length != 1)
    return null;
  return es[0];
}

// Return true on a successful booking, and false
// on an error.
function createBooking(name, start, end, email) {
  var e = bookedCal.createEvent(
    name,
    start,
    end,
    {
      description: "A health insurance meeting.",
      location: "HSCTC office",
      guests: email,
      sendInvites: true
    }
  );
  if (e) {
    return true;
  } else {
    return false;
  }
}

function getOpenAppsCal() {
  return CalendarApp.getCalendarById(open_cal_id);
}

function getBookedCal() {
  return CalendarApp.getCalendarById(booked_cal_id);
}


// Removes old appointment slots so they can't be booked
function removeOldApps() {
  var rem = appsCal.getEvents(new Date(0), new Date());
  for (var i = 0; i < rem.length; i++) {
    rem[i].deleteEvent();
  }
}
