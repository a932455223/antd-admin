import React,{Component} from 'react';
import update from "immutability-helper";
import {
  Row,
  Col,
  Icon,
  Form,
  Input,
  InputNumber,
  Button,
  Tag,
  Select,
  DatePicker,
  Cascader,
  message
} from 'antd';
import { connect } from 'react-redux';
import API from '../../../../../../API';
import ajax from '../../../../../tools/POSTF';
const FormItem = Form.Item;
const Option = Select.Option;
let addkey = 100;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EditBriefBasicInfoForm extends Component{
  state = {
    basicInfoBeEdit: false,
    departmentOptions: [],
    managerOptions: [],
    gridOptions: []
  }

  componentWillMount(){
    // console.log('EditBriefBasicInfoForm will mount');
    this.getDepartments(1, 1);
  }


  componentWillReceiveProps(next) {
    // console.log('briefBasicInfo will recieve props');
    const { getFieldValue } = next.form;
    // console.log(next);
    // 当 joinersBeEdited不为 true并且 beEditedArray不包含 ‘basicInfo’，发送 action
    if(next.joinersBeEdited && !next.beEditedArray.includes('basicInfo')) {
      this.props.increaseBeEditArray('basicInfo');
    } else if(next.beEditedArray && !next.beEditedArray.includes('basicInfo')) {
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

    // console.log(this.props.accountsArr);
    // console.log(next.accountsArr);
    // 更新 accountsArr
    this.setState({
      accountsArr: next.accountsArr
    })

    // 三级联动，更新 manager和 grid
    if((next && next.briefInfo && next.briefInfo.department && next.briefInfo.department.value)
      !==
      (this.props && this.props.briefInfo && this.props.briefInfo.department && this.props.briefInfo.department.value)) {
      let departmentId = getFieldValue('department') ? getFieldValue('department') - 0 : '';
      let managerId = getFieldValue('manager') ? getFieldValue('manager') - 0 : '';
      if(departmentId > 0) {
        this.getDepartments(departmentId, managerId);
      }
    }
  };

  // 获取 department，
  getDepartments = (departmentId, managerId) => {
    ajax.all([
      ajax.Get(API.GET_CUSTOMER_DEPARTMENT), // 所属机构下拉菜单
      ajax.Get(API.GET_DEPARTMENT_STAFFS(departmentId)), // 所属客户经理下拉菜单
      ajax.Get(API.GET_DEPARTMENT_AREAS(departmentId)) // 重置网格
    ]).then((res)=>{
      let newState = update(this.state, {
        departmentOptions: {$set: res[0].data.data},
        managerOptions:{$set:res[1].data.data},
        gridOptions:{$set:res[2].data.data}
      });
      this.setState(newState);
    })
  }

  // basic 输入框内容被修改了
  inputBasicInfoChange = () => {
    if(!this.state.basicInfoBeEdit) {
      this.props.increaseBeEditArray('basicInfo'); // 修改 store树上的 beEditedArray
      let newState = update(this.state, {
        basicInfoBeEdit: {$set: true}
      })
      this.setState(newState)
    }
  }

  // basic 选择框内容被修改了
  selectBasicInfoChange = (value) => {
    if(!this.state.basicInfoBeEdit) {
      this.props.increaseBeEditArray('basicInfo'); // 修改 store树上的 beEditedArray
      let newState = update(this.state, {
        basicInfoBeEdit: {$set: true}
      })
      this.setState(newState)
    }
  };

  // select staff
  selectStaff = () => {
    this.props.modalShow()
  }

  // add accounts info
  add = () => {
    const { addAccountsInfo, accountsArr } = this.props;
    addAccountsInfo(addkey);

    accountsArr.push(`row-${addkey}`);
    if(!this.state.basicInfoBeEdit) {
      this.props.increaseBeEditArray('basicInfo'); // 修改 store树上的 beEditedArray
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
    const { deleteAccountsInfo, accountsArr } = this.props;
    deleteAccountsInfo(k);

    const position = accountsArr.indexOf(k);
    accountsArr.splice(position, 1);
    if(!this.state.basicInfoBeEdit) {
      this.props.increaseBeEditArray('basicInfo'); // 修改 store树上的 beEditedArray
    }
    let newState = update(this.state, {
      accountsArr: {$set: accountsArr},
      basicInfoBeEdit: {$set: true}
    })
    this.setState(newState)
  }

  // 删除 tags
  handleClose = (joiner) => {
    if(!this.state.basicInfoBeEdit) {
      this.props.increaseBeEditArray('basicInfo'); // 修改 store树上的 beEditedArray
      let newState = update(this.state, {
        basicInfoBeEdit: {$set: true}
      })
      this.setState(newState);
    }

    this.props.changeJoiners(joiner);
  }

  // 更新信息
  updateInfo = (briefInfo) => {
    const { validateFields,getFieldsError } = this.props.form;
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
      eachCustomerInfo,

      mode,
      // id,
      beEditedArray,

      joinersBeEdited,
      staffs,
      accounts,
      accountsArr
    } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsValue, setFieldsValue, validateFields} = this.props.form;
    const { department, manager, grid } = this.props.briefInfo;
    const { departmentOptions, managerOptions, gridOptions } = this.state;

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

    /* 编辑状态下
     ** basic info
     */
    const EditParticipate = staffs && staffs.map((item,index) => {
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
    {/*
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
                // initialValue: eachCustomerInfo.department,
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
    */}

        <div className="personInfo">
          <Row>
            <Col span={12}>
              {AccountsNumber}
            </Col>

            <Col span={12} className="addMessage">
              {AccountsRemark}
            </Col>
          </Row>
        </div>

      {/*
        <div className="personInfo">
          <Row>
            <Col span={12} className={mode === 'create' ? "phoneCreate" : "phoneEdit"}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 15}}
                        label="手机号：">
                {getFieldDecorator('phone', {
                  // initialValue: eachCustomerInfo.phone,
                  onChange: this.inputBasicInfoChange,
                  rules: [{
                    required: true,
                    message: '请填写手机号'
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>

            <Col span={12} className={mode === 'create' ? "wechatCreate" : "wechatEdit"}>
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="微信号：">
                {getFieldDecorator('wechat', {
                  // initialValue: eachCustomerInfo.wechat,
                  onChange: this.inputBasicInfoChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={mode === 'create' ? "idCreate" : "idEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="身份证号："
                className="certificate"
              >
                {getFieldDecorator('certificate', {
                  // initialValue: eachCustomerInfo.certificate,
                  onChange: this.inputBasicInfoChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>

            <Col span={12} className={mode === 'create' ? "birthCreate" : "birthEdit"}>
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="生日：">
                {getFieldDecorator('birth', {
                  // initialValue: moment(eachCustomerInfo.birth, dateFormat),
                  onChange: this.selectBasicInfoChange
                })(
                  <DatePicker
                    format={dateFormat}
                    getCalendarContainer={() => document.getElementById('editMyBase')}
                  />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={mode === 'create' ? "originCreate" : "originEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="籍贯："
                className="origin"
              >
                {getFieldDecorator('origin', {
                  // initialValue: [eachCustomerInfo.origin],
                  onChange: this.inputBasicInfoChange
                })(
                  <Input placeholder="请选择籍贯"/>
                )}
              </FormItem>
            </Col>

            <Col span={12} className={mode === 'create' ? "ageCreate" : "ageEdit"}>
              <FormItem
                labelCol={{span: 8, offset: 1}}
                wrapperCol={{span: 15}}
                label="年龄："
                className="age"
              >
                {getFieldDecorator('age', {
                  // initialValue: eachCustomerInfo.age,
                  onChange: this.inputBasicInfoChange
                })(
                  <InputNumber placeholder="客户年龄"/>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={24} className={mode === 'create' ? "addressCreate" : "addressEdit"}>
              <FormItem
                labelCol={{span: 4}}
                wrapperCol={{span: 19}}
                label="家庭住址："
                className="address"
              >
                {getFieldDecorator('address', {
                  // initialValue: eachCustomerInfo.address,
                  onChange: this.inputBasicInfoChange
                })(
                  <Input placeholder="请输入家庭住址"/>
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
                {EditParticipate}
                <span className="addCrewButton"
                      onClick={this.selectStaff}>
                    <Icon type="plus-circle-o" />添加人员
                  </span>
              </Col>
            </Col>
          </Row>
        </div>
      */}


        <Row className="buttonSave">
          <Col span={24} >
            <Col span={4}>
            </Col>
            <Button
              type="primary"
              onClick={this.updateInfo.bind(this, getFieldsValue())}
              disabled={!this.state.basicInfoBeEdit}
            >保存</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

function mapPropsToFields (props) {
  const { briefInfo, accounts } = props;
  console.log(accounts['row-0-accountNo'])
  return {
    ...accounts,
    ...briefInfo
  }
}

function onFieldsChange(props, changedFields) {
  props.onChange(changedFields);
};

function onValuesChange(props, values) {
  // console.log(props)
  // console.log(values)
}

const EditBriefBasicInfo = Form.create({
  // mapPropsToFields,
  // onFieldsChange
  // onValuesChange
})(EditBriefBasicInfoForm)

export default EditBriefBasicInfo;
