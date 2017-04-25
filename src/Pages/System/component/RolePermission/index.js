/**
 * Created by jufei on 2017/4/25.
 */
import React,{Component} from 'react';



export default class  RolePermission extends Component{
  render(){
    console.log(this.props);
    return (
      <h1 onClick={this.props.mode === 'edit' ? this.props.backRoleEdit : this.props.close}>角色权限分配</h1>
    )
  }
}
