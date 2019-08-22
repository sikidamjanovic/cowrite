import React, { Component } from 'react'
import { Form, Icon, Input, Button,  Select } from 'antd';

class SignInModalDetails extends Component {
  
    constructor() {
        super();
        this.state = {
            title: '',
            content: '',
            genre: ''
        }
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
    }

    render() {

        return (

            <Form onSubmit={this.handleSubmit} className="login-form">
                
                <Form.Item>
                    <Input
                        id="title"
                        onChange={this.handleChange} 
                        placeholder="Username"
                    />
                </Form.Item>

                <Form.Item>
                    <Input
                        id="title"
                        onChange={this.handleChange} 
                        placeholder="Password"
                    />
                </Form.Item>

                <Button type="primary" htmlType="submit">    
                    <Icon type="plus"/>
                    Login
                </Button>

            </Form>
    )
  }
}

export default SignInModalDetails