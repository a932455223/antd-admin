import React, { Component } from 'react';
import update from "immutability-helper";
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
import { connect } from 'react-redux';

import API from '../../../../../../API';
import ajax from '../../../../../tools/POSTF';

import { createCustomerSuccess } from '../../../../../redux/actions/customerAction';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
let addkey = 100;

//个人信息表单................
class CompanyBasicInfo extends Component{
  state = {
    tags : [],
    basicInfoBeEdit: false,

    departmentOptions: [],
    managerOptions: [],
    gridOptions: [],

    accountsArr: ['row-0']
  }

  componentWillMount() {
    this.getDepartments(1, 1);
  }

  componentWillReceiveProps(next) {
    // console.log('next')
    const { getFieldValue } = next.form;

    // 当 joinersBeEdited不为 true并且 beEditedArray不包含 ‘basicInfo’，发送 action
    if(next.joinersBeEdited && !next.beEditedArray.includes('enterpriseBasicInfo')) {
      this.props.increaseBeEditArray('basicInfo');
    } else if(next.beEditedArray && !next.beEditedArray.includes('enterpriseBasicInfo')) {
      // 重置 InfoBeEdited
      let newState = update(this.state, {
        basicInfoBeEdit: {$set: false}
      })
      this.setState(newState)
    } else {
      // 重置 InfoBeEdited
      let newState = update(this.state, {
        basicInfoBeEdit: {$set: true}
      })
      this.setState(newState)
    }

    // 更新 accountsArr
    this.setState({
      accountsArr: next.accountsArr
    })

    // 三级联动，更新 manager和 grid
    let departmentId = getFieldValue('department') ? getFieldValue('department') - 0 : '';
    let managerId = getFieldValue('manager') ? getFieldValue('manager') - 0 : '';
    if(departmentId > 0) {
      this.getDepartments(departmentId, managerId);
    }
  }

  // 获取 department，
  getDepartments = (departmentId, managerId) => {
    // 所属机构下拉菜单
    ajax.all([
      ajax.Get(API.GET_CUSTOMER_DEPARTMENT),
      ajax.Get(API.GET_DEPARTMENT_STAFFS(departmentId)),
      ajax.Get(API.GET_DEPARTMENT_AREAS(departmentId))
    ]).then((res)=>{
      let newState = update(this.state, {
        departmentOptions: {$set: res[0].data.data},
        managerOptions:{$set:res[1].data.data},
        gridOptions:{$set:res[2].data.data}
      });
      this.setState(newState);
    })
  }

  // 输入框发生变化
  inputBasicInfoChange = () => {
    if(!this.state.basicInfoBeEdit) {
      this.props.increaseBeEditArray('enterpriseBasicInfo'); // 修改 store树上的 beEditedArray
      let newState = update(this.state, {
        basicInfoBeEdit: {$set: true}
      })
      this.setState(newState)
    }
  }

  // 选择框发生变化
  selectBasicInfoChange = () => {
    if(!this.state.basicInfoBeEdit) {
      this.props.increaseBeEditArray('enterpriseBasicInfo'); // 修改 store树上的 beEditedArray
      let newState = update(this.state, {
        basicInfoBeEdit: {$set: true}
      })
      this.setState(newState)
    }
  }

  // 选择参与人员
  selectStaff = () => {
    this.props.modalShow()
  }

  // 删除 tags
  handleClose = (joiner) => {
    if(!this.state.basicInfoBeEdit) {
      this.props.increaseBeEditArray('enterpriseBasicInfo'); // 修改 store树上的 beEditedArray
      let newState = update(this.state, {
        basicInfoBeEdit: {$set: true}
      })
      this.setState(newState);
    }

    this.props.changeJoiners(joiner);
  }

  // add accounts info
  add = () => {
    const { addAccountsInfo } = this.props;
    addAccountsInfo(addkey);

    const { accountsArr } = this.props;
    accountsArr.push(`row-${addkey}`);
    if(!this.state.basicInfoBeEdit) {
      this.props.increaseBeEditArray('enterpriseBasicInfo'); // 修改 store树上的 beEditedArray
    }
    let newState = update(this.state, {
      accountsArr: {$set: accountsArr},
      basicInfoBeEdit: {$set: true}
    })
    this.setState(newState)
    return addkey++
  }

  // remove accounts info
  remove = (k) => {
    const { deleteAccountsInfo } = this.props;
    deleteAccountsInfo(k);

    const { accountsArr } = this.props;

    const position = accountsArr.indexOf(k);
    accountsArr.splice(position, 1);
    if(!this.state.basicInfoBeEdit) {
      this.props.increaseBeEditArray('enterpriseBasicInfo'); // 修改 store树上的 beEditedArray
    }
    let newState = update(this.state, {
      accountsArr: {$set: accountsArr},
      basicInfoBeEdit: {$set: true}
    })
    this.setState(newState)
  }

  // 更新信息
  updateInfo = (briefInfo) => {
    const { validateFields, getFieldsError } = this.props.form;
    const { addNewCustomer } = this.props;
    validateFields();
    if(hasErrors(getFieldsError())) {
      message.error('表单填写有误，请仔细检查表单');
    } else {
      addNewCustomer(briefInfo);
    }
  }

  render() {
    const {
      eachCompanyInfo,
      id,
      createCustomerSuccess,
      tags,
      accountsArr
    } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
    const { departmentOptions, managerOptions, gridOptions, basicInfoBeEdit } = this.state;
    console.log(accountsArr);

    const formItemLayout = {
      labelCol: {
        sm: { span: 8 }
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        sm: { span: 15, offset: 8 },
      },
    };
    const dateFormat = 'YYYY-MM-DD'; // 日期格式

    const tagsitems  = tags && tags.map((item,index) => {
      return (
        <Tag key={`${item.id}${index}`} closable="true" afterClose={() => this.handleClose(item)}>
          {item.name}
        </Tag>
      )
    })

    const AccountsRemark = accountsArr.map((k, index) =>
      <FormItem
        key={k + 'remark'}
        wrapperCol={{span: 24}}
      >
        {getFieldDecorator(`${k}-remark`, {
          onChange: this.inputBasicInfoChange
        })(
          <Input placeholder="填写备注信息"/>
        )}

        {index === 0
          ?
          <i className="dynamic-add-button iconfont" onClick={this.add}>&#xe688;</i>
          :
          <i className="dynamic-delete-button iconfont" onClick={() => this.remove(k)}>&#xe697;</i>
        }
      </FormItem>
    );
    const AccountsNumber = accountsArr.map((k, index) =>
      <FormItem
        label={index === 0 ? '账户' : ''}
        required={false}
        key={k + 'accountNo'}
        {...(index===0 ? formItemLayout : formItemLayoutWithOutLabel)}
        className="accounts"
      >
        {getFieldDecorator(`${k}-accountNo`, {
          rules: [{
            required: true,
          },{
            pattern: /^\d+$/
          }],
          // validateTrigger: ['onChange', 'onBlur'],
          onChange: this.inputBasicInfoChange
        })(
          <Input placeholder="填写账号信息"  />
        )}
      </FormItem>
    );

    return (
        <Form id="editMyBase" className="basicInfolist">
          <Row className={id === -1 ? "briefInfoCreate" : "briefInfoEdit"} type="flex" justify="space-between">
            <Col span={7}>
              <FormItem labelCol={{span: 11}}
                        wrapperCol={{span: 13}}
                        label="所属机构">
                {getFieldDecorator('department', {
                  rules: [{
                    required: true,
                    message: '选择所属机构!'
                  }],
                  // initialValue: eachCompanyInfo ? eachCompanyInfo.department : null,
                  onChange: this.selectBasicInfoChange
                })(
                    <Select
                      showSearch
                      placeholder="选择所属机构"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      getPopupContainer={() => document.getElementById('editMyBase')}
                    >
                      {departmentOptions && departmentOptions.map(departmentItem =>
                        <Option key={departmentItem.id} value={departmentItem.id + ''}>{departmentItem.name}</Option>
                      )}
                    </Select>
                )}
              </FormItem>
            </Col>

            <Col span={7}>
              <FormItem labelCol={{span: 11}}
                        wrapperCol={{span: 13}}
                        label="客户经理">
                {getFieldDecorator('manager', {
                  // initialValue:eachCompanyInfo ? eachCompanyInfo.manager : null,
                  onChange: this.selectBasicInfoChange
                })(
                  <Select
                    showSearch
                    placeholder="选择客户经理"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    getPopupContainer={() => document.getElementById('editMyBase')}
                  >
                    {managerOptions && managerOptions.map(managerItem =>
                      <Option key={managerItem.id} value={managerItem.id + ''}>{managerItem.name}</Option>
                    )}
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={7}>
              <FormItem labelCol={{span: 11}}
                        wrapperCol={{span: 13}}
                        label="所属网格">
                {getFieldDecorator('grid', {
                  // initialValue: eachCompanyInfo ? eachCompanyInfo.grid : null,
                  onChange: this.selectBasicInfoChange
                })(
                  <Select
                    showSearch
                    placeholder="选择所属网格"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    getPopupContainer={() => document.getElementById('editMyBase')}

                  >
                    {gridOptions && gridOptions.map(gridItem =>
                      <Option key={gridItem.id} value={gridItem.id + ''}>{gridItem.name}</Option>
                    )}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>

          <div className="personInfo">
            <Row>
              <Col span={12}>
                {AccountsNumber}
              </Col>

              <Col span={12} className="addMessage">
                {AccountsRemark}
              </Col>
            </Row>

            <Row>
              <Col span={12} className={id === -1 ? "phonecreate" : "phoneedit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="注册时间">
                  {getFieldDecorator('registeTime', {
                    // initialValue: eachCompanyInfo ? eachCompanyInfo.registertime : null,
                    onChange: this.inputBasicInfoChange,
                    rules: [{
                    required: true,
                    message: '请填写注册时间'
                  }]
                  })(
                    <DatePicker
                      format={dateFormat}
                      getCalendarContainer={() => document.getElementById('editMyBase')}
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={id === -1 ? "wechatcreate" : "wechatedit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="所属行业">
                  {getFieldDecorator('industory', {
                    // initialValue: eachCompanyInfo ? eachCompanyInfo.industry : null,
                    onChange: this.inputBasicInfoChange,
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
              <Col span={12} className={id === -1 ? "phoneCreate" : "phoneEdit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="主营业务">
                  {getFieldDecorator('mainBusiness', {
                    // initialValue: eachCompanyInfo ? eachCompanyInfo.business : null,
                    onChange: this.inputBasicInfoChange,
                    rules: [{
                    required: true,
                    message: '请填写主营业务'
                  }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={id === -1 ? "wechatCreate" : "wechatEdit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="年营业额">
                  {getFieldDecorator('yearIncome', {
                    // initialValue: eachCompanyInfo ? eachCompanyInfo.yearmoney : null,
                    onChange: this.inputBasicInfoChange,
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
              <Col span={12} className={id === -1 ? "phoneCreate" : "phoneEdit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="法人法名">
                  {getFieldDecorator('legalPerson', {
                    // initialValue: eachCompanyInfo ? eachCompanyInfo.owner : null,
                    onChange: this.inputBasicInfoChange,
                    rules: [{
                    required: true,
                    message: '请填写法人法名'
                  }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={id === -1 ? "wechatCreate" : "wechatEdit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="企业电话">
                  {getFieldDecorator('telephone', {
                    // initialValue: eachCompanyInfo ? eachCompanyInfo.phone : null,
                    onChange: this.inputBasicInfoChange,
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
              <Col span={12} className={id === -1 ? "phoneCreate" : "phoneEdit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="员工人数">
                  {getFieldDecorator('staffCount', {
                    // initialValue: eachCompanyInfo ? eachCompanyInfo.people : null,
                    onChange: this.inputBasicInfoChange,
                    rules: [{
                    required: true,
                    message: '请填写员工人数'
                  }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={id === -1 ? "wechatCreate" : "wechatEdit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="平均工资">
                  {getFieldDecorator('avgSalary', {
                    // initialValue: eachCompanyInfo ? eachCompanyInfo.saliary : null,
                    onChange: this.inputBasicInfoChange,
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
              <Col span={12} className={id === -1 ? "phoneCreate" : "phoneEdit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="企业住址">
                  {getFieldDecorator('addressCode', {
                    // initialValue: eachCompanyInfo ? eachCompanyInfo.address : null,
                    onChange: this.inputBasicInfoChange,
                    rules: [{
                    required: true,
                    message: '请填写企业住址'
                  }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={id === -1 ? "wechatCreate" : "wechatEdit"}>
                <FormItem
                          wrapperCol={{span: 24}}
                          >
                  {getFieldDecorator('address', {
                    // initialValue: eachCompanyInfo ? eachCompanyInfo.addressinfo :null,
                    onChange: this.inputBasicInfoChange
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
                  <span className="addCrewButton"
                        onClick={this.selectStaff}>
                    <Icon type="plus-circle-o" />添加人员
                  </span>
                </Col>
              </Col>
            </Row>
          </div>
          <Row className="buttonSave">
            <Col span={24} >
              <Col span={4}>
              </Col>
              <Button
                type="primary"
                disabled={!this.state.basicInfoBeEdit}
                onClick={this.updateInfo.bind(this, getFieldsValue())}
              >保存</Button>
            </Col>
          </Row>
        </Form>
      )
  }
}

function mapPropsToFields (props) {
  const { eachCompanyInfo, accounts } = props;
  return {
    ...accounts,
    ...eachCompanyInfo
  }
}

function onFieldsChange(props, changedFields) {

  props.onChange(changedFields);
};


const EnterpriseBasicInfoForm = Form.create({
  mapPropsToFields,
  onFieldsChange
})(CompanyBasicInfo);

export default EnterpriseBasicInfoForm;
