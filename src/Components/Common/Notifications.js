import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {Dropdown, Menu, Badge, Icon, Button, Divider } from 'antd'

class Notifications extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaded: false,
            newNotifs: 0,
            visible: false
        }
        this.resetNotifs = this.resetNotifs.bind(this)
        window.addEventListener("scroll", this.closeMenu);
    }
  
    toggleMenu = () => {
      this.setState({ visible: !this.state.visible })
    }
  
    closeMenu = () => {
      this.setState({ visible: false })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.notifications !== this.props.notifications){
            if(prevProps.notifications !== 0 && this.props.notifications > prevProps.notifications){
                this.setState({
                    loaded: true,
                    newNotifs: (this.props.notifications.length - prevProps.notifications.length) + this.state.newNotifs
                })
            }else{
                this.setState({
                    loaded: true
                })
            }
        }
    }

    getIcon(i){
        var type = this.props.notifications[i].type
        if(type === 'conversion'){
            return <Icon type='sync'></Icon>
        }else if(type === 'chapter'){
            return <Icon type='forward'></Icon>
        }else{
            return <Icon type='check'></Icon>
        }
    }

    getNotifications(){

        var loaded = this.state.loaded
        var notifications = this.props.notifications
        var menuItems = []

        if(loaded){
            for (let i = 0; i < notifications.length; i++) {
                menuItems.push(
                    <div>
                    <Link to={{ 
                        pathname: '/story/' + notifications[i].id, 
                        state: { 
                            id: notifications[i].id,
                            auth: this.props.auth,
                            yposition: 0,
                            query: 'all'
                        }
                    }}>
                        <Menu.Item 
                            key={i}
                            id='notification'
                            onClick={this.closeMenu}
                            style={{ 
                                minHeight: '75px', 
                                minWidth: '250px',
                                display: 'flex', 
                                justifyContent: 'center',
                                flexDirection: 'row'
                        }}>
                            <div 
                                style={{ 
                                    width: '20%',
                                    display: 'flex', 
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                {this.getIcon(i)}
                            </div>
                            <div 
                                style={{ 
                                    width: '75%',
                                    display: 'flex', 
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <b>{notifications[i].title}</b>
                                <small 
                                    style={{ opacity: 0.6 }}
                                >
                                {notifications[i].notification} - {this.getTime(new Date(), notifications[i].date.toDate())}
                                </small>
                            </div>
                        </Menu.Item>
                    </Link>
                    <Menu.Divider />
                    </div>
                )
            }
            return(
                <Menu style={{ maxHeight: '80vh', overflowY: 'scroll', overflowX: 'hidden'}}>
                    {menuItems}
                </Menu>
            )
        }else{
            return <small>Loading...</small>
        }

    }

    getTime(current, posted){
        var diffMin = (current - posted) / 60000
        
        if(diffMin > 60){
            return Math.round(diffMin / 60) + 'h ago'
        }else if(diffMin > 1){
            return Math.round(diffMin) + ' min ago'
        }else{
            return 'now'
        }
    }

    resetNotifs(){
        this.setState({ newNotifs: 0 })
    }

    render() {
        return (
            <div>
                <Dropdown 
                    overlay={this.getNotifications()} 
                    trigger={['click']}
                    onVisibleChange={this.toggleMenu}
                    visible={this.state.visible}
                >
                    <Badge id="notification-badge" count={this.state.newNotifs > 10 ? '10+' : this.state.newNotifs} onClick={this.resetNotifs}>
                        <Icon type="notification" />
                    </Badge>
                </Dropdown>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        notifications: state.firestore.ordered.notifications,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            { 
                collection: 'notifications',
                limit: 20,
                orderBy: ['date', 'desc']
            }
        ]
    })
)(Notifications)