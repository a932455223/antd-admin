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

class EditDetailsBasicInfoForm extends Component{
  state = {
    detailsInfoBeEdit: false
  }

  componentWillMount(){
    // console.log('key will mount');
  }

  componentWillReceiveProps(next) {
    // console.log('personalBasicInfo will recieve props');

    // 重置 InfoBeEdited
    if(next.beEditedArray && !next.beEditedArray.includes('detailsInfo')) {
      let newState = update(this.state, {
        detailsInfoBeEdit: {$set: false}
      })
      this.setState(newState)
    }
  };

  // 监听 inputChange事件
  inputDetailsInfoChange = (e) => {
    // 当 id 不等于负一时，内容修改激活保存按钮
    if(this.props.id !== -1 && !this.state.detailsInfoBeEdit) {
      this.props.increaseBeEditArray('detailsInfo');
      let newState = update(this.state, {
        detailsInfoBeEdit: {$set: true}
      })
      this.setState(newState)
    }
  }

  // 监听 selectChange事件
  selectDetailsInfoChange = () => {
    // 当 id 不等于负一时，内容修改激活保存按钮
    if(this.props.id !== -1 && !this.state.detailsInfoBeEdit) {
      this.props.increaseBeEditArray('detailsInfo');
      let newState = update(this.state, {
        detailsInfoBeEdit: {$set: true}
      })
      this.setState(newState)
    }
  };

  fillCustomerDetailsInfo = (detailsInfo) => {
    const { validateFields, getFieldsError } = this.props.form;
    const { updateCustomerInfo } = this.props;
    validateFields();
    if(hasErrors(getFieldsError())) {
      message.error('表单填写有误，请仔细检查表单');
    } else {
      updateCustomerInfo(detailsInfo)
    }
  }

  render() {
    const { eachCustomerInfo, edited, currentId, createCustomerSuccess, beEdited} = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsValue, setFieldsValue} = this.props.form;
    const {
      marryStatus,
      houseType,
      withCar,
      carPrice,
      withDebt,
      debtAmount,
      needLoan,
      loanAmount,
      loanPurpose
    } = this.props.detailsInfo;

    // console.log(withCar);

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

    return (
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
                  // initialValue:  marryStatus.value + '',
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
                  // initialValue: eachCustomerInfo.yearIncome,
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
                  // initialValue: eachCustomerInfo.yearExpense,
                  onChange: this.inputDetailsInfoChange
                })(
                  <Input placeholder="请输入年总支出"/>
                )}
              </FormItem>
            </Col>
          </Row>

        {
          <Row>
            <Col span={12} className={currentId === -1 ? "houseTypeCreate" : "houseTypeEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 13}}
                label="住房："
                className="houseType"
              >
                {getFieldDecorator('houseType', {
                  // initialValue: houseType.value + '',
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
        }

        {
          <Row>
            <Col span={12} className={currentId === -1 ? "withCarCreate" : "withCarEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 13}}
                label="车辆："
                className="withCar"
              >
                {getFieldDecorator('withCar', {
                  // initialValue: withCar.value + '',
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

            {withCar && withCar.value == 19 &&
              <Col span={12} className={currentId === -1 ? "propertyValueCreate" : "propertyValueEdit"}>
                <FormItem
                  labelCol={{span: 8, offset: 1}}
                  wrapperCol={{span: 13}}
                  label="价值："
                  className="carPrice"
                >
                  {getFieldDecorator('carPrice', {
                    // initialValue: carPrice.value + '',
                    onChange: this.selectDetailsInfoChange
                  })(
                    <Select
                      showSearch
                      placeholder="车辆的价值"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      getPopupContainer={() => document.getElementById('editMyDetails')}
                    >
                      {carPrice && carPrice.options && carPrice.options.map(carPriceItem =>
                        <Option key={carPriceItem.id} value={carPriceItem.id + ''}>{carPriceItem.name}</Option>
                      )}
                    </Select>
                  )}
                </FormItem>
              </Col>
            }
          </Row>
        }

        {
          <Row>
            <Col span={12} className={currentId === -1 ? "withDebtCreate" : "withDebtEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 13}}
                label="负债："
                className="withDebt"
              >
                {getFieldDecorator('withDebt', {
                  // initialValue: withDebt.value + '',
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

            {withDebt &&  withDebt.value == 24 &&
              <Col span={12} className={currentId === -1 ? "withDebtAmountCreate" : "withDebtAmountEdit"}>
                <FormItem
                  labelCol={{span: 8, offset: 1}}
                  wrapperCol={{span: 13}}
                  label="负债金额："
                  className="debtAmount"
                >
                  {getFieldDecorator('debtAmount', {
                    // initialValue: debtAmount.value + '',
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
        }

        {
          <Row>
            <Col span={12} className={currentId === -1 ? "needLoanCreate" : "needLoanEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 13}}
                label="近期有无信贷需求："
                className="needLoan"
              >
              {getFieldDecorator('needLoan', {
                // initialValue: needLoan.value + '',
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

            {needLoan && needLoan.value == 31 &&
              <Col span={12} className={currentId === -1 ? "needLoanAmountCreate" : "needLoanAmountEdit"}>
                <FormItem
                  labelCol={{span: 8, offset: 1}}
                  wrapperCol={{span: 13}}
                  label="需求金额："
                  className="loanAmount"
                >
                  {getFieldDecorator('loanAmount', {
                    // initialValue: loanAmount.value + '',
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

            {needLoan && needLoan.value == 31 &&
              <Col span={12} className={currentId === -1 ? "useOfLoanCreate" : "useOfLoanEdit"}>
                <FormItem
                  labelCol={{span: 8}}
                  wrapperCol={{span: 13}}
                  label="贷款用途："
                  className="loanPurpose"
                >
                  {getFieldDecorator('loanPurpose', {
                    // initialValue: loanPurpose.value + '',
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
        }
        </div>

        {
          <Row className="buttonSave">
            <Col span={24} >
              <Col span={4}>
              </Col>
              <Button
                type="primary"
                onClick={this.fillCustomerDetailsInfo.bind(this, getFieldsValue())}
                disabled={!this.state.detailsInfoBeEdit}
              >保存</Button>
            </Col>
          </Row>
        }
      </Form>
    )
  }
}

function mapPropsToFields (props) {
  const { detailsInfo } = props;
  // console.log(detailsInfo.withCar);
  return {
    marryStatus: {
      ...detailsInfo.marryStatus
    },
    yearIncome: {
      ...detailsInfo.yearIncome
    },
    yearExpense: {
      ...detailsInfo.yearExpense
    },
    houseType: {
      ...detailsInfo.houseType
    },
    withCar: {
      ...detailsInfo.withCar
    },
    carPrice: {
      ...detailsInfo.carPrice
    },
    withDebt: {
      ...detailsInfo.withDebt
    },
    debtAmount: {
      ...detailsInfo.debtAmount
    },
    needLoan: {
      ...detailsInfo.needLoan
    },
    loanAmount: {
      ...detailsInfo.loanAmount
    },
    loanPurpose: {
      ...detailsInfo.loanPurpose
    },
  }
}

function onFieldsChange(props, changedFields) {
  // if(!props.beEdited) {
  //   props.customerInfoBeEdit(); // 修改 store树上的 beEdited
  // }

  props.onChange(changedFields);
};

const EditDetailsBasicInfo = Form.create({
  mapPropsToFields,
  onFieldsChange
})(EditDetailsBasicInfoForm)

export default EditDetailsBasicInfo;
