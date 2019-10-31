import React from 'react';
import Comments from './Comments'
import SubmitChapter from './SubmitChapter'
import StoryComment from '../Posts/StoryComment'
import { Radio, Button, Icon, Tag, Divider, message, Tooltip, BackTop, Avatar, Popover} from 'antd';
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
            userSaved: false,
            submissions: [],
            submissionsLoaded: false,
            photoURL: null,
            userSubmitted: true
        }
        this.getSelectedChapter = this.getSelectedChapter.bind(this)
        this.updateCommentSort = this.updateCommentSort.bind(this)
        this.updateCommentSortOrder = this.updateCommentSortOrder.bind(this)
        this.getSubmissions = this.getSubmissions.bind(this)
        this.openSubmitPanel = this.openSubmitPanel.bind(this)
        this.closeSubmitPanel = this.closeSubmitPanel.bind(this)
        this.onChange = this.onChange.bind(this)
        this.like = this.like.bind(this)
        this.userLiked = this.userLiked.bind(this)
        this.save = this.save.bind(this)
        this.userSaved = this.userSaved.bind(this)
        this.hasUserSubmitted = this.hasUserSubmitted.bind(this)
    }

    componentDidMount(){
        this.setState({
            amountOfLikes: this.props.likes.length,
            currentChapter: this.props.currentChapter,
            selectedChapter: this.props.currentChapter
        })
        this.userLiked()
        this.userSaved()
        this.getDisabledRadios()
        this.getAvatar()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.submissions !== this.state.submissions){
            this.setState({
                submissionsLoaded: true
            })
            this.hasUserSubmitted()
        }
    }

    onChange(e) {
        this.getSelectedChapter(e.target.value)
    }

    getSelectedChapter(chapter){
        this.setState({
            selectedChapter: chapter
        })
    }

    getComments(){

        var selected = this.props.selectedChapters
        var radio = this.state.selectedChapter
        var current = this.state.currentChapter

        if(current){
            if(this.state.selectedChapter < current){
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
                            id={selected[radio-1].id}
                            postId={selected[radio-1].postId}
                            uid={this.props.auth.uid}
                            author={selected[radio-1].author}
                            comment={selected[radio-1].content}
                            likes={selected[radio-1].likes}
                            likeCount={selected[radio-1].likeCount}
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
                        chapter={this.state.selectedChapter}
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
        for (let i = 1; i <= current; i++) {
            enabled.push(
                <Radio.Button 
                    style={{
                        marginRight: '10px', border: '2px solid rgba(0, 109, 117,0.5)',
                        color: 'rgba(0, 109, 117)'
                    }} 
                    value={i}>{i}
                </Radio.Button>)
        }
        return enabled
    }

    getDisabledRadios(){
        var current = this.props.currentChapter
        var disabled = []
        var submissionDate = ''

        for (let i = current + 1; i <= 4; i++) {

            if(i == 2){
                submissionDate = this.timeUntilNextChapter(this.props.chapter2.toDate())
            }else if(i == 3){
                submissionDate = this.timeUntilNextChapter(this.props.chapter3.toDate())
            }else if(i == 4){
                submissionDate = this.timeUntilNextChapter(this.props.chapter4.toDate())
            }

            disabled.push(
                <Tooltip title={'Chapter ' + i + ' submission starts in ' + submissionDate}>
                    <Radio.Button style={{marginRight: '10px'}} disabled={true} value={i}>{i}</Radio.Button>
                </Tooltip>
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

    renderChapterRadios(){
        var current = this.props.currentChapter
        return(
            <Radio.Group onChange={this.onChange} defaultValue={current} size="large" buttonStyle="solid">
                {this.getEnabledRadios()}
                {this.getDisabledRadios()}
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

    save(){
        if (this.props.auth.isEmpty == false) {
            if(this.state.userSaved == false){
                this.setState({
                    userSaved: true
                })
                getFirestore().collection('stories').doc(this.props.id).update({
                    saves: firebase.firestore.FieldValue.arrayUnion(
                        {
                            uid: this.props.auth.uid
                        }
                    )
                })
                getFirestore().collection('users').doc(this.props.auth.displayName).collection('saved').doc().set({
                    type: 'story',
                    postId: this.props.id,
                    author: this.props.author,
                    content: this.props.prompt,
                    genre: this.props.genre,
                    title: this.props.title
                })
                message.success('Story saved!')
            }else{
                this.setState({
                    userSaved: false
                })
                // Delete user from posts 'likes' collection
                getFirestore().collection('stories').doc(this.props.id).update({
                    saves: firebase.firestore.FieldValue.arrayRemove(
                        {
                            uid: this.props.auth.uid
                        }
                    )
                })
                // Delete post from users 'liked' collection
                var delete_query = getFirestore().collection('users').doc(this.props.auth.displayName).collection('saved').where('postId','==',this.props.id)
                delete_query.get().then(function(querySnapshot){
                    querySnapshot.forEach(function(doc){
                        doc.ref.delete();
                    })
                })
            }
        }else{
            message.warning('Please login or sign up to save stories.')
        } 
    }

    userSaved(){
        const saves = this.props.saves
        for (let i = 0; i < saves.length; i++) {
            if(saves[i].uid === this.props.auth.uid){
                this.setState({
                    userSaved: true
                })
            }else{
                this.setState({
                    userSaved: false
                })
            }
        }
    }

    renderSaveIcon(){
        if(this.state.userSaved){
            return(
                <Icon 
                    type="save"
                    theme="filled"
                    size="large"
                    key="save" 
                    style={{ color:'rgba(255, 255, 255, 0.4)' }}
                />
            )
        }else{
            return(
                <Icon 
                    type="save" 
                    key="save" 
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
            return <Tag color='#171f22'>{Math.round(hoursLeft) + 'h left in chapter ' + currentChapter}</Tag>
        }else if(hoursLeft > 4){
            return <Tag color='#171f22'>{Math.round(hoursLeft) + 'h left in chapter ' + currentChapter}</Tag>
        }else if(hoursLeft > 1){
            return <Tag color="#cf1322">{Math.round(hoursLeft) + 'h left in chapter ' + currentChapter}</Tag>
        }else if(hoursLeft > 0) {
            return <Tag color="#cf1322">{Math.round(minutesLeft) + 'min left in chapter ' + currentChapter}</Tag>
        }else if(minutesLeft <= 0){
            this.getTopSubmission()
        }

    }

    endSubmissionProcess(topSubmission){
        // If story is not on last chapter do following
        if(this.props.currentChapter !== 4){
            getFirestore().collection('stories').doc(this.props.id).update({
                currentChapter: this.props.currentChapter + 1,
                selectedChapters: firebase.firestore.FieldValue.arrayUnion(
                    topSubmission
                )
            })
        }
    }

    getAvatar(){
        var that = this
        getFirestore().collection('users').doc(this.props.author).get()
        .then(function(doc) {
            if (doc.exists) {
                console.log("DOC: ", doc.data());
                if(doc.data().photoURL !== undefined){
                    that.setState({
                        photoURL: doc.data().photoURL
                    })
                }else{
                    that.setState({
                        photoURL: null
                    })
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    render() { 

        return (
            <div>
                <BackTop/>
                <div className="modal-body">

                    {/* HEADER */}
                    <h2 style={{ margin: 0 }}>{this.props.title}</h2>

                    <Divider/>

                    {/* PROMPT STYLING */}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '48px' }}>
                        <div>
                            <span>
                                <Popover content={this.props.author} title="">
                                    {this.state.photoURL !== null ?
                                        <Avatar src={this.state.photoURL}/> :
                                        <Avatar style={{ background: '#111717', color: '#171F22' }} icon="user" />
                                }
                                </Popover>
                            </span>
                        </div>
                        <div style={{ marginLeft: '14px' }}>
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
                                    paddingTop: '10px' }} 
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
                                    paddingTop: '10px' }} 
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

                        <Button type="link" onClick={this.like}>
                            {this.renderHeart()}
                            <span id="likes">
                                <small>{this.state.amountOfLikes}</small>
                            </span>
                        </Button>

                        <Button type="link">
                            <Icon type="warning"/>
                            <small style={{ marginLeft: '5px' }}>  Report</small>
                        </Button>

                        <CopyToClipboard text={window.location.href}
                            onCopy={() => message.success('Link copied to clipboard')}
                        >
                            <Button type="link">
                                <Icon type="share-alt"/>
                                <small style={{ marginLeft: '5px' }}>  Share</small>
                            </Button>
                        </CopyToClipboard>

                    </div>

                    {this.renderSubmitHeader()}
                    <Divider/>
                    <small style={{ marginRight: '10px' }}>Chapters </small>
                    {this.timeLeftForSubmission()}
                    <br></br><br></br>
                    {this.renderChapterRadios()}
                </div>

                {this.getComments()}

            </div>
    );
  }
}

export default StoryModalContent