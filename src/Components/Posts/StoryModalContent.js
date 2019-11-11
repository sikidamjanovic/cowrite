import React from 'react';
import Comments from './Comments'
import SubmitChapter from './SubmitChapter'
import StoryComment from '../Posts/StoryComment'
import { Button, Icon, Divider, message, Tooltip, BackTop, Steps } from 'antd';
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
    }

    componentDidMount(){
        this.setState({
            amountOfLikes: this.props.likes.length,
            currentChapter: this.props.currentChapter,
            selectedChapter: this.props.currentChapter - 1
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
                        paddingBottom: '24px', 
                        paddingTop: '14px',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        backgroundColor: '#111717'
                    }}>
                        {/* <h3 style={{ marginBottom: '12px' }}>Chapter {this.state.selectedChapter + 1}</h3>
                        <Divider/> */}
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
        var timeLeft = this.state.timeLeft
        var { Step } = Steps;
        for (let i = 1; i <= current; i++) {
            if(i === current && this.props.complete === false){
                enabled.push(
                    <Step 
                        icon={<Icon type="hourglass" />} 
                        title={"Chapter " + i} 
                        description={
                            timeLeft > 60 ? 
                                Math.round(timeLeft * 60) + ' Hrs Left' 
                            : 
                                Math.round(timeLeft) + ' Min Left'
                        }
                    />
                )
            }else{
                enabled.push(
                    <Step 
                        icon={<Icon type="check-circle" />}
                        title={"Chapter " + i} 
                        description={this.props.complete ? null : "Complete"}
                    />
                )
            }
        }
        return enabled
    }

    getDisabledRadios(){
        var current = this.props.currentChapter
        var numberOfChapters = this.props.numberOfChapters
        var disabled = []
        var { Step } = Steps;

        for (let i = current + 1; i <= numberOfChapters; i++) {
            disabled.push(
                <Step 
                    title={"Chapter " + i} 
                    style={{ opacity: 0.3 }} 
                    disabled={true} 
                    description={
                        i === current + 1 ?
                            'Up Next'
                        :
                            ''
                    }
                />
            )
        }
        return disabled
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

    
    timeLeft(){
        var current = this.props.currentChapter
        var created = this.props.createdAt.toDate()
        var diffMins
        var now = new Date()
        var chapter2 = new Date(created.getTime() + 3*60000);
        var chapter3 = new Date(chapter2.getTime() + 3*60000);
        var chapter4 = new Date(chapter3.getTime() + 3*60000);
        var final = new Date(chapter4.getTime() + 3*60000);

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
            this.getTopSubmission()
        }else{
            this.setState({
                timeLeft: diffMins
            })
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
        }else{
            getFirestore().collection('stories').doc(this.props.id).update({
                complete: true,
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