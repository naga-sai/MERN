import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchPost,deletePost,addLike, addComment } from '../../actions/post';
import serializeForm from 'form-serialize';
import Panel from '../misc/Panel';  

class PostDetails extends Component{

  state={
    postTitle:"",
    postDescription:"",
    valid: true
    }

    componentDidMount(){
      this.props.fetchPost(this.props.match.params.id);
    }
    goBack(){
      console.log(this.props);
      this.props.history.push("/list-posts");
    }

    onDeleteClick(id) {
      this.props.deletePost(id);
      this.props.history.push("/list-posts");
    }
    
    onLikeClick(id) {
      this.props.addLike(id);
    }

    addComment=(id,event)=>{
      event.preventDefault();
      this.props.addComment(id,serializeForm(event.target,{hash:true}));
      }
      
    toggleHidden () {
        this.setState({
          isHidden: !this.state.isHidden
        })
      }

    constructor () {
        super()
        this.state = {
          isHidden: true
        }
      }
 
    render(){
      const { post } = this.props.postReducer;
      const elem = post?(
            <div>
                <div>
                  <p>{ post.postDescription }</p>
                  <p>Created By: { post.createdBy }</p>
                  <button className="btn btn-primary likes"
                      id={ post._id }
                      title={ post.likes }
                  >
                  <span className="glyphicon glyphicon-heart"> {  post.likes && post.likes.length }</span>
                  </button>
                  <button className="btn btn-danger" id={ post._id } onClick={this.onDeleteClick.bind(this, post._id)}>
                    Delete Post
                  </button>
                  <button
                      className="btn btn-warning cmtBtn"
                      id={ post._id }
                      onClick={this.toggleHidden.bind(this)} 
                  >
                      {this.state.isHidden ?"Show":"Hide" } Comments
                  </button>
                  <button onClick={this.goBack.bind(this)} className="btn btn-info ">Back</button>
                  {!this.state.isHidden && 
                    <div  className="cmtDiv" id={ post._id }>
                    <div className="addCmtDiv" id={ post._id }>
                    <form onSubmit={(e)=>{this.addComment(post._id,e)}}>
                      <div className="form-group">
                          <input
                          className="form-control" 
                            type="text"
                            placeholder="Add Comment"
                            name="text"
                            id={ post._id }
                          />
                      </div>
                      <button className="btn btn-dark">
                          Submit
                      </button>
                    </form>
                      </div>
                      {post.comments.length!==0 && <div >{post.comments.map((comment,index)=>{
                        return <p key={index}>{comment.text}    By: {comment.author}</p>
                      })}
                  </div>}
              </div>
              }
              </div>
              </div>):null
              return post? <Panel  heading={post.postTitle} content={elem} />:null
    }
}
const mapStateToProps=(state)=>({
    postReducer:state.post        
})

export default connect(mapStateToProps,{fetchPost, deletePost, addLike, addComment})(withRouter(PostDetails));