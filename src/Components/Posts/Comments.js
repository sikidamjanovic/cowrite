import React, { Component } from 'react'
import StoryComment from '../Posts/StoryComment'
import { List, Select } from 'antd'

class Comments extends Component {

    componentDidMount(){
        if(this.props.submissions){
            console.log('loaded')
        }else{
            console.log('not loaded')
        }
    }

    getCommentSort(){
        const { Option } = Select;
        return(
            <div>
                <Select defaultValue="new" style={{ width: 80 }}>
                    <Option value="new">New</Option>
                    <Option value="hot">Hot</Option>
                    <Option value="top">Top</Option>
                </Select>
            </div>
        )
    }

    getSubmissions(){

        const subs = []

        for (let i = 0; i < this.props.submissions.length; i++) {
            subs.push({
                author: this.props.submissions[i].author,
                content: this.props.submissions[i].content
            })
        }

        return subs
    }

    render() {
        return (
            <List
                className="comment-list"
                header={this.getCommentSort()}
                itemLayout="horizontal"
                dataSource={this.getSubmissions()}
                renderItem={item => (
                    <li>
                        <StoryComment 
                            author={item.author}
                            title={item.title}
                            comment={item.content}
                        />
                    </li>
                )}
            />
        );
    }
}

export default Comments;