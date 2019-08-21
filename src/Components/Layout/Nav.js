import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, Button } from 'antd'
import NewPostModal from '../Posts/NewPostModal';
import '../../App.css'

class Nav extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        };
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this)
    }

    showModal(){
        this.setState({
            openModal: true
        })
    }

    closeModal(){
        this.setState({
            openModal: false
        })
    }

    render() {
        return (
            <div>

                <NewPostModal isOpen={this.state.openModal} close={this.closeModal}/>

                <Menu id="navBar" mode="horizontal" defaultSelectedKeys={['home']}>

                    <Button type="primary" id="newPrompt" onClick={this.showModal}>
                        <Icon type="plus"/>
                        New Prompt
                    </Button>

                    <Menu.Item key="home">
                        <Link to="/">
                            <Icon type="home" />
                            Home
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="book">
                        <Link to="/saved">
                            <Icon type="book" />
                            Sign Out
                        </Link>
                    </Menu.Item>

                </Menu>

            </div>

        );
    }
}

export default Nav;