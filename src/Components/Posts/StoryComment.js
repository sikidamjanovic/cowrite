import React, { Component } from 'react'
import { Comment, Tooltip, Icon, Avatar } from 'antd'

class StoryComment extends Component {
    render() {  

        const actions = [
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon
                    type="like"
                    // onClick={this.like}
                    />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>54</span>
            </span>
        ]
        
        return (
            <Comment
                author={<a>{this.props.author}</a>}
                actions={actions}
                avatar={
                    <Avatar icon="user" />
                }
                content={
                <p>
                    {this.props.comment}
                </p>
                }
                datetime={
                    '3h Ago'
                }
            />
        )
    }
}

export default StoryComment;