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
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//=================================================
import {getDropdown} from '../../../../redux/actions/dropdownActions.js';
//==================================================
import "./less/staffEditor.less";
import * as actionTypes from '../../../../redux/actionTypes/dropdownActions';
import API from "../../../../../API";
import ajax from '../../../../tools/POSTF.js';


const FormItem = Form.Item;
const Option = Select.Option;


class BranchesEditor extends Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators(Object.assign({},{
      getDropdown
    }),props.dispatch)
  }

  state = {
    staff: {
      base: {}
    },
    parentDepartmentDropDown:[],
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
    this.getStaffInfo();
    ajax.Get(API.GET_STAFF_LEADERS)
      .then( res => {
        this.setState({
          leadersDropdown: res.data.data
        })
      })
    this.actions.getDropdown('gender',actionTypes.GENDER);
    this.actions.getDropdown('jobStatus',actionTypes.JOB_STATUS);
    this.actions.getDropdown('bankJobCategory',actionTypes.JOB_CATEGORY);
    this.actions.getDropdown('educationLevel',actionTypes.EDUCATION_LEVEL);
    // this.actions.getDropdown('gender',actionTypes.GENDER);
    console.log(this.props.id);
    ajax.Get(API.GET_STAFF_BUSSINESS_INFO(this.props.id))
      .then(res => {
        this.setState({
          business: res.data.data
        })
      })
  }

  componentWillReceiveProps(nextProps){
    this.getStaffInfo(nextProps.id)

    ajax.Get(API.GET_STAFF_ADD_DEPARTMENT)
      .then( res => {
        this.setState({
          parentDepartmentDropDown: res.data.data
        })
      });



  }

  getStaffInfo(id = this.props.id){
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

  hasChange(){
    this.setState({
      changed: true
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
        const data = ((values) => {
          // for(let key in values){
          //   if(typeof values[key] === 'object' && Object.keys(values[key]).includes('_d')){
          //     values[key] = values[key].format('YYYY-MM-DD');
          //   }else if(values[key] === undefined){
          //     delete values[key]
          //   }
          // }
          for(let key in values){
            if(values[key] === undefined || values[key] === null){
              delete values[key]
            }
          }
          console.log('dataaaaaaaa',values);
          return values;
        })(values);

        ajax.Put(API.PUT_STAFF(this.props.id),data)
          .then( res => {
            alert(res.data.message);
            if(res.message === 'OK'){
              this.props.refresh()
            }
          })
      }else {
      }
    });
  };



  render() {

    const {getFieldDecorator} = this.props.form;

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
    console.log('business',business);

    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <div
          className={classNames('dock-container', 'staffEditor')}
          onKeyDown={this.hasChange.bind(this)}
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
          <Card
            title={(
              <Row>
                <Col span="18">
                  <h3>个人档案</h3>
                </Col>
                <Col span="3">
                  <Button
                    className="cancel"
                    disabled={this.state.changed ? false : true}
                  >取消</Button>
                </Col>
                <Col span="3">
                  <Button
                    className="save"
                    disabled={this.state.changed ? false : true}
                    htmlType="submit"
                  >保存</Button>
                </Col>
              </Row>
            )}
          >
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>姓名</span>}
                  {...formItemLayout}

                >
                  {getFieldDecorator('name', {
                    rules: [{required: false, message: '请填写员工名称!'}],
                    initialValue: baseInfo.name
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>性别</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('gender', {
                    rules: [{required: false, message: '请选择性别!'}],
                    initialValue: this.props.dropdown.gender.id
                  })(
                    <Select
                      getPopupContainer={ () => document.getElementById('staffEditor')}
                    >
                      {
                        this.props.dropdown.gender.map( item => {
                          return <Option value={item.id} key={item.id}>{item.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>证件号码</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('certificateNo', {
                    rules: [{required: false, message: '请填写证件号码!'}],
                    initialValue: baseInfo.certificateNo
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>邮箱</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('email', {
                    rules: [{required: false, message: '请输入邮箱!'}],
                    initialValue: baseInfo.email
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>出生日期</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('birth', {
                    rules: [{required: false, message: '请选择出生日期!'}],
                    // initialValue: moment(baseInfo.birth)
                  })(
                    <DatePicker
                      getCalendarContainer={ () => document.getElementById('staffEditor')}
                      onChange={() => {
                        this.setState({
                          changed: true
                        })
                      }}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>手机</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('phone', {
                    rules: [{required: false, message: '请填写手机号码!'}],
                    initialValue: baseInfo.phone
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>微信号</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('wechat', {
                    rules: [{required: false, message: '请输入微信号!'}],
                    initialValue: baseInfo.wechat
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>家庭住址</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('address', {
                    rules: [{required: false, message: '请填写家庭住址!'}],
                    // initialValue: baseInfo.address
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>

            </Row>

          </Card>

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
          <Card title={<h3>工作信息</h3>}>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>所属机构</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('departments', {
                    rules: [{required: false, message: '所属机构!'}],
                    // initialValue: baseInfo.certificateNo
                  })(
                    <Select
                      mode="multiple"
                      getPopupContainer={ () => document.getElementById('staffEditor')}
                      onChange={() => {
                        this.setState({
                          changed: true
                        })
                      }}
                    >
                      {
                        this.state.parentDepartmentDropDown.map( item => {
                          return <Option value={item.id} key={item.id}>{item.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>任职时间</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('inductionTime', {
                    rules: [{required: false, message: '所属机构!'}],
                    // initialValue: baseInfo.inductionTime
                  })(
                    <DatePicker
                      onChange={() => {
                        this.setState({
                          changed: true
                        })
                      }}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>工号</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('jobNumber', {
                    rules: [{required: false, message: '所属机构!'}],
                    initialValue: baseInfo.jobNumber
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>任职状态</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('jobStatus', {
                    rules: [{required: false, message: '任职状态!'}],
                    // initialValue: baseInfo.jobStatus && baseInfo.jobStatus.id
                  })(
                    <Select
                      getPopupContainer={ () => document.getElementById('staffEditor')}
                      onChange={() => {
                        this.setState({
                          changed: true
                        })
                      }}
                    >
                      {
                        this.props.dropdown.jobStatus.map( item => {
                          return <Option id={item.id} key={item.id}>{item.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>职位</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('jobCategory', {
                    rules: [{required: false, message: '职位!'}],
                  })(
                    <Select
                      getPopupContainer={ () => document.getElementById('staffEditor')}
                      onChange={() => {
                        this.setState({
                          changed: true
                        })
                      }}
                    >
                      {
                        this.props.dropdown.jobCategory.map( item => {
                          return <Option value={item.id} key={item.id}>{item.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>直属上级</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('leader', {
                    rules: [{required: false, message: '所属机构!'}],
                    // initialValue: baseInfo.leader
                  })(
                    <Select
                      getPopupContainer={ () => document.getElementById('staffEditor')}
                      onChange={() => {
                        this.setState({
                          changed: true
                        })
                      }}
                    >
                      {
                        this.state.leadersDropdown.map( item => {
                          return <Option value={item.id} key={item.id}>{item.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <FormItem
                label={<span>调岗记录</span>}
                labelCol={{span: 3}}
                wrapperCol={{span: 7}}
              >
                {getFieldDecorator('asd', {
                  rules: [{required: false, message: '调岗记录!'}],
                  // initialValue: baseInfo.leader
                })(
                  <Input/>
                )}
              </FormItem>
            </Row>
          </Card>

          {/*教育经历*/}
          <Card title={<h3>教育经历</h3>}>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>学历</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('educationLevel', {
                    rules: [{required: false, message: '学历!'}],
                    // initialValue: baseInfo.certificateNo
                  })(
                    <Select
                      getPopupContainer={ () => document.getElementById('staffEditor')}
                      onChange={() => {
                        this.setState({
                          changed: true
                        })
                      }}
                    >
                      {
                        this.props.dropdown.educationLevel.map( item => {
                          return <Option value={item.id} key={item.id}>{item.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>专业</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('major', {
                    rules: [{required: false, message: '专业!'}],
                    // initialValue: baseInfo.inductionTime
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>毕业院校</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('school', {
                    rules: [{required: false, message: '所属机构!'}],
                    // initialValue: baseInfo.certificateNo
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>毕业时间</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('graduationTime', {
                    rules: [{required: false, message: '专业!'}],
                    // initialValue: baseInfo.inductionTime
                  })(
                    <DatePicker  onChange={() => {
                      this.setState({
                        changed: true
                      })
                    }}/>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Card>



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
      </Form>
    )
  }
}

function mapStateToProps(store) {
  return {
    dropdown: store.dropdown
  }
}

export default connect(mapStateToProps)(Form.create()(BranchesEditor))
