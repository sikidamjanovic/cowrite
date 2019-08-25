import React from 'react';
import Modal from 'react-modal';
import SignUpModalDetails from '../Auth/SignUpModalDetails'
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

class SignUpModal extends React.Component {

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                shouldCloseOnOverlayClick={true}
            >

            <Button onClick={this.props.close}>X</Button>
            
            <SignUpModalDetails/>
                
            </Modal>
    );
  }
}

export default SignUpModal