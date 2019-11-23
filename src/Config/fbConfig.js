import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC-1qE_pSDh3kKMmLI3fA4iErj4qGuZrgw",
    authDomain: "writingrelay.firebaseapp.com",
    databaseURL: "https://writingrelay.firebaseio.com",
    projectId: "writingrelay",
    storageBucket: "writingrelay.appspot.com",
    messagingSenderId: "549963888326",
    appId: "1:549963888326:web:65281ab754acef09",
    measurementId: 'G-6WJBXYLBZY'
};
// Initialize Firebase
var fb = firebase.initializeApp(firebaseConfig);
firebase.analytics(fb);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase