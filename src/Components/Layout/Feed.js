import React, { Component } from 'react';
import Prompt from '../Posts/Prompt'
import { Row, Col } from 'antd';
import '../../App.css'

class Feed extends Component {

    getPrompts(){
        var posts = this.props.posts
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
                    <h3>Popular</h3>
                    {this.getPrompts()}
                </Row>
            </div>
        );
    }
}

export default Feed;