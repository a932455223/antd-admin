/**
 * Created by jufei on 2017/4/25.
 */
import React, {Component} from "react";
import {Button, Card, Input, Table ,Row,Col,Form} from "antd";
//=====================================================================
import './less/roleEdit.less';
const FormItem = Form.item;

class RoleEdit extends Component {
  state = {};
  render() {
    const { getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
    // const { currentId } = this.props;
    return (
      <div>
        <div className="title">{this.props.id}</div>
        <Form>
          <Row>
            <Col span={12}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 15}}
                        label="网格负责人"
                        className="idnumber"
              >

                {getFieldDecorator('certificate', {
                  initialValue:"",
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
                {getFieldDecorator('birth', {
                  initialValue:"" ,
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

                {getFieldDecorator('certificate', {
                  initialValue:"" ,
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
                {getFieldDecorator('birth', {
                  initialValue:"" ,
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

                {getFieldDecorator('certificate', {
                  initialValue:"" ,
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
                {getFieldDecorator('birth', {
                  initialValue:"" ,
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

                {getFieldDecorator('certificate', {
                  initialValue:"" ,
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

                {getFieldDecorator('decorate', {
                  initialValue:"",
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      )
  }  
}
export default Form.create()(RoleEdit);
