import React, { Fragment } from 'react';
import Comments from './Comments'
import SubmitChapter from './SubmitChapter'
import { BackTop, Collapse, Radio, Icon} from 'antd';
import '../../App.css'

class StoryModalContent extends React.Component {

    constructor(props){
        super(props)
        this.state={
            chapter: 1
        }
    }

    onChange(e) {
        console.log(`radio checked:${e.target.value}`);
    }

    renderChapterRadios(){
        var current = this.props.currentChapter
        var map = new Array(current).fill(null).map( (x,i) => i + 1 )
        const buttons = map.map((i) => 
            <Radio.Button style={{marginRight: '10px'}} value='1'>{i}</Radio.Button>
        );
        return(
            <Radio.Group onChange={this.onChange} defaultValue={current.toString()} size="large" buttonStyle="solid">
                {buttons}
            </Radio.Group>
        )
    }

    render() {

        const { Panel } = Collapse; 

        return (
            <div style={{ minHeight: '90vh'}}>
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
                {this.renderChapterRadios()}
                <br></br>
                <br></br>
                <Comments 
                    id={this.props.id} 
                    uid={this.props.uid}
                />
            </div>
    );
  }
}

export default StoryModalContent