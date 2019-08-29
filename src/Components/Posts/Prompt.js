import React, { Component } from 'react';
import { Card, Icon, Avatar, Tag, Popover } from 'antd';
import '../../App.css'

class Prompt extends Component {

    getTime(){
        var postedTime = this.props.time
        if(postedTime){
            const diff = this.differenceInHours(postedTime.toDate(), new Date())
            if(diff > 12){
                return <Tag color="blue">{diff + 'h left'}</Tag>
            }else if(diff > 4){
                return <Tag color="volcano">{diff + 'h left'}</Tag>
            }else{
                return <Tag color="red">{diff + 'h left'}</Tag>
            }
        }else{
            return <Tag>No Time</Tag>
        }
    }

    differenceInHours(postedTime, currentTime){
        return Math.round(48 - Math.abs(postedTime - currentTime) / 36e5)
    }

    render() {
        const { Meta } = Card;
        return (
            <Card
                actions={[
                    <Icon type="heart" key="heart" />,
                    <Icon type="book" key="book" />,
                    <Icon type="user" key="user" />,
                ]}
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
                            {this.getTime()}
                        </span>
                    }
                    description =  { 
                        <div>
                            <small>{ this.props.genre }</small>
                            <br></br><br></br>
                            <span id="card-content">{ this.props.content }</span>
                            <br></br>
                        </div>
                    }
                />
            </Card>

        );
    }
}

export default Prompt;