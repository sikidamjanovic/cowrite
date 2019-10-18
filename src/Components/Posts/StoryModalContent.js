import React from 'react';
import Comments from './Comments'
import SubmitChapter from './SubmitChapter'
import { Radio, Button, Icon, Tag, Divider, message} from 'antd';
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
            userSaved: false
        }
        this.updateCommentSort = this.updateCommentSort.bind(this)
        this.updateCommentSortOrder = this.updateCommentSortOrder.bind(this)
        this.updateUid = this.updateUid.bind(this)
        this.openSubmitPanel = this.openSubmitPanel.bind(this)
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
                    style={{ color:'white' }}
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