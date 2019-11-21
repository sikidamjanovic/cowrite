import React, { Component } from 'react'
import { Card, Icon, Avatar, Tag, Popover, Tooltip, message } from 'antd';
import { Link } from 'react-router-dom'
import { getFirestore } from "redux-firestore";
import CopyToClipboard from 'react-copy-to-clipboard'
import { NavLink } from 'react-router-dom'
import ReportModal from '../Posts/ReportModal'
import '../../App.css'
var firebase = require('firebase');

class StoryCard extends Component {

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
            amountOfLikes: this.props.likes.length
        })
        this.userLiked()
        this.getAvatar()
    }

    like(){
        if (this.props.auth.isEmpty === false) {
            if(this.state.userLiked === false){
                this.setState({
                    userLiked: true,
                    amountOfLikes: this.state.amountOfLikes + 1
                })
                getFirestore().collection('stories').doc(this.props.id).update({
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
                getFirestore().collection('stories').doc(this.props.id).update({
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

    userLiked(){
        const likes = this.props.likes
        for (let i = 0; i < likes.length; i++) {
            if(likes[i] === this.props.auth.displayName){
                this.setState({
                    userLiked: true
                })
                break
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
        var current = this.props.currentChapter
        var created = this.props.createdAt.toDate()
        var diffMins
        var now = new Date()
        var chapter2 = new Date(created.getTime() + 2880*60000);
        var chapter3 = new Date(chapter2.getTime() + 2880*60000);
        var chapter4 = new Date(chapter3.getTime() + 2880*60000);
        var final = new Date(chapter4.getTime() + 2880*60000);

        switch(current) {
            case 1:
                diffMins = (chapter2 - now) / 60000;
                break;
            case 2:
                diffMins = (chapter3 - now) / 60000;
                break;
            case 3:
                diffMins = (chapter4 - now) / 60000;
                break;
            case 4:
                diffMins = (final - now) / 60000;
                break;    
            default:
                break;
        }

        if(diffMins > 60){
            return(
                <Tooltip title="Hours left until chapter selection">
                    <Tag style={{
                        background: 'none',
                        border: '1px solid rgb(135, 232, 222, 0.5)',
                        color: '#87e8de'
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center'}}>
                            <Icon style={{ marginRight: '4px' }}type="clock-circle" />
                            {Math.round(diffMins / 60) + 'h '}
                        </span>
                    </Tag>
                </Tooltip>
            )
        }else if(diffMins > 0) {
            return(
                <Tooltip title="Minutes left until chapter selection">
                    <Tag style={{
                        background: 'none',
                        border: '1px solid rgb(135, 232, 222, 0.5)',
                        color: '#87e8de'
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center'}}>
                            <Icon style={{ marginRight: '4px' }}type="clock-circle" />
                            {Math.round(diffMins) + ' min'}
                        </span>
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
                                <span className="heart-hover">
                                    {this.renderHeart()}
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
                            <ReportModal 
                                title={this.props.title} 
                                type="story"
                                id={this.props.id}
                                component="card"
                            />
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
                            <NavLink to={{
                                pathname: "/user/" + this.props.author
                            }}> 
                                <Popover content={this.props.author} title="">
                                    {this.state.photoURL !== null ?
                                        <Avatar src={this.state.photoURL}/> :
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
                                }}>
                                    {this.props.complete ? 
                                        'COMPLETE'
                                    :
                                        this.props.currentChapter !== this.props.numberOfChapters ?
                                            <Tooltip title="Current chapter">
                                                <span style={{ display: 'flex', alignItems: 'center'}}>
                                                    <Icon type="book" style={{ marginRight: '4px' }}/>
                                                    {this.props.currentChapter +  '/' + this.props.numberOfChapters}
                                                </span>
                                            </Tooltip> 
                                        :
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
