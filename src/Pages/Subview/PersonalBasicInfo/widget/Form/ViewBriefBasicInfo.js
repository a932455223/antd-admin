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
    department: '',
    manager: '',
    grid: '',
    tags: []
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

  // 获取信息
  getFiledsName = () => {
    const { briefInfo } = this.props;
    // 遍历对象
    for (const key of Object.keys(briefInfo)) {
      // console.log(briefInfo[key]);
      if(briefInfo[key].options && briefInfo[key].options.length > 0 && briefInfo[key].value) {
        let goalDepartment = briefInfo[key].options.find((item) => item.id == briefInfo[key].value);
        // 把对应的值打进去
        this.setState({
          [key]: goalDepartment.name
        })
      }
    }

    this.setState({
      tags: briefInfo.tags && briefInfo.tags
    })
  }

  render() {
    const { eachCustomerInfo, edited, mode, currentId, createCustomerSuccess, beEdited} = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { department, manager, grid, phone, wechat, certificate, address } = this.props.briefInfo;

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
        <Tag key={item.id}>
          {item.name}
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
              <span>{this.state.department}</span>
            </FormItem>
          </Col>

          <Col span={7}>
            <FormItem
              labelCol={{span: 11}}
              wrapperCol={{span: 13}}
              label="客户经理"
            >
              <span>{this.state.manager}</span>
            </FormItem>
          </Col>

          <Col span={7}>
            <FormItem
              labelCol={{span: 11}}
              wrapperCol={{span: 13}}
              label="所属网格"
            >
              <span>{this.state.grid}</span>
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
                <span>{phone && phone.value}</span>
              </FormItem>
            </Col>

            <Col span={12} className={currentId === -1 ? "wechatcreate" : "wechatedit"}>
              <FormItem
                labelCol={{span: 8,offset: 1}}
                wrapperCol={{span: 15}}
                label="微信号："
              >
                <span>{wechat.value}</span>
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
                <span>{certificate.value}</span>
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
            <Col span={24} className={currentId === -1 ? "addressCreate" : "addressEdit"}>
              <FormItem
                labelCol={{span: 4}}
                wrapperCol={{span: 19}}
                label="家庭住址："
                className="address"
              >
                <span>{address.value}</span>
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
