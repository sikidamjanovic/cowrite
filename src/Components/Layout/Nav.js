import React from 'react'
import { Menu, Row, Col } from 'antd'
import '../../App.css'
import SignedInLinks from '../Auth/SignedInLinks';
import SignedOutLinks from '../Auth/SignedOutLinks';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'
import logo from '../../img/logo.png'

const Nav = (props) => {
    const { auth } = props;
    const links = auth.uid ? <SignedInLinks auth={auth}/> : <SignedOutLinks/>;
    return (
        <div>
            <Menu id="navBar" mode="horizontal">

                <Row className="nav-row">
                    <NavLink to={{
                        pathname: "/"
                    }}> 
                        <Col xs={24} md={4} className="nav-col-left">
                            <Menu.Item key="app">
    
                                    <img id="logo" src={logo} alt="logo"/>

                            </Menu.Item>
                        </Col>
                    </NavLink>

                    <Col xs={22} md={18} offset={1} className="nav-col-right">
                        { links }
                    </Col>
                </Row>

            </Menu>
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Nav);