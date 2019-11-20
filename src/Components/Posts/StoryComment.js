import React, { Component } from 'react'
import { Comment, Tooltip, Icon, Avatar, message, Popover, Popconfirm, Row } from 'antd'
import { getFirestore } from "redux-firestore";
var firebase = require('firebase');

class StoryComment extends Component {

    constructor(props){
        super(props);
        this.state = {
            amountOfLikes : 0,
            userLiked: false,
            expanded: false
        }
        this.like = this.like.bind(this)
        this.userLiked = this.userLiked.bind(this)
        this.deleteSubmission = this.deleteSubmission.bind(this)
        this.expandComment = this.expandComment.bind(this)
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
        this.getAvatar()
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

    renderHeart(){
        if(this.state.userLiked){
            return(
                <Icon 
                    type="heart"
                    theme="filled"
                    key="heart" 
                    style={{ color:'#ff7a45', fontSize: '20px' }}
                />
            )
        }else{
            return(
                <Icon 
                    type="heart" 
                    key="heart" 
                    style={{ color:'rgba(255,255,255,0.3)', fontSize: '20px' }}
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

    deleteSubmission(){
        getFirestore().collection('stories').doc(this.props.postId).collection('submissions').doc(this.props.id).delete()
        .then(function() {
            message.success('Your submission has been deleted.')
        }).catch(function(error) {
            message.error(error)
        });
    }

    isOwnSubmission(){
        var currentUser = this.props.auth.displayName
        if(currentUser === this.props.author){
            return(
                <Popconfirm
                    title="Are you sure you want to delete your submission?"
                    onConfirm={this.deleteSubmission}
                    okText="Yes"
                    cancelText="No"
                >
                    delete
                </Popconfirm>
            )
        }
    }

    expandComment(){
        this.setState({
            expanded: !this.state.expanded
        })
    }

    expandStyle(){
        if(this.state.expanded){
            return({
                height: 'auto',
            })
        }else{
            return({
                maxHeight: '6.3em',
                overflow: 'hidden',
            })
        }
    }

    render() {  
        const actions = [
            this.isOwnSubmission()
        ]
        return (
            <div className="comment-hover">
                <Comment
                    author={<a>{this.props.author}</a>}
                    actions={actions}
                    avatar={
                        <div style={{ height: '100%' }}>
                            <Row style={{ display: 'flex', flexDirection: 'column' }}>
                                <Popover content={this.props.author} title="">
                                    {this.state.photoURL !== null ?
                                        <Avatar src={this.state.photoURL}/> :
                                        <Avatar style={{ background: '#111717', color: '#171F22' }} icon="user" />
                                }
                                </Popover>
                            </Row>
                            <Row 
                                style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center',
                                    marginTop: '14px'
                                }}
                            >
                                <div onClick={this.like} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Tooltip title="Like">
                                        {this.renderHeart()}
                                    </Tooltip>
                                </div>
                                <div>
                                    <small style={{ color: 'rgba(255,255,255,0.6)' }}>
                                        {this.state.amountOfLikes}
                                    </small>
                                </div>
                            </Row>
                        </div>
                    }
                    content={
                        <div>
                            <div onClick={this.expandComment} style={this.expandStyle()} className="comment-text-hover">
                                {this.props.comment}
                            </div>
                            <div>
                                {this.state.expanded ? 
                                    null :
                                    <p>...</p>
                                }
                            </div>
                        </div>
                    }
                    datetime={this.getTime()}
                />
            </div>
        )
    }
}

export default StoryComment;