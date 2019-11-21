import React, { Component, Fragment } from "react";
import { Modal, Radio, Icon, Row, Input, message, Button } from "antd"
import { getFirestore } from "redux-firestore";
import '../../App.css'

class ReportModal extends Component {
    constructor(props){
        super(props)
        this.state = { 
            visible: false,
            value: null,
            text: ''
        }
        this.onChange = this.onChange.bind(this)
        this.handleReport = this.handleReport.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
    }

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

    onChange = e => {
        console.log('radio1 checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
    };

    handleReport = e => {
        var text = this.state.text
        var value = this.state.value

        if(value === null){
            message.error('Please select a type.')
        }else if(text.length === 0){
            message.error('Please provide reasoning.')
        }else{
            getFirestore().collection('reports').doc().set({
                postId: this.props.id,
                type: this.props.type,
                category: value,
                reason: text
            })
            this.setState({
                visible: false
            },() => {
                if(this.type === "story"){
                    message.success("Story has been reported! We'll be looking into it.")
                }else{
                    message.success("Prompt has been reported! We'll be looking into it.")
                }
            })
        }
    };

    handleTextChange = e => {
        this.setState({
            text: e.target.value
        })
    }
  
    render() {
        const { TextArea } = Input;
        return (
            <Fragment>
                {this.props.component === "card" ?
                    <button id="cardActionBtn" onClick={this.showModal}>
                        <Icon type="warning"/>
                    </button> :
                    <Button type="link" onClick={this.showModal}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <Icon type="warning"/>
                        </span>
                    </Button>
                }
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleReport}
                    okText="Report"
                >
                    <Row style={{ padding: '24px' }}>
                        <Row style={{ marginBottom: '24px' }}>
                            <h3>Report '{this.props.title}'</h3>
                        </Row>
                        <Row style={{ marginTop: '24px', marginBottom: '24px' }}>
                            <Radio.Group onChange={this.onChange} value={this.state.value}>
                                <Radio value='language'>Hateful language</Radio>
                                <Radio value='invalid'>
                                    {this.props.type === "story" ?
                                        'Not a story' :
                                        'Not a prompt'
                                    }
                                </Radio>
                                <Radio value='other'>Other</Radio>
                            </Radio.Group>
                        </Row>
                        <Row>
                            <TextArea 
                                placeholder="Reason" 
                                rows={5}
                                onChange={this.handleTextChange}
                            />
                        </Row>
                    </Row>
                </Modal>
            </Fragment>
      );
    }
}

export default ReportModal;