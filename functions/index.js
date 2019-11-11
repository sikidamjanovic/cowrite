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

        var posted = new Date()

        story = {
            promptId: id,
            complete: false,
            author: data.author,
            authorPic: data.authorPic,
            prompt: data.content,
            genre: data.genre,
            title: data.title,
            numberOfChapters: data.numberOfChapters,
            createdAt: posted,
            currentChapter: 1,
            likes: [],
            likeCount: 0
        }

        // TODO: UPDATE USERS LIKE COLLECTION

        return createStory(story, id)
    }else{
        return console.log('Not Enough Likes For Story')
    }
})

/*
    Delete the original prompt (now a story)
*/
const createStory = ((story, id )=> {
    var now = new Date()
    return db.collection('stories')
        .add(story)
        .then(docRef => {
            db.collection('posts').doc(id).delete(),
            db.collection('notifications').doc().set({
                title: story.title,
                notification: 'converted to story',
                id: docRef.id,
                time: now.toString()
            })
            return null
        })
})