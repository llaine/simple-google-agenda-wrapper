var CLIENT_ID = '407102783207-cfilj8ul82ipdigkcr0osdr14pvqg9hh.apps.googleusercontent.com';
var scope = ['https://www.googleapis.com/auth/calendar'];

/**
* Fonction d'authentification à l'api google.
* Renvoie lorsque l'utilisateur est connecté.
* @param : cb
*/
function authentication(cb) {
  var params = {
    'client_id': CLIENT_ID,
    'scope': scope.join(' '),
    'immediate': false
  };
  console.info('Connection to GApi');
  gapi.auth.authorize(params, cb);
}

/**
* https://developers.google.com/google-apps/calendar/v3/reference/calendarList/get#parameters
* Load l'ensemble des calendriers du user connecté.
* Et renvoie le résultat dans un callback : cb
* @param : cb
*/
function queryCalendars(cb) {
  gapi.client.load('calendar', 'v3', function() {
    var req = gapi.client.calendar.calendarList.list();
    req.execute(function(result) {
      console.info('Calendars successfuly loaded');
      var calendars = result.items;
      cb(calendars);
    })
  });
}

/**
* https://developers.google.com/google-apps/calendar/v3/reference/events/list#parameters
*
*
*
*/
function queryEventsFromCalendar(calendarId, cb) {
  gapi.client.load('calendar', 'v3', function() {
    var queryParams = {
      'timeMin': (new Date()).toISOString(),
      'calendarId': calendarId,
      // On peut récupérer les deleted.
      'showDeleted': false,
      //'singleEvents': true,
      //'maxResults': 10,
      //'orderBy': 'startTime'
    };
    var req = gapi.client.calendar.events.list(queryParams);
    req.execute(function(result) {
      var events = result.items;
      console.info('Events successfuly loaded')
      cb(events);
    })
  });
}

function createEvent() {
  
}

module.exports = {
  authentication:authentication,
  queryCalendars:queryCalendars,
  queryEventsFromCalendar:queryEventsFromCalendar
}
