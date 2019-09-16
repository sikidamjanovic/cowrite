import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './Components/Layout/Home'
import Nav from './Components/Layout/Nav'
import { BackTop, Layout } from 'antd';
import './App.css'

const App = () => (
    <Router>
        <Layout>
        <div>
            <Nav/>
            <BackTop/>
            {/* Redirect user to prompts during inital load */}
            <Route exact path="/" render={() => (
                <Redirect to="/prompts/category/all"/>
            )}/>
            <Route path="/prompts/category/all" component={Home}/>
            <Route path="/prompts/category/Comedy" component={Home}/>
            <Route path="/prompts/category/Drama" component={Home}/>
            <Route path="/prompts/category/Romance" component={Home}/>
            <Route path="/prompts/category/SciFi" component={Home}/>
            <Route path="/stories/category/Comedy" component={Home}/>
        </div>
        </Layout>
    </Router>
)


export default App;
