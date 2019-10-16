import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './Components/Layout/Home'
import Nav from './Components/Layout/Nav'
import StoryModal from './Components/Posts/StoryModal'
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
                <Redirect to="/prompts/all"/>
            )}/>
            <Route path="/prompts/all" component={Home}/>
            <Route path="/prompts/comedy" component={Home}/>
            <Route path="/prompts/horror" component={Home}/>
            <Route path="/prompts/fantasy" component={Home}/>
            <Route path="/prompts/romance" component={Home}/>
            <Route path="/prompts/scifi" component={Home}/>

            <Route path="/stories/all" component={Home}/>
            <Route path="/stories/comedy" component={Home}/>
            <Route path="/stories/horror" component={Home}/>
            <Route path="/stories/fantasy" component={Home}/>
            <Route path="/stories/romance" component={Home}/>
            <Route path="/stories/scifi" component={Home}/>
            
            <Route path="/account/:id" component={Home}/>
            <Route path="/story/:id" component={StoryModal}/>
        </div>
        </Layout>
    </Router>
)


export default App;
