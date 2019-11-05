import React from 'react';
import Comments from './Comments'
import SubmitChapter from './SubmitChapter'
import StoryComment from '../Posts/StoryComment'
import { Button, Icon, Tag, Divider, message, Tooltip, BackTop, Popover, Steps} from 'antd';
import { getFirestore } from "redux-firestore";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import '../../App.css'
var firebase = require('firebase');

class StoryModalContent extends React.Component {

    constructor(props){
        super(props)
        this.state={
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
            selectedChapter: 0
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
    }

    componentDidMount(){
        this.setState({
            amountOfLikes: this.props.likes.length,
            currentChapter: this.props.currentChapter,
            selectedChapter: this.props.currentChapter - 1
        })
        this.userLiked()
        this.getDisabledRadios()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.submissions !== this.state.submissions){
            this.setState({
                submissionsLoaded: true
            })
            this.hasUserSubmitted()
        }
    }

    getComments(){

        var selected = this.props.selectedChapters
        var radio = this.state.selectedChapter
        var current = this.state.currentChapter

        if(current){
            if((radio + 1) < current){
                return (
                    <div style={{ 
                        paddingBottom: '24px', 
                        paddingTop: '14px',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        backgroundColor: '#111717'
                    }}>
                        <h3 style={{ marginBottom: '12px' }}>Chapter {this.state.selectedChapter}</h3>
                        <Divider/>
                        <StoryComment 
                            id={selected[radio].id}
                            postId={selected[radio].postId}
                            uid={this.props.auth.uid}
                            author={selected[radio].author}
                            comment={selected[radio].content}
                            likes={selected[radio].likes}
                            likeCount={selected[radio].likeCount}
                            auth={this.props.auth}
                            selected={true}
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
        var { Step } = Steps;
        for (let i = 1; i <= current; i++) {
            if(i === current){
                enabled.push(
                    <Step icon={<Icon type="hourglass" />} title={"Chapter " + i} description={this.timeLeftForSubmission()}/>
                )
            }else{
                enabled.push(
                    <Step icon={<Icon type="check-circle" />}title={"Chapter " + i} description={"Click To See"}/>
                )
            }
        }
        return enabled
    }

    getDisabledRadios(){
        var current = this.props.currentChapter
        var numberOfChapters = this.props.numberOfChapters
        var disabled = []
        var submissionDate = ''
        var { Step } = Steps;

        for (let i = current + 1; i <= numberOfChapters; i++) {

            if(i == 2){
                submissionDate = this.timeUntilNextChapter(this.props.chapter2.toDate())
            }else if(i == 3){
                submissionDate = this.timeUntilNextChapter(this.props.chapter3.toDate())
            }else if(i == 4){
                submissionDate = this.timeUntilNextChapter(this.props.chapter4.toDate())
            }

            disabled.push(
                <Step title={"Chapter " + i} style={{ opacity: 0.3 }} disabled={true} description={"In " + submissionDate}/>
            )
        }
        return disabled
    }

    timeUntilNextChapter(nextChapterDate){
        var now = new Date()
        var diffMin = nextChapterDate - now / 1000
        var diffHours = Math.abs(now - nextChapterDate) / 36e5
        if(diffHours > 24){
            return Math.round(diffHours / 24)  + ' days'
        }else if(diffHours < 24){
            return Math.round(diffHours) + ' hours'
        }else if(diffHours < 1 && diffHours > 0){
            return Math.round(diffMin) + ' minutes'
        }
    }

    onChange = selectedChapter => {
        this.setState({ selectedChapter });
    };

    renderChapterRadios(){
        const { selectedChapter } = this.state;
        return(
            <div>
                <Steps type="navigation" size="small" status="process" current={selectedChapter} onChange={this.onChange}>
                    {this.getEnabledRadios()}
                    {this.getDisabledRadios()}
                </Steps>
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

        if(this.state.submissionsLoaded && this.state.submissions.length > 0){

            var submissions = this.state.submissions
            var equalAmountOfLikes = []
            // Sort submissions by like count
            submissions.sort(function(a, b){
                return b.likeCount - a.likeCount
            })
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
                        userSubmitted: true
                    })
                    break
                }else{
                    this.setState({
                        userSubmitted: false
                    })
                }
            }
        }else{
            this.setState({
                userSubmitted: false
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
                        {
                            uid: this.props.auth.uid
                        }
                    ),
                    likeCount: firebase.firestore.FieldValue.increment(1)
                })
                getFirestore().collection('users').doc(this.props.auth.displayName).collection('liked').doc().set({
                    type: 'story',
                    postId: this.props.id,
                    author: this.props.author,
                    content: this.props.prompt,
                    genre: this.props.genre,
                    title: this.props.title
                })
                message.success('Story Liked!')
            }else{
                this.setState({
                    userLiked: false,
                    amountOfLikes: this.state.amountOfLikes - 1
                })
                // Delete user from posts 'likes' collection
                getFirestore().collection('stories').doc(this.props.id).update({
                    likes: firebase.firestore.FieldValue.arrayRemove(
                        {
                            uid: this.props.auth.uid
                        }
                    ),
                    likeCount: firebase.firestore.FieldValue.increment(-1)
                })
                // Delete post from users 'liked' collection
                var delete_query = getFirestore().collection('users').doc(this.props.auth.displayName).collection('liked').where('postId','==',this.props.id)
                delete_query.get().then(function(querySnapshot){
                    querySnapshot.forEach(function(doc){
                        doc.ref.delete();
                    })
                })
            }
        }else{
            message.warning('Please login or sign up to like prompts')
        } 
    }

    userLiked(){
        const likes = this.props.likes
        for (let i = 0; i < likes.length; i++) {
            if(likes[i].uid === this.props.auth.uid){
                this.setState({
                    userLiked: true
                })
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

    
    timeLeftForSubmission(){
        var currentChapter = this.props.currentChapter
        var currentTime = new Date() 
        var diffHours = String

        if(currentChapter === 1){
            diffHours = Math.abs(currentTime - this.props.createdAt.toDate()) / 36e5
        }else if(currentChapter === 2){
            diffHours = Math.abs(currentTime - this.props.chapter2.toDate()) / 36e5
        }else if(currentChapter === 3){
            diffHours = Math.abs(currentTime - this.props.chapter3.toDate()) / 36e5
        }else if(currentChapter === 4){
            diffHours = Math.abs(currentTime - this.props.chapter4.toDate()) / 36e5
        }

        var hoursLeft = 48 - diffHours
        var minutesLeft = hoursLeft * 60

        if(hoursLeft > 12){
            return Math.round(hoursLeft) + ' Hours Left'
        }else if(hoursLeft > 4){
            return Math.round(hoursLeft) + ' Hours Left'
        }else if(hoursLeft > 1){
            return Math.round(hoursLeft) + ' Hours Left'
        }else if(hoursLeft > 0) {
            return Math.round(minutesLeft) + ' Hours Left'
        }else if(minutesLeft <= 0){
            this.getTopSubmission()
        }

    }

    endSubmissionProcess(topSubmission){
        // If story is not on last chapter do following
        if(this.props.currentChapter !== this.props.numberOfChapters){
            getFirestore().collection('stories').doc(this.props.id).update({
                currentChapter: this.props.currentChapter + 1,
                selectedChapters: firebase.firestore.FieldValue.arrayUnion(
                    topSubmission
                )
            })
        }
    }

    render() { 

        return (
            <div>
                <BackTop/>
                <div className="modal-body">

                    {/* HEADER */}

                    <div>
                        <span style={{ display: 'flex', flexDirection: 'row' }}>
                            <h2>{this.props.title}</h2>
                        </span>
                    </div>

                    <br></br>

                    {/* PROMPT STYLING */}
                    <div>
                        <div style={{ marginBottom: '48px' }}>
                            {this.props.prompt}
                        </div>
                    </div>        

                    <div className="modal-buttons">
                        
                        {this.props.auth.isEmpty ? 
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
                                type="primary"
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
                        }

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

                        <Tooltip title={this.props.author}>
                            <Button type="link">
                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                    <Icon type="user"/>
                                </span>
                            </Button>
                        </Tooltip>

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

                    {this.renderSubmitHeader()}
                    <Divider/>
                    {this.renderChapterRadios()}
                </div>

                {this.getComments()}

            </div>
    );
  }
}

export default StoryModalContent