import React, { Component } from 'react'
import { Modal, Button, Carousel, Icon } from 'antd';
import NewPostModal from '../Posts/NewPostModal'
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
                    visible={this.state.visible}
                    onCancel={this.handleClose}
                    footer={null}
                    style={{ backgroundColor: '#111717' }}
                >
                <Carousel 
                    ref={node => (this.carousel = node)}
                    dots={false}
                    className="help-carousel"
                >
                    <div>
                        <h1>Step 1: Prompts</h1>
                        <br></br>
                        <p>
                            Post and like story ideas (called prompts).<br></br>
                            Prompts that get <bold>15</bold> likes within 2 days become stories!<br></br>
                            Those that don't get deleted.
                        </p>
                        <br></br>
                        <NewPostModal title="New Prompt"/>
                    </div>
                    <div>
                        <h1>Step 2: Stories</h1>
                        <br></br>
                        <p>
                            Stories are divided into multiple chapters.<br></br>
                            Users then submit their versions 
                        </p>
                    </div>
                    <div>
                        <h1>Step 3</h1>
                        <p>
                            Users submit written chapters for these stories. The highest ranked submission
                            is chosen as that chapter. Then, the next chapter submission process begins until the story
                            is complete.
                        </p>
                    </div>
                </Carousel>
                <div style={{ textAlign: "center", paddingBottom: '24px', backgroundColor: '#111717' }}>
                    <Button onClick={this.previous} style={{ marginRight: '7px' }}>
                        <Icon type="left"/>
                        Prev
                    </Button>
                    <Button onClick={this.next}>
                        Next
                        <Icon type="right"/>
                    </Button>
                </div>
                </Modal>
            </div>
        );
    }
}

export default HelpModal;