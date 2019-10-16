import React, { Component } from 'react';
import Prompt from '../Posts/Prompt'
import { Row, Col, Select, Breadcrumb, Icon, Spin, Button } from 'antd';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import PromptsFeedHeader from '../Layout/PromptsFeedHeader'
import '../../App.css'
import NewPostModal from '../Posts/NewPostModal';

class PromptsFeed extends Component {

    constructor(props){
        super(props)
        this.state={
            sort: "new",
            loaded: false
        }
        this.handleSort = this.handleSort.bind(this)
    }

    handleSort(value){
        return this.props.sort(value)
    }

    componentDidMount(){
        if(!this.props.posts){
            this.setState({
                loaded: false
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.posts !== this.props.posts){
            this.setState({
                loaded: true
            })
        }
    }

    getPrompts(){
        const { posts } = this.props;
        if(this.state.loaded){
            if(this.props.posts.length > 0){
                return(
                    posts.map((post,i) =>
                            <Col id="prompt">
                                <Prompt 
                                    key={post.id} 
                                    id={post.id} 
                                    title={post.title} 
                                    genre={post.genre}
                                    content={post.content}
                                    author={post.author}
                                    time={post.createdAt}
                                    likes={post.likes}
                                    amountOfLikes={post.likes.length}
                                />
                            </Col> 
                    )
                )
            }else{
                return(
                    <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <p style={{ textAlign: 'center' }}>
                            No prompts found :( <br></br><br></br>
                            <NewPostModal title='Post your own prompt!'/>
                        </p>
                    </div>
                )
            }
        }else{
            return(
                <div style={{ display: 'flex', marginTop: '100px', justifyContent: 'center'}}>
                    <Spin size='large'/>
                </div>
            )
        }
    }

    render() {
        const { Option } = Select;
        return (
            <div>
                <Row>
                    <PromptsFeedHeader/>
                    <div id="feed-header">
                        <div id="breadcrumb-container">
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    Prompts
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {this.props.query}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <Select defaultValue="createdAt" style={{ width: 100 }} onChange={this.handleSort}>
                                <Option value="createdAt">
                                    {/* <Icon type="bulb"/> */}
                                    New
                                </Option>
                                <Option value="Hot">
                                    {/* <Icon type="fire"/> */}
                                    Hot
                                </Option>
                                <Option value="author">
                                    {/* <Icon type="arrow-up"/> */}
                                    Author
                                </Option>
                            </Select>
                        </div>
                    </div>
                    <div>
                        {this.getPrompts()}
                    </div>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        posts: state.firestore.ordered.posts,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect( props => {

        const { getAll, query, sortBy } = props

        if(getAll == true){
            return [
                { collection: 'posts',
                  orderBy: [sortBy, 'desc']
                }
            ]
        }else{
            return [{ 
                collection: 'posts', 
                orderBy: [sortBy, 'desc'],
                where: ["genre", "==", query] 
            }]
        }

    })
)(PromptsFeed)