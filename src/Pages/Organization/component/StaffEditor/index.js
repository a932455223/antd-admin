/**
 * 文件说明： 组织机构管理/组件/ 组织机构编辑组件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React, {Component} from "react";
import {Button, Card, Col, DatePicker, Form, Input, Row, Select} from "antd";
import classNames from "classnames";
import axios from "axios";
import moment from "moment";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
//=================================================
import {getDropdown} from "../../../../redux/actions/dropdownActions.js";
//==================================================
import "./less/staffEditor.less";
import * as actionTypes from "../../../../redux/actionTypes/dropdownActions";
import API from "../../../../../API";
import ajax from "../../../../tools/POSTF.js";
import BaseInoForm from './Forms/StaffBaseForm'
import update from 'immutability-helper'
import JobInfoForm from './Forms/JobInfoForm'
import EducationInfoForm from './Forms/EducationInfoForm'


const FormItem = Form.Item;
const Option = Select.Option;


class BranchesEditor extends Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators(Object.assign({}, {
      getDropdown
    }), props.dispatch)
  }

  state = {
    staff: {
      base: {},
      job:{}
    },
    parentDepartmentDropDown: [],
    changed: false,
    leadersDropdown: [],
    business: {
      "customerCount": 0,
      "offlineAmount": 0,
      "onlineAmount": 0,
      "totalAmount": 0
    }
  };


  componentWillMount() {
    console.log('baseEditor will mount.')
    this.getStaffInfo(this.props.id);
    ajax.Get(API.GET_STAFF_LEADERS)
      .then(res => {
        this.setState({
          leadersDropdown: res.data.data
        })
      })
    this.actions.getDropdown('gender', actionTypes.GENDER);
    this.actions.getDropdown('jobStatus', actionTypes.JOB_STATUS);
    this.actions.getDropdown('bankJobCategory', actionTypes.JOB_CATEGORY);
    this.actions.getDropdown('educationLevel', actionTypes.EDUCATION_LEVEL);
    // this.actions.getDropdown('gender',actionTypes.GENDER);
    ajax.Get(API.GET_STAFF_BUSSINESS_INFO(this.props.id))
      .then(res => {
        this.setState({
          business: res.data.data
        })
      })

      ajax.Get(API.GET_STAFF_ADD_DEPARTMENT)
      .then((res) => {
        this.setState({
          parentDepartmentDropDown: res.data.data
        })
      });
  }

  componentWillReceiveProps(nextProps) {
    console.log('staffEditor will receive props.')
    this.getStaffInfo(nextProps.id)
  }

  getStaffInfo(id) {
    axios.get(API.GET_STAFF_BASE(id))
      .then(res => {
        let staffBase = res.data.data;
        let getDepartmentsId = staffBase.departments && staffBase.departments.map( item => item.id.toString());
        this.setState({
          staff: {
            base: {
              name:{
                value:staffBase.name
              },
              certificateNo:{
                value:staffBase.certificateNo
              },
              email:{
                value:staffBase.email
              },
              birth:{
                value:staffBase.birth ? moment(staffBase.birth):null
              },
              phone:{
                value:staffBase.phone
              },
              wechat:{
                value:staffBase.wechat
              },
              address:{
                value:staffBase.address || ''
              },
              gender:{
                value:staffBase.gender.id ? staffBase.gender.id.toString() : undefined
              },
              isUser:{
                value:staffBase.isUser
              }
            },
            job:{
              departments:{
                value:getDepartmentsId
              },
              inductionTime:{
                value:staffBase.inductionTime ? moment(staffBase.inductionTime) : null
              },
              jobNumber:{
                value:staffBase.jobNumber
              },
              jobStatus:{
                value:staffBase.jobStatus.id
              },
              jobCategory:{
                value:staffBase.jobCategory.id ? staffBase.jobCategory.id.toString() : undefined
              },
              leader:{
                value:staffBase.leader.id ? staffBase.leader.id.toString() : undefined
              },
              asd:{
                value:staffBase.asd
              }
            },
            educationInfo:{
              educationLevel:{
                value:staffBase.educationLevel.id ? staffBase.educationLevel.id.toString() : undefined
              },
              major:{
                value:staffBase.major
              },
              school:{
                value:staffBase.school
              },
              graduationTime:{
                value:staffBase.graduationTime
              }
            }
          }
        })
      })
  }

  baseInfoChange = (chagnedField) => {
    let newState = update(this.state,{staff:{base:{$set:{...this.state.staff.base,...chagnedField}}}})
    this.setState(newState);
  }

  jobInfoChange = ()=> {

  }

  closeDock() {
    console.log('bye bye');
    this.props.closeDock()
  }

  hasChange() {
    this.setState({
      changed: true
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = ((values) => {
          for (let key in values) {
            // if (typeof values[key] === 'object' && Object.keys(values[key]).includes('_d')) {
            //   values[key] = values[key].format('YYYY-MM-DD');
            // }
            if (values[key] === undefined || values[key] === null) {
              delete values[key]
            }
          }

          return values;
        })(values);

        ajax.Put(API.PUT_STAFF(this.props.id), data)
          .then(res => {
            alert(res.data.message);
            if (res.message === 'OK') {
              this.props.refresh()
            }
          })
      } else {
      }
    });
  };


  render() {
    // const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };

    const baseInfo = this.state.staff.base;
    const jobInfo = this.state.staff.job;
    const educationInfo = this.state.staff.educationInfo;
    const {business} = this.state;
    return (
        <div
          className={classNames('dock-container', 'staffEditor')}
          id="staffEditor"
        >
          <Row className="dock-title">
            <Col span={22}>
              <Row className="avatar">
                <div></div>
                <p>{baseInfo.name ? baseInfo.name.value : null}</p>
              </Row>
            </Col>
            <Col span={2}>
            <span
              className="close"
              onClick={this.closeDock.bind(this)}
            >
              &times;
            </span>
            </Col>
          </Row>
          {/*组织信息*/}
          <BaseInoForm onChange={this.baseInfoChange} baseInfo={baseInfo} id={this.props.id} getStaffs={this.props.getStaffs}/>
          {/*业务信息*/}
          <Card className="business" title={<h3>业务信息</h3>}>
            <Row>
              <Col span={4}>
                客户规模：
              </Col>
              <Col span={20}>
                {business.customerCount}
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                线上业务：
              </Col>
              <Col span={20}>
                ￥{business.onlineAmount}
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                线下业务：
              </Col>
              <Col span={20}>
                ￥{business.offlineAmount}
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                业务总额：
              </Col>
              <Col span={20}>
                ￥{business.totalAmount}
              </Col>
            </Row>
          </Card>

          {/*工作信息*/}
        <JobInfoForm onChange={this.jobInfoChange} jobInfo={jobInfo} id={this.props.id} getStaffs={this.props.getStaffs} parentDepartmentDropDown={this.state.parentDepartmentDropDown} />

          {/*教育经历*/}
        <EducationInfoForm onChange={this.educationInfoChange} educationInfo={educationInfo} id={this.props.id} getStaffs={this.props.getStaffs}/>


          {/*操作日志*/}
          <Card className="business" title={<h3>业务记录</h3>}>
            <Row>
              <Col span={4}>
                王五
              </Col>
              <Col span={6}>
                购买了理财产品001
              </Col>
              <Col span={7}>
                ¥ 10,000
              </Col>
              <Col span={7}>
                2017-03-26 15:58
              </Col>
            </Row>
          </Card>
        </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    dropdown: store.dropdown
  }
}

// export default connect(mapStateToProps)(Form.create()(BranchesEditor))
export default connect()(BranchesEditor)
