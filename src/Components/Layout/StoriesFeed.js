import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Row, Col, Breadcrumb, Select, Spin } from 'antd'
import StoryCard from '../Posts/StoryCard'
import '../../App.css'
import StoriesFeedHeader from './StoriesFeedHeader'

class StoriesFeed extends Component {

    constructor(props){
        super(props)
        this.state={
            sort: "new",
            loaded: false,
            yposition: 0
        }
        this.handleSort = this.handleSort.bind(this)
    }

    handleSort(value){
        return this.props.sort(value)
    }

    componentDidMount(){
        if(!this.props.stories){
            this.setState({
                loaded: false,
            })
        }
        window.addEventListener('scroll', this.listenToScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.stories !== this.props.stories){
            if(this.state.yposition === 0){
                this.setState({
                    loaded: true,
                    yposition: this.props.yposition
                }, () => {
                    this.scrollTo(this.state.yposition)
                });
            }else{
                this.setState({
                    loaded: true
                }, () => {
                    this.listenToScroll()
                    this.scrollTo(this.state.yposition)
                })
            }
        }
    }

    scrollTo(y){
        console.log('SCROLLING:' , y)
        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });
    }

    listenToScroll = () => {
        this.setState({
            yposition: window.scrollY,
        })
    }

    getStories(){
        const { stories } = this.props;
        if(this.state.loaded){
            if(this.props.stories.length > 0){
                return(
                    stories.map((post,i) =>
                        <Col id="prompt">
                            <StoryCard 
                                key={post.id} 
                                auth={this.props.auth}
                                id={post.id} 
                                title={post.title} 
                                genre={post.genre}
                                content={post.prompt}
                                author={post.author}
                                authorPic={post.authorPic ? post.authorPic : null}
                                createdAt={post.createdAt}
                                currentChapter={post.currentChapter}
                                chapters={post.chapters}
                                chapter1={post.chapter1}
                                chapter2={post.chapter2}
                                chapter3={post.chapter3}
                                chapter4={post.chapter4}
                                likes={post.likes}
                                saves={post.saves}
                                yposition={this.state.yposition}
                                query={this.props.query}
                            />
                        </Col> 
                    )
                )
            }else{
                return(
                    <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <p style={{ textAlign: 'center' }}>
                            No stories found :( <br></br>
                            Like prompts to help convert them into stories!
                        </p>
                    </div>
                )
            }
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
                <StoriesFeedHeader/>
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
        
        const { getAll, sortBy, query } = props

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