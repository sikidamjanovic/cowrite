import React, { Component } from 'react'
import StoryComment from '../Posts/StoryComment'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { List, Select, Button, Icon, Divider } from 'antd'


class Comments extends Component {

    constructor(props){
        super(props)
        this.state = {
            loaded: false,
            submissions: [],
            sortOrder: 'desc'
        }        
        this.handleSort = this.handleSort.bind(this)
        this.handleSortOrder = this.handleSortOrder.bind(this)
    }

    componentDidUpdate(prevState, prevProps){
        if(this.state.loaded !== this.props.loaded || prevState.submissions !== this.props.submissions){
            this.setState({
                loaded: true,
                submissions: this.props.submissions
            })
            return this.props.getSubmissions(this.props.auth.uid, this.props.submissions)
        }
    }

    handleSort(value){
        return this.props.updateSort(value)
    }

    handleSortOrder(){
        var order = this.props.sortOrder
        if(order == 'desc'){
            return this.props.updateSortOrder('asc')
        }else{
            return this.props.updateSortOrder('desc')
        }
    }
    
    renderSortArrow(){
        var order = this.props.sortOrder
        if(order == 'desc'){
            return <Icon type="down"/>
        }else{
            return <Icon type="up"/>
        }
    }

    getComments(){
        if(this.state.loaded && this.state.submissions.length > 0){
            return(
                <List
                    className="comment-list"
                    header={this.getCommentSort()}
                    itemLayout="horizontal"
                    dataSource={this.getSubmissions()}
                    renderItem={item => (
                        <li>
                            <StoryComment 
                                id={item.id}
                                postId={item.postId}
                                auth={this.props.auth}
                                uid={this.props.auth.uid}
                                author={item.author}
                                comment={item.content}
                                likes={item.likes}
                                likeCount={item.likeCount}
                                time={item.time}
                            />
                        </li>
                    )}
                />
            )
        }else{
            return(
                <List
                    className="comment-list"
                    header={this.getCommentSort()}
                    itemLayout="horizontal"
                    dataSource={[]} 
                    locale={{ emptyText: <p>No Submissions</p> }}
                />
            )
        }
    }

    getCommentSort(){
        const { Option } = Select;
        return(
            <div style={{marginBottom: '24px', marginTop: '24px' }}>
                <Select 
                    defaultValue="time" 
                    style={{ width: 80 }} 
                    onChange={this.handleSort}
                    showArrow={false}
                >
                    <Option value="time">New</Option>
                    <Option value="likeCount">Top</Option>
                </Select>
                <Button style={{ marginLeft: '5px', marginRight: '24px' }} onClick={this.handleSortOrder}>
                    {this.renderSortArrow()}
                </Button>
                <small>{this.state.submissions.length + ' submissions'}</small>
            </div>
        )
    }

    getSubmissions(){
        const subs = []
        for (let i = 0; i < this.state.submissions.length; i++) {
            subs.push({
                postId: this.state.submissions[i].postId,
                uid: this.props.auth.uid,
                id: this.state.submissions[i].id,
                author: this.state.submissions[i].author,
                content: this.state.submissions[i].content,
                likes: this.state.submissions[i].likes,
                likeCount: this.state.submissions[i].likeCount,
                time: this.state.submissions[i].time.toDate()
            })
        }
        return subs
    }

    render() {
        return (
            <div id="comments">
                {this.getComments()}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        submissions: state.firestore.ordered.submissions,
        auth: state.firebase.auth,
        loaded: true
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
        return [{
            collection: 'stories',
            doc: props.id,
            subcollections: [{ collection: 'submissions'}],
            where: [
                'chapter', '==', props.chapter
            ],
            orderBy: [props.sort, props.sortOrder],
            storeAs: 'submissions'
        }];
    })
)(Comments)