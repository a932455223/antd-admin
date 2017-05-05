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
  Cascader
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
let addkey = 100;

import API from '../../../../../../API';
import ajax from '../../../../../tools/POSTF';

class EditBriefBasicInfoForm extends Component{
  state = {
    tags : [],
    originOptions:[
      {
        value: '上海',
        label: '上海',
        isLeaf: false,
      },
      {
        value: '江苏南通',
        label: '江苏',
        isLeaf: false,
      }
    ],
    basicInfoBeEdit: false,
    phone: '',
    departmentOptions: [],
    managerOptions: [],
    gridOptions: [],
    accountsArr: []
  }

  componentWillMount(){
    // console.log('key will mount');
    this.getDepartments(1, 1);
  }

  componentWillReceiveProps(next) {
    // console.log('personalBasicInfo will recieve props');
    const { getFieldValue } = next.form;

    if(!next.beEdited && next.joinersBeEdited) {
      this.props.customerInfoBeEdit(); // 修改 store树上的 beEdited
    }

    // 确认参与人员按钮被点击时
    if(next.joinersBeEdited && (!this.props.beEdited || next.beEdited) ) {
      let newState = update(this.state, {
        basicInfoBeEdit: {$set: true}
      })
      this.setState(newState)
    } else if(!next.beEdited || getFieldValue('phone') === '' || getFieldValue('department') === '') {
      // 重置 InfoBeEdited
      let newState = update(this.state, {
        basicInfoBeEdit: {$set: false}
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
  };

  // 获取 department，
  getDepartments = (departmentId, managerId) => {
    // 所属机构下拉菜单
    ajax.Get(API.GET_CUSTOMER_DEPARTMENT)
    .then((res) => {
      let newState = update(this.state, {
        departmentOptions: {$set: res.data.data},
      });
      this.setState(newState);
    })

    // 所属客户经理下拉菜单
    ajax.Get(API.GET_DEPARTMENT_STAFFS(departmentId))
    .then((res) => {
      let newState = update(this.state, {
        managerOptions: {$set: res.data.data},
      });
      this.setState(newState);
    })

    // 重置网格
    ajax.Get(API.GET_DEPARTMENT_AREAS(departmentId))
    .then((res) => {
      let newState = update(this.state, {
        gridOptions: {$set: res.data.data},
      });
      this.setState(newState);
    })
  }

  // basic 输入框内容被修改了
  inputBasicInfoChange = () => {
    if(!this.props.beEdited) {
      this.props.customerInfoBeEdit(); // 修改 store树上的 beEdited
    }

    let newState = update(this.state, {
      basicInfoBeEdit: {$set: true}
    })
    this.setState(newState)
  }

  // basic 选择框内容被修改了
  selectBasicInfoChange = (value) => {
    let newState = update(this.state, {
      basicInfoBeEdit: {$set: true}
    })
    this.setState(newState);
  };

  // select staff
  selectStaff = () => {
    this.props.modalShow()
  }

  // add accounts info
  add = () => {
    const { addAccountsInfo } = this.props;
    addAccountsInfo(addkey);

    const { accountsArr } = this.state;
    accountsArr.push(`row-${addkey}`);
    if(!this.props.beEdited) {
      this.props.customerInfoBeEdit(); // 修改 store树上的 beEdited
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

    const { accountsArr } = this.state;

    const position = accountsArr.indexOf(k);
    accountsArr.splice(position, 1);
    if(!this.props.beEdited) {
      this.props.customerInfoBeEdit(); // 修改 store树上的 beEdited
    }
    let newState = update(this.state, {
      accountsArr: {$set: accountsArr},
      basicInfoBeEdit: {$set: true}
    })
    this.setState(newState)
  }

  // 删除 tags
  handleClose = (joiner) => {
    if(!this.props.beEdited) {
      this.props.customerInfoBeEdit(); // 修改 store树上的 beEdited
    }

    let newState = update(this.state, {
      basicInfoBeEdit: {$set: true}
    })
    this.setState(newState);

    this.props.changeJoiners(joiner);
  }

  // 更新信息
  updateInfo = (briefInfo) => {
    const { addNewCustomer } = this.props;

    addNewCustomer(briefInfo);
  }

  render() {
    const {
      eachCustomerInfo,
      edited,
      mode,
      currentId,
      createCustomerSuccess,
      beEdited,
      joinersBeEdited,
      accounts } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsValue, setFieldsValue} = this.props.form;
    const { department, manager, grid, tags } = this.props.briefInfo;
    const { departmentOptions, managerOptions, gridOptions, accountsArr } = this.state;
    const accountsArray = accountsArr.length == 0 ? ['row-0'] : accountsArr


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
    const EditParticipate = tags && tags.map((item,index) => {
      return (
        <Tag key={`${item.id}${index}`} closable="true" afterClose={() => this.handleClose(item)}>
          {item.name}
        </Tag>
      )
    })

    const EditFormItems = () => {
      let formItemArray;
      // if(accountsArr.length === 0) {
      //   formItemArray = (
      //     <Row key={0}>
      //       <Col span={12}>
      //         <FormItem
      //           label='账户'
      //           required={false}
      //           key={`row-0-accountNo`}
      //           {...formItemLayout}
      //           className="accounts"
      //         >
      //           {getFieldDecorator(`row-0-accountNo`, {
      //             // validateTrigger: ['onChange', 'onBlur'],
      //             // initialValue:len > index ? eachCustomerInfo.accounts[index].accountNo : "",
      //             onChange: this.inputBasicInfoChange
      //           })(
      //             <Input placeholder="填写账号信息"  />
      //           )}
      //         </FormItem>
      //       </Col>
      //
      //       <Col span={12} className="addMessage">
      //         <FormItem wrapperCol={{span: 24}}>
      //           {getFieldDecorator(`row-0-remark`, {
      //             // initialValue:len > index ? eachCustomerInfo.accounts[index].remark : "",
      //             onChange: this.inputBasicInfoChange
      //           })(
      //             <Input placeholder="填写备注信息"/>
      //           )}
      //             <i
      //               className="dynamic-add-button iconfont"
      //               onClick={this.add}
      //             >&#xe688;</i>
      //         </FormItem>
      //       </Col>
      //
      //     </Row>
      //   )
      // } else {
        // var len = accounts && accounts.length;
        formItemArray = accountsArr.map((k, index) => {
          return (
            <Row key={index}>
              <Col span={12}>
                <FormItem
                  label={index === 0 ? '账户' : ''}
                  required={false}
                  key={k}
                  {...(index===0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  className="accounts"
                >
                  {getFieldDecorator(`${k}-accountNo`, {
                    // validateTrigger: ['onChange', 'onBlur'],
                    // initialValue:len > index ? eachCustomerInfo.accounts[index].accountNo : "",
                    onChange: this.inputBasicInfoChange
                  })(
                    <Input placeholder="填写账号信息"  />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className="addMessage">
                <FormItem
                  wrapperCol={{span: 24}}
                >
                  {getFieldDecorator(`${k}-remark`, {
                    // initialValue:len > index ? eachCustomerInfo.accounts[index].remark : "",
                    onChange: this.inputBasicInfoChange
                  })(
                    <Input placeholder="填写备注信息"/>
                  )}

                  {index === 0
                      ?
                      <i
                        className="dynamic-add-button iconfont"
                        onClick={this.add}
                      >&#xe688;</i>
                      :
                      <i
                        className="dynamic-delete-button iconfont"
                        onClick={() => this.remove(k)}
                      >&#xe697;</i>
                  }
                </FormItem>
              </Col>

            </Row>
          )
        });
      // }

      return formItemArray;
    }

    return (
      <Form id="editMyBase" className="basicInfolist">
        <Row className={currentId === -1 ? "briefInfoCreate" : "briefInfoEdit"} type="flex" justify="space-between">
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
                // initialValue: eachCustomerInfo.manager,
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
                // initialValue: eachCustomerInfo.grid,
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
        {EditFormItems()}
          <Row>
            <Col span={12} className={currentId === -1 ? "phoneCreate" : "phoneEdit"}>
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

            <Col span={12} className={currentId === -1 ? "wechatCreate" : "wechatEdit"}>
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
            <Col span={12} className={currentId === -1 ? "idCreate" : "idEdit"}>
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

            <Col span={12} className={currentId === -1 ? "birthCreate" : "birthEdit"}>
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
            <Col span={12} className={currentId === -1 ? "originCreate" : "originEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="籍贯："
                className="origin"
              >
                {getFieldDecorator('origin', {
                  // initialValue: [eachCustomerInfo.origin],
                  onChange: this.selectBasicInfoChange
                })(
                  <Cascader
                    placeholder="请选择客户籍贯"
                    options={this.state.originOptions}
                    getPopupContainer={() => document.getElementById('editMyDetails')}
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12} className={currentId === -1 ? "ageCreate" : "ageEdit"}>
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
            <Col span={24} className={currentId === -1 ? "addressCreate" : "addressEdit"}>
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
  console.log(accounts);
  return {
    ...accounts,
    department: {
      ...briefInfo.department
    },
    manager: {
      ...briefInfo.manager
    },
    grid: {
      ...briefInfo.grid
    },
    phone: {
      ...briefInfo.phone
    },
    wechat: {
      ...briefInfo.wechat
    },
    certificate: {
      ...briefInfo.certificate
    },
    birth: {
      ...briefInfo.birth
    },
    origin: {
      ...briefInfo.origin
    },
    age: {
      ...briefInfo.age
    },
    address: {
      ...briefInfo.address
    }
  }
}

function onFieldsChange(props, changedFields) {
  if(!props.beEdited) {
    props.customerInfoBeEdit(); // 修改 store树上的 beEdited
  }

  props.onChange(changedFields);
};

const EditBriefBasicInfo = Form.create({
  mapPropsToFields,
  onFieldsChange
})(EditBriefBasicInfoForm)

export default EditBriefBasicInfo;
