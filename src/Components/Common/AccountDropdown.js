import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Button, Avatar } from 'antd';

class AccountDropdown extends Component {
    
    render() {

        const menu = (
            <Menu>
                <Menu.Item key="0" onClick={this.props.signOut}>
                    Sign Out
                </Menu.Item>
            </Menu>
        )

        return (
            <div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Button>
                        {this.props.auth.displayName} 
                        <Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
        );
    }
}

export default AccountDropdown
