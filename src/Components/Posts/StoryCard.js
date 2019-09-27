import React, { Component } from 'react'
import { Card, Icon, Avatar, Tag, Popover, Modal, Tooltip, Button } from 'antd';
import StoryModal from '../Posts/StoryModal'
import '../../App.css'

class StoryCard extends Component {

    constructor(props){
        super(props)
        this.state = {
            visible: false
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.showModal = this.showModal.bind(this)
    }

    showModal(){
        this.setState({
            visible: true
        })
    }

    handleCancel(){
        this.setState({ visible: false }, () => {
            console.log(this.state.visible);
        }); 
    }

    render() {
        const { Meta } = Card;
        return (
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
                    onClick={this.showModal}
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
                <Modal
                    title={
                        <span>
                            <span style={{ marginRight: '20px' }}>
                                {this.props.title}
                            </span>
                            <Tag>{4 - this.props.currentChapter} Chapters Left</Tag>
                            <Button>
                                <Icon type="plus"/>
                                Follow
                            </Button>
                        </span>
                    }
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={'80%'}
                    headerStyle={{ backgroundColor: 'red'}}
                    style={{ top: 0, maxHeight: '100vh', padding: 0 }}
                >
                    <StoryModal
                        id = {this.props.id}
                        author = {this.props.author}
                        genre = {this.props.genre}
                        currentChapter = {this.props.currentChapter}
                        chapters = {this.props.chapters}
                        prompt = {this.props.content}
                        time = {this.props.time}
                        submissions = {this.props.submissions}
                    />
                </Modal>
            </div>
        );
    }
}

export default StoryCard;