import React, { Component } from 'react'
import Particles from 'react-particles-js'
import { Button, Row, Col } from 'antd'
import HelpModal from '../Common/HelpModal'
import NewPostModal from '../Posts/NewPostModal'

class PromptsFeedHeader extends Component {
    render() {
        return (
            <Row type="flex" align="middle" id="feed-header-container">
                <Col md={10}>
                    <div id="feed-header-text">
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px'}}>
                            <h1 style={{ marginRight: '10px', marginBottom: 0}}>PROMPTS</h1>
                            <HelpModal/>
                        </div>
                        <h4>Story ideas created and voted on by users.</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row '}}>
                        {this.props.loggedIn ? 
                            <NewPostModal title="New Prompt" />   
                            :
                            ''
                        }
                    </div>
                </Col>
                <Col md={14} style={{height: '100%'}}>
                </Col>
            </Row>
        );
    }
}

export default PromptsFeedHeader;