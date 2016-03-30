var CLIENT_ID = '407102783207-cfilj8ul82ipdigkcr0osdr14pvqg9hh.apps.googleusercontent.com';
var scope = ['https://www.googleapis.com/auth/calendar'];

/**
* Fonction d'authentification à l'api google.
* Le résultat de la connection est renvoyé en callback.
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
* Documentation relative aux queries
* https://developers.google.com/google-apps/calendar/v3/reference/events/list#parameters
* Charge l'ensemble des évenement d'un calendrier.
* Un certain nombre de prédicat sont passés en paramètre.
* Les évenements sont renvoyés dans un callback.
* @param calendarId
* @param params
* @param cb
*/
function queryEventsFromCalendar(calendarId, params, cb) {
  gapi.client.load('calendar', 'v3', function() {
    var queryParams = {
      'timeMin': (new Date()).toISOString(),
      'calendarId': calendarId,
      'showDeleted': params.showDeleted || false,
      'maxResults': params.maxResults || 10,
      // peut être du type startTime ou updated
      //'orderBy': params.startTime || 'startTime'
    };
    var req = gapi.client.calendar.events.list(queryParams);
    req.execute(function(result) {
      var events = result.items;
      console.info('Events successfuly loaded')
      cb(events);
    })
  });
}

/**
* https://developers.google.com/google-apps/calendar/v3/reference/events/insert#request-body
* Créer un évenement sur un calendrier spécifique.
* Au cas ou le calendrier et ou les attributs de l'evenement ne sont pas
* fournis, on crée un event générique sur le calendrier principal du compte.
* Une fois l'event crée, on le renvoie dans un callback.
* @param calendarId
* @param eventAttributes
* @param cb
*/
function createEvent(calendarId, eventAttributes, cb) {
  var random = Math.random();
  var event = {
    'summary': !eventAttributes.summary ?
        `Event N° ${random}` : eventAttributes.summary,
    'location': !eventAttributes.localisation ?
        '51 rue Saint François, 33000 Bordeaux, France' : eventAttributes.localisation,
    'description': !eventAttributes.description ?
        'Je suis un évenement aléatoire crée depuis une appli web!.' : eventAttributes.description,
    'start': {
      'dateTime': !eventAttributes.startDateTime ?
          '2016-04-25T09:00:00-07:00' : eventAttributes.startDateTime
    },
    'end': {
      'dateTime': !eventAttributes.endDateTime ?
          '2016-04-25T17:00:00-07:00' : eventAttributes.endDateTime
    },
    // Les utilisateurs qui vont êtres notifiés qu'on les a invités
    // à ce nouvel évenement.
    'attendees' : eventAttributes.attendees
  };
  var request = gapi.client.calendar.events.insert({
    'calendarId': !calendarId ? 'primary' : calendarId,
    'resource': event
  });

  request.execute(function(event) {
    cb(event)
  });
}

module.exports = {
  authentication:authentication,
  queryCalendars:queryCalendars,
  queryEventsFromCalendar:queryEventsFromCalendar,
  createEvent:createEvent
}
