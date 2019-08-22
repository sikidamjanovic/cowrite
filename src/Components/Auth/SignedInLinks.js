import React, { Component, Fragment } from 'react'
import { Button, Icon, Menu } from 'antd'
import NewPostModal from '../Posts/NewPostModal';

class SignedInLinks extends Component {
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

                <NewPostModal isOpen={this.state.openModal} close={this.closeModal}/>

                <div>
                    <Button type="primary" id="newPrompt" onClick={this.showModal}>
                        <Icon type="plus"/>
                        New Prompt
                    </Button>
                </div>

            </Fragment>
        );
    }
}

export default SignedInLinks;