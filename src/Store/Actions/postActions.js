import { getFirestore } from "redux-firestore";
import { firestore } from "firebase";
import { notification } from 'antd'

export const createPost = (post) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to db
        const firestore = getFirestore()
        console.log(post)
        var today = new Date();

        firestore.collection('posts').add({ 
            ...post,
            author: getFirebase().auth().currentUser.displayName,
            createdAt: new Date(),
            time: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' - '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
        }).then(function(docRef) { //setting an initial like from the user
            firestore.collection('posts').doc(docRef.id).collection('likes').doc(getFirebase().auth().currentUser.displayName).set({
                uid: getFirebase().auth().currentUser.uid
            })
        }).then(() => {
            dispatch({ type: 'CREATE_POST', post})
        }).catch((err) => {
            dispatch({ type: 'CREATE_PROJECT_ERROR', err })
        })
        notification.open({
            message: 'Prompt Posted!',
            description: 'I bet its really great man...',
            duration: 2
        })
    } 
}