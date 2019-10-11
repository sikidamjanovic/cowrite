import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { NavLink, withRouter } from 'react-router-dom'
import { FaLaughSquint, FaHeart, FaRobot, FaList } from 'react-icons/fa'
import { GiDramaMasks } from 'react-icons/gi'
import '../../App.css'

class Sidebar extends Component {

    constructor(props){
        super(props)
        this.state = {
            width: 0
        }
        this.updateWidth = this.updateWidth.bind(this)
    }

    componentDidMount(){
        this.updateWidth();
        window.addEventListener('resize', this.updateWidth);
    }

    updateWidth() {
        if(window.innerWidth > 768){
            this.setState({ 
                width: window.innerWidth,
                openKeys: ['sub1', 'sub2']
            });
        }else{
            this.setState({ 
                width: window.innerWidth,
                openKeys: ['']
            });
        }
    }

    render() { 
        const { SubMenu } = Menu;
        return (
            <Menu
                onClick={this.handleClick}
                style={this.state.width > 768 ? { 
                    height: '100vh',
                    position: 'fixed',
                    left: 0
                } : {
                    position: 'fixed',
                    left: '0',
                    zIndex: 100
                }}
                openKeys={this.state.openKeys}
                selectedKeys={window.location.pathname}
                mode={this.state.width < 768 ? 'horizontal' : 'inline'}
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
                            <FaList style={styles.IconStyle}/>
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
                            <FaLaughSquint style={styles.IconStyle}/>
                            Comedy
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/prompts/category/Drama">
                        <NavLink to={{
                            pathname: "/prompts/category/Drama",
                            state: {
                                query: 'Drama'
                            }
                        }}/>
                        <GiDramaMasks style={styles.IconStyle}/>
                        Drama
                    </Menu.Item>
                    <Menu.Item key="/prompts/category/Romance">
                        <NavLink to={{
                            pathname: "/prompts/category/Romance",
                            state: {
                                query: 'Romance'
                            }
                        }}/>
                        <FaHeart style={styles.IconStyle}/>
                        Romance
                    </Menu.Item>
                    <Menu.Item key="/prompts/category/SciFi">
                        <NavLink to={{
                            pathname: "/prompts/category/SciFi",
                            state: {
                                query: 'SciFi'
                            }
                        }}/>
                        <FaRobot style={styles.IconStyle}/>
                        SciFi
                    </Menu.Item>
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
                    <Menu.Item key="/stories/category/all">
                        <NavLink to={{
                            pathname: "/stories/category/all",
                            state: {
                                query: 'all'
                            }
                        }}/>
                        <FaList style={styles.IconStyle}/>
                        All
                    </Menu.Item>
                    <Menu.Item key="/stories/category/Comedy">
                        <NavLink to={{
                            pathname: "/stories/category/Comedy",
                            state: {
                                query: 'Comedy'
                            }
                        }}/>
                        <FaLaughSquint style={styles.IconStyle}/>
                        Comedy
                    </Menu.Item>
                    <Menu.Item key="/stories/category/Drama">
                        <NavLink to={{
                            pathname: "/stories/category/Drama",
                            state: {
                                query: 'Drama'
                            }
                        }}/>
                        <GiDramaMasks style={styles.IconStyle}/>
                        Drama
                    </Menu.Item>
                    <Menu.Item key="/stories/category/Romance">
                        <NavLink to={{
                            pathname: "/stories/category/Romance",
                            state: {
                                query: 'Romance'
                            }
                        }}/>
                        <FaHeart style={styles.IconStyle}/>
                        Romance
                    </Menu.Item>
                    <Menu.Item key="/stories/category/SciFi">
                        <NavLink to={{
                            pathname: "/stories/category/SciFi",
                            state: {
                                query: 'SciFi'
                            }
                        }}/>
                        <FaRobot style={styles.IconStyle}/>
                        SciFi
                    </Menu.Item>
                </Menu.ItemGroup>
                </SubMenu>

                {/* OTHER PART OF SIDEBAR*/}

                <SubMenu
                    key="sub3"
                    title={
                        <span>
                        <Icon type="edit" />
                        <span>Other</span>
                        </span>
                    }
                >
                <Menu.ItemGroup key="g5">
                    <Menu.Item key="/account">
                        <NavLink to={{
                            pathname: "/account/" + this.props.auth.displayName,
                            state: {
                                query: 'acount'
                            }
                        }}/>
                        <FaLaughSquint style={styles.IconStyle}/>
                        Account
                    </Menu.Item>
                    <Menu.Item key="/about">
                        <NavLink to={{
                            pathname: "/about",
                            state: {
                                query: 'about'
                            }
                        }}/>
                        <FaLaughSquint style={styles.IconStyle}/>
                        About
                    </Menu.Item>
                </Menu.ItemGroup>
                </SubMenu>


            </Menu>        
        );
    }
}

const styles = {
    IconStyle: {
        marginRight: '20px'
    }
}
 
export default Sidebar;