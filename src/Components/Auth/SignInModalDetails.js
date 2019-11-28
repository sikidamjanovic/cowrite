import React, { Component } from 'react'
import { Form, Icon, Input, Button, Alert } from 'antd';
import { connect } from 'react-redux';
import { signIn } from '../../Store/Actions/authActions'
import '../../App.css'

class SignInModalDetails extends Component {
  
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: null
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
        return (
            <div>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <h2>Login</h2>
                <br></br>
                <Form.Item>
                    <Input
                        id="email"
                        onChange={this.handleChange} 
                        prefix={<Icon type="mail" style={{ color: 'rgba(255,255,255,.25)' }} />}
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item>
                    <Input.Password
                        id="password"
                        onChange={this.handleChange} 
                        prefix={<Icon type="lock" style={{ color: 'rgba(255,255,255,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                {this.props.authError ?
                    <Alert
                        message="Error"
                        description={this.props.authError}
                        type="error"
                        showIcon
                    /> :
                    null
                }
                <Button type="primary" htmlType="submit">    
                    <Icon type="plus"/>
                    Login
                </Button>
            </Form>
            </div>
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