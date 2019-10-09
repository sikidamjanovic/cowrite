import React, { Component } from 'react'
import StoryModalContent from './StoryModalContent'
import { Modal, Button, Icon, Tag } from 'antd';
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
            console.log('HERE', storyId)
            console.log('HEY!!!', doc.data())
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
                    title={
                        <span>
                            <span style={{ marginRight: '20px' }}>
                                {data.title}
                            </span>
                            <Tag>{4 - data.currentChapter + ' Chapters Left'}</Tag>
                            <Button>
                                <Icon type="plus"/>
                                Follow
                            </Button>
                        </span>
                    }
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={'90%'}
                    style={{ top: 0, maxHeight: '100vh', padding: 0 }}
                >
    
                    <StoryModalContent
                        id = {storyId}
                        // uid = {this.props.location.state.uid}
                        author = {data.author}
                        genre = {data.genre}
                        currentChapter = {data.currentChapter}
                        chapters = {data.chapters}
                        prompt = {data.prompt}
                        time = {data.time}
                    />      
                </Modal>
            );
        }else{
            return(
                <Modal 
                    visible={this.state.visible}
                    onCancel={this.handleCancel} 
                    width={'90%'} 
                    footer={null} 
                    style={{ top: 0 }}
                >
                    <div style={{ height: '100vh' }}></div>
                </Modal>
            )
        }
    }
}

export default StoryModal;