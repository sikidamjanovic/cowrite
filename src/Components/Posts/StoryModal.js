import React, { Fragment } from 'react';
import StoryComment from '../Posts/StoryComment'
import { Modal, Radio, Select, Button, Icon, List } from 'antd';
import '../../App.css'

class StoryModal extends React.Component {

    constructor(props){
        super(props)
        this.state={
            chapter: 1
        }
    }

    onChange(e) {
        console.log(`radio checked:${e.target.value}`);
    }

    getCommentSort(){
        const { Option } = Select;
        return(
            <Fragment>
                <Select defaultValue="new" style={{ width: 80 }}>
                    <Option value="new">New</Option>
                    <Option value="hot">Hot</Option>
                    <Option value="top">Top</Option>
                </Select>
                <span id="number-of-submissions">432 Submissions</span>
            </Fragment>
        )
    }

    render() {

        const data = [
            {
                author: 'Siki Damjanovic',
                comment: 'blah blah blah'
            },
            {
                author: 'Dan Di Cesare',
                comment: 'blah blah i <3 pasta sauce'
            },
            {
                author: 'Rob',
                comment: 'Cant wait for wingz with the boyz'
            },
            {
                author: 'Siki Damjanovic',
                comment: 'blah blah blah'
            },
            {
                author: 'Dan Di Cesare',
                comment: 'blah blah i <3 pasta sauce'
            },
            {
                author: 'Rob',
                comment: 'Cant wait for wingz with the boyz'
            }
        ]

        return (
            <div>
                <p>Prompt: You're in your bed about to go to sleep, with your arm dangling off the side. You feel a dark hand grasp yours, knowing first impressions are important you give it a firm shake. The next thing you hear from under your bed is "you're hired"</p>
                <br></br>
                <Radio.Group onChange={this.onChange} defaultValue="4">
                    <Radio.Button value="1">Chapter 1</Radio.Button>
                    <Radio.Button value="2">Chapter 2</Radio.Button>
                    <Radio.Button value="3">Chapter 3</Radio.Button>
                    <Radio.Button value="4">Chapter 4</Radio.Button>
                </Radio.Group>
                <br></br>
                <br></br>
                <List
                    className="comment-list"
                    header={this.getCommentSort()}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <li>
                        <StoryComment 
                            author={item.author}
                            comment={item.comment}
                        />
                    </li>
                    )}
                />
            </div>
    );
  }
}

export default StoryModal