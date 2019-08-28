import React, { Component } from 'react';
import Prompt from '../Posts/Prompt'
import { Row, Col } from 'antd';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import '../../App.css'

class Feed extends Component {

    getPrompts(){
        const { posts, auth } = this.props;
        //if (!auth.uid) return <redirect to= '/signin'/> //Use for actions that the user cant complete unless they are signed in
        if(posts){
            return(
                posts.map((post,i) =>
                        <Col id="prompt">
                            <Prompt 
                                key={post.id} 
                                id={post.id} 
                                title={post.title} 
                                genre={post.genre}
                                content={post.content}
                                author={post.author}
                                time={post.time}
                            />
                        </Col> 
                )
            )
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <h3>Prompts - {this.props.query}</h3>
                    {this.getPrompts()}
                </Row>
            </div>
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
        const { query } = props
        return [
            {
                collection: 'posts',
                where: [
                    "genre", "==", query
                ]
            }
        ]
    })
    // firestoreConnect([{ 
    //     collection: 'posts',
    //     where: [
    //         'genre', '==', window.location.pathname.split("/").pop()
    //     ]}
    // ])
)(Feed)