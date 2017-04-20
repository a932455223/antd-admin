import React,{ Component } from 'react';
import ActionBar from '../component/ActionBar';
//========================================================
import './less/user.less'
export default class SystemUsers extends Component{
  render(){
    return (
      <div className="user">
        <ActionBar/>
        <h2> system users </h2>
      </div>
    )
  }
}
