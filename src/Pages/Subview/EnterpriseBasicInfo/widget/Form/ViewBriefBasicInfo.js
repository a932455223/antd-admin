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

import API from '../../../../../../API';
import ajax from '../../../../../tools/POSTF';

class ViewBriefBasicInfoForm extends Component{
  state = {
    departmentOptions: [],
    managerOptions: [],
    gridOptions: [],
    tags: []
  }

  componentWillMount(){
    // console.log('key will mount');
    this.getFiledsName();
    this.getDepartments(1, 1)
  }

  componentWillReceiveProps(next) {
    // console.log('personalBasicInfo will recieve props');
    // if(this.props.id !== next.id) {
      this.getFiledsName();
      this.getDepartments(1, 1)
    // }
  };

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

  // 获取信息
  getFiledsName = () => {
    const { eachCompanyInfo } = this.props;
    // 遍历对象
    for (const key of Object.keys(eachCompanyInfo)) {
      // console.log(eachCompanyInfo[key]);
      if(eachCompanyInfo[key].options && eachCompanyInfo[key].options.length > 0 && eachCompanyInfo[key].value) {
        let goalDepartment = eachCompanyInfo[key].options.find((item) => item.id == eachCompanyInfo[key].value);
        // 把对应的值打进去
        this.setState({
          [key]: goalDepartment.name
        })
      }
    }
  }

  render() {
    const {
      eachCustomerInfo,
      edited,
      mode,
      id,
      createCustomerSuccess,
      beEdited,
      tags,
      accountsArr
    } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {
      department,
      manager,
      grid,
      registeTime,
      industory,
      mainBusiness,
      yearIncome,
      legalPerson,
      telephone,
      staffCount,
      avgSalary,
      address,
      addressCode,
      accounts
    } = this.props.eachCompanyInfo;

    const { departmentOptions, managerOptions, gridOptions } = this.state;

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 }
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        sm: { span: 15, offset: 6 },
      },
    };

    const ViewParticipate = tags && tags.map((item, index) => {
      return (
        <Tag key={item.id}>
          {item.name}
        </Tag>
      )
    })

    // 所属机构，客户经理，所属网格
    let departmentOp = departmentOptions.filter(item => item.id == department.value);
    let managerOp = managerOptions.filter(item => item.id == manager.value);
    let gridOp = gridOptions.filter(item => item.id == grid.value);

    const ViewFormItems = () => {
      var len = accounts && accounts.length;
      var formItemArray = accounts.map((k, index) => {
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
                <span>{len > index ? accounts[index].accountNo : ""}</span>
              </FormItem>
            </Col>
            <Col span={12} className="addMessage">
              <FormItem
                wrapperCol={{span: 24}}
              >
                <span>{len > index ? accounts[index].remark : ""}</span>
              </FormItem>
            </Col>
          </Row>
        )
      });
      return formItemArray;
    }

    return (
      <Form className="basicInfolist">
        <Row className={id === -1 ? "briefInfoCreate" : "briefInfoEdit"} type="flex" justify="space-between">
          <Col span={6}>
            <FormItem
              labelCol={{span: 11}}
              wrapperCol={{span: 13}}
              label="所属机构"
            >
              <span>{departmentOp[0] && departmentOp[0].name}</span>
            </FormItem>
          </Col>

          <Col span={6}>
            <FormItem
              labelCol={{span: 11}}
              wrapperCol={{span: 13}}
              label="客户经理"
            >
              <span>{managerOp[0] && managerOp[0].name}</span>
            </FormItem>
          </Col>

          <Col span={6}>
            <FormItem
              labelCol={{span: 11}}
              wrapperCol={{span: 13}}
              label="所属网格"
            >
              <span>{gridOp[0] && gridOp[0].name}</span>
            </FormItem>
          </Col>
        </Row>

        <div className="personInfo">
          {ViewFormItems()}
          <Row>
            <Col span={12} className={id === -1 ? "phonecreate" : "phoneedit"}>
              <FormItem
                labelCol={{span: 6}}
                wrapperCol={{span: 15}}
                label="注册时间："
              >
                <span>{registeTime && registeTime.value}</span>
              </FormItem>
            </Col>

            <Col span={12} className={id === -1 ? "wechatcreate" : "wechatedit"}>
              <FormItem
                labelCol={{span: 6, offset: 1}}
                wrapperCol={{span: 15}}
                label="所属行业："
              >
                <span>{industory && industory.value}</span>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={id === -1 ? "idCreate" : "idEdit"}>
              <FormItem
                labelCol={{span: 6}}
                wrapperCol={{span: 15}}
                label="主营业务："
              >
                <span>{mainBusiness && mainBusiness.value}</span>
              </FormItem>
            </Col>

            <Col span={12} className={id === -1 ? "birthCreate" : "birthEdit"}>
              <FormItem
                labelCol={{span: 6, offset: 1}}
                wrapperCol={{span: 15}}
                label="年营业额："
              >
                <span>{yearIncome && yearIncome.value}</span>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={id === -1 ? "originCreate" : "originEdit"}>
              <FormItem
                labelCol={{span: 6}}
                wrapperCol={{span: 15}}
                label="法人法名："
              >
                <span>{legalPerson && legalPerson.value}</span>
              </FormItem>
            </Col>

            <Col span={12} className={id === -1 ? "ageCreate" : "ageEdit"}>
              <FormItem
                labelCol={{span: 6, offset: 1}}
                wrapperCol={{span: 15}}
                label="企业电话："
              >
                <span>{telephone && telephone.value}</span>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={id === -1 ? "originCreate" : "originEdit"}>
              <FormItem
                labelCol={{span: 6}}
                wrapperCol={{span: 15}}
                label="员工人数："
              >
                <span>{staffCount && staffCount.value}</span>
              </FormItem>
            </Col>

            <Col span={12} className={id === -1 ? "ageCreate" : "ageEdit"}>
              <FormItem
                labelCol={{span: 6, offset: 1}}
                wrapperCol={{span: 15}}
                label="平均工资："
              >
                <span>{avgSalary && avgSalary.value}</span>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={24} className={id === -1 ? "originCreate" : "originEdit"}>
              <FormItem
                labelCol={{span: 3}}
                wrapperCol={{span: 20}}
                label="企业住址："
              >
                <span>{address && address.value}</span>
              </FormItem>
            </Col>
          </Row>

          <Row className="joiners">
            <Col span={24}>
              <Col span={3}>
                <span style={{fontSize: '14px'}}>参与者：</span>
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
