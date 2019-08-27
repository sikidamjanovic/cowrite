import React, { Component, Fragment } from 'react'
import NewPostModal from '../Posts/NewPostModal';
import { signOut } from '../../Store/Actions/authActions'
import { connect } from 'react-redux'
import HelpModal from '../Common/HelpModal'
import AccountDropdown from '../Common/AccountDropdown'

class SignedInLinks extends Component {

    render() {
        return (
            <Fragment>

                <div>
                    <NewPostModal/>
                </div>

                <div>
                    <HelpModal/>
                </div>

                <div>
                    <AccountDropdown signOut={this.props.signOut} auth={this.props.auth}/>
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