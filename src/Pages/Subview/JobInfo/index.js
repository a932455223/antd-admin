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

function info(msg, color = 'red') {
  console.log("%c" + msg, 'color:' + color);
}

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
        <Form id="myjobbase" className="basicinfolist">
          <Row className={currentId === -1 ? "briefinfocreate" : "briefinfoedit"} type="flex" justify="space-between">
            <Col span={8}>
              <FormItem labelCol={{span: 11}}
                        wrapperCol={{span: 13}}
                        label="工作属性">
                {getFieldDecorator('jobclass', {
                  rules: [{
                    required: true,
                    message: '选择工作属性!'
                  }],
                  initialValue: eachJobInfo.jobclass,
                  onChange: this.inputChange
                })(
                    <Select
                      showSearch
                      placeholder="选择工作属性"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      getPopupContainer={() => document.getElementById('myjobbase')}
                    >
                      <Option value="jack">个体户</Option>
                      <Option value="lucy">白领</Option>
                      <Option value="tom">退休</Option>
                    </Select>
                )}
              </FormItem>
            </Col>
          </Row>



          <div className="personinfo">
            <Row>
              <Col span={24} className={currentId === -1 ? "phonecreate" : "phoneedit"}>
                <FormItem labelCol={{span: 4}}
                          wrapperCol={{span: 20}}
                          label="经营范围">
                  {getFieldDecorator('businessScope', {
                    initialValue: eachJobInfo.businessScope,
                    onChange: this.inputChange,
                    rules: [{
                    required: true,
                    message: '请填写经营范围'
                  }],
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
                          label="经营产量"
                          className="idnumber"
                          >

                  {getFieldDecorator('businessYield', {
                    initialValue: eachJobInfo.businessYield,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "birthcreate" : "birthedit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="产量单价">
                  {getFieldDecorator('businessPrice', {
                    initialValue: eachJobInfo.businessPrice,
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
                          label="月收入"
                          className="idnumber"
                          >

                  {getFieldDecorator('businessYield', {
                    initialValue: eachJobInfo.monthIncome,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "birthcreate" : "birthedit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="年收入">
                  {getFieldDecorator('yearIncom', {
                    initialValue: eachJobInfo.yearIncom,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
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
      this.getBaseInfo(this.props.currentCustomerInfo.id)
  }

  componentWillReceiveProps(next){
      this.getBaseInfo(next.currentCustomerInfo.id);
  }


  getBaseInfo = (id) => {
      axios.get(API.GET_JOBINFO_BASE(id))
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
         <JobInfoForm
          customerInfoBeEdit={customerInfoBeEdit}
          currentId={this.props.currentId}
          eachJobInfo={this.state.eachJobInfo}
        />
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
