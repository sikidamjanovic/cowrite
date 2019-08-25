import React, { Component, Fragment } from 'react'
import { Button, Icon, Menu } from 'antd'
import NewPostModal from '../Posts/NewPostModal';
import { signOut } from '../../Store/Actions/authActions'
import { connect } from 'react-redux'
import SignInModal from '../Auth/SignInModal'

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
            
                <div>
                    <Button type="danger" id="newPrompt" onClick={this.props.signOut}>
                        Logout
                    </Button>
                </div>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);