import React, { Component } from 'react';
import {Prompt, withRouter} from 'react-router-dom';
import Panel from '../misc/Panel';
import { registerUser } from "../../actions/auth";
import serializeForm  from 'form-serialize';
import {connect} from 'react-redux';


class Register extends Component{

    saveUser=(event)=>{
        event.preventDefault();
        this.props.registerUser(serializeForm(event.target,{hash:true}), this.props.history);
        // this.setState({valid:true},()=>{
        //     this.props.history.push('/login'); 
        // })
       
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors },()=>{console.log(this.props)});
            
        }
      }

    componentDidMount() {
        console.log(this.props);
        // if (this.props.auth.isLoggedIn) {
        //   this.props.history.push('/dashboard');
        // }
      }

    render(){

        const elem = <div>
            { this.props.errors.details ? this.props.errors.details.map((error,index)=>{
                return <div className="alert alert-danger" key={index}>
                {error.message}
              </div>
            }):null}
        {/* <Prompt when={!this.state.valid} message="Navigating will loose your data!"/> */}
         <form id="app" onSubmit={this.saveUser}>
             <div className="form-group">
             <label className="control-label">Email</label>
             <input type="text"className="form-control" placeholder="Email" name="email" onChange={this.onChangeHandler}/>
             </div>
             <div className="form-group">
             <label className="control-label">Password</label>
             <input type="text"  className="form-control" placeholder="Password" name="password" onChange={this.onChangeHandler}/>
             </div>
             <div className="form-group">
             <label className="control-label">Confirm Password</label>
             <input type="text"  className="form-control" placeholder="Confirm Password" name="confirmPassword" onChange={this.onChangeHandler}/>
             </div>
             <button className="btn btn-success">Register</button>
         </form>
     </div>
     return <Panel heading="Register" content={elem} />
    }
}


function mapStateToProps(state){
    return {
        auth:state.authReducer,
        errors: state.errors

    }
}
export default connect(mapStateToProps,{ registerUser })(withRouter(Register));
