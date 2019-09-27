import React, { Fragment } from 'react';
import Comments from '../Posts/Comments'
import SubmitChapter from '../Posts/SubmitChapter'
import { BackTop, Collapse, Radio, Select, Icon} from 'antd';
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

    render() {

        const { Panel } = Collapse; 

        return (
            <div>
                <BackTop/>
                <p>{this.props.prompt}</p>
                <br></br>
                <Collapse 
                    bordered={false}
                    expandIcon={({ isActive }) => <Icon type="plus" rotate={isActive ? 90 : 0} />}
                >
                    <Panel header="Submit Chapter 5" key="1">
                        <SubmitChapter
                            id={this.props.id}
                        />
                    </Panel>
                </Collapse>
                <br></br>
                <br></br>
                <small>Chapters</small>
                <br></br>
                <br></br>
                <Radio.Group onChange={this.onChange} defaultValue="4" size="large" buttonStyle="solid">
                    <Radio.Button style={{marginRight: '10px'}} value="1">1</Radio.Button>
                    <Radio.Button style={{marginRight: '10px'}}  value="2">2</Radio.Button>
                    <Radio.Button style={{marginRight: '10px'}}  value="3">3</Radio.Button>
                    <Radio.Button style={{marginRight: '10px'}}  value="4">4</Radio.Button>
                </Radio.Group>
                <br></br>
                <br></br>
                <Comments submissions={this.props.submissions}/>
            </div>
    );
  }
}

export default StoryModal