import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Button, Avatar } from 'antd';
import { NavLink } from 'react-router-dom'
import { getFirestore } from 'redux-firestore'

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
    
    getAvatar(){
        var that = this
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
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    render() {

        const menu = (
            <Menu>
                <Menu.Item key="0" onClick={this.props.signOut}>
                    Sign Out
                </Menu.Item>
                <Menu.Item>
                    <NavLink to={{
                        pathname: "/profile"
                    }}>
                        Profile
                    </NavLink>
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
