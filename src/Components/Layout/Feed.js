import React, { Component } from 'react';
import Prompt from '../Posts/Prompt'
import { Row, Col, Select, Breadcrumb, Icon } from 'antd';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import '../../App.css'

class Feed extends Component {

    // state = {
    //     loading: true
    // }

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
                                time={post.createdAt}
                            />
                        </Col> 
                )
            )
        }
    }

    render() {
        const { Option } = Select;
        return (
            <div>
                <Row>
                    <div id="feed-header">
                        <div id="breadcrumb-container">
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    Prompts
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {this.props.query}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <Select defaultValue="Sort" style={{ width: 100 }}>
                                <Option value="Hot">
                                    <Icon type="fire"/>
                                    Hot
                                </Option>
                                <Option value="Top">
                                    <Icon type="arrow-up"/>
                                    Top
                                </Option>
                                <Option value="New">
                                    <Icon type="bulb"/>
                                    New
                                </Option>
                            </Select>
                        </div>
                    </div>
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
)(Feed)