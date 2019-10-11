import React, { Component } from 'react'
import { Comment, Tooltip, Icon, Avatar, message } from 'antd'
import { getFirestore } from "redux-firestore";
var firebase = require('firebase');

class StoryComment extends Component {

    constructor(props){
        super(props);
        this.state = {
            amountOfLikes : 0,
            userLiked: false
        }
        this.like = this.like.bind(this)
        this.userLiked = this.userLiked.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.id !== this.props.id){
            this.setState({
                amountOfLikes : 0,
                userLiked: false
            })
            this.getLikeAmount()
            this.userLiked()    
        }
    }

    componentDidMount(){
        this.getLikeAmount()
        this.userLiked()
    }

    getTime(){
        var postedTime = this.props.time
        var currentTime = new Date()
        var diff = currentTime - postedTime
        var hours = diff / 1000 / 60 / 60

        if(hours >= 24){
            return(Math.round(hours / 24) + ' days ago')
        }
        else if(hours < 1){
            if(hours < 0.016){
                return 'now'
            }else{
                return Math.round(diff / 1000 / 60) + ' minutes ago'
            }
        }else{
            return Math.round(hours) + ' hours ago'
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

    renderThumb(){
        if(this.state.userLiked){
            return(
                <Icon 
                    type="heart"
                    theme="filled"
                    size="large"
                    key="heart" 
                    style={{ color:'#fa541c' }}
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

    getLikeAmount(){
        this.setState({
            amountOfLikes: this.props.likeCount
        })
    }

    like(){
        if (this.props.uid) {
            if(this.state.userLiked == false){
                this.setState({
                    userLiked: true,
                    amountOfLikes: this.state.amountOfLikes + 1
                })
                getFirestore().collection('stories').doc(this.props.postId).collection('submissions').doc(this.props.id)
                .update({
                    likes: firebase.firestore.FieldValue.arrayUnion(
                        {
                            uid: this.props.uid
                        }
                    ),
                    likeCount: firebase.firestore.FieldValue.increment(1)
                })
                message.success('Comment Liked!')
            }else{
                this.setState({
                    userLiked: false,
                    amountOfLikes: this.state.amountOfLikes - 1
                })
                getFirestore().collection('stories').doc(this.props.postId).collection('submissions').doc(this.props.id)
                .update({
                    likes: firebase.firestore.FieldValue.arrayRemove(
                        {
                            uid: this.props.uid
                        }
                    ),
                    likeCount: firebase.firestore.FieldValue.increment(-1)
                })
            }
        }else{
            message.error('Please Login To Like Submissions')
        }

    }

    render() {  
        const actions = [
            <span onClick={this.like} key="comment-basic-like">
                <Tooltip title="Like">
                    {this.renderThumb()}
                    <span style={{ marginLeft: '5px' }}>
                        {this.state.amountOfLikes}
                    </span>
                </Tooltip>
                {/* <span style={{ paddingLeft: 8, cursor: 'auto' }}>{this.props.likes.length}</span> */}
            </span>
        ]
        return (
            <Comment
                author={<a>{this.props.author}</a>}
                actions={actions}
                avatar={
                    <Avatar icon="user" />
                }
                content={
                <p>
                    {this.props.comment}
                </p>
                }
                datetime={
                    this.getTime()
                }
            />
        )
    }
}

export default StoryComment;