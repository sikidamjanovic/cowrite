import React, { Component, Fragment } from 'react'
import { Button, Icon, Menu } from 'antd'
import SignInModal from '../Auth/SignInModal'

class SignedOutLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        };
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this)
    }

    showModal(){
        this.setState({
            openModal: true
        })
    }

    closeModal(){
        this.setState({
            openModal: false
        })
    }

    render() {
        return (
            <Fragment>

                <SignInModal isOpen={this.state.openModal} close={this.closeModal}/>

                <div>
                    <Button onClick={this.showModal}>
                        <Icon type="user" />
                        Login
                    </Button>
                </div>
                
            </Fragment>
            
        );
    }
}

export default SignedOutLinks;