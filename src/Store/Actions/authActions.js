import { getFirestore } from "redux-firestore";
import { message } from 'antd'

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS'});
            message.success('Logged in successfully')
            window.location.reload();
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
            message.success('Signed out successfully')
            window.location.reload();
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        let check = false;
        let usersRef = firestore.collection('users');
        usersRef.get(
        ).then(snapshot => {
            snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.data());
                if (doc.id === newUser.username) { check = true; }
            });
            if (check === false) {
                firebase.auth().createUserWithEmailAndPassword(
                    newUser.email,
                    newUser.password,
                ).then((resp) => {
                    firebase.auth().currentUser.updateProfile({
                    displayName: newUser.username,
                    });
                    return (
                        firestore.collection('users').doc(newUser.username).set({
                            uid: resp.user.uid
                        }),
                        firestore.collection('users').doc(newUser.username).collection('liked').doc().add({
                            type: 'inital',
                            postId: 'initial'
                        }),
                        window.location.reload()
                    )
                }).then(() => {
                    dispatch({ type: 'SIGNUP_SUCCESS'})
                    window.document.reload()
                }).catch(err => {
                    dispatch({ type: 'SIGNUP_ERROR', err})
                })
            } else {
                dispatch({ type: 'NAME_TAKEN'})
            }
        })

    }
}