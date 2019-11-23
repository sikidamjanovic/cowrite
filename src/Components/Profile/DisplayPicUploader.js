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
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                default: console.log('default')
            }
        }, function(error) {
            // Handle unsuccessful uploads
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
                    console.log('ERROR Uploading pic')
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
                    <label style={{ width: '100%', height: '100%', padding: '10px'}} for="upload">Change DP</label>
                </Button>
                <Input type="file" id="upload" style={{ visibility: 'hidden', width: 0, padding: 0 }} onChange={this.fileSelectedHandler}/>
                <Button onClick={this.deleteProfile()}>
                    Delete Profile
                </Button>
            </Row>
        );
    }
}

export default DisplayPicUploader;