const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const documentWriteListener = functions.firestore.document('posts/{documentUid}/likes').onWrite((change, context) => {

        if (!change.before.exists) {
            //new document created, add one to count

            db.doc(docRef).update({numberOfDocs: FieldValue.increment(1)});

        } else if (change.before.exists && change.after.exists) {
            //update existing document : do nothing

        } else if (!change.after.exists) {
            //Deleting document : subtract one from count

            db.doc(docRef).update({numberOfDocs: FieldValue.increment(-1)});
        }
    return;
    });


