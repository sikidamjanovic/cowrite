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
            query: '',
            getAll: false,
            sort: 'createdAt'
        }
        this.sort = this.sort.bind(this)
    }

    componentDidMount(){
        this.getQuery()
        this.getAll()
    }

    getQuery(){
        if(this.props.location.state){
            this.setState({
                query: this.props.location.state.query
            })
        }
    }

    getAll(){
        if(window.location.pathname.substr(-3) == 'all'){
            this.setState({
                getAll: true
            })
        }
    }

    sort(condition){
        this.setState({
            sort: condition
        })
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
                        <Feed sort={this.sort} sortBy={this.state.sort} getAll={this.state.getAll} query={this.state.query}/>
                    </Col>
                </Row>
            </div>
            <Footer/>
            </div>
        );
    }
}

export default Home