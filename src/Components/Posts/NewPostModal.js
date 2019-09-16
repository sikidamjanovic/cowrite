import React from 'react';
import { Button, Modal, Icon, Form, Input, Select, message } from 'antd';
import { connect } from 'react-redux'
import { createPost } from '../../Store/Actions/postActions'

class NewPostModal extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            content: '',
            genre: '',
            visible: false
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
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSelectChange = (e) => {
        this.setState({
            genre: e
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
        }else if(state.genre.length == 0){
            return message.error('Please select a category.')
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
                    <Icon type="plus"/>    
                    New Prompt
                </Button>
                <Modal
                    title="New Prompt"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >

                {/* **** MODAL DETAILS (FORM) ****/}
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            <Input
                                id="title"
                                onChange={this.handleChange} 
                                placeholder="Title"
                            />
                        </Form.Item>
                        <Form.Item>
                            <TextArea
                                id="content" 
                                onChange={this.handleChange}
                                rows={5}
                                placeholder="Content"
                            />
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
                                <Option value="Drama">Drama</Option>
                                <Option value="Romance">Romance</Option>
                                <Option value="SciFi">Sci-Fi</Option>
                            </Select>
                        </Form.Item>
                        <Button type="primary" htmlType="submit">    
                            <Icon type="plus"/>
                            Post Prompt
                        </Button>
                    </Form>
                
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