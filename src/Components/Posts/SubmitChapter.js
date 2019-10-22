import React, { Component } from 'react'
import { Input, Button, Divider, Form, message } from 'antd';
import { connect } from 'react-redux'
import { submitChapter } from '../../Store/Actions/postActions'

const { TextArea } = Input;

class SubmitChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            remainingCharacters: 4000
        }
    }

    componentDidMount(){
        this.setState({
            postId: this.props.id,
            chapter: this.props.chapter
        })
    }

    handleChange = (e) => {
        if(e.target.id == 'content'){
            var content = e.target.value.toString()
            this.setState({
                remainingCharacters: 2000 - content.length
            })
        }
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state.remainingCharacters > 0){
            this.props.submitChapter(this.state)
        }else{
            message.error('Chapter is too long.')
        }
    }

    render() { 
        return (  
            <div>
                <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    <TextArea
                        id="content"
                        className="submit-chapter-input"
                        onChange={this.handleChange}
                        autosize={{ minRows: 3, maxRows: 15 }}
                    />
                </Form.Item>
                <span 
                    style={
                        this.state.remainingCharacters < 0 
                            ? 
                            { 
                                color: '#fa541c', 
                                opacity: 0.5
                            } 
                            : 
                            { 
                                opacity: 0.5 
                            }
                    }
                >
                    <small>{this.state.remainingCharacters} characters left</small>
                </span>
                <br></br>
                <Button 
                    type="primary"
                    id="submit-chapter-button"
                    htmlType="submit"
                >
                    Submit
                </Button>
                </Form>
            </div>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitChapter: (submission) => dispatch(submitChapter(submission))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitChapter)

