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
                    <Col xs={24} sm={6} className="nav-col-left">
                        <Menu.Item key="app">
                            <NavLink to={{
                                pathname: "/"
                            }}>
                                <img id="logo" src={logo} alt="logo"/>
                            </NavLink>
                        </Menu.Item>
                    </Col>

                    <Col xs={0} sm={4}>
                    </Col>

                    <Col xs={22} sm={10} offset={1} className="nav-col-right">
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