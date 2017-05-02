import React,{Component} from 'react';
import update from "immutability-helper";
import {
  Row,
  Col,
  Icon,
  Form,
  Button,
  Tag,
} from 'antd';
const FormItem = Form.Item;

class ViewBriefBasicInfoForm extends Component{
  state = {
    departmentName: ''
  }

  componentWillMount(){
    console.log('key will mount');
  }

  componentWillReceiveProps(next) {
    console.log('personalBasicInfo will recieve props');
    // this.getDepartmentName();
  };

  // 获取部门信息
  getDepartmentName = () => {
    const { department } = this.props.briefInfo;

    // 将 id抽取到数据上一级
    if(department.options.length > 0 && department.value) {
      let goalDepartment = department.options.map((item) => {
        if(item.id == department.value){
          this.setState({
            department: item.name
          });
        }
      });
      // console.log(goalDepartment);
      // this.setState({
      //   department: ''
      // });
    }
  }

  render() {
    const { eachCustomerInfo, edited, mode, currentId, createCustomerSuccess, beEdited} = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { department, manager, grid } = this.props.briefInfo;

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

    const ViewParticipate = this.state.tags && this.state.tags.map((item, index) => {
      return (
        <Tag key={item}>
          {item}
        </Tag>
      )
    })

    const kinitialValue = function(){
      var selfkeys = [];
      eachCustomerInfo.accounts && eachCustomerInfo.accounts.map((item ,index) => {
        selfkeys.push(`row-${index}`);
      })
      return selfkeys;
    }
    getFieldDecorator('keys', { initialValue: kinitialValue() });
    const keys = getFieldValue('keys');

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

    return (
      <Form className="basicInfolist">
        <Row className={currentId === -1 ? "briefInfoCreate" : "briefInfoEdit"} type="flex" justify="space-between">
          <Col span={7}>
            <FormItem
              labelCol={{span: 11}}
              wrapperCol={{span: 13}}
              label="所属机构"
            >
              <span>{this.state.departmentName}</span>
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
  }
}

const ViewBriefBasicInfo = Form.create({})(ViewBriefBasicInfoForm)

export default ViewBriefBasicInfo
