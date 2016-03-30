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

function createCalendarItem(calendarItem) {
  return '<option value="' + calendarItem.id + '">' +
          '<p>' + calendarItem.summary + '</p>' +
          '</option>';
}

onDomReady(function() {
  var calendarList = $('#calendarList');
  var selectedCalendar = $('#selectedCalendar')

  // Api connection.
  Api.authentication(function(authResult) {
    console.info('Authentication succeed');
  });

  // Fetch calendars
  Api.queryCalendars(function(calendars) {
    calendars.forEach(function(calendar) {
      // Append calendars to the div
      calendarList.append(createCalendarItem(calendar));
      var queryParams = {
        showDeleted: true,
        maxResults: 5,
        orderBy: 'startTime'
      };

      Api.queryEventsFromCalendar(calendar.id, queryParams, function(events) {
        events.forEach(function(event) {
          console.log(event);
        });
      });
    });
  });

  $('#addEvent').submit(function(e) {
    e.preventDefault();
    var values = $(this).serialize().split('&');

    // Transform the string to array of object containing addressEmail.
    var attendees = decodeURIComponent(values[4].split('=')[1])
          .split(',')
          .map(function(address) {
            return {
              email: address.trim()
            }
          });

    var calendarId = decodeURIComponent(values[0].split('=')[1]);

    // All the values are stored like key=value, I only want the value
    var eventAttributes = {
      description: values[1].split('=')[1],
      startDateTime: decodeURIComponent(values[2].split('=')[1]),
      endDateTime: decodeURIComponent(values[3].split('=')[1]),
      attendees: attendees
    }

    Api.createEvent(calendarId, eventAttributes, function(event) {
      console.log(event);
    });
  });
});
