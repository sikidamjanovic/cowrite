import React, { Component } from 'react'
import { Card, Icon, Avatar, Tag, Popover, Tooltip, message } from 'antd';
import { Link } from 'react-router-dom'
import { getFirestore } from "redux-firestore";
import CopyToClipboard from 'react-copy-to-clipboard'
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
                    likes: this.props.likes,
                    saves: this.props.saves,
                    createdAt: this.props.createdAt
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
                    style={{ color:'#ff7a45' }}
                />
            )
        }else{
            return(
                <Icon 
                    type="heart" 
                    key="heart" 
                    style={{ color:'rgba(255,255,255,0.5)' }}
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
                    style={{ color:'rgba(255,255,255,0.5)' }}
                />
            )
        }else{
            return(
                <Icon 
                    type="save" 
                    key="save" 
                    style={{ color:'rgba(255,255,255,0.5)' }}
                />
            )
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

    getTimeLeft(){
        var currentChapter = this.props.currentChapter
        var currentTime = new Date() 
        var diffHours = String

        if(currentChapter === 1){
            diffHours = Math.abs(currentTime - this.props.createdAt.toDate()) / 36e5
        }else if(currentChapter === 2){
            diffHours = Math.abs(currentTime - this.props.chapter2.toDate()) / 36e5
        }else if(currentChapter === 3){
            diffHours = Math.abs(currentTime - this.props.chapter3.toDate()) / 36e5
        }else if(currentChapter === 4){
            currentChapter += 5
            diffHours = Math.abs(currentTime - this.props.chapter4.toDate()) / 36e5
        }

        var hoursLeft = 48 - diffHours
        var minutesLeft = hoursLeft * 60

        if(hoursLeft > 1){
            return(
                <Tooltip title="Hours left until chapter selection">
                    <Tag style={{
                        background: 'none',
                        border: '1px solid rgb(255,255,255,0.15)',
                        color: 'rgb(255,255,255,0.6)'
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center'}}>
                            <Icon style={{ marginRight: '4px' }}type="clock-circle" />
                            {Math.round(hoursLeft) + 'h'}
                        </span>
                    </Tag>
                </Tooltip>
            )
        }else if(hoursLeft > 0) {
            return(
                <Tooltip title="Minutes left until chapter selection">
                    <Tag style={{
                        background: 'none',
                        border: '1px solid rgb(255,255,255,0.15)',
                        color: 'rgb(255,255,255,0.6)'
                    }}>
                        {Math.round(minutesLeft) + ' min'}
                    </Tag>
                </Tooltip>
            )
        }
    }

    render() {
        const { Meta } = Card;
        return (
                    <Card
                        actions={[     
                            
                            <Tooltip title="Like story">
                                <button id="cardActionBtn" onClick={this.like}>
                                    {this.renderHeart()}
                                    <span id="likes">
                                        {this.state.amountOfLikes}
                                    </span>
                                </button>
                            </Tooltip>,

                            <Tooltip title="Share story">
                                <CopyToClipboard text={'cowrite.io/story/' + this.props.id}
                                    onCopy={() => message.success('Link copied to clipboard')}
                                >
                                    <button id="cardActionBtn">
                                        <Icon type="share-alt"/>
                                    </button>
                                </CopyToClipboard>
                            </Tooltip>,

                            <Tooltip title={this.props.author}>
                                <button id="cardActionBtn">
                                    <Icon type="user"/>
                                </button>
                            </Tooltip>,

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
                                auth: this.props.auth,
                                yposition: this.props.yposition,
                                query: this.props.query
                            } 
                        }}>
                        <Meta
                            avatar={
                                <span>
                                    <Popover content={this.props.author} title="">
                                        {this.state.photoURL !== null ?
                                            <Avatar src={this.state.photoURL}/> :
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
                                        border: '1px solid rgb(255,255,255,0.15)',
                                        color: 'rgb(255,255,255,0.6)',
                                        display: 'flex'
                                    }}>
                                        {this.props.currentChapter !== 4 ?
                                            <Tooltip title="Current chapter">
                                                <span style={{ display: 'flex', alignItems: 'center'}}>
                                                    <Icon type="book" style={{ marginRight: '4px' }}/>
                                                    {this.props.currentChapter +  '/4'}
                                                </span>
                                            </Tooltip> :
                                            'FINAL CHAPTER'
                                        }
                                    </Tag>

                                    {this.getTimeLeft()}
                                </span>
                            }
                            description =  { 
                                <div>
                                    
                                    <small>
                                        {this.props.genre}
                                    </small>
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
