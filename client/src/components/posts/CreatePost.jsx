import React, { Component } from 'react';
import {Prompt, withRouter} from 'react-router-dom';
import Panel from '../misc/Panel';
import serializeForm from 'form-serialize';
import {connect} from 'react-redux';
import { createPost } from "../../actions/post";

class CreatePost extends Component{

    state={
        postTitle:"",
        postDescription:"",
        valid: true
    }

    createPost=(event)=>{
        event.preventDefault();
        this.props.createPost(serializeForm(event.target,{hash:true}));
        this.setState({valid:true},()=>{
            this.props.history.push('/list-posts'); 
        })
       
    }
    render(){
        const elem = <div>
        {/* <Prompt when={!this.state.valid} message="Navigating will loose yoyr data!"/> */}
         <form onSubmit={this.createPost}>
             <div className="form-group">
             <label className="control-label">Post Title</label>
             <input type="text"className="form-control" placeholder="Post Title" name="postTitle"/>
             </div>
             <div className="form-group">
             <label className="control-label">Post Description</label>
             <input type="text"  className="form-control" placeholder="Post Description" name="postDescription"/>
             </div>
             <button className="btn">Submit</button>
         </form>
     </div>
     return <Panel heading="Create Post " content={elem} />
    }
}

function mapStateToProps(){
    return {

    }
}
export default connect(mapStateToProps,{createPost})(withRouter(CreatePost));