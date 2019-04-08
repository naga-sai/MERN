import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component{
    render(){
        return this.props.isLoggedIn? <Route {...this.props} />:<Redirect to="/"/>
    }
}

export default PrivateRoute ;