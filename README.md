# Appointments
Better version of Google appointment slots<br>
By Carsten Thue-Bludworth, 07/15/2015

# About
This project was inspired by the need for a better way to allow clients to book appointments. The original Google Appointments Slots feature (in the Calendar App), allows clients to modify event data and does not allow the appointment creater to convey much static information to clients trying to book.<br>
The 

# How it works
There are two parts to this app. The first is a Google Calendar Add-On that also runs as a web server. It manages GET requests and updates the Google Calendars, owned by the appointment creater, that represent open and booked appointments. These files are located in google_scripts directory.<br>
The sencond part is the collection of files in the root directory. They represent the calendar front end that allows clients to book appointments and a simple set of scripts to send requests to the Google Web App.

# How to use it
1) Create a new Google Spreadsheet. Open the script editor (Tools > Script editor). Copy and paste each file under google_scripts into the editor.<br>
2) Create two new Google Calendars under your account. The first should be titled 'Open Appointment Slots', and the second should be called 'Scheduled Appointment Slots'. Add all your open appointments to the 'Open Appointment Slots' calendar.<br>
3) Copy the files in the root directory to the appropriate location on your web server.<br>
4) In the script editor from step 1, deploy the script as a web app. Modify the proxy.php file so that the variable $APP is the URL of your deployed web app.<br>
