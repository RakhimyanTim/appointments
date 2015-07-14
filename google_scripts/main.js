function doGet(e) {
  // It's up to client to make sure all these are defined...
  var first_name = e.parameter.first_name;
  var last_name = e.parameter.last_name;
  var email = e.parameter.email;
  var phone = e.parameter.phone;
  var start = new Date(Number(e.parameter.start));
  var end = new Date(Number(e.parameter.end));
  
  var now = new Date();
  var db_info = [now];  // Debugging information.
  
  // The two parameters returned to the client.
  var suc;
  var msg;
  
  // The appointment to be removed.
  // First try to locate the selected event on the calendar.
  var remEvent = findUniqueEvent(appsCal, start, end);
  if (remEvent == null) {
    db_info.push('Error finding event to remove.');
    log_err(db_info);
    return response(false, 'Removal error');
  }

  remEvent.deleteEvent();
  db_info.push("Found and removed event.");
  
  // Error if appointment is in the past.
  if (start <= now) {
    db_info.push("Appointment is in the past!");
    log_err(db_info);
    return response(false, 'That appointment has already passed. '
                    + 'Please select a future appointment.');
  }
  
  // Try to book new appointment
  var c = createBooking(start, end, email);
  // On error
  if (!c) {
    db_info.push("Error creating booking.");
    log_err(db_info);
    return response(false, 'Booking error.');
  }
  
  // On success
  db_info.push("Successfully created booking!");
  log_ok(db_info);
  return response(true, 'Success!');
    
}

/* Creates a ContentService object to return to the client,
 * and pushes logs to spreadsheet.
 * suc: boolean represent whether the booking was successful or not.
 * msg: string will be displayed to use if suc == false.
 */
function response(suc, msg) {
  return ContentService.createTextOutput(JSON.stringify({
    'suc': suc,
    'msg': msg
  })).setMimeType(ContentService.MimeType.JSON);
}
