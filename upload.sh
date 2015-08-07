ROOT="ftp://hsctcftp:211H31p!@hsctc.org/health_appointments/"

for FILE in appointments.html proxy.php users.php; do
    wput -v -u $FILE $ROOT
done

cd js

ROOT="ftp://hsctcftp:211H31p!@hsctc.org/health_appointments/js/"

for FILE in calendar.js; do
    wput -v -u $FILE $ROOT
done
