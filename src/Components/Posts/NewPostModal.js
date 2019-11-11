import React from 'react';
import { Button, Modal, Icon, Form, Input, Select, message, Radio } from 'antd';
import { connect } from 'react-redux'
import { createPost } from '../../Store/Actions/postActions'
import { FaPlus } from 'react-icons/fa'

class NewPostModal extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            content: '',
            genre: '',
            likes: [],
            visible: false,
            remainingCharacters: 500,
            numberOfChapters: null
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.showModal = this.showModal.bind(this)
    }

    showModal(){
        this.setState({
            visible: true
        })
    }

    handleCancel(){
        this.setState({
            visible: false
        })
    }

    handleChange = (e) => {
        if(e.target.id === 'content'){
            var content = e.target.value.toString()
            this.setState({
                remainingCharacters: 500 - content.length
            })
        }
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSelectChange = (e) => {
        this.setState({
            genre: e
        })
    }

    handleRadioChange = (e) => {
        this.setState({
            numberOfChapters: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.validateForm(this.state)
    }

    validateForm(state){
        if(state.title.length < 4 || state.content.length < 10){
            return message.error('Title or content length is too short.')
        }else if(state.genre.length === 0){
            return message.error('Please select a category.')
        }else if(state.numberOfChapters === null){
            return message.error('Please select amount of chapters')
        }else if(state.remainingCharacters < 0){
            return message.error('Content is too long.')
        }else{
            this.props.createPost(state)
            this.handleCancel()
        }
    }

    render() {
        const { auth } = this.props;
        //if (!auth.uid) return <redirect to= '/signin'/> //Use for actions that the user cant complete unless they are signed in
        const { TextArea } = Input;
        const { Option } = Select;
        return (
            <div>
                <Button 
                    onClick={this.showModal}
                    type="primary"
                >
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <FaPlus style={{ marginRight: '5px' }}/>
                        {this.props.title}
                    </div>

                </Button>
                <Modal
                    className="post-modal"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >

                {/* **** MODAL DETAILS (FORM) ****/}
                <div className="post-modal-form" style={{ padding: '24px'}}>
                    <h2>New Prompt</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            <label for="title">
                                <small>Title</small>
                            </label>
                            <Input
                                id="title"
                                onChange={this.handleChange} 
                            />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <label for="content">
                                <small>Content</small>
                            </label>
                            <TextArea
                                id="content" 
                                onChange={this.handleChange}
                                rows={5}
                            />
                        </Form.Item>
                        <span 
                            style={
                                this.state.remainingCharacters < 0 ? 
                                    { color: '#fa541c', opacity: 0.5} : 
                                    { opacity: 0.5 }
                            }
                        >
                            <small>{this.state.remainingCharacters} characters left</small>
                        </span>
                        <br></br><br></br>
                        <Form.Item>
                            <small>Number of chapters</small><br></br>
                            <Radio.Group buttonStyle="solid" onChange={this.handleRadioChange}>
                                <Radio.Button value={2}>2</Radio.Button>
                                <Radio.Button value={3}>3</Radio.Button>
                                <Radio.Button value={4}>4</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Category"
                                onChange={this.handleSelectChange}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="Comedy">Comedy</Option>
                                <Option value="Horror">Horror</Option>
                                <Option value="Fantasy">Fantasy</Option>
                                <Option value="Romance">Romance</Option>
                                <Option value="SciFi">Sci-Fi</Option>
                            </Select>
                        </Form.Item>
                        <Button type="primary" htmlType="submit">    
                            <Icon type="plus"/>
                            Post Prompt
                        </Button>
                    </Form>
                </div>
                </Modal>
            </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => dispatch(createPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostModal)