import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Button, Avatar, message } from 'antd';
import { NavLink } from 'react-router-dom'
import { getFirestore } from "redux-firestore";
import { FiLogOut } from 'react-icons/fi'

class AccountDropdown extends Component {

    constructor(props){
        super(props)
        this.state = {
            photoURL: null
        }
        this.getAvatar = this.getAvatar.bind(this)
    }

    componentDidMount(){
        this.getAvatar()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.displayName !== this.props.displayName){
            window.location.reload()
        }
    }

    getAvatar(){
        var that = this
        if(this.props.auth.displayName !== null){
            getFirestore().collection('users').doc(this.props.auth.displayName).get()
            .then(function(doc) {
                if (doc.exists) {
                    if(doc.data().photoURL !== undefined){
                        that.setState({
                            photoURL: doc.data().photoURL
                        })
                    }else{
                        that.setState({
                            photoURL: null
                        })
                    }
                } else {
                    message.error('Pic does not exist')
                }
            }).catch(function(error) {
                message.error(error)
            });
        }
    }

    render() {

        const menu = (
            <Menu>
                <Menu.Item>
                    <NavLink to={{
                        pathname: "/user/" + this.props.auth.displayName
                    }}>
                        <Icon type="user" style={{ marginRight: '7px' }}/>
                        Profile
                    </NavLink>
                </Menu.Item>
                <Menu.Item onClick={this.props.signOut} style={{ display: 'flex', alignItems: 'center'}}>
                    <FiLogOut style={{ marginRight: '7px' }}/>
                    Logout
                </Menu.Item>
            </Menu>
        )

        return (
            <div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Button type="dashed" style={{ background: 'none' }}>
                        {this.state.photoURL !== null ?
                            <Avatar size="small" style={{ marginRight: '10px' }} src={this.state.photoURL}/> :
                            <Avatar size="small" style={{ background: '#111717', color: '#171F22', marginRight: '14px' }} icon="user" />
                        }
                        {this.props.auth.displayName} 
                        <Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
        );
    }
}

export default AccountDropdown
