import React, { Component } from 'react'
import StoryModalContent from './StoryModalContent'
import { Modal, Button, Icon, Tag } from 'antd';
import { connect } from 'react-redux'
import { getFirestore } from 'redux-firestore'

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
            that.setState({
                data: doc.data()
            })
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
        this.setState({ visible: false }, () => {
            console.log(this.state.visible);
        });
        this.goBack()
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
                    footer={null}
                    width={'60%'}
                    style={{ top: 0, padding: 0 }}
                >
                    <StoryModalContent
                        id = {storyId}
                        auth = {this.props.auth}
                        title = {data.title}
                        author = {data.author}
                        genre = {data.genre}
                        currentChapter = {data.currentChapter}
                        chapters = {data.chapters}
                        prompt = {data.prompt}
                        createdAt = {data.createdAt}
                        chapter2 = {data.chapter2}
                        chapter3 = {data.chapter3}
                        chapter4 = {data.chapter4}
                        likes = {data.likes}
                        saves = {data.saves}
                    />      
                </Modal>
            );
        }else{
            return(
                <Modal 
                    visible={this.state.visible}
                    onCancel={this.handleCancel} 
                    width={'60%'} 
                    footer={null} 
                    style={{ top: 0 }}
                >
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