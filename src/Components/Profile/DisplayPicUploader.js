import React, { Component} from 'react'
import { Button, Input, Row, message } from 'antd'
import { getFirestore } from "redux-firestore";
var firebase = require('firebase');

class DisplayPicUploader extends Component {

    fileSelectedHandler = event => {
        this.fileUploadHandler(event.target.files[0])
    }

    fileUploadHandler = (file) => {
        var user = firebase.auth().currentUser;
        var userName = user.displayName
        var storageRef = firebase.storage().ref(userName + '/profilePicture/' + file)
        var uploadTask = storageRef.put(file)
        uploadTask.on('state_changed', function(snapshot){
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    break;
                default: console.log('.')
            }
        }, function(error) {
            message.error('Upload error: ', error)
        }, function() {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                user.updateProfile({
                    photoURL: downloadURL
                }).then(function() {
                    message.success('Display Pic Successfully Changed!')
                    getFirestore().collection('users').doc(userName).update({
                        photoURL: downloadURL
                    })
                    .then(function(){
                        window.location.reload()
                    })
                }).catch(function(error) {
                    message.error('Error: ', error)
                });
            });
        });
    }

    deleteProfile(){

    }

    render() {
        return (
            <Row>
                <Button style={{ padding: 0, margin: 0}}>
                    <label style={{ width: '100%', height: '100%', padding: '10px'}} for="upload">Change Profile Pic</label>
                </Button>
                <Input type="file" id="upload" style={{ visibility: 'hidden', width: 0, padding: 0 }} onChange={this.fileSelectedHandler}/>
            </Row>
        );
    }
}

export default DisplayPicUploader;