import React from 'react';
import Comments from './Comments'
import SubmitChapter from './SubmitChapter'
import SelectedComment from '../Posts/SelectedComment'
import { Button, Icon, Popover, message, Radio, Row, Col, Divider, Tag } from 'antd';
import { getFirestore } from "redux-firestore";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { NavLink } from 'react-router-dom'
import '../../App.css'
var firebase = require('firebase');

class StoryModalContent extends React.Component {

    constructor(props){
        super(props)
        this.state={
            panelOpen: false,
            chapter: 1,
            sort: 'time',
            sortOrder: 'desc',
            uid: '',
            likes: [],
            amountOfLikes: 0,
            userLiked: false,
            submissions: [],
            submissionsLoaded: false,
            userSubmitted: true,
            selectedChapter: 0,
            timeLeft: 0 // Minutes left in chapter
        }
        this.updateCommentSort = this.updateCommentSort.bind(this)
        this.updateCommentSortOrder = this.updateCommentSortOrder.bind(this)
        this.getSubmissions = this.getSubmissions.bind(this)
        this.openSubmitPanel = this.openSubmitPanel.bind(this)
        this.closeSubmitPanel = this.closeSubmitPanel.bind(this)
        this.onChange = this.onChange.bind(this)
        this.like = this.like.bind(this)
        this.userLiked = this.userLiked.bind(this)
        this.hasUserSubmitted = this.hasUserSubmitted.bind(this)
        this.timeLeft = this.timeLeft.bind(this)
        this.next = this.next.bind(this)
        this.prev = this.prev.bind(this)
    }

    componentDidMount(){
        var current = this.props.currentChapter
        var selected

        if(this.props.complete){
            selected = 0
        }else{
            selected = current - 1
        }

        this.setState({
            amountOfLikes: this.props.likes.length,
            currentChapter: current,
            selectedChapter: selected
        })
        this.userLiked()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.submissions !== this.state.submissions){
            this.setState({
                submissionsLoaded: true
            },() => {
                this.hasUserSubmitted()
                this.timeLeft()
            })
        }
    }

    getComments(){

        var selected = this.props.selectedChapters
        var radio = this.state.selectedChapter
        var current = this.state.currentChapter

        if(current){
            if((radio + 1) < current || this.props.complete){
                return (
                    <div style={{
                        backgroundColor: '#0E1314'
                    }}>
                        <SelectedComment 
                            id={selected[radio].id}
                            postId={selected[radio].postId}
                            uid={this.props.auth.uid}
                            author={selected[radio].author}
                            comment={selected[radio].content}
                            likes={selected[radio].likes}
                            likeCount={selected[radio].likeCount}
                            auth={this.props.auth}
                            time={this.props.createdAt.toDate()}
                        />
                    </div>
                )
            }else{
                return(
                    <Comments
                        id={this.props.id}
                        uid={this.state.uid}
                        chapter={this.state.selectedChapter + 1}
                        sort={this.state.sort}
                        sortOrder={this.state.sortOrder}
                        updateSort={this.updateCommentSort}
                        updateSortOrder={this.updateCommentSortOrder}
                        submissions={this.state.submissions}
                        getSubmissions={this.getSubmissions}
                    />
                )
            }
        }else{
            return <p>Loadin</p>
        }
    
    }

    getEnabledRadios(){
        var current = this.props.currentChapter
        var enabled = []
        var timeLeft = this.state.timeLeft
        for (let i = 1; i <= current; i++) {
            if(i === current && this.props.complete === false){
                enabled.push(
                    <Radio.Button 
                        style={{ marginRight: '14px' }}
                        value={i - 1} 
                        description={timeLeft}
                    >
                        <Icon style={{ marginRight: '7px' }} type="hourglass" />
                        {"Chapter " + i}
                    </Radio.Button>
                )
            }else{
                enabled.push(
                    <Radio.Button  
                        style={{ marginRight: '14px' }}
                        value={i - 1}
                    >
                        <Icon style={{ marginRight: '7px' }} type="check" />
                        {"Chapter " + i}
                    </Radio.Button>
                )
            }
        }
        return enabled
    }

    getDisabledRadios(){
        var current = this.props.currentChapter
        var numberOfChapters = this.props.numberOfChapters
        var disabled = []

        for (let i = current + 1; i <= numberOfChapters; i++) {
            disabled.push(
                <Radio.Button 
                    value={i - 1}
                    style={{ opacity: 0.3, marginRight: '14px' }} 
                    disabled={true} 
                >
                    Chapter {i}
                </Radio.Button>
            )
        }
        return disabled
    }

    onChange = e => {
        this.setState({ selectedChapter: e.target.value });
    };

    renderChapterRadios(){
        return(
            <div>
                <Radio.Group 
                    defaultValue={this.props.currentChapter - 1}
                    buttonStyle="solid"
                    onChange={this.onChange}
                >
                    {this.getEnabledRadios()}
                    {this.getDisabledRadios()}
                </Radio.Group>
            </div>
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

    getSubmissions(uid, submissions){
        this.setState({
            uid: uid,
            submissions: submissions
        })
    }

    getTopSubmission(){
        var submissions = this.state.submissions
        var equalAmountOfLikes = []
        // Sort submissions by like count
        submissions.sort(function(a, b){
            return b.likeCount - a.likeCount
        })

        if(submissions.length > 0 && this.state.submissionsLoaded){
            // If top likes are equal, push to array
            if(submissions.length > 1){
                for (let i = 0; i < submissions.length - 1; i++) {
                    if(submissions[i].likeCount === submissions[i+1].likeCount){
                        equalAmountOfLikes.push(submissions[i])
                        equalAmountOfLikes.push(submissions[i+1])
                    }else{
                        break
                    }
                }
            }
            // If there is equal likes, sort by newest submission, if not return top liked
            if(equalAmountOfLikes.length > 0){
                equalAmountOfLikes.sort(function(a,b){
                    return b.time.toDate() - a.time.toDate()
                })
                this.endSubmissionProcess(equalAmountOfLikes[0])
            }else{
                this.endSubmissionProcess(submissions[0])
            }
        }else{
            getFirestore().collection('stories').doc(this.props.id).delete()
        }

    }

    openSubmitPanel(){
        this.setState({
            panelOpen: !this.state.panelOpen
        })
    }

    closeSubmitPanel(){
        this.setState({
            panelOpen: false
        })
    }

    hasUserSubmitted(){
        var submissions = this.state.submissions
        if(submissions.length > 0){
            for (let i = 0; i < submissions.length; i++) {
                if(submissions[i].author === this.props.auth.displayName && submissions[i].chapter === this.props.currentChapter){
                    this.setState({
                        userSubmitted: true,
                        panelOpen: false
                    })
                    break
                }else{
                    this.setState({
                        userSubmitted: false,
                        panelOpen: true
                    })
                }
            }
        }else{
            this.setState({
                userSubmitted: false,
                panelOpen: true
            })
        }
    }

    renderSubmitHeader(){
        if(this.state.panelOpen){
            return(
                <SubmitChapter
                    id={this.props.id}
                    chapter={this.props.currentChapter}
                    closePanel={this.closeSubmitPanel}
                />
            )
        }
    }

    like(){
        if (this.props.auth.isEmpty === false) {
            if(this.state.userLiked == false){
                this.setState({
                    userLiked: true,
                    amountOfLikes: this.state.amountOfLikes + 1
                })
                getFirestore().collection('stories').doc(this.props.id).update({
                    likes: firebase.firestore.FieldValue.arrayUnion(
                        this.props.auth.displayName
                    ),
                    likeCount: firebase.firestore.FieldValue.increment(1)
                })
            }else{
                this.setState({
                    userLiked: false,
                    amountOfLikes: this.state.amountOfLikes - 1
                })
                // Delete user from posts 'likes' collection
                getFirestore().collection('stories').doc(this.props.id).update({
                    likes: firebase.firestore.FieldValue.arrayRemove(
                        this.props.auth.displayName
                    ),
                    likeCount: firebase.firestore.FieldValue.increment(-1)
                })
            }
        }else{
            message.warning('Please login or sign up to like prompts')
        } 
    }

    userLiked(){
        const likes = this.props.likes
        for (let i = 0; i < likes.length; i++) {
            if(likes[i] === this.props.auth.displayName){
                this.setState({
                    userLiked: true
                })
                break
            }else{
                this.setState({
                    userLiked: false
                })
            }
        }
    }

    renderHeart(){
        if(this.state.userLiked){
            return(
                <Icon 
                    type="heart"
                    theme="filled"
                    size="large"
                    key="heart" 
                    style={{ color:'#ff7a45' }}
                />
            )
        }else{
            return(
                <Icon 
                    type="heart" 
                    key="heart" 
                    style={{ color:'rgba(255, 255, 255, 0.4)' }}
                />
            )
        }
    }

    
    timeLeft(){
        var current = this.props.currentChapter
        var created = this.props.createdAt.toDate()
        var diffMins
        var now = new Date()
        var chapter2 = new Date(created.getTime() + 2880*60000);
        var chapter3 = new Date(chapter2.getTime() + 2880*60000);
        var chapter4 = new Date(chapter3.getTime() + 2880*60000);
        var final = new Date(chapter4.getTime() + 2880*60000);

        switch(current) {
            case 1:
                diffMins = (chapter2 - now) / 60000;
                break;
            case 2:
                diffMins = (chapter3 - now) / 60000;
                break;
            case 3:
                diffMins = (chapter4 - now) / 60000;
                break;
            case 4:
                diffMins = (final - now) / 60000;
                break;    
            default:
                break;
        }

        if(diffMins < 0){
            if(this.props.complete === false){
                this.getTopSubmission()
            }else{
                this.setState({
                    timeLeft: null
                })
            }
        }else if(diffMins > 60){
            this.setState({
                timeLeft: Math.round(diffMins / 60) + ' hours left'
            })
        }else if(diffMins > 0){
            this.setState({
                timeLeft: Math.round(diffMins) + ' min left'
            })
        }

    }

    endSubmissionProcess(topSubmission){
        var now = new Date()
        // If story is not on last chapter do following
        if(this.props.currentChapter !== this.props.numberOfChapters){
            getFirestore().collection('stories').doc(this.props.id).update({
                currentChapter: this.props.currentChapter + 1,
                selectedChapters: firebase.firestore.FieldValue.arrayUnion(
                    topSubmission
                )
            })
            getFirestore().collection('notifications').doc().set({
                title: this.props.title,
                notification: 'is now on chapter ' + (this.props.currentChapter + 1),
                type: 'chapter',
                id: this.props.id,
                time: now.toString(),
                date: now
            })
        }else{
            getFirestore().collection('stories').doc(this.props.id).update({
                complete: true,
                selectedChapters: firebase.firestore.FieldValue.arrayUnion(
                    topSubmission
                )
            })
            getFirestore().collection('notifications').doc().set({
                title: this.props.title,
                notification: 'has been completed',
                type: 'complete',
                id: this.props.id,
                time: now.toString(),
                date: now
            })
        }
    }

    next(){
        this.setState({
            selectedChapter: this.state.selectedChapter + 1
        })
    }

    prev(){
        this.setState({
            selectedChapter: this.state.selectedChapter - 1
        })
    }

    renderButtons(){
        var selected = this.state.selectedChapter + 1
        var chapters = this.props.numberOfChapters
        if(selected < chapters){
            if(selected > 1){
                return(
                    <div>
                        <Button style={{ marginRight: '7px' }} onClick={this.prev}>Prev</Button>
                        <Button onClick={this.next}>Next</Button>
                    </div>
                )
            }else{
                return(
                    <div>
                        <Button onClick={this.next}>Next</Button>
                    </div>
                )
            }
        }else{
            return(
                <div>
                    <Button onClick={this.prev}>Prev</Button>
                </div>
            )
        }
    }

    renderModalButtons(){
        return(
            <div className="modal-buttons">
                <Button 
                    type="link" 
                    onClick={this.like} 
                >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        {this.renderHeart()}
                        <span id="likes">
                            {this.state.amountOfLikes}
                        </span>
                    </span>
                </Button>
                <Popover content={this.props.author} title="">
                    <Button type="link">
                        <NavLink to={{
                            pathname: "/user/" + this.props.author
                        }}>
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                <Icon type="user" key="user" />
                            </span>
                        </NavLink>
                    </Button>
                </Popover>
                <Button type="link">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon type="warning"/>
                    </span>
                </Button>
                <CopyToClipboard text={window.location.href}
                    onCopy={() => message.success('Link copied to clipboard')}
                >
                    <Button type="link">
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <Icon type="share-alt"/>
                        </span>
                    </Button>
                </CopyToClipboard>
            </div>
        )
    }

    renderSubmitButton(){
        return(
            this.props.auth.isEmpty ? 
                <Button
                    onClick={function(){ message.error('Please login to submit chapters.')}}
                    style={{ 
                        paddingBottom: '30px',
                        paddingRight: '10px',
                        paddingLeft: '10px',
                        paddingTop: '10px',
                        marginRight: '14px'
                    }} 
                    type="primary"
                >
                    <Icon type="plus"/> Submit Chapter {this.props.currentChapter}</Button>    
                :
                <Button 
                    onClick={this.openSubmitPanel} 
                    style={{ 
                        paddingBottom: '30px',
                        paddingRight: '10px',
                        paddingLeft: '10px',
                        paddingTop: '10px', 
                        marginRight: '28px'
                    }} 
                    type={this.state.panelOpen ? 'dashed' : 'primary'}
                    disabled={this.state.userSubmitted}
                >
                    {this.state.userSubmitted ? 
                        <Icon type="check"/> : 
                    this.state.panelOpen ? 
                        <Icon type="minus"/> : 
                        <Icon type="plus"/>
                    }
                    {this.state.userSubmitted ?
                        'Chapter Submitted':
                        'Submit Chapter ' + this.props.currentChapter     
                    }
                </Button>
        )
    }

    render() { 
        return (
            <div style={{ padding: '48px', backgroundColor: '#0E1314' }}>
                <Row type="flex" align="middle">
                    <Col>
                        <Row type="flex" align="middle">
                            <Col>
                                <h1 style={{ margin: 0 }}>{this.props.title}</h1>
                                <p style={{ margin: 0, opacity: 0.8 }}>created by <b>{this.props.author}</b></p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Divider/>
                <Row style={{ marginTop: '24px'}} type="flex" align="middle">
                    <Col>
                        <p>{this.props.prompt}</p>
                    </Col>
                </Row>
                <Row style={{ marginTop: '24px'}} type="flex" align="middle">
                    <Col>
                        {this.renderSubmitButton()}
                    </Col>
                    <Col>
                        {this.renderModalButtons()}
                    </Col>
                </Row>
                <Row>
                    {this.renderSubmitHeader()}
                </Row>
                <Row style={{ marginTop: '48px'}}>
                    <Col>
                        {this.renderChapterRadios()}
                    </Col>
                </Row>
                <Row style={{ marginTop: '24px'}}>
                    {this.getComments()}
                </Row>
                <Row>
                    {this.props.complete ? 
                        <div style={{ backgroundColor: '#111717', padding: '24px' }}>
                            {this.renderButtons()}
                        </div> 
                        : 
                        null
                    }
                </Row>
            </div>
    );
  }
}

export default StoryModalContent