import React, { Component } from 'react';
import { Radio, Avatar, Row, Button, Popconfirm, message, Spin, Select } from 'antd'
import ProfilePostFeed from '../Profile/ProfilePostFeed'
import DisplayPicUploader from './DisplayPicUploader';
import { getFirestore } from "redux-firestore";
import * as firebase from 'firebase'
import {withRouter} from 'react-router-dom';

class UserProfile extends Component {

    constructor(props){
        super(props)
        this.state = {
            selected: 'yourPrompts',
            isOwnProfile: false,
            displayName: '',
            photoURL: null,
            userExists: null
        }
        this.handleRadioChange = this.handleRadioChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.deleteProfile = this.deleteProfile.bind(this)
        this.doesUserExist = this.doesUserExist.bind(this)
    }

    componentWillMount(){
        this.isOwnProfile()
        this.doesUserExist()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.isOwnProfile()
            this.doesUserExist()
        }
    }

    isOwnProfile(){
        var path = window.location.pathname.split('/')
        var displayName = path[2]
        if(displayName === this.props.auth.displayName){
            this.setState({
                isOwnProfile: true,
                displayName: displayName
            })
            this.getAvatar(displayName)
        }else{
            this.setState({
                isOwnProfile: false,
                displayName: displayName
            })
            this.getAvatar(displayName)
        }
    }

    handleRadioChange(e){
        this.setState({
            selected: e.target.value
        })
    }

    handleSelectChange(value) {
        this.setState({
            selected: value
        })
    }

    showRelevantFeed(){
        var path = window.location.pathname.split('/')
        var displayName = path[2]
        return(<ProfilePostFeed type={this.state.selected} displayName={displayName}/>)
    }

    async doesUserExist() {
        var path = window.location.pathname.split('/')
        var displayName = path[2]
        const users = [];
        await firebase.firestore().collection('users').get()
          .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
            users.push(doc.data());
          });
        });
        for (let i = 0; i < users.length; i++) {
            if(displayName === users[i].displayName){
                this.setState({
                    userExists: true
                })
                break
            }else{
                this.setState({
                    userExists: false
                })
            }
        }
    }

    getAvatar(displayName){
        var that = this
        getFirestore().collection('users').doc(displayName).get()
        .then(function(doc) {
            if (doc.exists) {
                if(doc.data().photoURL !== undefined){
                    that.setState({
                        photoURL: doc.data().photoURL
                    })
                }else{
                    that.setState({
                        photoURL: null
                    })
                }
            }
        }).catch(function(error) {
            message.error("Error getting document:", error);
        });
    }

    deleteProfile(){
        var user = firebase.auth().currentUser;
        user.delete().then(function() {
            getFirestore().collection('users').doc(user.displayName).delete()
            .then(function() {
                message.success('Succesfully deleted profile')
                window.location.reload()
            }).catch(function(error) {
                message.error(error);
            });
        }).catch(function(error) {
            message.error(error.message)
        });
    }

    renderProfile(){
        var path = window.location.pathname.split('/')
        var displayName = path[2]
        const { Option } = Select;
        if(this.state.userExists){
            return(
                <div>
                    <Row style={{ marginTop: '48px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '24px' }}>
                            {this.state.photoURL !== null ?
                                <Avatar shape="square" size={98} src={this.state.photoURL}/>:
                                <Avatar shape="square" size={98} style={{ background: '#111717', color: '#171F22' }} icon="user" />
                            }
                            <h1 style={{ marginLeft: '24px' }}>{displayName}</h1>
                        </div>
                        {this.state.isOwnProfile ? 
                            <div style={{ display: 'flex', flexDirection: 'row'}}>
                                <DisplayPicUploader auth={this.props.auth}/>
                                <Popconfirm
                                    title="Are you sure you want to delete your profile? (this cannot be undone)"
                                    onConfirm={this.deleteProfile}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button>Delete Profile</Button>
                                </Popconfirm>
                            </div>:
                            null
                        }
                    </Row>
                    <Row style={{ marginTop: '48px' }} onChange={this.handleRadioChange}>
                        <Radio.Group defaultValue="yourPrompts" buttonStyle="solid">
                            {this.state.isOwnProfile ? 
                                <Select defaultValue="yourPrompts" style={{ width: 150 }} onChange={this.handleSelectChange}>
                                    <Option value="yourPrompts">Your Prompts</Option>
                                    <Option value="yourStories">Your Stories</Option>
                                    <Option value="likedPrompts">Liked Prompts</Option>
                                    <Option value="likedStories">Liked Stories</Option>
                                </Select>  
                            :
                                <span>
                                    <Radio.Button value="yourPrompts">{displayName}'s Prompts</Radio.Button>
                                    <Radio.Button value="yourStories">{displayName}'s Stories</Radio.Button>
                                </span>
                            }
                        </Radio.Group>
                    </Row>
                    <Row style={{ marginTop: '48px' }}>
                        {this.showRelevantFeed()}
                    </Row>
                </div>
            )
        }else if(this.state.userExists === null){
            return(
                <div style={{
                    width: '100%',
                    height: '90vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Spin/>
                </div>
            )
        }else{
            return <h2 style={{ marginTop: '100px '}}>{displayName + ' cannot be found.'}</h2>
        }
    }

    render(){
        return(
            <div>
                {this.renderProfile()}
            </div>
        )
    }
}

export default withRouter(props => <UserProfile {...props}/>);
