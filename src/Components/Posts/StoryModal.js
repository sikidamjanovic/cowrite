import React, { Component } from 'react'
import StoryModalContent from './StoryModalContent'
import { Modal, Button, Icon, Tag } from 'antd';
import { connect } from 'react-redux'
import { getFirestore } from 'redux-firestore'
import '../../App.css'

class StoryModal extends Component {

    constructor(props){
        super(props)
        this.state = {
            visible: true,
            loaded: false,
            error: false
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.showModal = this.showModal.bind(this)
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount(){

        var that = this;
        var rawPath = window.location.pathname.split('/')
        var storyId = rawPath.pop()

        getFirestore().collection('stories').doc(storyId).get()
        .then(function(doc){
            if(doc.data() !== undefined){
                that.setState({
                    data: doc.data()
                })
            }else{
                that.setState({
                    error: true
                })
            }
        }).catch(function(error){
            that.setState({
                error: true
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.data !== this.state.data){
            this.setState({
                loaded: true
            })
        }    
    }
     
    goBack(){
        // if(document.referrer.substring(0,7) == 'cowrite'){
        //     this.props.history.goBack();
        // }else{
        //     window.location.href = 'cowrite.io/stories/category/' + this.state.data.genre;
        // }
        this.props.history.goBack();
    }     

    showModal(){
        this.setState({
            visible: true
        })
    }

    handleCancel(){
        // console.log(document.referrer.substring(0,12))
        // if(document.referrer.substring(0,12) === 'http://local'){
        //     this.props.history.push({
        //         pathname: '/stories/' + this.props.location.state.query.toLowerCase(),
        //         state: { 
        //             query: this.props.location.state.query,
        //             yposition: this.props.location.state.yposition
        //         }
        //     })
        // }else{
        //     this.props.history.push({
        //         pathname: '/stories/all',
        //         state: { 
        //             query: 'all',
        //         }
        //     })
        // }
        this.props.history.goBack();
    }
    
    render() {
        if(this.state.loaded){

            var data = this.state.data
            var rawPath = window.location.pathname.split('/')
            var storyId = rawPath.pop()

            return (
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    title={data.title}
                    footer={null}
                    style={{ top: 0, padding: 0 }}
                    className={"story-modal"}
                >
                    <StoryModalContent
                        id = {storyId}
                        auth = {this.props.auth}
                        title = {data.title}
                        author = {data.author}
                        authorPic = {data.authorPic}
                        genre = {data.genre}
                        currentChapter = {data.currentChapter}
                        chapters = {data.chapters}
                        prompt = {data.prompt}
                        createdAt = {data.createdAt}
                        chapter2 = {data.chapter2}
                        chapter3 = {data.chapter3}
                        chapter4 = {data.chapter4}
                        likes = {data.likes}
                        numberOfChapters = {data.numberOfChapters}
                        selectedChapters = {data.selectedChapters}
                        complete= {data.complete}
                    />      
                </Modal>
            );
        }else{
            return(
                <Modal
                    visible={true}
                    onCancel={this.handleCancel}
                    footer={null}
                    style={{ display: 'flex', textAlign: 'center'}}
                >
                    {this.state.error ?
                        <div style={{ padding: '48px' }}>
                            <h1>Story not found.</h1>
                            <small>* Stories that receive no submissions are automatically deleted.</small>
                        </div>
                    : 
                        null
                    }
                </Modal>
            )
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        auth: state.firebase.auth
    }
}


export default connect(mapStateToProps)(StoryModal);