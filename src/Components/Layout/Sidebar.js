import React, { Component } from 'react';
import { Menu, Icon, Divider } from 'antd';
import { NavLink } from 'react-router-dom'
import { FaLaughSquint, FaHeart, FaRobot, FaList } from 'react-icons/fa'
import { GiShardSword, GiRaiseZombie} from 'react-icons/gi'
import '../../App.css'

class Sidebar extends Component {

    constructor(props){
        super(props)
        this.state = {
            mobile: false
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
                mobile: false
            })
        }else{
            this.setState({ 
                mobile: true
            })
        }
    }

    render() { 
        const { SubMenu } = Menu;
        return (
            <Menu
                onClick={this.handleClick}
                style={this.state.mobile === false ? { 
                    height: '100vh',
                    position: 'fixed',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    top: 15,
                    left: 0
                } : {
                    position: 'fixed',
                    width: '100%',
                    left: '0',
                    zIndex: 100
                }}
                {...(this.state.mobile === false ? {openKeys: ['sub1', 'sub2', 'sub3']} : null)}
                {...(this.state.mobile === false ? {defaultOpenKeys: ['sub1', 'sub2', 'sub3']} : null)}
                {...(this.state.mobile === true ? {forceSubMenuRender: true} : null)}
                selectedKeys={window.location.pathname}
                mode={this.state.mobile === true ? 'horizontal' : 'inline'}
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
                    <Menu.Item key="/prompts/all">
                        <NavLink to={{
                            pathname: "/prompts/all"
                        }}>
                            <FaList style={styles.IconStyle}/>
                            All
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/prompts/comedy">
                        <NavLink to={{
                            pathname: "/prompts/comedy",
                            state: {
                                query: 'Comedy'
                            }
                        }}>
                            <FaLaughSquint style={styles.IconStyle}/>
                            Comedy
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/prompts/horror">
                        <NavLink to={{
                            pathname: "/prompts/horror",
                            state: {
                                query: 'Horror'
                            }
                        }}/>
                        <GiRaiseZombie style={styles.IconStyle}/>
                        Horror
                    </Menu.Item>
                    <Menu.Item key="/prompts/fantasy">
                        <NavLink to={{
                            pathname: "/prompts/fantasy",
                            state: {
                                query: 'Fantasy'
                            }
                        }}/>
                        <GiShardSword 
                            style={styles.IconStyle}
                        />
                        Fantasy
                    </Menu.Item>
                    <Menu.Item key="/prompts/romance">
                        <NavLink to={{
                            pathname: "/prompts/romance",
                            state: {
                                query: 'Romance'
                            }
                        }}/>
                        <FaHeart 
                            style={styles.IconStyle}
                        />
                        Romance
                    </Menu.Item>
                    <Menu.Item key="/prompts/scifi">
                        <NavLink to={{
                            pathname: "/prompts/scifi",
                            state: {
                                query: 'SciFi'
                            }
                        }}/>
                        <FaRobot 
                            style={styles.IconStyle} 
                        />
                        SciFi
                    </Menu.Item>

                </SubMenu>

                {this.state.mobile === true ? '' : <Divider/>}

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
                    <Menu.Item key="/stories/all">
                        <NavLink to={{
                            pathname: "/stories/all",
                            state: {
                                query: 'all'
                            }
                        }}/>
                        <FaList style={styles.IconStyle}/>
                        All
                    </Menu.Item>
                    <Menu.Item key="/stories/comedy">
                        <NavLink to={{
                            pathname: "/stories/comedy",
                            state: {
                                query: 'Comedy'
                            }
                        }}/>
                        <FaLaughSquint               
                            style={styles.IconStyle}
                        />
                        Comedy
                    </Menu.Item>
                    <Menu.Item key="/stories/horror">
                        <NavLink to={{
                            pathname: "/stories/horror",
                            state: {
                                query: 'Horror'
                            }
                        }}/>
                        <GiRaiseZombie 
                            style={styles.IconStyle}
                        />
                        Horror
                    </Menu.Item>
                    <Menu.Item key="/stories/fantasy">
                        <NavLink to={{
                            pathname: "/stories/fantasy",
                            state: {
                                query: 'Fantasy'
                            }
                        }}/>
                        <GiShardSword 
                            style={styles.IconStyle}
                        />
                        Fantasy
                    </Menu.Item>
                    <Menu.Item key="/stories/romance">
                        <NavLink to={{
                            pathname: "/stories/romance",
                            state: {
                                query: 'Romance'
                            }
                        }}/>
                        <FaHeart 
                            style={styles.IconStyle}
                        />
                        Romance
                    </Menu.Item>
                    <Menu.Item key="/stories/scifi">
                        <NavLink to={{
                            pathname: "/stories/scifi",
                            state: {
                                query: 'SciFi'
                            }
                        }}/>
                        <FaRobot style={styles.IconStyle}/>
                        SciFi
                    </Menu.Item>
                    
                </SubMenu>

            </Menu>        
        );
    }
}

const styles = {
    IconStyle: {
        marginRight: '20px',
        fontSize: '1.2em'
    }
}
 
export default Sidebar;