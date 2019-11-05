import React, { Component } from 'react';
import { Button, Input,  Radio, Avatar, Row, Col, message } from 'antd'
import ProfilePostFeed from '../Profile/ProfilePostFeed'
import { getFirestore } from "redux-firestore";
var firebase = require('firebase');

class UserProfile extends Component {

    constructor(props){
        super(props)
        this.state = {
            selected: 'likes'
        }
        this.handleRadioChange = this.handleRadioChange.bind(this)
    }

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

    handleRadioChange(e){
        this.setState({
            selected: e.target.value
        })
    }

    showRelevantFeed(){
        return(<ProfilePostFeed type={this.state.selected} id={this.props.auth.displayName}/>)
    }

    getAvatar(){
        if(this.props.auth.photoURL !== null){
            return <Avatar shape="square" size={100} src={this.props.auth.photoURL} />
        }
    }

    render(){
        return(
            <div>
                <Row type="flex" align="middle">
                    <Col md={2}>
                        {this.getAvatar()}
                    </Col>
                    <Col md={4} style={{ marginLeft: '15px'}}>
                        <h1>{this.props.auth.displayName}</h1>
                        <Button style={{ padding: 0, margin: 0}}>
                            <label style={{ width: '100%', height: '100%', padding: '10px'}} for="upload">Change DP</label>
                        </Button>
                        <Input type="file" id="upload" style={{ visibility: 'hidden', width: 0 }} onChange={this.fileSelectedHandler}/>
                    </Col>
                    {/* <input type="file" onChange={this.fileSelectedHandler}/>
                    <Button type="primary" onClick={this.fileUploadHandler}>Upload</Button> */}
                </Row>
                <Row style={{ marginTop: '48px' }} onChange={this.handleRadioChange}>
                    <Radio.Group defaultValue="posts" buttonStyle="solid">
                        <Radio.Button value="posts">Your Posts</Radio.Button>
                        <Radio.Button value="liked">Liked</Radio.Button>
                        <Radio.Button value="Delete">Delete</Radio.Button>
                    </Radio.Group>
                </Row>
                <Row style={{ marginTop: '48px' }}>
                    {this.showRelevantFeed()}
                </Row>
            </div>
        )
    }
}

export default UserProfile