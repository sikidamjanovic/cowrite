import { firestore } from "firebase";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";
import { getFirestore } from "redux-firestore";
import { relativeTimeRounding } from "moment";

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS'});
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        })
    }
} 

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password,
        ).then(function () {
            firebase.auth().currentUser.updateProfile({
              displayName: newUser.username
            });
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS'})
            
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err})
        })
    }
}