import React, { Component } from 'react';
import Prompt from '../Posts/Prompt'
import { Row, Col, Menu, Dropdown, Button, Breadcrumb, Icon } from 'antd';
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
                                time={post.createdAt}
                            />
                        </Col> 
                )
            )
        }
    }

    render() {

        const menu = (
            <Menu>
                <Menu.Item>
                    <Icon type="arrow-up"/>
                    Top
                </Menu.Item>
                <Menu.Item>
                    <Icon type="fire"/>
                    Hot
                </Menu.Item>
                <Menu.Item>
                    <Icon type="bulb"/>
                    New
                </Menu.Item>
            </Menu>
        )

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
                            <Dropdown overlay={menu} trigger={['click']} id="feed-sort-dropdown">
                                <Button>Sort</Button>
                            </Dropdown>
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