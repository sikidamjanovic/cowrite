import React, { Component } from 'react'
import { Form, Icon, Input, Button,  Select } from 'antd';
import { connect } from 'react-redux';
import { signUp } from '../../Store/Actions/authActions'

class SignUpModalDetails extends Component {
  
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            username: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render() {
        const { authError } = this.props
        return (

            <Form onSubmit={this.handleSubmit} className="signup-form">
                <Form.Item>
                    <Input
                        id="username"
                        onChange={this.handleChange} 
                        placeholder="Username"
                    />
                </Form.Item>

                <Form.Item>
                    <Input
                        id="email"
                        onChange={this.handleChange} 
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item>
                    <Input
                        id="password"
                        onChange={this.handleChange} 
                        placeholder="Password"
                    />
                </Form.Item>

                <Button type="primary" htmlType="submit">    
                    <Icon type="plus"/>
                    Sign Up
                </Button>
                <div className="red-text center">
                    { authError ? <p>{authError}</p> : null }
                </div>

            </Form>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModalDetails)