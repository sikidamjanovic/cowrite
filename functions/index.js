//import { getFirestore } from "redux-firestore";
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
//postUid == post id, documentUid == current user name
exports.documentWriteListener = functions.firestore.document('posts/{postId}/likes/{documentId}').onWrite((change, context) => {

        const post = change.after.data()
        if (!change.before.exists) {
            //new document created, add one to count
            getFirestore().collection('posts').doc(post.postId).collection('likes').doc('counter').set({
                numberOfDocs: FieldValue.increment(1)
            })

        } else if (change.before.exists && change.after.exists) {
            //update existing document : do nothing

        } else if (!change.after.exists) {
            //Deleting document : subtract one from count

            getFirestore().collection('posts').doc(post.postId).collection('likes').doc('counter').set({
                numberOfDocs: FieldValue.increment(1)
            })
        }
    return;
    });


