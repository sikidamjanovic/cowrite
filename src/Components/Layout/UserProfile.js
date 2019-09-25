import React, { Component, Fragment } from 'react';
import { PageHeader, Tag } from 'antd';
import StoryCard from '../Posts/StoryCard'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class UserProfile extends Component {

    isOwnProfile(){
        if(this.props.isOwnProfile){
            return(
                <div>
                    <PageHeader 
                        title={this.props.auth.displayName}
                        subTitle={this.numberOfPosts()}
                        avatar={{ size: 'large', src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                    />
                    <PageHeader 
                        title="Your Posts"
                    />
                    <StoryCard/>
                    <PageHeader 
                        title="Likes"
                    />
                    <StoryCard/>
                    <PageHeader 
                        title="Saved"
                    />
                    <StoryCard/>
                </div>
            )
        }else{
            return <p>Nah</p>
        }
    }

    numberOfPosts(){
        return(
            <Fragment>
                <Tag>0 Posts</Tag>
            </Fragment>
        )
    }

    render() {
        return (
            <div>
                {this.isOwnProfile()}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        liked: state.firestore.ordered.users,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect( props => {

        const { auth } = props

        return [{ 
            collection: 'users',
            doc: 'SikiDamjanovic',
            subcollections: [
                {
                    collection: 'liked'
                }
            ]
        }]

    })
)(UserProfile)