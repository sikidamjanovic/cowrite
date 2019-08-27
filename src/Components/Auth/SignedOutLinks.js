import React, { Component, Fragment } from 'react'
import { Button, Icon, Menu } from 'antd'
import SignInModal from '../Auth/SignInModal'
import SignUpModal from '../Auth/SignUpModal'
import HelpModal from '../Common/HelpModal'

class SignedOutLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            secondOpenModal: false
        };
    }

    showModal = () => {
        this.setState({
            openModal: true
        })
    }

    closeModal = () => {
        this.setState({
            openModal: false
        })
    }

    showSecondModal = () => {
        this.setState({
            secondOpenModal: true
        })
    }

    closeSecondModal = () => {
        this.setState({
            secondOpenModal: false
        })
    }
    render() {
        return (
            <Fragment>

                <SignInModal isOpen={this.state.openModal} close={this.closeModal}/>
                <SignUpModal isOpen={this.state.secondOpenModal} close={this.closeSecondModal}/>

                <div>
                    <HelpModal/>
                </div>

                <div>
                    <Button onClick={this.showModal}>
                        <Icon type="user" />
                        Login
                    </Button>
                </div>
                
                <div>
                    <Button onClick={this.showSecondModal}>
                        <Icon type="user" />
                        Sign Up
                    </Button>
                </div>
                
            </Fragment>
            
        );
    }
}

export default SignedOutLinks;