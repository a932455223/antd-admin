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
        value: '江苏南通',
        label: '江苏',
        isLeaf: false,
      }
    ],
    dropdown: {
      marryStatus: {
        value: '',
        options: []
      },
      houseType: {
        value: '',
        options: []
      },
      withCar: {
        value: '',
        options: []
      },
      carPrice: {
        value: '',
        options: []
      },
      withDebt: {
        value: '',
        options: []
      },
      debtAmount: {
        value: '',
        options: []
      },
      needLoan: {
        value: '',
        options: []
      },
      loanAmount: {
        value: '',
        options: []
      },
      loanPurpose: {
        value: '',
        options: []
      },
    },
    InfoBeEdited: {
      basicInfoBeEdit: false,
      detailsInfoBeEdit: false
    },
    certificate: ''
  }

  componentWillMount(){
    console.log('key will mount');
    const commonDropDownType = [
      'marryStatus',
      'houseType',
      'withCar',
      'carPrice',
      'withDebt',
      'debtAmount',
      'needLoan',
      'loanAmount',
      'loanPurpose'
    ];

    commonDropDownType.map(item => {
      ajax.Get(API.GET_COMMON_DROPDOWN(item))
      .then((res) => {
        let newState = update(this.state, {
          dropdown: {
            [item]: {
              options: {$set: res.data.data}
            }
          }
        })

        this.setState(newState);
      })
    })
  }

  componentWillReceiveProps(next) {
    console.log('will recieve props');
    if(this.props.eachCustomerInfo.id !== next.eachCustomerInfo.id) {
      const commonDropDownType = [
        'marryStatus',
        'houseType',
        'withCar',
        'carPrice',
        'withDebt',
        'debtAmount',
        'needLoan',
        'loanAmount',
        'loanPurpose'
      ];


      commonDropDownType.map(item => {
        let newState = update(this.state, {
          dropdown: {
            [item]: {
              value: {$set: next.eachCustomerInfo[item]}
            },
          }
        })

        // 将 newState赋值给原先的 state
        return this.state = newState;

        if(item === commonDropDownType[commonDropDownType.length - 1]) {
          this.setState(newState);
        }
      })

      let newState = update(this.state, {
        tags: {$set: next.eachCustomerInfo.joiner}
      })

      this.setState(newState)
    }

    // 重置 InfoBeEdited
    if(!next.beEdited) {
      this.resetInfoBeEdited();
    }
  };

  // 重置 button的状态
  resetInfoBeEdited = () => {
    let newState = update(this.state, {
      InfoBeEdited: {
        $set: {
          basicInfoBeEdit: false,
          detailsInfoBeEdit: false,
        }
      }
    })
    this.setState(newState)
  }

  // basic 输入框内容被修改了
  inputBasicInfoChange = (e) => {
    if(!this.props.beEdited) {
      this.props.customerInfoBeEdit(); // 修改 store树上的 beEdited
    }
    let newState = update(this.state, {
      InfoBeEdited: {
        basicInfoBeEdit: {$set: true}
      }
    })
    this.setState(newState)
  }

  // basic 选择框内容被修改了
  selectBasicInfoChange = () => {
    if(!this.props.beEdited) {
      this.props.customerInfoBeEdit(); // 修改 store树上的 beEdited
    }
    let newState = update(this.state, {
      InfoBeEdited: {
        basicInfoBeEdit: {$set: true}
      }
    })
    this.setState(newState)
  };

  inputDetailsInfoChange = (e) => {
    if(!this.props.beEdited) {
      this.props.customerInfoBeEdit(); // 修改 store树上的 beEdited
    }
    let newState = update(this.state, {
      InfoBeEdited: {
        detailsInfoBeEdit: {$set: true}
      }
    })
    this.setState(newState)
  }

  selectDetailsInfoChange = () => {
    if(!this.props.beEdited) {
      this.props.customerInfoBeEdit(); // 修改 store树上的 beEdited
    }
    let newState = update(this.state, {
      InfoBeEdited: {
        detailsInfoBeEdit: {$set: true}
      }
    })
    this.setState(newState)
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

  handleClose = () => {}

  render() {
    const { eachCustomerInfo, edited, mode, currentId, createCustomerSuccess, beEdited} = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsValue, setFieldsValue} = this.props.form;
    const { marryStatus, houseType, withCar, carPrice, withDebt, debtAmount, needLoan, loanAmount, loanPurpose } = this.state.dropdown;

    // console.log(beEdited);

    const kinitialValue = function(){
      var selfkeys = [];
      eachCustomerInfo.accounts && eachCustomerInfo.accounts.map((item ,index) => {
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
        <Tag key={item.id} closable="true" afterClose={() => this.handleClose(item)}>
          {item.name}
        </Tag>
      )
    })

    getFieldDecorator('keys', { initialValue: kinitialValue() });
    const keys = getFieldValue('keys');
    const EditFormItems = () => {
      var len = eachCustomerInfo.accounts && eachCustomerInfo.accounts.length;
      var formItemArray = keys.map((k, index) => {
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
                {getFieldDecorator(`names-${k}`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue:len > index ? eachCustomerInfo.accounts[index].accountNo : "",
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

                {getFieldDecorator(`info-${k}`, {
                  initialValue:len > index ? eachCustomerInfo.accounts[index].remark : "",
                  onChange: this.inputBasicInfoChange
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

    const EditBasicInfo = () => (
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
                onChange: this.inputBasicInfoChange
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
                onChange: this.inputDetailsInfoChange
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
                onChange: this.inputDetailsInfoChange
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
                  initialValue: eachCustomerInfo.phone,
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
                  initialValue: eachCustomerInfo.wechat,
                  onChange: this.inputBasicInfoChange
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
                  initialValue: moment(eachCustomerInfo.birth, dateFormat),
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
                  initialValue: [eachCustomerInfo.origin],
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
                  initialValue: eachCustomerInfo.age,
                  onChange: this.inputBasicInfoChange
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
              onClick={createCustomerSuccess}
              disabled={!this.state.InfoBeEdited.basicInfoBeEdit}
            >保存</Button>
          </Col>
        </Row>
      </Form>
    )
    const EditDetailsInfo = (
      <Form id="editMyDetails" className="basicInfolist">
        <div className="personInfo">
          <Row>
            <Col span={12} className={currentId === -1 ? "marryStatusCreate" : "marryStatusEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 13}}
                label="婚姻状况："
                className="marryStatus"
              >
                {getFieldDecorator('marryStatus', {
                  initialValue:  marryStatus.value + '',
                  onChange: this.selectDetailsInfoChange
                })(
                  <Select
                    placeholder="请选择婚姻状况"
                    getPopupContainer={() => document.getElementById('editMyDetails')}
                  >
                    {marryStatus && marryStatus.options.map(marryItem =>
                      <Option key={marryItem.id} value={marryItem.id + ''}>{marryItem.name}</Option>
                    )}
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
                  onChange: this.inputDetailsInfoChange
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
                  onChange: this.inputDetailsInfoChange
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
                  initialValue: houseType.value + '',
                  onChange: this.selectDetailsInfoChange
                })(
                  <Select
                    showSearch
                    placeholder="请选择住房类型"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    getPopupContainer={() => document.getElementById('editMyDetails')}
                  >
                    {houseType && houseType.options.map(houseTypeItem =>
                      <Option key={houseTypeItem.id} value={houseTypeItem.id + ''}>{houseTypeItem.name}</Option>
                    )}
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
                  initialValue: withCar.value + '',
                  onChange: this.selectDetailsInfoChange
                })(
                  <Select
                    placeholder="是否有车"
                    getPopupContainer={() => document.getElementById('editMyDetails')}
                  >
                    {withCar && withCar.options.map(withCarItem =>
                      <Option key={withCarItem.id} value={withCarItem.id + ''}>{withCarItem.name}</Option>
                    )}
                  </Select>
                )}
              </FormItem>
            </Col>

            {eachCustomerInfo.withCar === 19 &&
              <Col span={12} className={currentId === -1 ? "propertyValueCreate" : "propertyValueEdit"}>
                <FormItem
                  labelCol={{span: 8, offset: 1}}
                  wrapperCol={{span: 13}}
                  label="价值："
                  className="propertyValue"
                >
                  {getFieldDecorator('propertyValue', {
                    initialValue: carPrice.value + '',
                    onChange: this.selectDetailsInfoChange
                  })(
                    <Select
                      showSearch
                      placeholder="车辆的价值"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      getPopupContainer={() => document.getElementById('editMyDetails')}
                    >
                      {carPrice && carPrice.options.map(carPriceItem =>
                        <Option key={carPriceItem.id} value={carPriceItem.id + ''}>{carPriceItem.name}</Option>
                      )}
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
                  initialValue: withDebt.value + '',
                  onChange: this.selectDetailsInfoChange
                })(
                  <Select
                    placeholder="是否负债"
                    getPopupContainer={() => document.getElementById('editMyDetails')}
                  >
                    {withDebt && withDebt.options.map(withDebtItem =>
                      <Option key={withDebtItem.id} value={withDebtItem.id + ''}>{withDebtItem.name}</Option>
                    )}
                  </Select>
                )}
              </FormItem>
            </Col>

            {eachCustomerInfo.withDebt &&
              <Col span={12} className={currentId === -1 ? "withDebtAmountCreate" : "withDebtAmountEdit"}>
                <FormItem
                  labelCol={{span: 8, offset: 1}}
                  wrapperCol={{span: 13}}
                  label="负债金额："
                  className="withDebtAmount"
                >
                  {getFieldDecorator('withDebtAmount', {
                    initialValue: debtAmount.value + '',
                    onChange: this.selectDetailsInfoChange
                  })(
                    <Select
                      showSearch
                      placeholder="负债金额"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      getPopupContainer={() => document.getElementById('editMyDetails')}
                    >
                      {debtAmount && debtAmount.options.map(debtAmountItem =>
                        <Option key={debtAmountItem.id} value={debtAmountItem.id + ''}>{debtAmountItem.name}</Option>
                      )}
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
                initialValue: needLoan.value + '',
                onChange: this.selectDetailsInfoChange
              })(
                <Select
                  placeholder="是否负债"
                  getPopupContainer={() => document.getElementById('editMyDetails')}
                >
                  {needLoan && needLoan.options.map(needLoanItem =>
                    <Option key={needLoanItem.id} value={needLoanItem.id + ''}>{needLoanItem.name}</Option>
                  )}
                </Select>
              )}
              </FormItem>
            </Col>

            {eachCustomerInfo.needLoan &&
              <Col span={12} className={currentId === -1 ? "needLoanAmountCreate" : "needLoanAmountEdit"}>
                <FormItem
                  labelCol={{span: 8, offset: 1}}
                  wrapperCol={{span: 13}}
                  label="需求金额："
                  className="needLoanAmount"
                >
                  {getFieldDecorator('needLoanAmount', {
                    initialValue: loanAmount.value + '',
                    onChange: this.selectDetailsInfoChange
                  })(
                    <Select
                      showSearch
                      placeholder="需求金额"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      getPopupContainer={() => document.getElementById('editMyDetails')}
                    >
                      {loanAmount && loanAmount.options.map(loanAmountItem =>
                        <Option key={loanAmountItem.id} value={loanAmountItem.id + ''}>{loanAmountItem.name}</Option>
                      )}
                    </Select>
                  )}
                </FormItem>
              </Col>
            }

            {eachCustomerInfo.needLoan &&
              <Col span={12} className={currentId === -1 ? "useOfLoanCreate" : "useOfLoanEdit"}>
                <FormItem
                  labelCol={{span: 8}}
                  wrapperCol={{span: 13}}
                  label="贷款用途："
                  className="useOfLoan"
                >
                  {getFieldDecorator('useOfLoan', {
                    initialValue: loanPurpose.value + '',
                    onChange: this.selectDetailsInfoChange
                  })(
                    <Select
                      showSearch
                      placeholder="贷款用途"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      getPopupContainer={() => document.getElementById('editMyDetails')}
                    >
                      {loanPurpose && loanPurpose.options.map(loanPurposeItem =>
                        <Option key={loanPurposeItem.id} value={loanPurposeItem.id + ''}>{loanPurposeItem.name}</Option>
                      )}
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
              onClick={this.fillCustomerDetailsInfo}
              disabled={!this.state.InfoBeEdited.detailsInfoBeEdit}
            >保存</Button>
          </Col>
        </Row>
      </Form>
    )
    let EditPersonalInfo = (
      <div>
      {EditBasicInfo()}
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
      var len = eachCustomerInfo.accounts && eachCustomerInfo.accounts.length;
      var formItemArray = keys.map((k, index) => {
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
                <span>{len > index ? eachCustomerInfo.accounts[index].accountNo : ""}</span>
              </FormItem>
            </Col>
            <Col span={12} className="addMessage">
              <FormItem
                wrapperCol={{span: 24}}
              >
                <span>{len > index ? eachCustomerInfo.accounts[index].remark : ""}</span>
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
