import React, { Component, Fragment } from 'react'
import SignInModal from '../Auth/SignInModal'
import SignUpModal from '../Auth/SignUpModal'
import HelpModal from '../Common/HelpModal'
import '../../App.css'

class SignedOutLinks extends Component {
    
    render() {
        return (
            <Fragment>

                <div className="nav-link">
                    <HelpModal/>
                </div>

                <div className="nav-link">
                    <SignInModal/>
                </div>
                
                <div className="nav-link">
                    <SignUpModal/>
                </div>
                
            </Fragment>
            
        );
    }
}

export default SignedOutLinks;