import React, { Component } from 'react'
import { Button } from 'antd'

class PromptsFeedHeader extends Component {
    render() {
        return (
            <div id="feed-header-container">
                <img id="feed-header-img" src={require('../../img/feedHeaderBG.png')} alt="bg"/>
                <div id="feed-header-text">
                    <div>
                        <h1>PROMPTS</h1>
                        <h4>Story ideas created and voted on by users.</h4>
                    </div>
                    <div>
                        <Button id="feed-header-button" type="primary">Post a Prompt</Button>
                        <Button id="feed-header-button" type="primary">Top All Time</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PromptsFeedHeader;