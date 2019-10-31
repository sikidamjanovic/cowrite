import React, { Component } from 'react';
import { Card, Icon, Avatar, Tag, Popover, Tooltip, message } from 'antd';
import '../../App.css'
import { connect } from 'react-redux'
import { getFirestore } from "redux-firestore";
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
            const tooltipTitle = "The time left until this prompt possibly becomes a story"

            if(hoursLeft > 12){
                return(
                    <Tooltip title={tooltipTitle}>
                        <Tag style={{
                            background: 'none',
                            border: '1px solid rgb(135, 232, 222, 0.5)',
                            color: '#87e8de'
                        }}>
                            {Math.round(hoursLeft) + 'h Left'}
                        </Tag>
                    </Tooltip>
                )
            }else if(hoursLeft > 4){
                return(
                    <Tooltip title={tooltipTitle}>
                        <Tag style={{
                            background: 'none',
                            border: '1px solid rgb(135, 232, 222, 0.5)',
                            color: '#87e8de'
                        }}>
                            {Math.round(hoursLeft) + 'h Left'}
                        </Tag>
                    </Tooltip>
                )
            }else if(hoursLeft > 1){
                return(
                    <Tooltip title={tooltipTitle}>
                        <Tag style={{
                            background: 'none',
                            border: '1px solid rgb(135, 232, 222, 0.5)',
                            color: '#87e8de'
                        }}>
                            {Math.round(hoursLeft) + 'h Left'}
                        </Tag>
                    </Tooltip>
                )
            }else if(hoursLeft > 0) {
                return(
                    <Tooltip title={tooltipTitle}>
                        <Tag color="#cf1322">{60 - Math.round(minutesLeft) + 'min Left'}</Tag>
                    </Tooltip>
                )
            }else if(minutesLeft <= 0){
                //Delete prompt after time runs out
                getFirestore().collection('posts').doc(this.props.id).delete()
            }
        }
    }

    userLiked(){
        const likes = this.props.likes
        for (let i = 0; i < likes.length; i++) {
            if(likes[i].uid == this.props.uid){
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
                <Icon 
                    type="heart"
                    theme="filled"
                    size="large"
                    key="heart" 
                    style={{ color:'#cf1322' }}
                />
            )
        }else{
            return(
                <Icon 
                    type="heart" 
                    key="heart" 
                    style={{ color:'white' }}
                />
            )
        }
    }

    like(){
        if (this.props.auth.isEmpty === false) {
            if(this.state.userLiked == false){
                this.setState({
                    userLiked: true,
                    amountOfLikes: this.state.amountOfLikes + 1
                })
                getFirestore().collection('posts').doc(this.props.id).update({
                    likes: firebase.firestore.FieldValue.arrayUnion(
                        {
                            uid: this.props.auth.uid
                        }
                    )
                })
                getFirestore().collection('users').doc(this.props.auth.displayName).collection('liked').doc().set({
                    type: 'prompt',
                    postId: this.props.id,
                    author: this.props.author,
                    content: this.props.content,
                    genre: this.props.genre,
                    title: this.props.title,
                    time: this.props.time,
                    likes: this.props.likes,
                    likeCount: this.state.amountOfLikes
                })
            }else{
                this.setState({
                    userLiked: false,
                    amountOfLikes: this.state.amountOfLikes - 1
                })
                // Delete user from posts 'likes' collection
                getFirestore().collection('posts').doc(this.props.id).update({
                    likes: firebase.firestore.FieldValue.arrayRemove(
                        {
                            uid: this.props.auth.uid
                        }
                    )
                })
                // Delete post from users 'liked' collection
                var delete_query = getFirestore().collection('users').doc(this.props.auth.displayName).collection('liked').where('postId','==',this.props.id)
                delete_query.get().then(function(querySnapshot){
                    querySnapshot.forEach(function(doc){
                        doc.ref.delete();
                    })
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

    render() { 
        const { Meta } = Card;
        return (
            <Card
                actions={[
                    <button id="cardActionBtn" onClick= {this.like}>
                        {this.renderHeart()}
                        <span id="likes">
                            {this.state.amountOfLikes}
                        </span>
                    </button>,
                    <button id="cardActionBtn">
                        <Icon type="book" key="book" />
                    </button>,
                    <Tooltip title="Report this prompt">
                        <button id="cardActionBtn">
                            <Icon type="warning" key="warning" />
                        </button>
                    </Tooltip>
                ]}
            >
                <Meta
                    avatar={
                        <span>
                            <Popover content={this.props.author} title="">
                                {this.state.photoURL !== null ?
                                    <Avatar src={this.state.photoURL}/>:
                                    <Avatar style={{ background: '#111717', color: '#171F22' }} icon="user" />
                            }
                            </Popover>
                        </span>
                    }
                    title = {
                        <span id="title-container">
                            <span id="card-title">{this.props.title}</span>
                            <Tag style={{
                                background: 'none',
                                border: '1px solid #bae7ff',
                                color: '#bae7ff'
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