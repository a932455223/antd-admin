import React,{Component} from 'react';
import {
  Row,
  Col,
  Icon,
  Form,
  Button,
} from 'antd';
const FormItem = Form.Item;

class ViewBriefBasicInfoForm extends Component{

  render() {
    const { eachCustomerInfo, edited, mode, currentId, createCustomerSuccess, beEdited} = this.props;
    const { getFieldDecorator } = this.props.form;
    const { marryStatus, houseType, withCar, carPrice, withDebt, debtAmount, needLoan, loanAmount, loanPurpose } = this.props.detailsInfo;

    return (
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
  }
}

const ViewBriefBasicInfo = Form.create({})(ViewBriefBasicInfoForm)

export default ViewBriefBasicInfo
