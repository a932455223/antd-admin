/**
 * Created by jufei on 2017/4/25.
 */
import React, {Component} from "react";
import {Button, Card, Input, Table , Row, Col, Form, Icon, Select} from "antd";
//=====================================================================
import './less/roleEdit.less';
import API from "../../../../../API";
import ajax from '../../../../tools/POSTF'
import update from 'immutability-helper'
import AreaForm from './Forms/AreaForm'
const FormItem = Form.Item;
const Option = Select.Option;


class GridEditF extends Component {
  state = {
    area : "",
    orgNameDropDown : ""
  }

  componentWillMount() {
    this.getGridData(this.props.id);
    this.getorgNameDropDown();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id ){
      this.getGridData(nextProps.id)
    }

  }

  getGridData = (id) => {
    ajax.Get(API.GET_GRIDS_ID(id))
    .then(res => {
      res.data.data.orgId = res.data.data.orgId.toString()
      this.setState({
        area : this.transformData(res.data.data)
      })
    })
   }

   getorgNameDropDown = () => {
    ajax.Get(API.GET_ADD_DEPARTMENT)
    .then(res => {
      this.setState({
        orgNameDropDown : res.data.data
      })
    })
   }

   handleFormChange = (changedFields)=>{
    console.log(changedFields)
    let newState = update(this.state,{area:{$set:{...this.state.area,...changedFields}}})
    console.dir(newState)
    this.setState(newState);
   }

   transformData = (obj)=> {
    return Object.keys(obj).reduce(function(pre,key){
      pre[key] = {value:obj[key]}
      return pre;
    },{}) 
   }

  render() {
    const {id } = this.props;
    const {area, orgNameDropDown} = this.state;
    return (
      <div id="RoleEdit" className="formbox">
        <AreaForm getTableData={this.props.getTableData} area={area} onChange={this.handleFormChange} close={this.props.close} orgNameDropDown={orgNameDropDown} id={id}/>
        <div>
           <h1>操作记录</h1>
           <div className="recordbox">
           <div className="history">
              <div><span>王祎</span><span> 修改了客户手机号 </span></div>
              <p>2017/03/10 13:40:23</p>
            </div>
            <div className="history">
              <div><span>王祎</span><span> 修改了客户手机号 </span></div>
              <p>2017/03/10 13:40:23</p>
            </div>
            <div className="history">
              <div><span>王祎</span><span> 修改了客户手机号 </span></div>
              <p>2017/03/10 13:40:23</p>
            </div>
            <div className="history">
              <div><span>王祎</span><span> 修改了客户手机号 </span></div>
              <p>2017/03/10 13:40:23</p>
            </div>
            <div className="history">
              <div><span>王祎</span><span> 修改了客户手机号 </span></div>
              <p>2017/03/10 13:40:23</p>
            </div>
            </div>
        </div>
      </div>
      )
  }
}

export default GridEditF;