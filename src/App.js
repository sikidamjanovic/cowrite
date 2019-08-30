import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Layout/Home'
import Nav from './Components/Layout/Nav'
import { BackTop } from 'antd';
import './App.css'

const App = () => (
    <Router>
        <div>
            <Nav/>
            <BackTop/>
            <Route exact path="/" component={Home} />
            <Route path="/prompts/category/all" component={Home}/>
            <Route path="/prompts/category/Comedy" component={Home}/>
            <Route path="/prompts/category/Drama" component={Home}/>
            <Route path="/prompts/category/Romance" component={Home}/>
            <Route path="/prompts/category/SciFi" component={Home}/>
        </div>
    </Router>
)


export default App;
