import React,{Component} from 'react';
import {
  Row,
  Col,
  Icon,
  Form,
  Button,
} from 'antd';
const FormItem = Form.Item;

class ViewBriefBasicInfoForm extends Component {
  state = {
    marryStatus: '',
    houseType: '',
    withCar: '',
    carPrice: '',
    withDebt: '',
    debtAmount: '',
    needLoan: '',
    loanAmount: '',
    loanPurpose: ''
  }

  componentWillMount(){
    // console.log('key will mount');
    this.getFiledsName();
  }

  componentWillReceiveProps(next) {
    // console.log('personalBasicInfo will recieve props');
    // if(this.props.currentId !== next.currentId) {
      this.getFiledsName();
    // }
  };

  getFiledsName = () => {
    const { detailsInfo } = this.props;
    // 遍历对象
    for (const key of Object.keys(detailsInfo)) {
      // console.log(detailsInfo[key]);
      // debugger;
      if(detailsInfo[key].options &&
        detailsInfo[key].options.length > 0 &&
        detailsInfo[key].value &&
        detailsInfo[key].value !== "null") {
        let goal = detailsInfo[key].options.find((item) => item.id == detailsInfo[key].value);
        // console.log(goal);
        // 把对应的值打进去
        this.setState({
          [key]: goal.name
        })
      }
    }
  }

  render() {
    const { eachCustomerInfo, edited, mode, currentId, createCustomerSuccess, beEdited} = this.props;
    const { getFieldDecorator } = this.props.form;
    const { marryStatus, yearIncome, yearExpense, houseType, withCar, carPrice, withDebt, debtAmount, needLoan, loanAmount, loanPurpose } = this.props.detailsInfo;

    return (
      <Form className="basicInfolist">
        <div className="personInfo">
          <Row>
            <Col span={12} className={currentId === -1 ? "marriageCreate" : "marriageEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="婚姻状况："
                className="marryStatus"
              >
                <span>{this.state.marryStatus}</span>
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
                <span>{yearIncome.value}</span>
              </FormItem>
            </Col>

            <Col span={12} className={currentId === -1 ? "yearExpenseCreate" : "yearExpenseEdit"}>
              <FormItem
                labelCol={{span: 8, offset: 1}}
                wrapperCol={{span: 15}}
                label="年总支出："
                className="yearExpense"
              >
                <span>{yearExpense.value}</span>
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
                <span>{this.state.houseType}</span>
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
                <span>{this.state.withCar}</span>
              </FormItem>
            </Col>

            {this.state.withCar !== "有" &&
              <Col span={12} className={currentId === -1 ? "propertyValueCreate" : "propertyValueEdit"}>
                <FormItem
                  labelCol={{span: 8, offset: 1}}
                  wrapperCol={{span: 15}}
                  label="价值："
                  className="carPrice"
                >
                  <span>{this.state.carPrice}</span>
                </FormItem>
              </Col>
            }
          </Row>



          <Row>
            <Col span={12} className={currentId === -1 ? "withDebtCreate" : "withDebtEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="负债："
                className="withDebt"
              >
                <span>{this.state.withDebt}</span>
              </FormItem>
            </Col>

            {this.state.withDebt === '有' &&
              <Col span={12} className={currentId === -1 ? "withDebtAmountCreate" : "withDebtAmountEdit"}>
                <FormItem
                  labelCol={{span: 8, offset: 1}}
                  wrapperCol={{span: 15}}
                  label="负债金额："
                  className="debtAmount"
                >
                  <span>{this.state.debtAmount}</span>
                </FormItem>
              </Col>
            }
          </Row>


          <Row>
            <Col span={12} className={currentId === -1 ? "needLoanCreate" : "needLoanEdit"}>
              <FormItem
                labelCol={{span: 8}}
                wrapperCol={{span: 15}}
                label="近期有无信贷需求："
                className="needLoan"
              >
                <span>{this.state.needLoan}</span>
              </FormItem>
            </Col>


            {this.state.needLoan === '有' &&
              <Col span={12} className={currentId === -1 ? "needLoanAmountCreate" : "needLoanAmountEdit"}>
                <FormItem
                  labelCol={{span: 8, offset: 1}}
                  wrapperCol={{span: 15}}
                  label="需求金额："
                  className="loanAmount"
                >
                  <span>{this.state.loanAmount}</span>
                </FormItem>
              </Col>
            }

            {this.state.needLoan === '有' &&
              <Col span={12} className={currentId === -1 ? "useOfLoanCreate" : "useOfLoanEdit"}>
                <FormItem
                  labelCol={{span: 8}}
                  wrapperCol={{span: 15}}
                  label="贷款用途："
                  className="loanPurpose"
                >
                  <span>{this.state.loanPurpose}</span>
                </FormItem>
              </Col>
            }
          </Row>
        </div>
      </Form>
    )
  }
}

const ViewBriefBasicInfo = Form.create({})(ViewBriefBasicInfoForm)

export default ViewBriefBasicInfo
