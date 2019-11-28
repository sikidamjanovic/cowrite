import React from 'react'
import { Menu, Row, Col } from 'antd'
import '../../App.css'
import SignedInLinks from '../Auth/SignedInLinks';
import SignedOutLinks from '../Auth/SignedOutLinks';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import logo from '../../img/logo.png'

const Nav = (props) => {
    const { auth } = props;
    const links = auth.uid ? <SignedInLinks auth={auth}/> : <SignedOutLinks/>;
    return (
        <div>
            <Menu id="navBar" mode="horizontal">

                <Row className="nav-row">
                    <Col xs={24} md={5} xl={3} className="nav-col-left">
                    <Link to={{
                        pathname: "/"
                    }}>
                        <img id="logo" src={logo} alt="logo"/>
                    </Link>
                    </Col>

                    <Col xs={24} md={18} xl={20} className="nav-col-right">
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