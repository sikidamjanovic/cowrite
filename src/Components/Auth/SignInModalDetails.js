import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
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

    componentDidUpdate(prevProps, prevState){
        if(prevProps.authError !== this.props.authError){
            this.setState({
                error: this.props.authError
            })
        }
        if(prevState.error !== this.state.error && this.state.error !== null){
            message.error(this.state.error)
            this.setState({
                error: null
            })
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
                        prefix={<Icon type="user" style={{ color: 'rgba(255,255,255,.25)' }} />}
                        placeholder="Username"
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