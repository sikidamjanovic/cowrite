import React from 'react';
import Modal from 'react-modal';
import NewPostForm from './NewPostForm'
import { Button } from 'antd';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    width                 : '50%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class NewPostModal extends React.Component {

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                shouldCloseOnOverlayClick={true}
            >

            <Button onClick={this.props.close}>X</Button>
            <NewPostForm isOpen={this.props.isOpen}/>
                
            </Modal>
    );
  }
}

export default NewPostModal