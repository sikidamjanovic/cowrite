import React, { Component } from 'react';
import { Card, Icon, Avatar } from 'antd';

class Prompt extends Component {
    state = {  }
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
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title = {this.props.title}
                    description = {this.props.content}
                />
            </Card>


            // <div>
            //     <h1>{this.props.id}.</h1>
            //     <h2>{this.props.title}</h2>
            //     <h3>{this.props.content}</h3>
            // </div>
        );
    }
}

export default Prompt;