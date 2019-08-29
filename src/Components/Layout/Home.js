import React, { Component } from 'react';
import Feed from '../Layout/Feed'
import Sidebar from '../Layout/Sidebar'
import { Row, Col } from 'antd';
import '../../App.css'
import Footer from '../Layout/Footer'

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            query: ''
        }
    }

    componentDidMount(){
        this.getQuery()
    }

    getQuery(){
        if(this.props.location.state){
            this.setState({
                query: this.props.location.state.query
            })
        }
    }

    render() {
        return (
            <div>
            <div id="home">
                <Row>
                    <Col xs={12} md={4}>
                        <Sidebar query={this.updateQuery}/>
                    </Col>
                    <Col xs={12} sm={18} offset={1}  id="feed-container">
                        <Feed query={this.state.query}/>
                    </Col>
                </Row>
            </div>
                <Footer/>
            </div>
        );
    }
}

export default Home