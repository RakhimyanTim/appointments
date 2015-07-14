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
function createBooking(start, end, email) {
  var e = bookedCal.createEvent(
    'Health Insurance Appointment',
    start,
    end,
    {
      description: "A health insurance meeting with Cassandra Aikman",
      location: "HSCTC office",
      guests: email,
      sendInvites: false
    }
  );
  if (e) {
    return true;
  } else {
    return false;
  }
}

function getOpenAppsCal() {
  var cal = CalendarApp.getCalendarsByName('Open Appointment Slots');
  if (cal.length != 1)
    return undefined;
  return cal[0];
}

function getBookedCal() {
  var cal = CalendarApp.getCalendarsByName('Scheduled Appointment Slots');
  if (cal.length != 1)
    return undefined;
  return cal[0];
}
