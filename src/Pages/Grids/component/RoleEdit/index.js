/**
 * Created by jufei on 2017/4/25.
 */
import React, {Component} from "react";
import {Button, Card, Input, Table , Row, Col, Form, Icon} from "antd";
//=====================================================================
import './less/roleEdit.less';
import API from "../../../../../API";
import ajax from '../../../../tools/POSTF'
const FormItem = Form.Item;

class RoleEditF extends Component {
  state ={
    area : ""
  }
  inputChange = ()=> {

  }

  componentWillMount() {
    this.ajaxFun(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id ){
      this.ajaxFun(nextProps.id)
    }
    
  }

  ajaxFun = (id) => {
    ajax.Get(API.GET_GRIDS_ID(id))
    .then(res => {
      console.log(res)
      this.setState({
        area : res.data.data
      })
    })
   }
  
  render() {
    const { getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
    const {id } = this.props;
    const {area} = this.state;
    return (
      <div className="formbox">
        <Form>
          <Row className="fristrow">
            <Col span={12} className="fristcol">
              <FormItem 
                        wrapperCol={{span: 20}}
                        className="idnumber"
              >

                {getFieldDecorator('name', {
                  initialValue:area.name ,
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          <Icon
              className="close"
              onClick={this.props.close}
              type="close"
              style={{fontSize:"24px",cursor:"pointer"}}
            />
        </Row>
        <div className="ant-form-white">
          <Row>
            <Col span={12}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 15}}
                        label="网格负责人"
                        className="idnumber"
              >

                {getFieldDecorator('director', {
                  initialValue:area.director,
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="所属机构">
                {getFieldDecorator('orgName', {
                  initialValue:area.orgName ,
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12} >
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 15}}
                        label="网格类型"
                        className="idnumber"
              >

                {getFieldDecorator('gridType', {
                  initialValue:area.gridType ,
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>

            <Col span={12} className="">
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="网格面积">
                {getFieldDecorator('landArea', {
                  initialValue:area.landArea ,
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="">
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 15}}
                        label="网格户口数"
                        className="idnumber"
              >

                {getFieldDecorator('residenceCount', {
                  initialValue:area.residenceCount ,
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>

            <Col span={12} className="">
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="网格人口数">
                {getFieldDecorator('personCount', {
                  initialValue:area.personCount ,
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="">
              <FormItem labelCol={{span: 4}}
                        wrapperCol={{span: 20}}
                        label="网格地址"
                        className="idnumber"
              >

                {getFieldDecorator('address', {
                  initialValue:area.address ,
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="">
              <FormItem labelCol={{span: 4}}
                        wrapperCol={{span: 20}}
                        label="网格描述"
                        className="idnumber"
              >

                {getFieldDecorator('remark', {
                  initialValue:area.remark,
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          </div>
          </Form>
          <Row className="buttonsave">
            <Col span={24} >
              <Col span={4}>
              </Col>
              <Button type="primary" >保存</Button>
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



