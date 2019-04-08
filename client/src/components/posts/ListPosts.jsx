import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchPosts,deletePost,addLike } from '../../actions/post';
import Panel from '../misc/Panel';  

class ListPosts extends Component{
 
    componentDidMount(){
        this.props.fetchPosts();
        // console.log(this.props.auth);
    }

    onDeleteClick(id) {
        this.props.deletePost(id);
    }
    
    onLikeClick(id) {
        this.props.addLike(id);
    }

    constructor () {
        super()
        this.state = {
          isHidden: true
        }
      }
      toggleHidden () {
        this.setState({
          isHidden: !this.state.isHidden
        })
      }
    
    render(){
        const { posts } = this.props.post;
        return(
            <div>
                {posts && posts.map((post,index)=>{
                    const elem = 
                    <div>
                    <div>
                        <p>{ post.postDescription }</p>
                        <p>Created By: { post.createdBy }</p>
                        <button className="btn btn-primary likes"
                            id={ post._id }
                            title={ post.likes }
                        >
                        <span className="glyphicon glyphicon-heart" onClick={this.onLikeClick.bind(this, post._id)}> { post.likes.length }</span>
                        </button>
                        {this.props.auth.user.email==post.createdBy && <button className="btn btn-danger" id={ post._id } onClick={this.onDeleteClick.bind(this, post._id)}>
                         Delete Post
                        </button>}
                        <Link to={`/post-details/${post._id}`} className="btn btn-warning">
                        View Post
                        </Link>
                        <Link to={`/post-details/${post._id}`} className="btn btn-info mr-1">
                        Comments
                        </Link>
                    </div>

                    </div>
                 return <Panel  key={index} heading={post.postTitle} content={elem} />
                })}                
            </div>
        )
    }
    }
    
    const mapStateToProps=(state)=>({
        post:state.post,
        auth:state.authReducer        
    })
export default connect(mapStateToProps,{fetchPosts, deletePost, addLike})(withRouter(ListPosts));
