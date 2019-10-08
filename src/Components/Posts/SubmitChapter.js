import React, { Component } from 'react'
import { Input, Button, Divider, Form } from 'antd';
import { connect } from 'react-redux'
import { submitChapter } from '../../Store/Actions/postActions'

const { TextArea } = Input;

class SubmitChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
    }

    componentDidMount(){
        this.setState({
            postId: this.props.id
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state);
        this.props.submitChapter(this.state)
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
                        placeholder="Content"
                        autosize={{ minRows: 3, maxRows: 10 }}
                    />
                </Form.Item>

                <Button 
                    type="primary"
                    id="submit-chapter-button"
                    htmlType="submit"
                >
                    Submit Chapter
                </Button>
                </Form>
                <Divider/>
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

