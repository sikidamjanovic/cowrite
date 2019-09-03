import React, { Component } from 'react'
import { Card, Icon, Avatar, Tag, Popover, Modal, Tooltip } from 'antd';
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
                        <button id="likebtn"><Icon type="heart" key="heart"/></button>,
                        <Icon type="book" key="book" />,
                        <Icon type="user" key="user" />,
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
                            <span id="card-title">Story Test</span>
                            <Tag>Story</Tag>
                            <Tag>4/5 Chapters</Tag>
                            <Tag color="blue">24h Left</Tag>
                        </span>
                    }
                    description =  { 
                        <div onClick={this.showModal}>
                            <small>Comedy</small>
                            <br></br><br></br>
                            <span id="card-content">blah blah blah</span>
                            <br></br>
                        </div>
                    }
                />
                </Card>
                <Modal
                    title={"Story Title"}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={'80%'}
                    style={{ top: 0 }}
                >
                    <StoryModal/>
                </Modal>
            </div>
        );
    }
}

export default StoryCard;