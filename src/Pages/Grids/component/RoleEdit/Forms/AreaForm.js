import React, {Component} from "react";
import {Button, Card, Input, Table , Row, Col, Form, Icon, Select} from "antd";
import API from "../../../../../../API";
import ajax from '../../../../../tools/POSTF'
const FormItem = Form.Item;
const Option = Select.Option;

class AreaForm extends Component{

	orgIdChange = (value)=>{

	}
  handleChange = () => {
    const id = this.props.id;
    const { getFieldsValue} = this.props.form;
    const FieldsValue = getFieldsValue();
    console.log(FieldsValue);
    const FieldsValueAll = {...FieldsValue, ...{name:this.props.area.name.value}}
    ajax.Put(API.PUT_API_AREA(id),FieldsValueAll)
    .then(() => {
      console.log("put. ok");
      this.props.ajaxFaFun()
    })
  }

	render(){
		 const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched , getFieldValue} = this.props.form;
		 const {orgNameDropDown} = this.props;
		return (
      <div>
		<Form>
          <Row className="fristrow">
            <Col span={12} className="fristcol">
              <FormItem
                        wrapperCol={{span: 20}}
                        className="idnumber"
              >
             <span className="gridname">{this.props.area.name &&  this.props.area.name.value}</span>
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
              <FormItem  labelCol={{span: 8}}
                        wrapperCol={{span: 15}}
                        label="网格负责人"
                        className="idnumber"
              >
              {
                getFieldDecorator('director')(
                  <Input/>
                  )
              }
              	
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="所属机构"
                        >
                {	
                 	orgNameDropDown.length > 0 ? getFieldDecorator('orgId',{
                 		rules: [{ message: '请选择所属机构' , whitespace:"ture"}],
                 		onChange:this.orgIdChange
                 	})(
              		<Select
	                    getPopupContainer={() => document.getElementById('RoleEdit')}
                      className="selectorgId"
	                  > 
	                  	{
	                   		
	                  		orgNameDropDown.map((item,index)=>(<Option key={item.id.toString()} value={item.id.toString()}>{item.name}</Option>))
	                  	}
	                </Select>  
              		):null
                }
               	
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
              {
              	getFieldDecorator('gridType')(
              		<Input/>
              		)
              }
              </FormItem>
            </Col>

            <Col span={12} className="">
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="网格面积">
              {
              	getFieldDecorator('landArea',{
                  rules: [{pattern:/^\d+$/, message: "请填写数字"}],
                })(
              		<Input/>
              		)
              }
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
              {
              	getFieldDecorator('residenceCount',{
                  rules: [{pattern:/\d+/, message: "请填写数字"}],
                })(
              		<Input/>
              		)
              }
              </FormItem>
            </Col>

            <Col span={12} className="">
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="网格人口数">
               		{
               			getFieldDecorator('personCount',{
                      rules: [{pattern:/\d+/, message: "请填写数字"}],
                    })(
              				<Input/>
              				)
               		}
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
              	{
               			getFieldDecorator('address')(
              				<Input/>
              				)
               	}
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
               {
           			getFieldDecorator('remark')(
          				<Input/>
          				)
               	}
              </FormItem>
            </Col>
          </Row>
          </div>
          </Form>
          <Row className="buttonsave">
            <Col span={24} >
              <Col span={4}>
              </Col>
              <Button type="primary" onClick={this.handleChange}>保存</Button>
            </Col>
          </Row>
          </div>)
	}
}

function mapPropsToFields(props){
	return {
		name:{
		...props.area.name
	},
	director:{
		...props.area.director
	},
	orgId:{
		...props.area.orgId
	},
	gridType:{
		...props.area.gridType
	},
	landArea:{
		...props.area.landArea
	},
	residenceCount:{
		...props.area.residenceCount
	},
	personCount:{
		...props.area.personCount
	},
	address:{
		...props.area.address
	},
	remark:{
		...props.area.remark
	}
	}
}

function onFieldsChange(props,changedFields){
	props.onChange(changedFields)

}
export default Form.create({
	mapPropsToFields,
	onFieldsChange
})(AreaForm)