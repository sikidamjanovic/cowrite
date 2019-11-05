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
                                <Icon type="sync"/>
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
                                {notifications[i].notification} - {this.getTime(new Date(), notifications[i].time.toDate())}
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
        var diffMs = (current - posted); // milliseconds between now & Christmas
        var diffDays = Math.floor(diffMs / 86400000); // days
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

        if(diffDays > 1){
            return diffDays + ' days ago'
        }else if(diffHrs > 1){
            return diffHrs + ' hours ago'
        }else if(diffMins > 1){
            return diffMins + ' min ago'
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
                sortBy: 'time'
            }
        ]
    })
)(Notifications)