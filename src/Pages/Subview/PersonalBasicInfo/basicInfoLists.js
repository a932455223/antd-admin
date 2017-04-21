import React, { Component } from 'react';
import {
  Card,
  Tabs,
  Row,
  Col,
  Icon,
  Form,
  InputNumber,
  Input,
  Button,
  Tag,
  Select,
  DatePicker,
  Timeline,
  Modal
 } from 'antd';
 import './indexStyle.less'
const FormItem = Form.Item;


class BasicInfoEdit extends Component{
  constructor(props) {
    super(props);
    this.inputChange = this.inputChange.bind(this);
  }
  inputChange(){
    this.props.onChangeValue()
  }
  onHandleSubmit(){
    const {getFieldsValue} = this.props.form;
    getFieldsValue();
    // this.setState({
    //   mode:"edit"
    // })
  }
  render() {
    const {eachCustomerInfo, edited,currentId} = this.props;
    const { getFieldDecorator} = this.props.form;
    return (
        <Form className="basicinfolist">
          <Row className={currentId === -1 ? "briefinfocreate" : "briefinfoedit"} >
            <Col span={8}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 14}}
                        label="所属机构： ">
                {getFieldDecorator('department', {
                  rules: [{
                    required: true,
                    message: '请选择所属机构!'
                  }],
                  onChange: this.inputChange
                })(
                    <Select
                      showSearch
                      placeholder="选择机构"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      <Option value="jack">支行1</Option>
                      <Option value="lucy">支行2</Option>
                      <Option value="tom">支行3</Option>
                    </Select>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 14}}
                        label="客户经理： ">
                {getFieldDecorator('manager', {
                  onChange: this.inputChange
                })(
                  <Select
                    showSearch
                    placeholder="选择机构"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="jack">支行1</Option>
                    <Option value="lucy">支行2</Option>
                    <Option value="tom">支行3</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 14}}
                        label="所属网格： ">
                {getFieldDecorator('grid', {
                  onChange: this.inputChange
                })(
                  <Select
                    showSearch
                    placeholder="选择机构"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="jack">支行1</Option>
                    <Option value="lucy">支行2</Option>
                    <Option value="tom">支行3</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>

          <div className="personinfo">
            <Row className={currentId === -1 ? "accountcreate" : "accountedit"}>
              <Col span={24}>
                <Col span={3}>
                  <span>账户：</span>
                </Col>
                <Col span={9}>
                  <Input value=""/>
                </Col>
                <Col span={3}>
                  <Input defaultValue="ddd" />
                </Col>
                <Col span={9}></Col>
              </Col>
            </Row>

            <Row>
              <Col span={12} className={currentId === -1 ? "phonecreate" : "phoneedit"}>
                <FormItem labelCol={{span: 6}}
                          wrapperCol={{span: 18}}
                          label="手机号：">
                  {getFieldDecorator('phone', {
                    initialValue: eachCustomerInfo.wechat,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "wechatcreate" : "wechatedit"}>
                <FormItem labelCol={{span: 6}}
                          wrapperCol={{span: 18}}
                          label="微信号：">
                  {getFieldDecorator('wechat', {
                    initialValue: eachCustomerInfo.wechat,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12} className={currentId === -1 ? "idcreate" : "idedit"}>
                <FormItem labelCol={{span: 6}}
                          wrapperCol={{span: 18}}
                          label="身份证号：">
                  {getFieldDecorator('certificate', {
                    initialValue: eachCustomerInfo.certificate,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "birthcreate" : "birthedit"}>
                <FormItem labelCol={{span: 6}}
                          wrapperCol={{span: 18}}
                          label="生日：">
                  {getFieldDecorator('birth', {
                    initialValue: eachCustomerInfo.birth,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Col span={3}>
                  <span>参与者：</span>
                </Col>
                <Col span={21}>
                  <span className="addCrewButton"
                        onClick={this.props.show}>
                    <Icon type="plus-circle-o" />添加人员
                  </span>
                </Col>
              </Col>
            </Row>
          </div>
          <Row>
            <Col span={24} style={{backgroundColor: '#fafafa', padding: '10px 0'}}>
              <Col span={3}>
              </Col>
              <Button type="primary" onClick={this.onHandleSubmit.bind(this)}>保存</Button>
            </Col>
          </Row>
        </Form>
        )
  }
}
export const BasicInfoListsEdit = Form.create()(BasicInfoEdit);





//只读...........................
class BasicInfoRead extends Component{
  constructor(props) {
    super(props);
    this.inputChange = this.inputChange.bind(this);
  }
  inputChange(){
    this.props.onChangeValue()
  }
  onHandleSubmit(){
    const {getFieldsValue} = this.props.form;
    getFieldsValue();
    // this.setState({
    //   mode:"edit"
    // })
  }
  render() {
    const {eachCustomerInfo, edited} = this.props;
    console.log(eachCustomerInfo);
    const { getFieldDecorator} = this.props.form;
    return (
        <Form>

          <Row>
            <Col span={24}>
              <Col span={3}>
                <span>账户：</span>
              </Col>
              <Col span={9}>
                <Input value={eachCustomerInfo.certificate}/>
              </Col>
              <Col span={3}>
                <Input defaultValue="" />
              </Col>
              <Col span={9}></Col>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <FormItem labelCol={{span: 6}}
                        wrapperCol={{span: 18}}
                        label="手机号：">
                {getFieldDecorator('phone', {
                  initialValue: "",
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem labelCol={{span: 6}}
                        wrapperCol={{span: 18}}
                        label="微信号：">
                {getFieldDecorator('wechat', {
                  initialValue: "",
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <FormItem labelCol={{span: 6}}
                        wrapperCol={{span: 18}}
                        label="身份证号：">
                {getFieldDecorator('certificate', {
                  initialValue: "",
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem labelCol={{span: 6}}
                        wrapperCol={{span: 18}}
                        label="生日：">
                {getFieldDecorator('birth', {
                  initialValue: "",
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Col span={3}>
                <span>参与者：</span>
              </Col>
              <Col span={21}>
                <span className="addCrewButton"
                      onClick={this.modalShow}>
                  <Icon type="plus-circle-o" />添加人员
                </span>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{backgroundColor: '#fafafa', padding: '10px 0'}}>
              <Col span={3}>
              </Col>
              <Button type="primary" onClick={this.onHandleSubmit.bind(this)}>保存</Button>
            </Col>
          </Row>
        </Form>
        )
  }
}
export const BasicInfoListsRead = Form.create()(BasicInfoRead);
