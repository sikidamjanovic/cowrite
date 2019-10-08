import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Row, Col, Breadcrumb, Select, Spin } from 'antd'
import StoryCard from '../Posts/StoryCard'
import '../../App.css'

class StoriesFeed extends Component {

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
        if(!this.props.stories){
            this.setState({
                loaded: false
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.stories !== this.props.stories){
            this.setState({
                loaded: true
            })
        }
    }

    getStories(){
        const { stories } = this.props;
        if(this.state.loaded){
            return(
                stories.map((post,i) =>
                    <Col id="prompt">
                        <StoryCard 
                            key={post.id} 
                            uid={this.props.auth.uid}
                            id={post.id} 
                            title={post.title} 
                            genre={post.genre}
                            content={post.prompt}
                            author={post.author}
                            time={post.createdAt}
                            currentChapter={post.currentChapter}
                            chapters={post.chapters}
                        />
                    </Col> 
                )
            )
        }else{
            return(
                <div style={{ display: 'flex', marginTop: '25%', justifyContent: 'center'}}>
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
                                    New
                                </Option>
                                <Option value="Hot">
                                    Hot
                                </Option>
                                <Option value="author">
                                    Author
                                </Option>
                            </Select>
                        </div>
                    </div>
                    {this.getStories()}
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        stories: state.firestore.ordered.stories,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect( props => {
        
        const { getAll, sortBy } = props
        var rawPath = window.location.pathname.split('/')
        var query = rawPath.pop()

        if(getAll == true){
            return [
                { collection: 'stories',
                  orderBy: [sortBy, 'desc']
                }
            ]
        }else{
            return [{ 
                collection: 'stories', 
                orderBy: [sortBy, 'desc'],
                where: ["genre", "==", query] 
            }]
        }
    })
)(StoriesFeed)