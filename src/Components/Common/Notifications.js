import React, { Component, Fragment } from 'react'
import { notification, Button } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class Notifications extends Component {

    constructor(props){
        super(props)
        this.state = {
            loaded: false
        }
    }

    componentDidUpdate(prevState, prevProps){
        const notifications = this.props.notifications
        if(prevProps.notifications !== notifications){
            return(
                notification.success({
                    duration: 5,
                    message: notifications[notifications.length - 1].message,
                    description: this.getButton()
                })
            )
        }
    }

    getButton(){
        return(
            <div>
                <p>5 min ago</p>
                <Button type="primary" style={{ marginTop: '10px' }}>Go to Story</Button>
            </div>
        )
    }

    render() {
        return (
            <Fragment>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        loaded: true,
        notifications: state.firestore.ordered.notifications,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect( props => {
        return [{ collection: 'notifications', orderBy: ['time', 'desc']}]
    })
)(Notifications)