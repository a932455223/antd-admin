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
  Modal,
  message
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

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

//个人信息表单................
class CompanyBasicInfo extends Component{
  state = {
    basicInfoBeEdit: false,

    departmentOptions: [],
    managerOptions: [],
    gridOptions: [],

    provinceOptions: [],
    cityOptions: [],
    areaOptions: []
  }

  // 一次性获取所有下拉列表
  getAlloptions = (departmentId, managerId, province, city) => {
    if(province == undefined || province == '') {
      ajax.all([
        ajax.Get(API.GET_CUSTOMER_DEPARTMENT), // 所属机构下拉菜单
        ajax.Get(API.GET_DEPARTMENT_STAFFS(departmentId)), // 所属客户经理下拉菜单
        ajax.Get(API.GET_DEPARTMENT_AREAS(departmentId)), // 重置网格
        ajax.Get(API.GET_AREA_SELECT(1))
      ]).then((res) => {
        let newState = update(this.state, {
          departmentOptions: {$set: res[0].data.data},
          managerOptions:{$set:res[1].data.data},
          gridOptions:{$set:res[2].data.data},
          provinceOptions: {$set: res[3].data.data}
        });
        this.setState(newState);
      })
    } else {
      ajax.all([
        ajax.Get(API.GET_CUSTOMER_DEPARTMENT), // 所属机构下拉菜单
        ajax.Get(API.GET_DEPARTMENT_STAFFS(departmentId)), // 所属客户经理下拉菜单
        ajax.Get(API.GET_DEPARTMENT_AREAS(departmentId)), // 重置网格
        ajax.Get(API.GET_AREA_SELECT(1)),
        ajax.Get(API.GET_AREA_SELECT(province)),
        ajax.Get(API.GET_AREA_SELECT(city))
      ]).then((res) => {
        let newState = update(this.state, {
          departmentOptions: {$set: res[0].data.data},
          managerOptions:{$set:res[1].data.data},
          gridOptions:{$set:res[2].data.data},
          provinceOptions: {$set: res[3].data.data},
          cityOptions: {$set: res[4].data.data},
          areaOptions: {$set: res[5].data.data},
        });
        this.setState(newState);
      })
    }
  }

  componentWillMount() {
    // console.log('CompanyBasicInfo will mount');
    const { companyInfo } = this.props;

    let originProvince = companyInfo && companyInfo.addressCode && companyInfo.addressCode.split(' ')[0];
    let originCity = companyInfo && companyInfo.addressCode && companyInfo.addressCode.split(' ')[1];

    let province = originProvince != null || originProvince != '' ? originProvince : undefined;
    let city = originCity != null || originCity != '' ? originCity : undefined;

    this.getAlloptions(1, 1, province, city);
  }

  componentWillReceiveProps(next) {
    // console.log('next')
    const { getFieldValue } = next.form;

    // 当 joinersBeEdited不为 true并且 beEditedArray不包含 ‘basicInfo’，发送 action
    if(next.joinersBeEdited && !next.beEditedArray.includes('enterpriseBasicInfo')) {
      this.props.increaseBeEditArray('enterpriseBasicInfo');
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
  }

  // 选择省份，获取城市选项, 清空city 和area的值
  provinceSelect = (province) => {
    if(!this.state.basicInfoBeEdit) {
      this.props.increaseBeEditArray('enterpriseBasicInfo'); // 修改 store树上的 beEditedArray
      let newState = update(this.state, {
        basicInfoBeEdit: {$set: true}
      })
      this.setState(newState)
    }

    const { setFieldsValue } = this.props.form;

    ajax.Get(API.GET_AREA_SELECT(province))
        .then(res => {
          let provinceState = update(this.state, {
            cityOptions: {$set: res.data.data},
            areaOptions: {$set: []}
          });

          this.setState(provinceState);
        });


    setFieldsValue({
      'city': undefined,
      'area': undefined
    })
  }

  // 选择城市，获取区域选项，清空区域选项
  citySelect = (cityId) => {
    if(!this.state.basicInfoBeEdit) {
      this.props.increaseBeEditArray('enterpriseBasicInfo'); // 修改 store树上的 beEditedArray
      let newState = update(this.state, {
        basicInfoBeEdit: {$set: true}
      })
      this.setState(newState)
    }

    const { setFieldsValue } = this.props.form;
    ajax.Get(API.GET_AREA_SELECT(cityId))
        .then(res => {
          let newState = update(this.state, {
            areaOptions: {$set: res.data.data}
          });

          this.setState(newState);
        });
    setFieldsValue({
      'area': undefined
    })
  }

  // 获取 department，
  getDepartments = (departmentId) => {
    ajax.all([
      ajax.Get(API.GET_CUSTOMER_DEPARTMENT), // 所属机构下拉菜单
      ajax.Get(API.GET_DEPARTMENT_STAFFS(departmentId)), // 所属客户经理下拉菜单
      ajax.Get(API.GET_DEPARTMENT_AREAS(departmentId)), // 重置网格
    ]).then((res) => {
      let newState = update(this.state, {
        departmentOptions: {$set: res[0].data.data},
        managerOptions:{$set: res[1].data.data},
        gridOptions:{$set: res[2].data.data}
      });
      this.setState(newState);
    })
  }

  // department select change
  departmentChange = () => {
    if(!this.state.basicInfoBeEdit) {
      this.props.increaseBeEditArray('enterpriseBasicInfo'); // 修改 store树上的 beEditedArray
      let newState = update(this.state, {
        basicInfoBeEdit: {$set: true}
      })
      this.setState(newState)
    }

    const { getFieldValue, setFieldsValue } = this.props.form;

    // 三级联动，更新 manager和 grid
    if(departmentId > 0) {
      this.getDepartments(departmentId);
    }

    setFieldsValue({
      manager: undefined,
      grid: undefined
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

  // 删除 staffs
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
    const { validateFields, getFieldValue, getFieldsError } = this.props.form;
    const { addNewCustomer } = this.props;
    const { provinceOptions, cityOptions, areaOptions } = this.state;

    let province = provinceOptions.filter(item => item.id == getFieldValue('province'));
    let city = cityOptions.filter(item => item.id == getFieldValue('city'));
    let area = areaOptions.filter(item => item.id == getFieldValue('area'));
    let detailStreet = getFieldValue('address');

    validateFields();

    if(hasErrors(getFieldsError())) {
      message.error('表单填写有误，请仔细检查表单');
    } else {
      let address;
      if(province.length !== 0 && city.length !== 0 && area.length !== 0 && detailStreet !== '') {
        address = `${province[0].name} ${city[0].name} ${area[0].name} ${detailStreet}`;
        addNewCustomer(briefInfo, address);
      } else if(province.length !== 0 && (city.length === 0 || area.length !== 0 || detailStreet !== '')) {
        message.error('表单填写有误，请仔细检查表单');
      } else if(detailStreet !== '' && (province.length === 0 || city.length === 0 || area.length === 0)){
        message.error('表单填写有误，请仔细检查表单');
      } else {
        address = '';
        addNewCustomer(briefInfo, address);
      }
    }
  }

  render() {
    const {
      eachCompanyInfo,
      companyInfo,
      id,
      mode,
      createCustomerSuccess,
      staffs,
      accountsArr,
      accounts
    } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
    const {
      departmentOptions,
      managerOptions,
      gridOptions,
      basicInfoBeEdit,
      provinceOptions,
      cityOptions,
      areaOptions
    } = this.state;

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

    const staffsItems  = staffs && staffs.map((item,index) => {
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
          initialValue: accounts[`${k}-remark`] && accounts[`${k}-remark`].value,
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
            message: '请填写账户号码'
          },{
            pattern: /^\d+$/,
            message: '账户只能为数字'
          }],
          initialValue: accounts[`${k}-accountNo`] && accounts[`${k}-accountNo`].value,
          // validateTrigger: ['onChange', 'onBlur'],
          onChange: this.inputBasicInfoChange
        })(
          <Input placeholder="填写账号信息"  />
        )}
      </FormItem>
    );

    return (
        <Form id="editMyBase" className="basicInfolist">
          <Row className={mode === 'create' ? "briefInfoCreate" : "briefInfoEdit"} type="flex" justify="space-between">
            <Col span={7}>
              <FormItem labelCol={{span: 11}}
                        wrapperCol={{span: 13}}
                        label="所属机构">
                {getFieldDecorator('department', {
                  rules: [{
                    required: true,
                    message: '选择所属机构!'
                  }],
                  initialValue: eachCompanyInfo.department && eachCompanyInfo.department.value,
                  onChange: this.departmentChange
                })(
                    <Select
                      showSearch
                      placeholder="选择所属机构"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().includes(input.toLowerCase())}
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
                  initialValue: eachCompanyInfo.manager && eachCompanyInfo.manager.value,
                  onChange: this.selectBasicInfoChange
                })(
                  <Select
                    showSearch
                    placeholder="选择客户经理"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().includes(input.toLowerCase())}
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
                  initialValue: eachCompanyInfo.grid && eachCompanyInfo.grid.value,
                  onChange: this.selectBasicInfoChange
                })(
                  <Select
                    showSearch
                    placeholder="选择所属网格"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().includes(input.toLowerCase())}
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
              <Col span={12} className={mode === 'create' ? "phonecreate" : "phoneedit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="注册时间">
                  {getFieldDecorator('registeTime', {
                    initialValue: eachCompanyInfo.registeTime && eachCompanyInfo.registeTime.value,
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

              <Col span={12} className={mode === 'create' ? "wechatcreate" : "wechatedit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="所属行业">
                  {getFieldDecorator('industory', {
                    initialValue: eachCompanyInfo.industory && eachCompanyInfo.industory.value,
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
              <Col span={12} className={mode === 'create' ? "phoneCreate" : "phoneEdit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="主营业务">
                  {getFieldDecorator('mainBusiness', {
                    initialValue: eachCompanyInfo.mainBusiness && eachCompanyInfo.mainBusiness.value,
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

              <Col span={12} className={mode === 'create' ? "wechatCreate" : "wechatEdit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="年营业额">
                  {getFieldDecorator('yearIncome', {
                    initialValue: eachCompanyInfo.yearIncome && eachCompanyInfo.yearIncome.value,
                    onChange: this.inputBasicInfoChange,
                    rules: [{
                      required: true,
                      message: '请填写年营业额'
                    },{
                      pattern: /^\d+$/,
                      message: '营业额只能为数字'
                    }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12} className={mode === 'create' ? "phoneCreate" : "phoneEdit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="法人法名">
                  {getFieldDecorator('legalPerson', {
                    initialValue: eachCompanyInfo.legalPerson && eachCompanyInfo.legalPerson.value,
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

              <Col span={12} className={mode === 'create' ? "wechatCreate" : "wechatEdit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="企业电话">
                  {getFieldDecorator('telephone', {
                    initialValue: eachCompanyInfo.telephone && eachCompanyInfo.telephone.value,
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
              <Col span={12} className={mode === 'create' ? "phoneCreate" : "phoneEdit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="员工人数">
                  {getFieldDecorator('staffCount', {
                    initialValue: eachCompanyInfo.staffCount && eachCompanyInfo.staffCount.value,
                    onChange: this.inputBasicInfoChange,
                    rules: [{
                      required: true,
                      message: '请填写员工人数'
                    },{
                      pattern: /^\d+$/,
                      message: '员工人数只能为数字'
                    }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={mode === 'create' ? "wechatCreate" : "wechatEdit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="平均工资">
                  {getFieldDecorator('avgSalary', {
                    initialValue: eachCompanyInfo.avgSalary && eachCompanyInfo.avgSalary.value,
                    onChange: this.inputBasicInfoChange,
                    rules: [{
                      required: true,
                      message: '请填写平均工资'
                    },{
                      pattern: /^\d+$/,
                      message: '平均工资只能为数字'
                    }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
                <Col span={8} className={mode === 'create' ? "addressCreate" : "addressEdit"}>
                  <FormItem labelCol={{span: 12}}
                            wrapperCol={{span: 12}}
                            label="企业住址"
                            className="province">
                    {getFieldDecorator('province', {
                      initialValue: companyInfo && companyInfo.addressCode && companyInfo.addressCode.split(' ')[0] != null
                                    ?
                                    companyInfo.addressCode.split(' ')[0]
                                    :
                                    undefined,
                      onChange: this.provinceSelect
                    })(
                      <Select
                        showSearch
                        placeholder="选择省份"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.value.toLowerCase().includes(input.toLowerCase())}
                        getPopupContainer={() => document.getElementById('editMyBase')}
                      >
                        {provinceOptions && provinceOptions.map(provinceItem =>
                          <Option key={provinceItem.id} value={provinceItem.id + ''}>{provinceItem.name}</Option>
                        )}
                      </Select>
                    )}
                  </FormItem>
                </Col>

                <Col span={6}>
                  <FormItem wrapperCol={{span: 16, offset: 4}}>
                    {getFieldDecorator('city', {
                      initialValue: companyInfo && companyInfo.addressCode && companyInfo.addressCode.split(' ')[1] != null
                                    ?
                                    companyInfo.addressCode.split(' ')[1]
                                    :
                                    undefined,
                      onChange: this.citySelect
                    })(
                      <Select
                        showSearch
                        placeholder="选择城市"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.value.toLowerCase().includes(input.toLowerCase())}
                        getPopupContainer={() => document.getElementById('editMyBase')}
                      >
                        {cityOptions && cityOptions.map(cityItem =>
                          <Option key={cityItem.id} value={cityItem.id + ''}>{cityItem.name}</Option>
                        )}
                      </Select>
                    )}
                  </FormItem>
                </Col>

                <Col span={4}>
                  <FormItem wrapperCol={{span: 24}}>
                    {getFieldDecorator('area', {
                      initialValue: companyInfo && companyInfo.addressCode && companyInfo.addressCode.split(' ')[2] != null
                                    ?
                                    companyInfo.addressCode.split(' ')[2]
                                    :
                                    undefined,
                      onChange: this.selectBasicInfoChange
                    })(
                      <Select
                        showSearch
                        placeholder="选择区域"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.value.toLowerCase().includes(input.toLowerCase())}
                        getPopupContainer={() => document.getElementById('editMyBase')}
                      >
                        {areaOptions && areaOptions.map(areaItem =>
                          <Option key={areaItem.id} value={areaItem.id + ''}>{areaItem.name}</Option>
                        )}
                      </Select>
                    )}
                  </FormItem>
                </Col>
            </Row>

            <Row>
              <Col span={24} className={mode === 'create' ? "addressCreate" : "addressEdit"}>
                <FormItem
                  labelCol={{span: 4}}
                  wrapperCol={{span: 19}}
                  label="详细住址："
                  className="address"
                >
                  {getFieldDecorator('address', {
                    initialValue: companyInfo.address && companyInfo.address.split(' ')[3] != null
                                  ?
                                  companyInfo.address.split(' ')[3]
                                  :
                                  undefined,
                    onChange: this.inputBasicInfoChange
                  })(
                    <Input placeholder="请输入详细住址"/>
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
                  {staffsItems}
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
  // mapPropsToFields,
  // onFieldsChange
})(CompanyBasicInfo);

export default EnterpriseBasicInfoForm;
