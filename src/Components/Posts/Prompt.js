import React, { Component } from 'react';
import { Card, Icon, Avatar, Button } from 'antd';

class Prompt extends Component {
    render() {
        const { Meta } = Card;
        return (
            <Card
                actions={[
                    <Button></Button>,
                    <Icon type="heart" key="heart" />,
                    <Icon type="book" key="book" />,
                    <Icon type="user" key="user" />,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title = {this.props.title}
                    description =  { 
                        <div>
                            <span>{ this.props.genre } | 11hrs Left </span>
                            <br></br>
                            <span><small>{this.props.author}</small></span>
                            <br></br>
                            <br></br>
                            <span>{ this.props.content }</span>
                        </div>
                    }
                />
            </Card>

        );
    }
}

export default Prompt;