import { getFirestore } from "redux-firestore";
import * as firebase from "firebase";
import 'firebase/firestore'
import { message } from 'antd'

export const createPost = (post) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to db
        const firestore = getFirestore()
        console.log(post)
        var today = new Date();
        firestore.collection('posts').add({ 
            ...post,
            author: getFirebase().auth().currentUser.displayName,
            authorPic: getFirebase().auth().currentUser.photoURL,
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
        message.success('Your prompt has been posted!')
    } 
}

export const submitChapter = (submission) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('stories').doc(submission.postId).collection('submissions').doc().set({
            ...submission,
            likes: [],
            likeCount: 0,
            author: getFirebase().auth().currentUser.displayName,
            time: new Date()
        })
        message.success('Your chapter has been submitted!')
        .then(() => {
            dispatch({ type: 'SUBMIT_CHAPTER', submission})
        }).catch((err) => {
            dispatch({ type: 'SUBMIT_CHAPTER_ERROR', err })
        })
    }
}
