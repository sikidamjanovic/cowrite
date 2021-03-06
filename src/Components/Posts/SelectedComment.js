import React, { Component } from 'react'
import { Comment, Avatar, Tooltip, Row, message } from 'antd'
import { getFirestore } from "redux-firestore";
import { NavLink } from 'react-router-dom'

class SelectedComments extends Component {

    constructor(props){
        super(props);
        this.state = {
            amountOfLikes : 0
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.id !== this.props.id){
            this.setState({
                amountOfLikes : 0,
                userLiked: false
            })
            this.getLikeAmount()
        }
    }

    componentDidMount(){
        this.getLikeAmount()
        this.getAvatar()
    }

    getLikeAmount(){
        this.setState({
            amountOfLikes: this.props.likes.length
        })
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
                message.error("No such document!");
            }
        }).catch(function(error) {
            message.error("Error getting document:", error);
        });
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

    render() { 
        return (
            <div className="comment-hover" style={{ marginTop: '24px', paddingRight: '24px'}}>
                <Comment
                    author={
                        <NavLink to={{
                            pathname: "/user/" + this.props.author
                        }}>
                            {this.props.author}
                        </NavLink>
                    }
                    avatar={
                        <div style={{ height: '100%' }}>
                            <Row style={{ display: 'flex', flexDirection: 'column' }}>
                                <Tooltip title={this.props.author}>
                                    {this.state.photoURL !== null ?
                                        <Avatar src={this.state.photoURL}/> :
                                        <Avatar style={{ background: '#111717', color: '#171F22' }} icon="user" />
                                }
                                </Tooltip>
                            </Row>
                        </div>
                    }
                    content={
                        <div>
                            <div className="comment-text-hover">
                                <p>{this.props.comment}</p>
                            </div>
                        </div>
                    }
                    datetime={this.getTime()}
                />
            </div>
        )
    }
}

export default SelectedComments;