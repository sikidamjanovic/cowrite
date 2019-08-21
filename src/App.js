import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Layout/Home'
import Nav from './Components/Layout/Nav'
import './App.css'

const App = () => (
    <Router>
        <div>

            <Nav/>
            <Home/>

        </div>
    </Router>
)


export default App;
