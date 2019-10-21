import React from 'react';
import Comments from './Comments'
import SubmitChapter from './SubmitChapter'
import { Radio, Button, Icon, Tag, Divider, message, Tooltip} from 'antd';
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
            selectedChapter: 1
        }
        this.getSelectedChapter = this.getSelectedChapter.bind(this)
        this.updateCommentSort = this.updateCommentSort.bind(this)
        this.updateCommentSortOrder = this.updateCommentSortOrder.bind(this)
        this.getSubmissions = this.getSubmissions.bind(this)
        this.openSubmitPanel = this.openSubmitPanel.bind(this)
        this.onChange = this.onChange.bind(this)
        this.like = this.like.bind(this)
        this.userLiked = this.userLiked.bind(this)
        this.save = this.save.bind(this)
        this.userSaved = this.userSaved.bind(this)
    }

    componentDidMount(){
        this.setState({
            amountOfLikes: this.props.likes.length
        })
        this.userLiked()
        this.userSaved()
        this.getDisabledRadios()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.submissions !== this.state.submissions){
            this.getTopSubmission()
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

    getEnabledRadios(){
        var current = this.props.currentChapter
        var enabled = []
        for (let i = 1; i <= current; i++) {
            enabled.push(<Radio.Button style={{marginRight: '10px'}} value={i}>{i}</Radio.Button>)
        }
        return enabled
    }

    getDisabledRadios(){
        var current = this.props.currentChapter
        var disabled = []
        var submissionDate = ''

        for (let i = current + 1; i <= 4; i++) {

            if(i == 2){
                submissionDate = this.props.chapter2.toDate()
            }else if(i == 3){
                submissionDate = this.props.chapter3.toDate()
            }else if(i == 4){
                submissionDate = this.props.chapter4.toDate()
            }

            disabled.push(
                <Tooltip title={'Chapter ' + i + ' submissions start on ' + submissionDate}>
                    <Radio.Button style={{marginRight: '10px'}} disabled={false} value={i}>{i}</Radio.Button>
                </Tooltip>
            )
        }
        return disabled
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
        var submissions = this.state.submissions
        var equalAmountOfLikes = []

        // Sort submissions by like count
        submissions.sort(function(a, b){
            return b.likeCount - a.likeCount
        })
        // If top likes are equal, push to array
        if(submissions.length > 1){
            for (let i = 0; i < submissions.length; i++) {
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
            return equalAmountOfLikes[0]
        }else{
            return submissions[0]
        }

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
                    chapter={this.props.currentChapter}
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
                    style={{ color:'#cf1322' }}
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
            return <Tag color='#171f22'>{Math.round(hoursLeft) + 'h Left'}</Tag>
        }else if(hoursLeft > 4){
            return <Tag color='#171f22'>{Math.round(hoursLeft) + 'h Left'}</Tag>
        }else if(hoursLeft > 1){
            return <Tag color="#cf1322">{Math.round(hoursLeft) + 'h Left'}</Tag>
        }else if(hoursLeft > 0) {
            return <Tag color="#cf1322">{60 - Math.round(minutesLeft) + 'min Left'}</Tag>
        }else if(minutesLeft <= 0){
            // TODO: convert to next chapter
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

                        <Button type="link" onClick={this.like}>
                            {this.renderHeart()}
                            <span id="likes">
                                {this.state.amountOfLikes}
                            </span>
                        </Button>

                        <Button type="link" onClick={this.save}>
                            {this.renderSaveIcon()}
                            <small style={{ marginLeft: '5px' }}>
                                {this.state.userSaved ? ' Saved' : 'Save'}
                            </small>
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
                    <small>Chapters </small>

                    <Tag 
                        style={{ marginLeft: '10px', marginRight: '10px' }}
                        color='#171f22'
                    >
                        {(4 - this.props.currentChapter) + ' left'}
                    </Tag>
                    
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