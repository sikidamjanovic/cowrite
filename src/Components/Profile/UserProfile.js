import React, { Component } from 'react';
import { Radio, Avatar, Row } from 'antd'
import ProfilePostFeed from '../Profile/ProfilePostFeed'
import DisplayPicUploader from './DisplayPicUploader';
import { getFirestore } from "redux-firestore";
import {withRouter} from 'react-router-dom';

class UserProfile extends Component {

    constructor(props){
        super(props)
        this.state = {
            selected: 'yourPrompts',
            isOwnProfile: false,
            displayName: '',
            photoURL: null
            
        }
        this.handleRadioChange = this.handleRadioChange.bind(this)
    }

    componentDidMount(){
        this.isOwnProfile()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.isOwnProfile()
        }
    }

    isOwnProfile(){
        var path = window.location.pathname.split('/')
        var displayName = path[2]

        console.log('NAME:', displayName)

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

    showRelevantFeed(){
        var path = window.location.pathname.split('/')
        var displayName = path[2]
        return(<ProfilePostFeed type={this.state.selected} displayName={displayName}/>)
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
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    renderProfile(){
        var path = window.location.pathname.split('/')
        var displayName = path[2]
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
                        <DisplayPicUploader auth={this.props.auth}/> :
                        null
                    }
                </Row>
                <Row style={{ marginTop: '48px' }} onChange={this.handleRadioChange}>
                    <Radio.Group defaultValue="yourPrompts" buttonStyle="solid">
                        {this.state.isOwnProfile ? 
                            <span>
                                <Radio.Button value="yourPrompts">Your Prompts</Radio.Button>
                                <Radio.Button value="yourStories">Your Stories</Radio.Button>
                                <Radio.Button value="likedPrompts">Liked Prompts</Radio.Button>
                                <Radio.Button value="likedStories">Liked Stories</Radio.Button>
                            </span>
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
