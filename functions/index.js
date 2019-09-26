const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

const db = admin.firestore()

const createStory = ((story, id )=> {
    return admin.firestore().collection('stories')
        .add(story)
        .then(
            db.collection('notifications').doc().set({
                message: story.title + ' converted to a story!',
                post: id,
                time: new Date()
            }),
            db.collection('posts').doc(id).delete()
        )
})

const evaluateLikes = ((data, id) => {
    // like threshold in this case is 2
    // TODO: Add another parameter for time
    if(data.likes.length >= 1){
        story = {
            promptId: id,
            author: data.author,
            prompt: data.content,
            genre: data.genre,
            title: data.title,
            time: data.time,
            chapters: [],
            currentChapter: 1,
            submissions: []
        }
        return createStory(story, id)
    }else{
        return console.log('Not Enough Likes For Story')
    }
})

exports.convertToStory = functions.firestore
    .document('posts/{postId}')
    .onWrite((change, context) => {
        const changed = change.after.data()
        const id = change.after.id
        return evaluateLikes(changed, id)
})

