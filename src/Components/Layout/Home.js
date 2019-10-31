import React, { Component } from 'react';
import PromptsFeed from '../Layout/PromptsFeed'
import StoriesFeed from '../Layout/StoriesFeed'
import Sidebar from '../Layout/Sidebar'
import UserProfile from '../Profile/UserProfile'
import { Row, Col } from 'antd';
import '../../App.css'
import Footer from '../Layout/Footer'
import { connect } from 'react-redux';

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            query: '',
            getAll: false,
            sort: 'createdAt',
            yposition: 0
        }
        this.sort = this.sort.bind(this)
    }

    componentDidMount(){
        this.getQuery()
        this.getScrollPosition()
        this.getAll()
    }

    getQuery(){
        if(this.props.location.state){
            this.setState({
                query: this.props.location.state.query
            })
        }
    }

    getScrollPosition(){
        if(this.props.location.state){
            if(this.props.location.state.hasOwnProperty('yposition')){
                this.setState({
                    yposition: this.props.location.state.yposition
                })
            }
        }
    }

    getAll(){
        if(window.location.pathname.substr(-3) === 'all'){
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

    showRelevantFeed(){
        if(window.location.pathname.slice(1,8) == 'prompts'){
            return <PromptsFeed sort={this.sort} sortBy={this.state.sort} getAll={this.state.getAll} query={this.state.query}/>
        }else if(window.location.pathname.slice(1,8) == 'profile'){
            return <UserProfile auth={this.props.auth} isOwnProfile={true}/>
        }else{
            return <StoriesFeed sort={this.sort} sortBy={this.state.sort} getAll={this.state.getAll} query={this.state.query} yposition={this.state.yposition}/>
        }
    }    

    render() {
        return (
            <div>
            <div id="home">
                <Row>
                    <Col xs={24} md={5} xl={3}>
                        <Sidebar auth={this.props.auth} query={this.updateQuery}/>
                    </Col>
                    <Col xs={22} md={17} xl={19} offset={1}  id="feed-container">
                        {this.showRelevantFeed()}
                    </Col>
                </Row>
            </div>
            <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Home);