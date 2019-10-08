import React, { Component } from 'react'
import { Card, Icon, Avatar, Tag, Popover, Tooltip } from 'antd';
import { Link } from 'react-router-dom'
import '../../App.css'

class StoryCard extends Component {
    render() {
        const { Meta } = Card;
        return (
            <Link to={{ pathname: '/story/' + this.props.id, 
                        state: { 
                            id: this.props.id,
                            uid: this.props.uid
                        } 
                    }}>
                <div>
                    <Card
                        actions={[                        
                            <button id="cardActionBtn">
                                <Icon type="plus" key="plus"/>
                                Follow
                            </button>,
                            <button id="cardActionBtn">
                                <Icon type="heart" key="heart" />
                            </button>,
                            <button id="cardActionBtn">
                                <Icon type="book" key="book" />
                            </button>,
                            <button id="cardActionBtn">
                                <Icon type="user" key="user" />
                            </button>,
                            <Tooltip title="Report this prompt">
                                <button id="cardActionBtn">
                                    <Icon type="warning" key="warning" />
                                </button>
                            </Tooltip>
                            ]}
                        hoverable={true}
                    >
                        <Meta
                            avatar={
                                <span>
                                    <Popover content={this.props.author} title="">
                                        <Avatar icon="user" />
                                    </Popover>
                                </span>
                            }
                            title = {
                                <span id="title-container">
                                    <span id="card-title">{this.props.title}</span>
                                    <Tag>Story</Tag>
                                    <Tag>{this.props.currentChapter}/4 Chapters</Tag>
                                    <Tag color="#006d75">24h Left</Tag>
                                </span>
                            }
                            description =  { 
                                <div>
                                    <small>{this.props.genre}</small>
                                    <br></br><br></br>
                                    <span id="card-content">{this.props.content}</span>
                                    <br></br>
                                </div>
                            }
                        />
                    </Card>
                </div>
            </Link>
            )
    }
}

export default StoryCard;