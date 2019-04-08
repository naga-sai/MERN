import React, { Component } from 'react';
import Panel from '../misc/Panel';
import { authUser } from '../../actions/auth';
import { connect } from 'react-redux';
import serializeForm  from 'form-serialize';

class Login extends Component{

    saveUser=(e)=>{
        e.preventDefault();
        this.props.authUser(serializeForm(e.target,{hash:true}));
    }

  componentWillReceiveProps(nextProps) { 
    if (nextProps.isLoggedIn) {
      this.props.history.push('/create-post');
    }
  }

    render(){
    const elem = <div>
    {/* <Prompt when={!this.state.valid} message="Navigating will loose yoyr data!"/> */}
        <form onSubmit={this.saveUser}>
            <div className="form-group">
            <label className="control-label">Email</label>
            <input type="text"className="form-control" placeholder="Email" name="email"/>
            </div>
            <div className="form-group">
            <label className="control-label">Password</label>
            <input type="text"  className="form-control" placeholder="Password" name="password"/>
            </div>
            <button className="btn btn-success">Login</button>
        </form>
    </div>
    return <Panel heading="Login" content={elem} />
    }
}
function mapStateToProps(state){
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
    }
}

export default connect(mapStateToProps, { authUser })(Login);
