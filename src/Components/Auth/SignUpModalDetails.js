import React, { Component } from 'react'
import { Form, message, Input, Button,  Row, Col } from 'antd';
import { connect } from 'react-redux';
import { signUp } from '../../Store/Actions/authActions'
import signupbg from '../../img/signupbg.png'
import '../../App.css'

class SignUpModalDetails extends Component {
  
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            username: ''
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.authError !== this.props.authError){
            this.forceUpdate()
            message.error(this.props.authError)
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
        return (
            <Row style= {{ backgroundColor: '#1a1a1a', height: '100%'}}>

                <Col xs={24} md={12} className="left-side-signup">

                    <h1>Welcome to cowrite!</h1>
                    <br></br>

                    <div className="signup-form">
                        <Form onSubmit={this.handleSubmit}>
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

                            <Button type="primary" htmlType="submit" className="sign-up-submit">    
                                Join
                            </Button>

                        </Form>
                    </div>
                </Col>

                <Col xs={0} md={12}>
                    <div className="join-bg">
                        <img src={signupbg} alt="bg" />
                    </div>
                </Col>
                

            </Row>
            
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