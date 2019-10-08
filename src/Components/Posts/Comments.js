import React, { Component } from 'react'
import StoryComment from '../Posts/StoryComment'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { List, Select, Spin } from 'antd'


class Comments extends Component {

    constructor(props){
        super(props)
        this.state = {
            loaded: false,
            submissions: []
        }
    }

    componentDidUpdate(prevState, prevProps){
        if(this.state.loaded !== this.props.loaded || prevState.submissions !== this.props.submissions){
            this.setState({
                loaded: true,
                submissions: this.props.submissions
            })
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
                                uid={this.props.auth.uid}
                                author={item.author}
                                comment={item.content}
                                likes={item.likes}
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
        for (let i = 0; i < this.state.submissions.length; i++) {
            subs.push({
                postId: this.state.submissions[i].postId,
                id: this.props.auth.uid,
                author: this.state.submissions[i].author,
                content: this.state.submissions[i].content,
                likes: this.state.submissions[i].likes,
                time: this.state.submissions[i].time.toDate()
            })
        }
        return subs
    }

    render() {
        return (
            <div>
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
        return [
          {
            collection: 'stories',
            doc: props.id,
            subcollections: [{ collection: 'submissions'}],
            storeAs: 'submissions'
          }
        ];
    })
)(Comments)