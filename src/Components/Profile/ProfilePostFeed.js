import React, { Component } from 'react'
import Prompt from '../Posts/Prompt'
import StoryCard from '../Posts/StoryCard'
import { Col, Row, Spin } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class ProfilePostFeed extends Component {

    constructor(props){
        super(props)
        this.state={
            loaded: false
        }
    }

    componentDidMount(){
        if(!this.props.posts){
            this.setState({
                loaded: false
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.posts !== this.props.posts){
            this.setState({
                loaded: true
            })
        }
    }

    getPosts(){
        const { posts } = this.props;
        if(this.state.loaded){
            if(this.props.posts.length > 0){
                return(
                    posts.map((post,i) =>
                            <Col id="prompt">
                                {post.type === "story" ?
                                    <StoryCard 
                                        auth={this.props.auth}
                                        key={post.id} 
                                        id={post.id} 
                                        createdAt={post.createdAt}
                                        title={post.title} 
                                        genre={post.genre}
                                        content={post.prompt}
                                        author={post.author}
                                        authorPic={post.authorPic ? post.authorPic : null}
                                        time={post.createdAt}
                                        likes={post.likes}
                                        amountOfLikes={post.likes.length}
                                    />
                                :
                                    <Prompt
                                        key={post.id} 
                                        id={post.id} 
                                        title={post.title} 
                                        genre={post.genre}
                                        content={post.content}
                                        author={post.author}
                                        authorPic={post.authorPic ? post.authorPic : null}
                                        time={post.createdAt}
                                        likes={post.likes}
                                        amountOfLikes={post.likes.length}
                                    />
                                }
                            </Col> 
                    )
                )
            }
        }else{
            return(
                <div style={{ display: 'flex', marginTop: '100px', justifyContent: 'center'}}>
                    <Spin size='large'/>
                </div>
            )
        }
    }


    render() {
        return (
            <Row>
                {this.getPosts()}
            </Row>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        posts: state.firestore.ordered.posts,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect( props => {
        const {auth, type} = props
        console.log(type)
        if(type === "yourPrompts"){
            return [{ 
                collection: 'posts',
                where: ['author', '==', auth.displayName],
                storeAs: 'posts'
            }]
        }else if(type === "yourStories"){
            return [{ 
                collection: 'stories',
                where: ['author', '==', auth.displayName],
                storeAs: 'posts'
            }]
        }else if(type === "likedPrompts"){
            return [{
                collection: 'posts',
                where: ['likes', 'array-contains', auth.displayName],
                storeAs: 'posts'
            }]
        }
        else if(type === "likedStories"){
        return [{
            collection: 'stories',
            where: ['likes', 'array-contains', auth.displayName],
            storeAs: 'posts'
        }]
    }
    })
)(ProfilePostFeed)