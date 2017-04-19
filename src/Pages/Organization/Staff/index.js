import React,{ Component } from 'react'
//======================================================
import ActionBar from '../component/ActionBar';

export default class Home extends Component{
    render(){
        return (
          <div>
            <ActionBar parent="staff"/>
            <h2> Organization staff </h2>
          </div>
        )
    }
}
