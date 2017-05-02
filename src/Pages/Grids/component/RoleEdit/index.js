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


class RoleEditF extends Component {
  state ={
    area : "",
    orgNameDropDown : ""
  }
  inputChange = (e)=> {
    let newState = update(this.state,{area:{[e.target.name]:{$set:e.target.value}}})
    this.setState(newState)
  }

  handleChange = () => {
    const id = this.props.id;
    const { getFieldsValue} = this.props.form;
    const FieldsValue = getFieldsValue();
    console.log(FieldsValue);
    ajax.Put(API.PUT_API_AREA(id),this.state.area)
    .then(() => {
      console.log("put. ok");
      this.props.ajaxFaFun()
    })
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
      this.setState({
        area : this.transformData(res.data.data)
      })
    })
   }

   getorgNameDropDown = () => {
    ajax.Get(API.GET_ADD_DEPARTMENT)
    .then(res => {
      console.log(res,1212)
      this.setState({
        orgNameDropDown : res.data.data
      })
    })
   }

   handleFormChange = (changedFields)=>{
    let newState = update(this.state,{area:{$set:{...this.state.area,...changedFields}}})
    console.dir(newState)
    this.setState(newState);
   }

   transformData = (obj)=>{
    return Object.keys(obj).reduce(function(pre,key){
      pre[key] = {value:obj[key]}
      return pre;
    },{}) 
   }

  render() {
    const {id } = this.props;
    const {area, orgNameDropDown} = this.state;
    return (
      <div className="formbox">
        <AreaForm area={area} onChange={this.handleFormChange} close={this.props.close}/>
          <Row className="buttonsave">
            <Col span={24} >
              <Col span={4}>
              </Col>
              <Button type="primary" onClick={this.handleChange}>保存</Button>
            </Col>
          </Row>

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

export default RoleEditF;
