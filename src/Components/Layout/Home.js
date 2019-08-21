import React, { Component } from 'react';
import Feed from '../Layout/Feed'
import { connect } from 'react-redux'
import Sidebar from '../Layout/Sidebar'
import { Row, Col } from 'antd';
import '../../App.css'

class Home extends Component {
    render() {
        console.log(this.props.posts)
        return (
            <div id="home">
                <Row>
                    <Col xs={12} md={4}>
                        <Sidebar/>
                    </Col>
                    <Col xs={12} sm={18} offset={1}  id="feed-container">
                        <Feed posts = {this.props.posts}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.post.posts
    }
}

export default connect(mapStateToProps)(Home)