import React, { Component, Fragment } from 'react'
import NewPostModal from '../Posts/NewPostModal';
import { signOut } from '../../Store/Actions/authActions'
import { connect } from 'react-redux'
import HelpModal from '../Common/HelpModal'
import AccountDropdown from '../Common/AccountDropdown'
import Notifications from '../Common/Notifications'
import '../../App.css'

class SignedInLinks extends Component {

    render() {
        return (
            <Fragment>

                <div className="nav-link">
                    <NewPostModal title="Prompt"/>
                </div>

                <div className="nav-link">
                    <HelpModal/>
                </div>

                <div className="nav-link">
                    <AccountDropdown signOut={this.props.signOut} auth={this.props.auth}/>
                </div>

                <div className="nav-link">
                    <Notifications/>
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