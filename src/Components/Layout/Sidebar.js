import React, { Component } from 'react';
import { Menu, Icon, Divider } from 'antd';
import { NavLink } from 'react-router-dom'
import { FaLaughSquint, FaRobot, FaList } from 'react-icons/fa'
import { GiShardSword, GiRaiseZombie} from 'react-icons/gi'
import { FiMoreHorizontal } from 'react-icons/fi'
import '../../App.css'

class Sidebar extends Component {

    constructor(props){
        super(props)
        this.state = {
            mobile: null
        }
        this.updateWidth = this.updateWidth.bind(this)
        this.getWidth = this.getWidth.bind(this)
    }

    componentDidMount(){
        this.getWidth();
        window.addEventListener('resize', this.updateWidth);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.mobile !== this.state.mobile){
            this.renderMenu()
        }
    }

    getWidth() {
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

    updateWidth(){
        let mobile = this.state.mobile
        if(window.innerWidth > 768 && mobile){
            this.setState({
                mobile: false
            })
        }else if(window.innerWidth < 768 && !mobile){
            this.setState({
                mobile: null
            },() => {
                this.setState({
                    mobile: true
                })
            })
        }
    }

    renderMenu(){
        const { SubMenu } = Menu;
        if(this.state.mobile !== null){
            var mobile = this.state.mobile
            return (
                <Menu
                    onClick={this.handleClick}
                    style={this.state.mobile === false ? { 
                        height: '100vh',
                        position: 'fixed',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        paddingTop: '100px',
                        top: 0,
                        left: 0
                    } : {
                        position: 'fixed',
                        marginTop: '24px',
                        left: '0',
                        zIndex: 100
                    }}
                    selectedKeys={window.location.pathname}
                    {...(mobile ? null : { defaultOpenKeys : ['sub1', 'sub2'] })}
                    {...(mobile ? null : { openKeys : ['sub1', 'sub2'] })}
                    // defaultOpenKeys={ this.state.mobile ? ['sub1'] : ['sub1', 'sub2']}
                    mode={mobile ? 'horizontal' : 'inline'}
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
                        style={ mobile ? { width: '50%', textAlign: 'center' } : null }
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
                            }}>
                                <GiRaiseZombie style={styles.IconStyle}/>
                                Horror
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/prompts/fantasy">
                            <NavLink to={{
                                pathname: "/prompts/fantasy",
                                state: {
                                    query: 'Fantasy'
                                }
                            }}>
                                <GiShardSword 
                                    style={styles.IconStyle}
                                />
                                Fantasy
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/prompts/scifi">
                            <NavLink to={{
                                pathname: "/prompts/scifi",
                                state: {
                                    query: 'SciFi'
                                }
                            }}>
                                <FaRobot 
                                    style={styles.IconStyle} 
                                />
                                SciFi
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/prompts/other">
                            <NavLink to={{
                                pathname: "/prompts/other",
                                state: {
                                    query: 'Other'
                                }
                            }}>
                                <FiMoreHorizontal 
                                    style={styles.IconStyle}
                                />
                                Other
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>
    
                    {this.state.mobile === true ? '' : <Divider/>}
    
                    {/* STORIES PART OF SIDEBAR*/}
    
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                            <Icon type="read" />
                            <span>Stories</span>
                            </span>
                        }
                        style={ this.state.mobile ? { width: '50%', textAlign: 'center' } : null }
                    >
                        <Menu.Item key="/stories/all">
                            <NavLink to={{
                                pathname: "/stories/all",
                                state: {
                                    query: 'all'
                                }
                            }}>
                                <FaList style={styles.IconStyle}/>
                                All
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/stories/complete">
                            <NavLink to={{
                                pathname: "/stories/complete",
                                state: {
                                    query: 'complete'
                                }
                            }}>
                                <Icon type="check-circle" style={styles.IconStyle}/>
                                Complete
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/stories/comedy">
                            <NavLink to={{
                                pathname: "/stories/comedy",
                                state: {
                                    query: 'Comedy'
                                }
                            }}>
                                <FaLaughSquint               
                                    style={styles.IconStyle}
                                />
                                Comedy
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/stories/horror">
                            <NavLink to={{
                                pathname: "/stories/horror",
                                state: {
                                    query: 'Horror'
                                }
                            }}>
                                <GiRaiseZombie 
                                    style={styles.IconStyle}
                                />
                                Horror
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/stories/fantasy">
                            <NavLink to={{
                                pathname: "/stories/fantasy",
                                state: {
                                    query: 'Fantasy'
                                }
                            }}>
                                <GiShardSword 
                                    style={styles.IconStyle}
                                />
                                Fantasy
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/stories/scifi">
                            <NavLink to={{
                                pathname: "/stories/scifi",
                                state: {
                                    query: 'SciFi'
                                }
                            }}>
                                <FaRobot style={styles.IconStyle}/>
                                SciFi
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/stories/other">
                            <NavLink to={{
                                pathname: "/stories/other",
                                state: {
                                    query: 'Other'
                                }
                            }}>
                                <FiMoreHorizontal 
                                    style={styles.IconStyle}
                                />
                                Other
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>
                </Menu>        
            );
        }else{
            return <div></div>
        }
    }

    render() { 
        return(
            this.renderMenu()
        )
    }
}

const styles = {
    IconStyle: {
        marginRight: '20px',
        fontSize: '1.2em'
    }
}
 
export default Sidebar;