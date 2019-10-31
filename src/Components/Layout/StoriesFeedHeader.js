import React, { Component } from 'react'
import { Row, Col } from 'antd'
import HelpModal from '../Common/HelpModal'

class StoriesFeedHeader extends Component {
    render() {
        return (
            <Row type="flex" align="middle" id="feed-header-container">
                <Col md={10}>
                    <div id="feed-header-text">
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px'}}>
                            <h1 style={{ marginRight: '10px', marginBottom: 0}}>STORIES</h1>
                            <HelpModal/>
                        </div>
                        <h4>
                            Tales divided into 4 chapters that users publish and rank. 
                            <br></br>
                            Click on a story to read submissions.</h4>
                    </div>
                </Col>
                <Col md={14} style={{height: '100%'}}>
                </Col>
            </Row>
        );
    }
}

export default StoriesFeedHeader;