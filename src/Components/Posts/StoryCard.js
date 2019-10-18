import React, { Component } from 'react'
import { Card, Icon, Avatar, Tag, Popover, Tooltip, message } from 'antd';
import { Link } from 'react-router-dom'
import { getFirestore } from "redux-firestore";
import '../../App.css'
var firebase = require('firebase');

class StoryCard extends Component {

    constructor(props){
        super(props)
        this.state = {
            likes: [],
            amountOfLikes: 0,
            userLiked: false
        }
        this.like = this.like.bind(this)
        this.userLiked = this.userLiked.bind(this)
    }

    componentDidMount(){
        this.setState({
            amountOfLikes: this.props.likes.length
        })
        this.userLiked()
    }

    like(){
        if (this.props.auth.isEmpty === false) {
            if(this.state.userLiked == false){
                this.setState({
                    userLiked: true,
                    amountOfLikes: this.state.amountOfLikes + 1
                })
                getFirestore().collection('stories').doc(this.props.id).update({
                    likes: firebase.firestore.FieldValue.arrayUnion(
                        {
                            uid: this.props.auth.uid
                        }
                    ),
                    likeCount: firebase.firestore.FieldValue.increment(1)
                })
                getFirestore().collection('users').doc(this.props.auth.displayName).collection('liked').doc().set({
                    type: 'story',
                    postId: this.props.id,
                    author: this.props.author,
                    content: this.props.content,
                    genre: this.props.genre,
                    title: this.props.title,
                    time: this.props.time
                })
            }else{
                this.setState({
                    userLiked: false,
                    amountOfLikes: this.state.amountOfLikes - 1
                })
                // Delete user from posts 'likes' collection
                getFirestore().collection('stories').doc(this.props.id).update({
                    likes: firebase.firestore.FieldValue.arrayRemove(
                        {
                            uid: this.props.auth.uid
                        }
                    ),
                    likeCount: firebase.firestore.FieldValue.increment(-1)
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

    userLiked(){
        const likes = this.props.likes
        for (let i = 0; i < likes.length; i++) {
            if(likes[i].uid === this.props.auth.uid){
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

    render() {
        const { Meta } = Card;
        return (
                    <Card
                        actions={[        
                            <button id="cardActionBtn" onClick={this.like}>
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
                        hoverable={true}
                    >
                        <Link to={{ pathname: '/story/' + this.props.id, 
                            state: { 
                                id: this.props.id,
                                auth: this.props.auth
                            } 
                        }}>
                        <Meta
                            avatar={
                                <span>
                                    <Popover content={this.props.author} title="">
                                        <Avatar icon="user" />
                                    </Popover>
                                </span>
                            }
                            title = {
                                <span id="title-container">
                                    <span id="card-title">{this.props.title}</span>
                                    <Tag>Story</Tag>
                                    <Tag>{this.props.currentChapter}/4 Chapters</Tag>
                                    <Tag color="#006d75">24h Left</Tag>
                                </span>
                            }
                            description =  { 
                                <div>
                                    <small>{this.props.genre}</small>
                                    <br></br><br></br>
                                    <span id="card-content">{this.props.content}</span>
                                    <br></br>
                                </div>
                            }
                        />
                        </Link>
                    </Card>
            )
    }
}

export default StoryCard;