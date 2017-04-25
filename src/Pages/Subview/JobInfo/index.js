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
import axios from 'axios';
import API from '../../../../API';
import { connect } from 'react-redux';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
import './indexStyle.less';


class MyJobInfo extends Component{

  inputChange = (e) => {
    console.log('things changed');
    // const { dispatch } = this.props;
    // dispatch(customerInfoBeEdit())
  }

  handleClose = () => {

  }
  render() {
    const {eachJobInfo, edited, currentId, createCustomerSuccess} = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
    return (
        <Form id="mybase" className="basicinfolist">
          <Row className={currentId === -1 ? "briefinfocreate" : "briefinfoedit"} type="flex" justify="space-between">
            <Col span={7}>
              <FormItem labelCol={{span: 11}}
                        wrapperCol={{span: 13}}
                        label="所属机构">
                {getFieldDecorator('department', {
                  rules: [{
                    required: true,
                    message: '选择所属机构!'
                  }],
                  initialValue: eachJobInfo.department,
                  onChange: this.inputChange
                })(
                    <Select
                      showSearch
                      placeholder="选择所属机构"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      getPopupContainer={() => document.getElementById('mybase')}
                    >
                      <Option value="jack">慈溪支行</Option>
                      <Option value="lucy">长治支行</Option>
                      <Option value="tom">苏州支行</Option>
                    </Select>
                )}
              </FormItem>
            </Col>

            <Col span={7}>
              <FormItem labelCol={{span: 11}}
                        wrapperCol={{span: 13}}
                        label="客户经理">
                {getFieldDecorator('manager', {
                  initialValue: eachJobInfo.manager,
                  onChange: this.inputChange
                })(
                  <Select
                    showSearch
                    placeholder="选择客户经理"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    getPopupContainer={() => document.getElementById('mybase')}
                  >
                    <Option value="jack">李小龙</Option>
                    <Option value="lucy">深井冰</Option>
                    <Option value="tom">爱德华</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={7}>
              <FormItem labelCol={{span: 11}}
                        wrapperCol={{span: 13}}
                        label="所属网格">
                {getFieldDecorator('grid', {
                  initialValue: eachJobInfo.grid,
                  onChange: this.inputChange
                })(
                  <Select
                    showSearch
                    placeholder="选择所属网格"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    getPopupContainer={() => document.getElementById('mybase')}

                  >
                    <Option value="jack">G666</Option>
                    <Option value="lucy">S889</Option>
                    <Option value="tom">Q233</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>



          <div className="personinfo">
            {formItems()}
            <Row>
              <Col span={12} className={currentId === -1 ? "phonecreate" : "phoneedit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="手机号：">
                  {getFieldDecorator('phone', {
                    initialValue: eachJobInfo.wechat,
                    onChange: this.inputChange,
                    rules: [{
                    required: true,
                    message: '请填写手机号'
                  }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "wechatcreate" : "wechatedit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="微信号：">
                  {getFieldDecorator('wechat', {
                    initialValue: eachJobInfo.wechat,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12} className={currentId === -1 ? "idcreate" : "idedit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="身份证号："
                          className="idnumber"
                          >

                  {getFieldDecorator('certificate', {
                    initialValue: eachJobInfo.certificate,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "birthcreate" : "birthedit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="生日：">
                  {getFieldDecorator('birth', {
                    initialValue: eachJobInfo.birth,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row className="joiners">
              <Col span={24}>
                <Col span={4}>
                  <span>参与者：</span>
                </Col>
                <Col span={20}>
                  {tagsitems}
                  <span className="addcrewbutton"
                        onClick={this.props.show}>
                    <Icon type="plus-circle-o" />添加人员
                  </span>
                </Col>
              </Col>
            </Row>
          </div>
          <Row className="buttonsave">
            <Col span={24} >
              <Col span={4}>
              </Col>
              <Button type="primary" onClick={createCustomerSuccess}>保存</Button>
            </Col>
          </Row>
        </Form>
      )
  }
}
const JobInfoForm = Form.create()(MyJobInfo);

class JobInfo extends Component {
  state = {
    modalVisible: false,
    edited:false,
    eachJobInfo: ''
  }
  componentWillMount(){
      info('basicInfo will mount')
      this.getBaseInfo(this.props.currentCustomerInfo.id)
  }

  componentWillReceiveProps(next){
    info('basicInfo will receive props.')
      this.getBaseInfo(next.currentCustomerInfo.id);
  }


  getBaseInfo = (id) => {
      axios.get(API.GET_CUSTOMER_BASE(id))
      .then((res) => {
          this.setState({
              ...this.state,
            eachJobInfo: res.data.data
          })
      })
  }

  // modal Show
  modalShow = () => {
    this.setState({
      modalVisible: true
    })
  }

  // modal hide
  modalHide = () => {
    this.setState({
      modalVisible: false
    })
  }

  // handleChange(){
  //   this.setState({
  //     edited:true
  //   })
  // }

  x(next) {
    // console.log(this.props);
    // console.log(next);
  }

  render() {
    const modal = {
      visible: this.state.modalVisible,
      hide: this.modalHide
    };
    const {step, mode, currentId, customerInfoBeEdit} = this.props;
    const {eachJobInfo,edited} = this.state;
    console.log(this.props);
    return(
        <div className="">
          { mode !== "view" && <JobInfoForm
                                  customerInfoBeEdit={customerInfoBeEdit}
                                  currentId={this.props.currentId}
                                  eachJobInfo={this.state.eachJobInfo}
                                  />}

          { mode === "view" && <JobInfoForm />}
        </div>
    )
  }
}


const mapStateToProps = (store) => {
  // console.log(store)
  return {
    currentCustomerInfo: store.customer.currentCustomerInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCustomerSuccess:(id) => {dispatch(createCustomerSuccess(id))},
    customerInfoBeEdit: () => {dispatch(customerInfoBeEdit())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(JobInfo);
