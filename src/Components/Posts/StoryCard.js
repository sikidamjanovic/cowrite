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
            userLiked: false,
            userSaved: false,
            photoURL: null
        }
        this.like = this.like.bind(this)
        this.save = this.save.bind(this)
        this.userLiked = this.userLiked.bind(this)
        this.userSaved = this.userSaved.bind(this)
        this.getAvatar = this.getAvatar.bind(this)
    }

    componentDidMount(){
        this.setState({
            amountOfLikes: this.props.likes.length
        })
        this.userLiked()
        this.userSaved()
        this.getAvatar()
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
                message.success('Story liked!')
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

    save(){
        if (this.props.auth.isEmpty === false) {
            if(this.state.userSaved === false){
                this.setState({
                    userSaved: true
                })
                getFirestore().collection('stories').doc(this.props.id).update({
                    saves: firebase.firestore.FieldValue.arrayUnion(
                        {
                            uid: this.props.auth.uid
                        }
                    )
                })
                getFirestore().collection('users').doc(this.props.auth.displayName).collection('saved').doc().set({
                    type: 'story',
                    postId: this.props.id,
                    author: this.props.author,
                    content: this.props.content,
                    genre: this.props.genre,
                    title: this.props.title,
                    time: this.props.time,
                    likes: this.props.likes,
                    likeCount: this.props.likes.length,
                    saves: this.props.saves
                })
                message.success('Story saved!')
            }else{
                this.setState({
                    userSaved: false
                })
                // Delete user from posts 'likes' collection
                getFirestore().collection('stories').doc(this.props.id).update({
                    saves: firebase.firestore.FieldValue.arrayRemove(
                        {
                            uid: this.props.auth.uid
                        }
                    )
                })
                // Delete post from users 'liked' collection
                var delete_query = getFirestore().collection('users').doc(this.props.auth.displayName).collection('saved').where('postId','==',this.props.id)
                delete_query.get().then(function(querySnapshot){
                    querySnapshot.forEach(function(doc){
                        doc.ref.delete();
                    })
                })
            }
        }else{
            message.warning('Please login or sign up to save stories.')
        } 
    }

    userSaved(){
        const saves = this.props.saves
        for (let i = 0; i < saves.length; i++) {
            if(saves[i].uid === this.props.auth.uid){
                this.setState({
                    userSaved: true
                })
            }else{
                this.setState({
                    userSaved: false
                })
            }
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

    renderSaveIcon(){
        if(this.state.userSaved){
            return(
                <Icon 
                    type="save"
                    theme="filled"
                    size="large"
                    key="save" 
                    style={{ color:'white' }}
                />
            )
        }else{
            return(
                <Icon 
                    type="save" 
                    key="save" 
                    style={{ color:'white' }}
                />
            )
        }
    }

    getAvatar(){
        var that = this
        getFirestore().collection('users').doc(this.props.author).get()
        .then(function(doc) {
            if (doc.exists) {
                if(doc.data().photoURL !== null){
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
                            <button id="cardActionBtn" onClick={this.like}>
                                {this.renderHeart()}
                                <span id="likes">
                                    {this.state.amountOfLikes}
                                </span>
                            </button>,
                            <button id="cardActionBtn" onClick={this.save}>
                                {this.renderSaveIcon()}
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
                                        {this.state.photoURL !== 'null' ?
                                            <Avatar src={this.state.photoURL}/>
                                        :
                                            <Avatar icon="user"/>
                                        }
                                    </Popover>
                                </span>
                            }
                            title = {
                                <span id="title-container">
                                    <span id="card-title">{this.props.title}</span>
                                    <Tag>S</Tag>
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