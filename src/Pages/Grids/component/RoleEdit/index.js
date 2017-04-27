/**
 * Created by jufei on 2017/4/25.
 */
import React, {Component} from "react";
import {Button, Card, Input, Table , Row, Col, Form} from "antd";
//=====================================================================
import './less/roleEdit.less';
const FormItem = Form.Item;

class RoleEditF extends Component {
  inputChange = ()=> {

  }

  componentWillMount() {
    console.log('RoleEditF will mount')
  }

  componentWillReceiveProps(nextProps) {
    console.log('RoleEditF will receive')
    
  }
  render() {
    const { getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
    const {id} = this.props;
    return (
      <div className="formbox">
        <div className="role-edit-title">
          <div className="title">山西银行{this.props.id}</div>
          <Button className="close" onClick={this.props.close}>&times;</Button>
        </div>
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
          <Row className="buttonsave">
            <Col span={24} >
              <Col span={4}>
              </Col>
              <Button type="primary" >保存</Button>
            </Col>
          </Row>
        </Form>
        <div>
            
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
      )
  }  
}
const RoleEdit = Form.create()(RoleEditF);



export default RoleEdit;



