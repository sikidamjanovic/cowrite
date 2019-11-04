import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Button, Avatar } from 'antd';
import { NavLink, withRouter } from 'react-router-dom'

class AccountDropdown extends Component {
    
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
                    <Button type="dashed">
                        {this.props.auth.displayName} 
                        <Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
        );
    }
}

export default AccountDropdown
