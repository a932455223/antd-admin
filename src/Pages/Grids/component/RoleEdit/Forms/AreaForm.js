import React, {Component} from "react";
import {Button, Card, Input, Table , Row, Col, Form, Icon, Select} from "antd";
const FormItem = Form.Item;
const Option = Select.Option;

class AreaForm extends Component{

	render(){
		 const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
		return (
		<Form>
          <Row className="fristrow">
            <Col span={12} className="fristcol">
              <FormItem
                        wrapperCol={{span: 20}}
                        className="idnumber"

              >
              <Input/>
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
                        label="所属机构">
                 {
                 	getFieldDecorator('orgName')(
              		<Input/>
              		)
                 }
              {/* <Select
                    showSearch
                    name="orgName"
                    defaultValue={area.orgName}
                    onChange={this.inputChange}
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    getPopupContainer={() => document.getElementById('editMyBase')}
                  > 
                    { orgNameDropDown && orgNameDropDown.map((item, index) => {
                      return (
                        <Option value={item.name} key={item.name}>{item.name}</Option>
                        )
                    })}
                  </Select>   */}
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
              	getFieldDecorator('orgName')(
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
              	getFieldDecorator('landArea')(
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
              	getFieldDecorator('residenceCount')(
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
               			getFieldDecorator('personCount')(
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
          </Form>)
	}
}

function mapPropsToFields(props){
	console.dir(props.area)
	return {
		name:{
		...props.area.name
	},
	director:{
		...props.area.director
	},
	orgName:{
		...props.area.orgName
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