import React, { Component } from 'react'
import { Modal, Button, Carousel, Icon } from 'antd';
import '../../App.css'

class HelpModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false
        }
        this.showModal = this.showModal.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.carousel = React.createRef();
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleClose = e => {
        console.log(e)
        this.setState({
            visible: false
        })
    }

    next() {
        this.carousel.next();
    }

    previous() {
        this.carousel.prev();
    }

    render() {
        return (
            <div>
                <Button onClick={this.showModal}>
                    <Icon type="question"/>
                </Button>
                <Modal
                    title="How CoAuthor works"
                    visible={this.state.visible}
                    onCancel={this.handleClose}
                    footer={null}
                >
                <Carousel 
                    ref={node => (this.carousel = node)}
                    dots={false}
                >
                    <div>
                        <h1>
                            Step 1
                        </h1>
                        <p>Prompts are posted and voted on by users</p>
                    </div>
                    <div>
                        <h1>
                            Step 2
                        </h1>
                        <p>The highest ranked prompts become stories</p>
                    </div>
                    <div>
                        <h1>    
                            Step 3
                        </h1>
                        <p>Users submit written chapters for these stories. The highest ranked submission
                            is chosen as that chapter. Then, the next chapter submission process begins until the story
                            is complete.
                        </p>
                    </div>

                </Carousel>
                <div style={{ textAlign: "center" }}>
                    <Button onClick={this.previous}>
                        <Icon type="left"/>
                        Prev
                    </Button>
                    <Button onClick={this.next}>
                        <Icon type="right"/>
                        Next
                    </Button>
                </div>
                </Modal>
            </div>
        );
    }
}

export default HelpModal;