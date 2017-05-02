/**
 * Created by jufei on 2017/4/25.
 */
import React,{Component} from 'react';
import {Button, Card, Form, Input, Select, Tabs, Icon,Row,Col} from "antd";
import API from "../../../../../API";
import ajax from '../../../../tools/POSTF'
const FormItem = Form.Item;


 class  RolePermission extends Component{
 	onHandleChange = () => {
 		const { getFieldsValue} = this.props.form;
 		const FieldsValue = getFieldsValue();
 		ajax.Post(API.POST_API_AREA,FieldsValue)
	    .then(
	    	this.props.ajaxFaFun
	    )
 	}
  render(){
    const { getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
    return (
    	<div className="formbox" >
        <Form className="formboxsub">
        	<Row className="fristrow">
            <Col span={12} className="fristcol">
              <FormItem 
                        wrapperCol={{span: 20}}
                        className="idnumber"
              >

                {getFieldDecorator('name', {
                  initialValue:this.props.roleName ,
                  onChange: this.inputChange
                })(
                  <span className="newrolename">{this.props.roleName}</span>
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
        <div className="bgrow">
          <Row>
            <Col span={12}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 15}}
                        label="网格负责人"
                        className="idnumber"
              >

                {getFieldDecorator('director', {
                  // initialValue:this.props.roleName ,
                  onChange: this.inputChange
                })(
                  <Input placeholder="请填写网格负责人"/>
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="所属机构">
                {getFieldDecorator('orgId', {
                  onChange: this.inputChange
                })(
                  <Input placeholder="请填写所属机构"/>
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

                {getFieldDecorator('areaType', {
                  onChange: this.inputChange
                })(
                  <Input placeholder="请填写网格类型"/>
                )}
              </FormItem>
            </Col>

            <Col span={12} className="">
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="网格面积">
                {getFieldDecorator('landArea', {
                  onChange: this.inputChange
                })(
                  <Input placeholder="请填写网格面积"/>
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
                  onChange: this.inputChange
                })(
                  <Input placeholder="请填写网格户口数"/>
                )}
              </FormItem>
            </Col>

            <Col span={12} className="">
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="网格人口数">
                {getFieldDecorator('personCount', {
                  onChange: this.inputChange
                })(
                  <Input placeholder="请填写网格人口数"/>
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
                  onChange: this.inputChange
                })(
                  <Input placeholder="请填写网格地址"/>
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
                  onChange: this.inputChange
                })(
                  <Input placeholder="请填写网格描述"/>
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
              <Button htmlType="button" onClick={this.onHandleChange}>保存</Button>
            </Col>
          </Row>
      </div>
    	)
  }
}

const RolePermissionF = Form.create()(RolePermission);
export default RolePermissionF;