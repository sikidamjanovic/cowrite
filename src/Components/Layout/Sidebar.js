import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { NavLink, withRouter } from 'react-router-dom'
import '../../App.css'

class Sidebar extends Component {
    render() { 
        const { SubMenu } = Menu;
        return (
            <Menu
                onClick={this.handleClick}
                style={{ width: '100%', height: '100vh' }}
                defaultOpenKeys={['sub1']}
                selectedKeys={window.location.pathname}
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

                <Menu.ItemGroup key="g2" title="Categories">
                    <Menu.Item key="/prompts/category/all">
                        <NavLink to={{
                            pathname: "/prompts/category/all"
                        }}>
                            All
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/prompts/category/Comedy">
                        <NavLink to={{
                            pathname: "/prompts/category/Comedy",
                            state: {
                                query: 'Comedy'
                            }
                        }}>
                            Comedy
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/prompts/category/Drama">
                        <NavLink to={{
                            pathname: "/prompts/category/Drama",
                            state: {
                                query: 'Drama'
                            }
                        }}/>Drama
                    </Menu.Item>
                    <Menu.Item key="/prompts/category/Romance">
                        <NavLink to={{
                            pathname: "/prompts/category/Romance",
                            state: {
                                query: 'Romance'
                            }
                        }}/>Romance
                    </Menu.Item>
                    <Menu.Item key="/prompts/category/SciFi">
                        <NavLink to={{
                            pathname: "/prompts/category/SciFi",
                            state: {
                                query: 'SciFi'
                            }
                        }}/>SciFi
                    </Menu.Item>
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

                <Menu.ItemGroup key="g4" title="Categories">
                    <Menu.Item key="/stories/category/Comedy">
                        <NavLink to={{
                            pathname: "/stories/category/Comedy",
                            state: {
                                query: 'Comedy'
                            }
                        }}/>Comedy
                    </Menu.Item>
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