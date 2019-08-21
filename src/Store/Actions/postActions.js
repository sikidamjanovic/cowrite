export const createPost = (post) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to db
        const firestore = getFirestore()
        console.log(post)
        firestore.collection('posts').add({ 
            ...post,
            author: 'sikiDamjanovic',
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_POST', post})
        }).catch((err) => {
            dispatch({ type: 'CREATE_PROJECT_ERROR', err })
        })
    }
}