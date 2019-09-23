import React from 'react'
import { Menu, Row, Col } from 'antd'
import '../../App.css'
import SignedInLinks from '../Auth/SignedInLinks';
import SignedOutLinks from '../Auth/SignedOutLinks';
import { connect } from 'react-redux';

const Nav = (props) => {
    const { auth } = props;
    const links = auth.uid ? <SignedInLinks auth={auth}/> : <SignedOutLinks/>;
    return (
        <div>
            <Menu id="navBar" mode="horizontal">

                <Row className="nav-row">
                    <Col span={4} className="nav-col-left">
                        <Menu.Item key="app">
                            <h1 id="logo">cowrite</h1>
                        </Menu.Item>
                    </Col>

                    <Col span={10}>
                    </Col>

                    <Col span={8} offset={1} className="nav-col-right">
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