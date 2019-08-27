import React from 'react';
import SignInModalDetails from '../Auth/SignInModalDetails'
import { Button, Modal, Icon } from 'antd';

class SignInModal extends React.Component {

    constructor(props){
        super(props)
        this.state={
            visible: false
        }
        this.showModal = this.showModal.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
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
                <Button onClick={this.showModal}>
                    <Icon type="user"/>    
                    Login
                </Button>
                <Modal
                    title="Login"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                
                <SignInModalDetails/>
                    
                </Modal>
            </div>
    );
  }
}

export default SignInModal