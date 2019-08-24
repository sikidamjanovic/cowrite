import React, { Component, Fragment } from 'react'
import { Menu, Row, Col } from 'antd'
import '../../App.css'
import SignedInLinks from '../Auth/SignedInLinks';
import SignedOutLinks from '../Auth/SignedOutLinks';
import { connect } from 'react-redux';

class Nav extends Component {
    render() {
        return (
            <div>
                <Menu id="navBar" mode="horizontal" defaultSelectedKeys={['home']}>

                    <Row className="nav-row">
                        <Col span={4} className="nav-col-left">
                            <Menu.Item key="app">
                                <h1 id="logo">coauthor</h1>
                            </Menu.Item>
                        </Col>

                        <Col span={18} offset={1} className="nav-col-right">
                            <SignedInLinks/>
                            <SignedOutLinks/>
                        </Col>
                    </Row>

                </Menu>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(Nav);