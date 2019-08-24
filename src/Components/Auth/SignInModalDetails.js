import React, { Component } from 'react'
import { Form, Icon, Input, Button,  Select } from 'antd';
import { connect } from 'react-redux';
import { signIn } from '../../Store/Actions/authActions'

class SignInModalDetails extends Component {
  
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render() {
        const { authError } = this.props
        return (

            <Form onSubmit={this.handleSubmit} className="login-form">
                
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
                    Login
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
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInModalDetails)