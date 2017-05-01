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
      base: {}
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
    this.getStaffInfo();
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
  }

  componentWillReceiveProps(nextProps) {
    this.getStaffInfo(nextProps.id)

    ajax.Get(API.GET_STAFF_ADD_DEPARTMENT)
      .then(res => {
        this.setState({
          parentDepartmentDropDown: res.data.data
        })
      });


  }

  getStaffInfo(id = this.props.id) {
    axios.get(API.GET_STAFF_BASE(id))
      .then(res => {
        this.setState({
          staff: {
            base: res.data.data
          }
        })
      })
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
        console.log('start',values)
        const data = ((values) => {
          for (let key in values) {
            // if (typeof values[key] === 'object' && Object.keys(values[key]).includes('_d')) {
            //   values[key] = values[key].format('YYYY-MM-DD');
            // }
            if (values[key] === undefined || values[key] === null) {
              delete values[key]
            }
          }

          console.log('dataaaaaaaa', values);
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
                <p>{baseInfo.name ? baseInfo.name : null}</p>
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
          <BaseInoForm baseInfo/>

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
        {/*<JobInfoForm/>*/}

          {/*教育经历*/}
      {/*<EducationInfoForm/>*/}


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
