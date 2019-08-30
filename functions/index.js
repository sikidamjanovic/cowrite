const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.sendPushNotification = functions.database.ref('/user_notification/{uid}/{id}').onWrite((event) => {
    var uid = event.params.uid;
});