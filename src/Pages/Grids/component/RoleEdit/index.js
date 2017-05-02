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
        area : res.data.data
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
    let newState = update(this.state,{area:{...this.state.area,...changedFields}})
      this.setState(newState);
   }
  render() {
    const { getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
    const {id } = this.props;
    const {area, orgNameDropDown} = this.state;

    let areaForm = Object.keys(area).reduce(function(pre,key){
      pre.key = {value:area[key]}
      return pre;
    },{})

    console.dir(areaForm);
    return (
      <div className="formbox">
        <AreaForm area={areaForm} onChange={this.handleFormChange}/>
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
const RoleEdit = Form.create()(RoleEditF);



export default RoleEdit;
