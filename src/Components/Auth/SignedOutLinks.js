import React, { Component, Fragment } from 'react'
import { Button, Icon, Menu } from 'antd'
import SignInModal from '../Auth/SignInModal'
import SignUpModal from '../Auth/SignUpModal'
import HelpModal from '../Common/HelpModal'

class SignedOutLinks extends Component {
    
    render() {
        return (
            <Fragment>

                <div>
                    <HelpModal/>
                </div>

                <div>
                    <SignInModal/>
                </div>
                
                <div>
                    <SignUpModal/>
                </div>
                
            </Fragment>
            
        );
    }
}

export default SignedOutLinks;