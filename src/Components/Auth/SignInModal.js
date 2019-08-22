import React from 'react';
import Modal from 'react-modal';
import SignInModalDetails from '../Auth/SignInModalDetails'
import { Button } from 'antd';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    width                 : '30%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class SignInModal extends React.Component {

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                shouldCloseOnOverlayClick={true}
            >

            <Button onClick={this.props.close}>X</Button>
            
            <SignInModalDetails/>
                
            </Modal>
    );
  }
}

export default SignInModal