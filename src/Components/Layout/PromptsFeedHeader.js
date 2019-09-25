import React, { Component } from 'react'
import Particles from 'react-particles-js'
import { Button, Row, Col } from 'antd'

class PromptsFeedHeader extends Component {
    render() {
        return (
            <Row type="flex" align="middle" id="feed-header-container">
                <Col md={10}>
                    <div id="feed-header-text">
                        <h1>PROMPTS</h1>
                        <h4>Story ideas created and voted on by users.</h4>
                    </div>
                    <div>
                        <Button id="feed-header-button" type="primary">Post a Prompt</Button>
                        <Button id="feed-header-button" type="primary">?</Button>
                    </div>
                </Col>
                <Col md={14} style={{height: '100%'}}>
                    {/* <Row style={{height: '100%'}}>
                        <Col md={8} className="feed-header-top-posts">
                            Top 1
                        </Col>
                        <Col md={8} className="feed-header-top-posts">
                            Top 2
                        </Col>
                        <Col md={8} className="feed-header-top-posts">
                            Top 3
                        </Col>
                    </Row> */}
                </Col>
            </Row>
        );
    }
}

export default PromptsFeedHeader;