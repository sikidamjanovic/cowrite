import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import '../../App.css'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { SubMenu } = Menu;
        return (
            <Menu
                onClick={this.handleClick}
                style={{ width: '100%', height: '100vh' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                id="sidebar"
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                        <Icon type="edit" />
                        <span>Prompts</span>
                        </span>
                    }
                >

                <Menu.ItemGroup key="g1" title="Filter">
                    <Menu.Item key="1">Hot</Menu.Item>
                    <Menu.Item key="2">Most Liked</Menu.Item>
                </Menu.ItemGroup>

                <Menu.ItemGroup key="g2" title="Categories">
                    <Menu.Item key="3">Comedy</Menu.Item>
                    <Menu.Item key="4">Drama</Menu.Item>
                    <Menu.Item key="5">Romance</Menu.Item>
                    <Menu.Item key="6">Sci-Fi</Menu.Item>
                    <Menu.Item key="7">Other</Menu.Item>
                </Menu.ItemGroup>

                </SubMenu>

                {/* STORIES PART OF SIDEBAR*/}

                <SubMenu
                    key="sub2"
                    title={
                        <span>
                        <Icon type="edit" />
                        <span>Stories</span>
                        </span>
                    }
                >

                <Menu.ItemGroup key="g3" title="Filter">
                    <Menu.Item key="8">Recently Completed</Menu.Item>
                    <Menu.Item key="9">Most Liked</Menu.Item>
                    <Menu.Item key="10">Best Rated</Menu.Item>
                </Menu.ItemGroup>

                <Menu.ItemGroup key="g4" title="Categories">
                    <Menu.Item key="11">Comedy</Menu.Item>
                    <Menu.Item key="12">Drama</Menu.Item>
                    <Menu.Item key="13">Romance</Menu.Item>
                    <Menu.Item key="14">Sci-Fi</Menu.Item>
                    <Menu.Item key="15">Other</Menu.Item>
                </Menu.ItemGroup>

                </SubMenu>

                {/* ACCOUNT PART OF SIDEBAR */}


                <SubMenu
                    key="sub3"
                    title={
                        <span>
                        <Icon type="user" />
                        <span>Account</span>
                        </span>
                    }
                >

                <Menu.ItemGroup key="g5" title="Filter">
                    <Menu.Item key="16">Posts</Menu.Item>
                    <Menu.Item key="17">Liked</Menu.Item>
                    <Menu.Item key="18">Saved</Menu.Item>
                    <Menu.Item key="19">Profile</Menu.Item>
                </Menu.ItemGroup>

                </SubMenu>

            </Menu>        
        );
    }
}
 
export default Sidebar;