import React, { Component } from 'react';
import Navbar from './misc/Navbar';
import Home from './misc/Home';
import Root from './misc/Root';
import CreatePost from './posts/CreatePost';
import ListPosts from './posts/ListPosts';
import PostDetails from './posts/PostDetails';
import Login from './auth/Login';
import Register from './auth/Register';
import PageNotFound from './misc/PageNotFound';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar/>
        <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/" component={Root} exact/>
        <Route path="/home" component={Home} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/list-posts" component={ListPosts}/>
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/create-post" component={CreatePost}/>
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/post-details/:id" component={PostDetails}/>
        <Route component={PageNotFound} />
        </Switch>
      </div>
  );
  }
}

function mapStateToProps(state){
  return {
    isLoggedIn:state.authReducer.isLoggedIn
  }
}

export default connect(mapStateToProps)(App);

