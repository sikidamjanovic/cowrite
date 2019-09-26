//import { getFirestore } from "redux-firestore";
const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

const createStory = (story => {
    return admin.firestore().collection('stories')
        .add(story)
        .then(doc => console.log('Story Added', doc))
})

exports.convertToStory = functions.firestore
    .document('posts/{postId}')
    .onUpdate((change, context) => {
        data = change.after.data()
        story = {
            author: data.author,
            prompt: data.content,
            genre: data.genre,
            title: data.title,
            time: data.time,
            chapters: [],
            currentChapter: 1,
            submissions: []
        }
        return createStory(story)
})

