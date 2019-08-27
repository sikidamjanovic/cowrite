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
       
        let check = false;
        let usersRef = firestore.collection('users');
        let query = usersRef.get(
        ).then(snapshot => {
            snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.data());
                if (doc.id == newUser.username) { check = true; console.log('fuck')}
            });
            if (check == false) {

                firebase.auth().createUserWithEmailAndPassword(
                    newUser.email,
                    newUser.password,
                ).then((resp) => {
                    firebase.auth().currentUser.updateProfile({
                    displayName: newUser.username,
                    });
                    return firestore.collection('users').doc(newUser.username).set({
                        uid: resp.user.uid
                    })
                }).then(() => {
                    dispatch({ type: 'SIGNUP_SUCCESS'})
                    
                }).catch(err => {
                    dispatch({ type: 'SIGNUP_ERROR', err})
                })
            } else {
                dispatch({ type: 'NAME_TAKEN'})
            }
        })

    }
}