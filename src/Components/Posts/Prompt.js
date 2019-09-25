import React, { Component, Fragment } from 'react';
import { Card, Icon, Avatar, Tag, Popover, Tooltip, message } from 'antd';
import '../../App.css'
import { connect } from 'react-redux'
import { getFirestore } from "redux-firestore";
import { firestore } from "firebase";

class Prompt extends Component {

    constructor(props){
        super(props)
        this.state = {
            likes: [],
            amountOfLikes: '',
            userLiked: false
        }
        this.like = this.like.bind(this)
        this.userLiked = this.userLiked.bind(this)
        this.getLikes = this.getLikes.bind(this)
    }

    componentDidMount(){
        this.getLikes()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.auth.uid !== this.props.auth.uid){
            this.getLikes()
        }
    }

    getTime(){
        var postedTime = this.props.time
        if(postedTime){
            const diff = this.differenceInHours(postedTime.toDate(), new Date())
            const tooltipTitle = "The time left until this prompt possibly becomes a story"
            if(diff > 12){
                return(
                    <Tooltip title={tooltipTitle}>
                        <Tag color="#006d75">{diff + 'h Left'}</Tag>
                    </Tooltip>
                )
            }else if(diff > 4){
                return(
                    <Tooltip title={tooltipTitle}>
                        <Tag color="#faad14">{diff + 'h Left'}</Tag>
                    </Tooltip>
                )
            }else{
                return(
                    <Tooltip title={tooltipTitle}>
                        <Tag color="#cf1322">{diff + 'h Left'}</Tag>
                    </Tooltip>
                )
            }
        }else{
            return <Tag>No Time</Tag>
        }
    }

    differenceInHours(postedTime, currentTime){
        return Math.round(48 - Math.abs(postedTime - currentTime) / 36e5)
    }

    getLikes(){
        getFirestore().collection('posts').doc(this.props.id).collection('likes').get()
        .then(querySnapshot => {
            const likes = []
            querySnapshot.forEach(function(doc){
                likes.push({
                    user: doc.data()    
                })
            })
            this.setState({
                likes: likes,
                amountOfLikes: likes.length
            })
            this.userLiked()
        })
        .catch(function(error){
            console.log('Error: ' + error)
        })
    }

    userLiked(){
        const likes = this.state.likes
        for (let i = 0; i < likes.length; i++) {
            if(likes[i].user.uid == this.props.auth.uid){
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
                getFirestore().collection('posts').doc(this.props.id).collection('likes').doc(this.props.auth.displayName).set({
                    uid: this.props.auth.uid,
                    postId: this.props.id
                })
                getFirestore().collection('users').doc(this.props.auth.displayName).collection('liked').doc().set({
                    type: 'prompt',
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
                getFirestore().collection('posts').doc(this.props.id).collection('likes').doc(this.props.auth.displayName).delete()
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
                    <button id="cardActionBtn">
                        <Icon type="user" key="user" />
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
                                <Avatar icon="user" />
                            </Popover>
                        </span>
                    }
                    title = {
                        <span id="title-container">
                            <span id="card-title">{this.props.title}</span>
                            <Tag>Prompt</Tag>
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