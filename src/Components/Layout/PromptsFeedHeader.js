import React, { Component } from 'react'
import { Row, Col } from 'antd'
import HelpModal from '../Common/HelpModal'
import SignInModal from '../Auth/SignInModal'
import SignUpModal from '../Auth/SignUpModal'
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
                        <h4 style={{ opacity: 0.8, marginTop: '14px' }}>Story ideas created and voted on by users.</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row '}}>
                        {this.props.loggedIn ? 
                            <NewPostModal title="New Prompt" />   
                            :
                            <div style={{ display: 'flex', flexDirection: 'row'}}>
                                <span style={{ marginRight: '14px' }}><SignInModal/></span>
                                <SignUpModal/>
                            </div>
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