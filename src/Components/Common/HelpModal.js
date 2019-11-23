import React, { Component, Fragment } from 'react'
import { Modal, Button, Carousel, Icon } from 'antd';
import NewPostModal from '../Posts/NewPostModal'
import { NavLink } from 'react-router-dom'
import '../../App.css'

class HelpModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            slide: 1
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
        this.setState({
            slide: this.state.slide + 1
        })
    }

    previous() {
        this.carousel.prev();
        this.setState({
            slide: this.state.slide - 1
        })
    }

    renderButtons(){
        if(this.state.slide === 1){
            return(
                <Button onClick={this.next}>
                    Next
                    <Icon type="right"/>
                </Button>
            )        
        }else if(this.state.slide === 2){
            return(
                <Fragment>
                    <Button onClick={this.previous} style={{ marginRight: '7px' }}>
                        <Icon type="left"/>
                        Prev
                    </Button>
                    <Button onClick={this.next}>
                        Next
                        <Icon type="right"/>
                    </Button>
                </Fragment>
            )
        }else{
            return(
                <Button onClick={this.previous} style={{ marginRight: '7px' }}>
                    <Icon type="left"/>
                    Prev
                </Button>
            )
        }
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
                    effect="fade"
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
                            Stories are divided into multiple chapters<br></br>
                            Users have 48 hours per chapter to submit their versions!
                        </p>
                        <br></br>
                        <NavLink to={{
                            pathname: "/stories/all"
                        }}>
                            <Button type="primary" onClick={this.handleClose}>
                                All Stories
                            </Button>
                        </NavLink>
                    </div>
                    <div>
                        <h1>Step 3: Done!</h1>
                        <p>
                            After all the chapters have been submitted and ranked, the story is complete!
                        </p>
                        <br></br>
                        <NavLink to={{
                            pathname: "/stories/complete"
                        }}>
                            <Button type="primary" onClick={this.handleClose}>
                                Complete stories
                            </Button>
                        </NavLink>
                    </div>
                </Carousel>
                <div style={{ textAlign: "center", paddingBottom: '24px', backgroundColor: '#111717' }}>
                    {this.renderButtons()}
                </div>
                </Modal>
            </div>
        );
    }
}

export default HelpModal;