import React, { Component } from 'react';
import { Card, Icon, Avatar, Tag, Popover, Tooltip, message, Popconfirm } from 'antd';
import '../../App.css'
import { connect } from 'react-redux'
import { getFirestore } from "redux-firestore";
import { NavLink } from 'react-router-dom'
import ReportModal from '../Posts/ReportModal'
var firebase = require('firebase');

class Prompt extends Component {

    constructor(props){
        super(props)
        this.state = {
            likes: [],
            amountOfLikes: 0,
            userLiked: false,
            photoURL: null
        }
        this.like = this.like.bind(this)
        this.delete = this.delete.bind(this)
        this.userLiked = this.userLiked.bind(this)
        this.getAvatar = this.getAvatar.bind(this)
    }

    componentDidMount(){
        this.setState({
            amountOfLikes: this.props.amountOfLikes
        })
        this.userLiked()
        this.getAvatar()
    }

    getTime(){
        var postedTime = this.props.time
        if(postedTime){

            var diffHours = Math.abs(new Date() - postedTime.toDate()) / 36e5;
            var hoursLeft = 48 - diffHours
            var minutesLeft = hoursLeft * 60
            const tooltipTitle = "The time remaining for this prompt to get 10 likes!"

            if(hoursLeft > 1){
                return(
                    <Tooltip title={tooltipTitle}>
                        <Tag style={{
                            background: 'none',
                            border: '1px solid rgb(135, 232, 222, 0.5)',
                            color: '#87e8de'
                        }}>
                            <Icon style={{ marginRight: '4px' }}type="clock-circle" />
                            {Math.round(hoursLeft) + 'h'}
                        </Tag>
                    </Tooltip>
                )
            }else if(hoursLeft > 0) {
                return(
                    <Tooltip title={tooltipTitle}>
                        <Icon style={{ marginRight: '4px' }}type="clock-circle" />
                        <Tag color="#cf1322">{60 - Math.round(minutesLeft) + 'min'}</Tag>
                    </Tooltip>
                )
            }else if(minutesLeft <= 0){
                //Delete prompt after time runs out
                this.delete()
            }
        }
    }

    delete(){
        getFirestore().collection('posts').doc(this.props.id).delete()
        for (let i = 0; i < this.props.likes.length; i++) {
            getFirestore().collection('users').doc(this.props.likes[i].displayName).liked.doc(this.props.id).delete()
        }
    }

    userLiked(){
        const likes = this.props.likes
        for (let i = 0; i < likes.length; i++) {
            if(likes[i] === this.props.auth.displayName){
                this.setState({
                    userLiked: true
                })
            }else{
                this.setState({
                    userLiked: false
                })
            }
        }
    }

    renderHeart(){
        if(this.state.userLiked){
            return(
                <span className="heart-filled">
                    <Icon 
                        type="heart"
                        theme="filled"
                        size="large"
                        key="heart"
                    />
                    <span id="likes">
                        {this.state.amountOfLikes}
                    </span>
                </span>
            )
        }else{
            return(
                <span className="heart">
                    <Icon
                        type="heart" 
                        key="heart"
                    />
                    <span id="likes">
                        {this.state.amountOfLikes}
                    </span>
                </span>
            )
        }
    }

    like(){
        if (this.props.auth.isEmpty === false) {
            if(this.state.userLiked === false){
                this.setState({
                    userLiked: true,
                    amountOfLikes: this.state.amountOfLikes + 1
                })
                getFirestore().collection('posts').doc(this.props.id).update({
                    likes: firebase.firestore.FieldValue.arrayUnion(
                        this.props.auth.displayName
                    ),
                    likeCount: firebase.firestore.FieldValue.increment(1)
                })
            }else{
                this.setState({
                    userLiked: false,
                    amountOfLikes: this.state.amountOfLikes - 1
                })
                // Delete user from posts 'likes' collection
                getFirestore().collection('posts').doc(this.props.id).update({
                    likes: firebase.firestore.FieldValue.arrayRemove(
                        this.props.auth.displayName
                    ),
                    likeCount: firebase.firestore.FieldValue.increment(-1)
                })
            }
        }else{
            message.warning('Please login or sign up to like prompts')
        } 
    }

    getAvatar(){
        var that = this
        getFirestore().collection('users').doc(this.props.author).get()
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

    deletePromptButton(){
        if(!this.props.auth.isEmpty){
            if(this.props.auth.displayName === this.props.author){
                return(
                    <Tooltip title="Delete prompt">
                        <Popconfirm
                            title="Are you sure delete this prompt?"
                            onConfirm={this.delete}
                            okText="Yes"
                            cancelText="No"
                        >
                            <button id="cardActionBtn">
                                <Icon type="delete" key="delete"/>
                            </button>
                        </Popconfirm>
                    </Tooltip>
                )
            }else{
                return(
                    <Tooltip title="Report this prompt">
                        <button id="cardActionBtn">
                            <Icon type="warning" key="warning" />
                        </button>
                    </Tooltip>
                )    
            }
        }else{
            return(
                <Tooltip title="Report this prompt">
                    <ReportModal 
                        title={this.props.title} 
                        type="prompt"
                        id={this.props.id}
                        component="card"
                    />
                </Tooltip>
            )
        }
    }

    render() { 
        const { Meta } = Card;
        return (
            <Card
                actions={[
                    <button id="cardActionBtn" onClick= {this.like}>
                        {this.renderHeart()}
                    </button>,
                    <Popover content={this.props.author} title="">
                        <button id="cardActionBtn">
                            <NavLink to={{
                                pathname: "/user/" + this.props.author
                            }}>
                                <Icon type="user" key="book" />
                            </NavLink>
                        </button>
                    </Popover>,
                    this.deletePromptButton()
                ]}
            >
                <Meta
                    avatar={
                        <NavLink to={{
                            pathname: "/user/" + this.props.author
                        }}> 
                            <Popover content={this.props.author} title="">
                                {this.state.photoURL !== null ?
                                    <Avatar src={this.state.photoURL}/>:
                                    <Avatar style={{ background: '#111717', color: '#171F22' }} icon="user" />
                            }
                            </Popover>
                        </NavLink>
                    }
                    title = {
                        <span id="title-container">
                            <span id="card-title">{this.props.title}</span>
                            <Tag style={{
                                background: 'none',
                                border: '1px solid rgb(135, 232, 222, 0.5)',
                                color: '#87e8de'
                            }}>Prompt</Tag>
                            {this.getTime()}
                        </span>
                    }
                    description =  { 
                        <div>
                            <small>{ this.props.genre }</small>
                            <br></br><br></br>
                            <span id="card-content">{ this.props.content }</span>
                            <br></br>
                        </div>
                    }
                />
            </Card>

        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        posts: state.firestore.ordered.posts,
        auth: state.firebase.auth
    }
}


export default connect(mapStateToProps)(Prompt);