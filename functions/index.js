const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

const db = admin.firestore()


// Following functions convert prompts into stories automatically based on likes

// Receive post data after a like and call an evaluate function
exports.convertToStory = functions.firestore
    .document('posts/{postId}')
    .onWrite((change, context) => {
        const changed = change.after.data()
        const id = change.after.id
        return evaluateLikes(changed, id)
})

/* 
    1. Check to see if amount of likes passes a threshold (test threshold is 1)
    2. Create a story if so
*/
const evaluateLikes = ((data, id) => {
    // TODO: Add another parameter for time
    if(data.likes.length >= 1){
        story = {
            promptId: id,
            author: data.author,
            prompt: data.content,
            genre: data.genre,
            title: data.title,
            createdAt: new Date(),
            currentChapter: 1
        }
        return createStory(story, id)
    }else{
        return console.log('Not Enough Likes For Story')
    }
})

/*
    Delete the original prompt (now a story)
*/
const createStory = ((story, id )=> {
    return admin.firestore().collection('stories')
        .add(story)
        .then(
            db.collection('posts').doc(id).delete()
        )
})