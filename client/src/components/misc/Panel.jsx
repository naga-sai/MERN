import React,{Component } from 'react';

class Panel extends Component{
    render(){
        return (<div className="panel panel-primary">
                    <div className="panel-heading">{this.props.heading}</div>
                    <div className="panel-body">{this.props.content}</div>
                </div>)
    }
}
export default Panel;