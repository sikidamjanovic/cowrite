import React from 'react';
import SignUpModalDetails from '../Auth/SignUpModalDetails'
import { Modal, Button, Icon } from 'antd';

class SignUpModal extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            visible: false
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.showModal = this.showModal.bind(this)
    }

    showModal(){
        this.setState({
            visible: true
        })
    }

    handleCancel(){
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <div>
                <Button 
                    onClick={this.showModal}
                    type="primary"
                >
                    <Icon type="user"/>    
                    Join
                </Button>
                <Modal
                    title="Join CoAuthor"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                <SignUpModalDetails/>
                </Modal>
            </div>
    );
  }
}

export default SignUpModal