var Api = require('./google-api');

function onDomReady(cb) {
  document.onreadystatechange = function () {
    var state = document.readyState;
    if (state == 'complete') {
      console.info('Dom fully loaded');
      cb()
    }
  }
}

onDomReady(function() {
  // Api connection.
  Api.authentication(function(authResult) {
    console.info('Authentication succeed');
  });

  // Fetch calendars
  Api.queryCalendars(function(calendars) {
    // 1 is a fair random.
    var randomCalendar = calendars[1];

    // Fecthing events from this specific calendar.
    Api.queryEventsFromCalendar(randomCalendar.id, function(events) {
      console.log(events);
    });
  });
});
