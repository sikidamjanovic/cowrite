import React, { Component } from 'react'
import { Row, Col, Steps } from 'antd'
import HelpModal from '../Common/HelpModal'

class StoriesFeedHeader extends Component {
    render() {
        var { Step } = Steps
        return (
            <Row type="flex" align="middle" id="feed-header-container">
                <Col md={24}>
                    <div id="feed-header-text">
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px'}}>
                            <h1 style={{ marginRight: '10px', marginBottom: 0}}>STORIES</h1>
                        </div>
                    </div>
                </Col> 
                <Col md={20}>
                    <Steps current={1} style={{ padding: 0 }}>
                        <Step style={{ opacity: 0.7 }} title="Prompt Process" description="Got enough likes." />
                        <Step title="Chapter Process" description="Post and rank chapter submissions. Top ranked is selected." />
                        <Step style={{ opacity: 0.7 }} title="Done" description="A story completed by users." />
                    </Steps>
                </Col>
            </Row>
        );
    }
}

export default StoriesFeedHeader;