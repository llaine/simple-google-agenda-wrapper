# simple-google-agenda-wrapper

Pure VanillaJS wrapper for Google Agenda API calls.



## Exploration des possibilités de requêtes.

On peut requêter les évenemnts, en fonction de leur date de début, ou leurs date de
modification.
Le reste sont des propriétés classique (type, plage de date, affichage des supprimés, nombre de résultats, etc).

Queries sur les calendriers

https://developers.google.com/google-apps/calendar/v3/reference/events/list#parameters

Queries sur les events

https://developers.google.com/google-apps/calendar/v3/reference/events/list#parameters


## Gestion des invitations.



On peut créer un évenemnt ou calendrier en passant des adresses email, qui vont :
- dans un premier temps recevoir une invitation.
Un field responseStatus va être crée qui peut avoir plusieurs état (needsAction, declined, tentative, accepted) en fonction
de la réponse du destinataire.

https://developers.google.com/google-apps/calendar/v3/reference/events/insert#request-body

Il n'existe pas a proprement parler de gestionnaire des invitations.
Mais on peut très bien, requêter plusieurs fois les évenemtns d'un calendrier.
Pour voir l'évolution des responseStatus.


# How to

```
npm install
npm start
# Browse localhost:8080 and open the console to see the results !
```
