import React from 'react';
import Comments from './Comments'
import SubmitChapter from './SubmitChapter'
import { Radio, Button, Icon, Tag, Divider} from 'antd';
import '../../App.css'

class StoryModalContent extends React.Component {

    constructor(props){
        super(props)
        this.state={
            chapter: 1,
            sort: 'time',
            sortOrder: 'desc',
            uid: ''
        }
        this.updateCommentSort = this.updateCommentSort.bind(this)
        this.updateCommentSortOrder = this.updateCommentSortOrder.bind(this)
        this.updateUid = this.updateUid.bind(this)
        this.openSubmitPanel = this.openSubmitPanel.bind(this)
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
                <Radio.Button style={{marginRight: '10px'}} disabled={true} value='2'>2</Radio.Button>
                <Radio.Button style={{marginRight: '10px'}} disabled={true} value='3'>3</Radio.Button>
                <Radio.Button style={{marginRight: '10px'}} disabled={true} value='4'>4</Radio.Button>
            </Radio.Group>
        )
    }

    updateCommentSort(value){
        this.setState({
            sort: value,
            sortOrder: 'desc'
        })
    }

    updateCommentSortOrder(order){
        this.setState({
            sortOrder: order
        })
    }

    updateUid(uid){
        this.setState({
            uid: uid 
        })
    }

    openSubmitPanel(){
        this.setState({
            panelOpen: !this.state.panelOpen
        })
    }

    renderSubmitHeader(){
        if(this.state.panelOpen){
            return(
                <SubmitChapter
                    id={this.props.id}
                />
            )
        }
    }

    render() { 

        return (
            <div>
                <div className="modal-body">
                    <h2>{this.props.title}</h2>
                    <Divider/>
                    <p>
                        {this.props.prompt}
                    </p>        
                    <br></br>
                    <div className="modal-buttons">
                        <Button 
                            onClick={this.openSubmitPanel} 
                            style={{ 
                            paddingBottom: '40px',
                            paddingRight: '20px',
                            paddingLeft: '20px',
                            paddingTop: '20px' }} 
                            type="dashed"
                        >
                            {this.state.panelOpen ? <Icon type="minus"/> : <Icon type="plus"/> }
                            Submit Chapter
                        </Button>

                        <Button type="link">
                            <Icon type="heart"></Icon>
                            <small style={{ marginLeft: '5px' }}> Like</small>
                        </Button>

                        <Button type="link">
                            <Icon type="plus-circle"/>
                            <small style={{ marginLeft: '5px' }}>  Follow</small>
                        </Button>

                        <Button type="link">
                            <Icon type="save"/>
                            <small style={{ marginLeft: '5px' }}>  Save</small>
                        </Button>

                        <Button type="link">
                            <Icon type="warning"/>
                            <small style={{ marginLeft: '5px' }}>  Report</small>
                        </Button>

                        <Button type="link">
                            <Icon type="share-alt"/>
                            <small style={{ marginLeft: '5px' }}>  Share</small>
                        </Button>
                    </div>

                    {this.renderSubmitHeader()}
                    <Divider/>
                    <small>Chapters </small>
                    <Tag 
                        style={{ marginLeft: '10px' }}
                        color='#171f22'
                    >
                        3 left
                    </Tag>
                    <br></br><br></br>
                    {this.renderChapterRadios()}
                </div>
                <Comments 
                    id={this.props.id}
                    uid={this.state.uid}
                    updateUid={this.updateUid}
                    sort={this.state.sort}
                    sortOrder={this.state.sortOrder}
                    updateSort={this.updateCommentSort}
                    updateSortOrder={this.updateCommentSortOrder}
                />
            </div>
    );
  }
}

export default StoryModalContent