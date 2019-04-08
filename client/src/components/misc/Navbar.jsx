import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
class Navbar extends Component{
    render(){
      return  (<nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <a className="navbar-brand">React</a>
                  </div>
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                    {this.props.auth.isLoggedIn &&<li ><NavLink activeClassName="active" to="/home">Home</NavLink></li>}
                    {!this.props.auth.isLoggedIn && <li ><NavLink activeClassName="active" to="/login">Login</NavLink></li>}
                    {!this.props.auth.isLoggedIn &&<li ><NavLink activeClassName="active" to="/register">Register</NavLink></li>}
                    {this.props.auth.isLoggedIn && <li><NavLink activeClassName="active" to="/list-posts">List Posts</NavLink></li>}
                    {this.props.auth.isLoggedIn && <li><NavLink activeClassName="active" to="/create-post">Create Post</NavLink></li>}
                    {this.props.auth.isLoggedIn &&  <li><a href="#" onClick={this.props.logout}>Logout</a></li>}
                    </ul>
                  </div>
                </div>
              </nav>)
    }
}

function mapStateToProps(state){
  return {
    auth:state.authReducer
  }
}

export default connect(mapStateToProps,{logout})(withRouter(Navbar));
