import React, { Component } from 'react'
import { Comment, Tooltip, Icon, Avatar, Tag } from 'antd'

class StoryComment extends Component {

    isSelected(x){
        if(x == true){
            return {backgroundColor: '#fafafa'}
        }
    }

    getTag(){
        if(this.props.selected){
            return(
                <Tag color="orange" style={{ marginLeft: '10px' }}>
                    <Icon type="star"/>
                    Selected
                </Tag>
            )
        }
    }
    
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
                author={<a>{this.props.author}{this.getTag()}</a>}
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
                style={this.isSelected(this.props.selected)}
            />
        )
    }
}

export default StoryComment;