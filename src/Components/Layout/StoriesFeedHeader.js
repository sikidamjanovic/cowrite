import React, { Component } from 'react'
import HelpModal from '../Common/HelpModal'

class StoriesFeedHeader extends Component {
    render() {
        return (
            <div>
                <div id="feed-header-text">
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px'}}>
                        <h1 style={{ marginRight: '10px', marginBottom: 0 }}>Stories</h1>
                        <HelpModal step={2}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default StoriesFeedHeader;