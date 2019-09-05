import React, { Component } from 'react'
import { Input, Button, Divider } from 'antd';

const { TextArea } = Input;

class SubmitChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div>
                <Input 
                    className="submit-chapter-input"
                    placeholder="Chapter Title" id="input"
                />
                <TextArea
                    className="submit-chapter-input"
                    onChange={this.onChange}
                    placeholder="Content"
                    autosize={{ minRows: 3, maxRows: 10 }}
                />
                <Button 
                    type="primary"
                    id="submit-chapter-button"
                >
                    Submit Chapter
                </Button>
                <Button>Cancel</Button>
                <Divider/>
            </div>
        );
    }
}
 
export default SubmitChapter;