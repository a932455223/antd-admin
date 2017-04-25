
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
import { createCustomerSuccess } from '../../../redux/actions/customerAction';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
import './indexStyle.less';

// 新增维护记录
class AddNewRecordForm extends Component {
  // 下拉框选择发生变化时
  selectChange = (value) => {
    // console.log(value);
  }

  // 日期修改时，打印日期
  dateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  // 修改输入的次数
  inputChange = (e) => {
    // const { getFieldValue } = this.props.form;
    // console.log(getFieldValue('name'))
    // console.log(e.target);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card id="maintainRecord"  title={<span>
                      <Icon type="plus-circle-o" />新增维护记录
                    </span>}
            className="addrecord"
                    >
        <Form>
          <Row>
            <Col span={12}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        label="维护切入点">
                {getFieldDecorator('maintainPointCut', {
                  rules: [{
                    required: true,
                    // message: 'Please select the movie type!'
                  }],
                  onChange: this.selectChange
                })(
                  <Select
                    placeholder="请选择切入类型"
                    getPopupContainer={() => document.getElementById('maintainRecord')}
                    >
                    <Option value="deadline">产品到期提醒</Option>
                    <Option value="upgrade">产品升级</Option>
                    <Option value="activate">产品激活</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        label="维护方式">
                {getFieldDecorator('maintainMethod', {
                  rules: [{
                    required: true,
                    message: '请选择维护方式!'
                  }],
                  onChange: this.selectChange
                })(
                  <Select
                     placeholder="请选择维护方式"
                     getPopupContainer={() => document.getElementById('maintainRecord')}
                  >
                    <Option value="mobile">手机</Option>
                    <Option value="wechat">微信</Option>
                    <Option value="message">短信</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        label="维护日期">
                {getFieldDecorator('maintainDate', {
                  onChange: this.dateChange
                })(
                  <DatePicker
                    onChange={this.onChange}
                    getCalendarContainer={() => document.getElementById('mybase')}
                    />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        label="维护次数">
                {getFieldDecorator('maintainTimes', {
                  initialValue: 1,
                  onChange: this.inputChange
                })(
                  <InputNumber min={1} max={10} />
                )}
              </FormItem>
            </Col>

            <Col span={24}>
              <FormItem labelCol={{span: 4}}
                        wrapperCol={{span: 20}}
                        label="维护成效">
                {getFieldDecorator('maintainEffect', {
                  onChange: this.inputChange
                })(
                  <Input  type="textarea"
                          placeholder="介绍理财产品，制定理财计划书，客户下单"
                          rows={4} />
                )}
              </FormItem>
            </Col>

            <Col span={24} className="buttons">
              <Col span={4}>
              </Col>
              <Button type="primary" className="submit">发布</Button>
              <Button className="cancle">取消</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
}
const AddNewRecord = Form.create()(AddNewRecordForm);



//个人信息表单................
class BasicInfoEdit extends Component{
  state = {
    tags : []
  } 
  componentWillReceiveProps(next) {
     this.setState({
        tags:next.eachCompanyInfo.joiner
      })
  }
  inputChange = () => {
    
  }

  handleClose = () => {

  }
  render() {
    const {eachCompanyInfo,currentId, createCustomerSuccess} = this.props;
    console.log(eachCompanyInfo);
    const { getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
    
    const tagsitems =  this.state.tags && this.state.tags.map((item,index) => {
          return (
            <Tag key={item} closable="true" afterClose={() => this.handleClose(item)}>
              {item}
            </Tag>
            )
     })
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
                  initialValue: eachCompanyInfo.department,
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
                  initialValue: eachCompanyInfo.manager,
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
                    <Option value="lucy">李连杰</Option>
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
                  initialValue: eachCompanyInfo.grid,
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
            <Row>
              <Col span={12} className={currentId === -1 ? "phonecreate" : "phoneedit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="注册时间">
                  {getFieldDecorator('registertime', {
                    initialValue: eachCompanyInfo.registertime,
                    onChange: this.inputChange,
                    rules: [{
                    required: true,
                    message: '请填写注册时间'
                  }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "wechatcreate" : "wechatedit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="所属行业">
                  {getFieldDecorator('industry', {
                    initialValue: eachCompanyInfo.industry,
                    onChange: this.inputChange,
                    rules: [{
                    required: true,
                    message: '请填写所属行业'
                  }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12} className={currentId === -1 ? "phonecreate" : "phoneedit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="主营业务">
                  {getFieldDecorator('business', {
                    initialValue: eachCompanyInfo.business,
                    onChange: this.inputChange,
                    rules: [{
                    required: true,
                    message: '请填写主营业务'
                  }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "wechatcreate" : "wechatedit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="年营业额">
                  {getFieldDecorator('yearmoney', {
                    initialValue: eachCompanyInfo.yearmoney,
                    onChange: this.inputChange,
                    rules: [{
                    required: true,
                    message: '请填写年营业额'
                  }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12} className={currentId === -1 ? "phonecreate" : "phoneedit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="法人法名">
                  {getFieldDecorator('owner', {
                    initialValue: eachCompanyInfo.owner,
                    onChange: this.inputChange,
                    rules: [{
                    required: true,
                    message: '请填写法人法名'
                  }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "wechatcreate" : "wechatedit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="企业电话">
                  {getFieldDecorator('phone', {
                    initialValue: eachCompanyInfo.phone,
                    onChange: this.inputChange,
                    rules: [{
                    required: true,
                    message: '请填写企业电话'
                  }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12} className={currentId === -1 ? "phonecreate" : "phoneedit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="员工人数">
                  {getFieldDecorator('people', {
                    initialValue: eachCompanyInfo.people,
                    onChange: this.inputChange,
                    rules: [{
                    required: true,
                    message: '请填写员工人数'
                  }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "wechatcreate" : "wechatedit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="平均工资">
                  {getFieldDecorator('saliary', {
                    initialValue: eachCompanyInfo.saliary,
                    onChange: this.inputChange,
                    rules: [{
                    required: true,
                    message: '请填写平均工资'
                  }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12} className={currentId === -1 ? "phonecreate" : "phoneedit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="企业住址">
                  {getFieldDecorator('address', {
                    initialValue: eachCompanyInfo.address,
                    onChange: this.inputChange,
                    rules: [{
                    required: true,
                    message: '请填写企业住址'
                  }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "wechatcreate" : "wechatedit"}>
                <FormItem 
                          wrapperCol={{span: 24}}
                          >
                  {getFieldDecorator('addressinfo', {
                    initialValue: eachCompanyInfo.addressinfo,
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
const BasicInfoListsEdit = Form.create()(BasicInfoEdit);



class EnterpriseBasicInfo extends Component {
  state = {
    modalVisible: false,
    edited:false,
    eachCompanyInfo: ''
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
            eachCompanyInfo: res.data.data
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
    const {step, mode, currentId} = this.props;
    const {eachCompanyInfo,edited} = this.state;
    return(
        <div className="">
          { mode !== "view" && <BasicInfoListsEdit
                                  currentId={this.props.currentId}
                                  eachCompanyInfo={this.state.eachCompanyInfo}
                                  />}

          { mode === "view" && <BasicInfoListsRead />}
        </div>     
    )
  }
}


const mapStateToProps = (store) => {
  console.log(store)
  return {
    currentCustomerInfo: store.customer.currentCustomerInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCustomerSuccess:(id) => {dispatch(createCustomerSuccess(id))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EnterpriseBasicInfo);


