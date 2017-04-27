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
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

import API from '../../../../../../API';
import ajax from '../../../../../tools/POSTF';

export default class BasicInfoEdit extends Component{
  state = {
    tags : [],
    originOptions:[
      {
        value: '上海',
        label: '上海',
        isLeaf: false,
      },
      {
        value: 'Jiangsu',
        label: '江苏',
        isLeaf: false,
      }
    ],
    marriage: {
      value: false,
      options: []
    },
    houseType: {
      value: '',
      options: []
    },
    withCar: {
      value: false,
      options: []
    },
    withDebt: {
      value: false,
      options: []
    },
    needLoan: {
      value: false,
      options: []
    },
    carPrice: {
      options: []
    },
    debtAmount: {
      options: []
    },
    loanAmount: {
      options: []
    },
    loanPurpose: {
      options: []
    },
    basicInfoBeEdit: false,
    detailsInfoBeEdit: false
  }

  componentWillMount(){
    const commonDropDownType = [
      'marriage',
      'houseType',
      'withCar',
      // 'carPrice',
      'withDebt',
      // 'debtAmount',
      'needLoan',
      // 'loanAmount',
      // 'loanPurpose'
    ];

    commonDropDownType.map(item => {
      ajax.Get(API.GET_COMMON_DROPDOWN(item))
      .then((res) => {
        let newState = update(this.state, {
          [item]: {
            options: {$set: res.data.data}
          }
        })
        this.setState(newState);
      })
    })
  }

  componentWillReceiveProps(next) {
    if(this.props.eachCustomerInfo.id !== next.eachCustomerInfo.id) {
      let newState = update(this.state, {
        withCar: {
          value: {$set: next.eachCustomerInfo.withCar}
        },
        withDebt: {
          value: {$set: next.eachCustomerInfo.withDebt}
        },
        needLoan: {
          value: {$set: next.eachCustomerInfo.needLoan}
        },
        tags: {$set: next.eachCustomerInfo.joiner}
      })
      this.setState(newState);
    }
  }

  inputChange = (e) => {
    this.props.customerInfoBeEdit();
    this.setState({
      basicInfoBeEdit: true,
      detailsInfoBeEdit: true
    })
  }

  selectChange = () => {
    const { getFieldValue } = this.props.form;
    this.props.customerInfoBeEdit();
    this.setState({
      basicInfoBeEdit: true,
      detailsInfoBeEdit: true
    })
  };

  // with car and show its value
  showCarValue = (carValue) => {
    // typeof e = String
    if(carValue === 'true') {
      this.setState({
        withCar: true
      });
    } else {
      this.setState({
        withCar: false
      });
    }

    this.props.customerInfoBeEdit();
  }

  // have debt and show the debt
  showDebtAmount = (debtAmount) => {
    if(debtAmount === 'true') {
      this.setState({
        withDebt: true
      });
    } else {
      this.setState({
        withDebt: false
      });
    }

    this.props.customerInfoBeEdit();
  }

  // show loan need
  showLoanNeed = (loanNeed) => {
    if(loanNeed === 'true') {
      this.setState({
        needLoan: true
      });
    } else {
      this.setState({
        needLoan: false
      });
    }

    this.props.customerInfoBeEdit();
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  }

  // select staff
  selectStaff = ()=>{this.setState({visible:true})}

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const {eachCustomerInfo} = this.props;
    let addkey = 100;
    const nextKeys = keys.concat(`row-${addkey++}`);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleClose = () => {

  }

  render() {
    console.dir(this.state);
    const { eachCustomerInfo, edited, mode, currentId, createCustomerSuccess} = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
    // console.log(getFieldsValue())

    const kinitialValue = function(){
      var selfkeys = [];
      eachCustomerInfo.account && eachCustomerInfo.account.map((item ,index) => {
        selfkeys.push(`row-${index}`);
      })
      return selfkeys;
    }

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

    // 日期格式
    const dateFormat = 'YYYY-MM-DD';

    /* 编辑状态下
    ** 参与者列表
    ** 账户表单
    ** basic info
    ** details info
    */
    const EditParticipate = this.state.tags && this.state.tags.map((item,index) => {
      return (
        <Tag key={item} closable="true" afterClose={() => this.handleClose(item)}>
          {item}
        </Tag>
      )
    })

    getFieldDecorator('keys', { initialValue: kinitialValue() });
    const keys = getFieldValue('keys');
    const EditFormItems = () => {
      var len = eachCustomerInfo.account && eachCustomerInfo.account.length;
      var formItemArray = keys.map((k, index) => {
        return (
          <Row key={index}>
            <Col span={12}>
              <FormItem
                label={index === 0 ? '账户' : ''}
                required={false}
                key={k}
                {...(index===0 ? formItemLayout : formItemLayoutWithOutLabel)}
                className="account"
              >
                {getFieldDecorator(`names-${k}`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue:len > index ? eachCustomerInfo.account[index].accNumber : "",

                })(
                  <Input placeholder="填写账号信息"  />
                )}
              </FormItem>
            </Col>
            <Col span={12} className="addMessage">
              <FormItem
                wrapperCol={{span: 24}}

              >

                {getFieldDecorator(`info-${k}`, {
                  initialValue:len > index ? eachCustomerInfo.account[index].info : "",
                  onChange: this.inputChange
                })(
                  <Input placeholder="填写备注信息"/>
                )}

                {
                  index === 0
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
      return formItemArray;
    }

    const EditBasicInfo = (
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
                initialValue: eachCustomerInfo.department,
                onChange: this.inputChange
              })(
                <Select
                  showSearch
                  placeholder="选择所属机构"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  getPopupContainer={() => document.getElementById('editMyBase')}
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
                initialValue: eachCustomerInfo.manager,
                onChange: this.inputChange
              })(
                <Select
                  showSearch
                  placeholder="选择客户经理"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  getPopupContainer={() => document.getElementById('editMyBase')}
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
                initialValue: eachCustomerInfo.grid,
                onChange: this.inputChange
              })(
                <Select
                  showSearch
                  placeholder="选择所属网格"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  getPopupContainer={() => document.getElementById('editMyBase')}
                >
                  <Option value="jack">G666</Option>
                  <Option value="lucy">S889</Option>
                  <Option value="tom">Q233</Option>
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
                  initialValue: eachCustomerInfo.wechat,
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

            <Col span={12} className={currentId === -1 ? "wechatCreate" : "wechatEdit"}>
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
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
            <Col span={12} className={currentId === -1 ? "idCreate" : "idEdit"}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 15}}
                        label="身份证号："
                        className="idNumber"
              >

                {getFieldDecorator('certificate', {
                  initialValue: eachCustomerInfo.certificate,
                  onChange: this.inputChange
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
                  initialValue: moment(eachCustomerInfo.birth, dateFormat),
                  onChange: this.selectChange
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
                  initialValue: ['上海'],
                  onChange: this.selectChange
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
                  initialValue: eachCustomerInfo.age,
                  onChange: this.inputChange
                })(
                  <InputNumber placeholder="客户年龄"/>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={currentId === -1 ? "addressCreate" : "addressEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="家庭住址："
                className="address"
              >
                {getFieldDecorator('address', {
                  initialValue: eachCustomerInfo.address,
                  onChange: this.inputChange
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
              onClick={createCustomerSuccess}
              disabled={!this.state.basicInfoBeEdit}
            >保存</Button>
          </Col>
        </Row>
      </Form>
    )
    const EditDetailsInfo = (
      <Form id="editMyDetails" className="basicInfolist">
        <div className="personInfo">
          <Row>
            <Col span={12} className={currentId === -1 ? "marriageCreate" : "marriageEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 13}}
                label="婚姻状况："
                className="marriage"
              >
                {getFieldDecorator('marriage', {
                  initialValue: eachCustomerInfo.marriage + '',
                  onChange: this.selectChange
                })(
                  <Select
                    placeholder="请选择婚姻状况"
                    getPopupContainer={() => document.getElementById('editMyDetails')}
                  >
                    <Option value="true">已婚</Option>
                    <Option value="false">未婚</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={currentId === -1 ? "yearIncomeCreate" : "yearIncomeEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="年总收入："
                className="yearIncome"
              >
                {getFieldDecorator('yearIncome', {
                  initialValue: eachCustomerInfo.yearIncome,
                  onChange: this.inputChange
                })(
                  <Input placeholder="请输入年总收入"/>
                )}
              </FormItem>
            </Col>

            <Col span={12} className={currentId === -1 ? "yearExpenseCreate" : "yearExpenseEdit"}>
              <FormItem
                labelCol={{span: 8, offset: 1}}
                wrapperCol={{span: 15}}
                label="年总支出："
                className="yearExpense"
              >
                {getFieldDecorator('yearExpense', {
                  initialValue: eachCustomerInfo.yearExpense,
                  onChange: this.inputChange
                })(
                  <Input placeholder="请输入年总支出"/>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={currentId === -1 ? "houseTypeCreate" : "houseTypeEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 13}}
                label="住房："
                className="houseType"
              >
                {getFieldDecorator('houseType', {
                  initialValue: eachCustomerInfo.houseType,
                  onChange: this.selectChange
                })(
                  <Select
                    showSearch
                    placeholder="请选择住房类型"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    getPopupContainer={() => document.getElementById('editMyDetails')}
                  >
                    <Option value="商住">商住房</Option>
                    <Option value="自住">普通住宅</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={currentId === -1 ? "withCarCreate" : "withCarEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 13}}
                label="车辆："
                className="withCar"
              >
                {getFieldDecorator('withCar', {
                  initialValue: eachCustomerInfo.withCar + '',
                  onChange: this.showCarValue
                })(
                  <Select
                    placeholder="是否有车"
                    getPopupContainer={() => document.getElementById('editMyDetails')}
                  >
                    <Option value="true">有</Option>
                    <Option value="false">无</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            {this.state.withCar &&
              <Col span={12} className={currentId === -1 ? "propertyValueCreate" : "propertyValueEdit"}>
                <FormItem
                  labelCol={{span: 8, offset: 1}}
                  wrapperCol={{span: 13}}
                  label="价值："
                  className="propertyValue"
                >
                  {getFieldDecorator('propertyValue', {
                    // initialValue: eachCustomerInfo.propertyValue,
                    onChange: this.selectChange
                  })(
                    <Select
                      showSearch
                      placeholder="车辆的价值"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      getPopupContainer={() => document.getElementById('editMyDetails')}
                    >
                      <Option value="normal">15万</Option>
                      <Option value="middle">15-50万</Option>
                      <Option value="expensive">50万</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            }
          </Row>

          <Row>
            <Col span={12} className={currentId === -1 ? "withDebtCreate" : "withDebtEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 13}}
                label="负债："
                className="withDebt"
              >
                {getFieldDecorator('withDebt', {
                  initialValue: eachCustomerInfo.withDebt + '',
                  onChange: this.showDebtAmount
                })(
                  <Select
                    placeholder="是否负债"
                    getPopupContainer={() => document.getElementById('editMyDetails')}
                  >
                    <Option value="true">有</Option>
                    <Option value="false">无</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            {this.state.withDebt &&
              <Col span={12} className={currentId === -1 ? "withDebtAmountCreate" : "withDebtAmountEdit"}>
                <FormItem
                  labelCol={{span: 8, offset: 1}}
                  wrapperCol={{span: 13}}
                  label="负债金额："
                  className="withDebtAmount"
                >
                  {getFieldDecorator('withDebtAmount', {
                    // initialValue: eachCustomerInfo.withDebtAmount,
                    onChange: this.selectChange
                  })(
                    <Select
                      showSearch
                      placeholder="负债金额"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      getPopupContainer={() => document.getElementById('editMyDetails')}
                    >
                      <Option value="little">3万以下</Option>
                      <Option value="huge">50万以上</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            }
          </Row>

          <Row>
            <Col span={12} className={currentId === -1 ? "needLoanCreate" : "needLoanEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 13}}
                label="近期有无信贷需求："
                className="needLoan"
              >
              {getFieldDecorator('needLoan', {
                initialValue: eachCustomerInfo.needLoan + '',
                onChange: this.showLoanNeed
              })(
                <Select
                  placeholder="是否负债"
                  getPopupContainer={() => document.getElementById('editMyDetails')}
                >
                  <Option value="true">有</Option>
                  <Option value="false">无</Option>
                </Select>
              )}
              </FormItem>
            </Col>

            {this.state.needLoan &&
              <Col span={12} className={currentId === -1 ? "needLoanAmountCreate" : "needLoanAmountEdit"}>
                <FormItem
                  labelCol={{span: 8, offset: 1}}
                  wrapperCol={{span: 13}}
                  label="需求金额："
                  className="needLoanAmount"
                >
                  {getFieldDecorator('needLoanAmount', {
                    // initialValue: eachCustomerInfo.needLoanAmount,
                    onChange: this.selectChange
                  })(
                    <Select
                      showSearch
                      placeholder="需求金额"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      getPopupContainer={() => document.getElementById('editMyDetails')}
                    >
                      <Option value="little">3万</Option>
                      <Option value="huge">50万</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            }

            {this.state.needLoan &&
              <Col span={12} className={currentId === -1 ? "useOfLoanCreate" : "useOfLoanEdit"}>
                <FormItem
                  labelCol={{span: 8}}
                  wrapperCol={{span: 13}}
                  label="贷款用途："
                  className="useOfLoan"
                >
                  {getFieldDecorator('useOfLoan', {
                    // initialValue: eachCustomerInfo.useOfLoan,
                    onChange: this.selectChange
                  })(
                    <Select
                      showSearch
                      placeholder="贷款用途"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      getPopupContainer={() => document.getElementById('editMyDetails')}
                    >
                      <Option value="buyhouseType">买房</Option>
                      <Option value="buycar">买车</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            }
          </Row>
        </div>

        <Row className="buttonSave">
          <Col span={24} >
            <Col span={4}>
            </Col>
            <Button
              type="primary"
              onClick={createCustomerSuccess}
              disabled={!this.state.detailsInfoBeEdit}
            >保存</Button>
          </Col>
        </Row>
      </Form>
    )
    let EditPersonalInfo = (
      <div>
        {EditBasicInfo}
        {EditDetailsInfo}
      </div>
    )

    /* 查看状态下
    ** 参与者列表
    ** 账户表单
    ** basic info
    ** details info
    */
    const ViewParticipate = this.state.tags && this.state.tags.map((item, index) => {
      return (
        <Tag key={item}>
          {item}
        </Tag>
      )
    })
    const ViewFormItems = () => {
      var len = eachCustomerInfo.account && eachCustomerInfo.account.length;
      var formItemArray = keys.map((k, index) => {
        return (
          <Row key={index}>
            <Col span={12}>
              <FormItem
                label={index === 0 ? '账户' : ''}
                required={false}
                key={k}
                {...(index===0 ? formItemLayout : formItemLayoutWithOutLabel)}
                className="account"
              >
                <span>{len > index ? eachCustomerInfo.account[index].accNumber : ""}</span>
              </FormItem>
            </Col>
            <Col span={12} className="addMessage">
              <FormItem
                wrapperCol={{span: 24}}
              >
                <span>{len > index ? eachCustomerInfo.account[index].info : ""}</span>
              </FormItem>
            </Col>
          </Row>
        )
      });
      return formItemArray;
    }
    const ViewBasicInfo = (
      <Form className="basicInfolist">
        <Row className={currentId === -1 ? "briefInfoCreate" : "briefInfoEdit"} type="flex" justify="space-between">
          <Col span={7}>
            <FormItem
              labelCol={{span: 11}}
              wrapperCol={{span: 13}}
              label="所属机构"
            >
              <span>{eachCustomerInfo.department}</span>
            </FormItem>
          </Col>

          <Col span={7}>
            <FormItem
              labelCol={{span: 11}}
              wrapperCol={{span: 13}}
              label="客户经理"
            >
              <span>{eachCustomerInfo.manager}</span>
            </FormItem>
          </Col>

          <Col span={7}>
            <FormItem
              labelCol={{span: 11}}
              wrapperCol={{span: 13}}
              label="所属网格"
            >
              <span>{eachCustomerInfo.grid}</span>
            </FormItem>
          </Col>
        </Row>

        <div className="personInfo">
          {ViewFormItems()}
          <Row>
            <Col span={12} className={currentId === -1 ? "phonecreate" : "phoneedit"}>
              <FormItem
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 15}}
                label="手机号："
              >
                <span>{eachCustomerInfo.phone}</span>
              </FormItem>
            </Col>

            <Col span={12} className={currentId === -1 ? "wechatcreate" : "wechatedit"}>
              <FormItem
                labelCol={{span: 8,offset: 1}}
                wrapperCol={{span: 15}}
                label="微信号："
              >
                <span>{eachCustomerInfo.wechat}</span>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={currentId === -1 ? "idCreate" : "idEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="身份证号："
                className="idNumber"
              >
                <span>{eachCustomerInfo.certificate}</span>
              </FormItem>
            </Col>

            <Col span={12} className={currentId === -1 ? "birthCreate" : "birthEdit"}>
              <FormItem
                labelCol={{span: 8,offset:1}}
                wrapperCol={{span: 15}}
                label="生日："
              >
                <span>{eachCustomerInfo.birth}</span>
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
                <span>{eachCustomerInfo.origin}</span>
              </FormItem>
            </Col>

            <Col span={12} className={currentId === -1 ? "ageCreate" : "ageEdit"}>
              <FormItem
                labelCol={{span: 8, offset: 1}}
                wrapperCol={{span: 15}}
                label="年龄："
              >
                <span>{eachCustomerInfo.age}</span>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={currentId === -1 ? "addressCreate" : "addressEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="家庭住址："
                className="address"
              >
                <span>{eachCustomerInfo.address}</span>
              </FormItem>
            </Col>
          </Row>

          <Row className="joiners">
            <Col span={24}>
              <Col span={4}>
                <span>参与者：</span>
              </Col>
              <Col span={20}>
                {ViewParticipate}
              </Col>
            </Col>
          </Row>
        </div>
      </Form>
    )
    const ViewDetailsInfo = (
      <Form className="basicInfolist">
        <div className="personInfo">
          <Row>
            <Col span={12} className={currentId === -1 ? "marriageCreate" : "marriageEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="婚姻状况："
                className="marriage"
              >
                <span>{eachCustomerInfo.marriage === true ? '已婚' : '未婚'}</span>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={currentId === -1 ? "yearIncomeCreate" : "yearIncomeEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="年总收入："
                className="yearIncome"
              >
                <span>{eachCustomerInfo.yearIncome}</span>
              </FormItem>
            </Col>

            <Col span={12} className={currentId === -1 ? "yearExpenseCreate" : "yearExpenseEdit"}>
              <FormItem
                labelCol={{span: 8, offset: 1}}
                wrapperCol={{span: 15}}
                label="年总支出："
                className="yearExpense"
              >
                <span>{eachCustomerInfo.yearExpense}</span>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={currentId === -1 ? "houseTypeCreate" : "houseTypeEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="住房："
                className="houseType"
              >
                <span>{eachCustomerInfo.houseType}</span>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={currentId === -1 ? "withCarCreate" : "withCarEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="车辆："
                className="withCar"
              >
                <span>{eachCustomerInfo.withCar === true ? '有' : '无'}</span>
              </FormItem>
            </Col>

            <Col span={12} className={currentId === -1 ? "propertyValueCreate" : "propertyValueEdit"}>
              <FormItem
                labelCol={{span: 8, offset: 1}}
                wrapperCol={{span: 15}}
                label="价值："
                className="propertyValue"
              >
                <span>{eachCustomerInfo.propertyValue}</span>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={currentId === -1 ? "withDebtCreate" : "withDebtEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="负债："
                className="withDebt"
              >
                <span>{eachCustomerInfo.withDebt === true ? '有' : '无'}</span>
              </FormItem>
            </Col>

            <Col span={12} className={currentId === -1 ? "withDebtAmountCreate" : "withDebtAmountEdit"}>
              <FormItem
                labelCol={{span: 8, offset: 1}}
                wrapperCol={{span: 15}}
                label="负债金额："
                className="withDebtAmount"
              >
                <span>{eachCustomerInfo.withDebtAmount}</span>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={currentId === -1 ? "needLoanCreate" : "needLoanEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="近期有无信贷需求："
                className="needLoan"
              >
                <span>{eachCustomerInfo.needLoan === true ? '有' : '无'}</span>
              </FormItem>
            </Col>

            <Col span={12} className={currentId === -1 ? "needLoanAmountCreate" : "needLoanAmountEdit"}>
              <FormItem
                labelCol={{span: 8, offset: 1}}
                wrapperCol={{span: 15}}
                label="需求金额："
                className="needLoanAmount"
              >
                <span>{eachCustomerInfo.needLoanAmount}</span>
              </FormItem>
            </Col>

            <Col span={12} className={currentId === -1 ? "useOfLoanCreate" : "useOfLoanEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="贷款用途："
                className="useOfLoan"
              >
                <span>{eachCustomerInfo.useOfLoan}</span>
              </FormItem>
            </Col>
          </Row>
        </div>
      </Form>
    )
    let ViewPersonalInfo = (
      <div>
        {ViewBasicInfo}
        {ViewDetailsInfo}
      </div>
    )

    return (
      <div>
        {mode && mode !== 'view' &&
          EditPersonalInfo
        }

        {mode && mode === 'view' &&
          ViewPersonalInfo
        }
      </div>
    )
  }
}
