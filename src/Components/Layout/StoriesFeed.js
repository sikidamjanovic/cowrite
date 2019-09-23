import React, { Component } from 'react'
import { Row, Col, Breadcrumb, Select } from 'antd'
import StoryCard from '../Posts/StoryCard'
import '../../App.css'

class StoriesFeed extends Component {

    getStories(){
        return(
            <Col id="prompt">
                <StoryCard/>
            </Col>
        )
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
                            <Select defaultValue="createdAt" style={{ width: 100 }} onChange={this.handleSort}>
                                <Option value="createdAt">
                                    New
                                </Option>
                                <Option value="Hot">
                                    Hot
                                </Option>
                                <Option value="author">
                                    Author
                                </Option>
                            </Select>
                        </div>
                    </div>
                    {this.getStories()}
                </Row>
            </div>
        );
    }
}

export default StoriesFeed;