import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../../Store/Actions/postActions'
import { Form, Icon, Input, Button,  Select } from 'antd';

class NewPostForm extends Component {
  
    constructor() {
        super();
        this.state = {
            title: '',
            content: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.createPost(this.state)
    }

    render() {

        const { TextArea } = Input;
        const { Option } = Select;

        return (

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
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="comedy">Comedy</Option>
                        <Option value="drama">Drama</Option>
                        <Option value="romance">Romance</Option>
                        <Option value="scifi">Sci-Fi</Option>

                    </Select>
                </Form.Item>

                <Button type="primary" htmlType="submit">    
                    <Icon type="plus"/>
                    Post Prompt
                </Button>

            </Form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => dispatch(createPost(post))
    }
}

export default connect(null, mapDispatchToProps)(NewPostForm)