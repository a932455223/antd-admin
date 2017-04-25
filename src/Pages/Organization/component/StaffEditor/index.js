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
//=================================================
import "./less/staffEditor.less";
import API from "../../../../../API";


const FormItem = Form.Item;
const Option = Select.Option;


class BranchesEditor extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    staff: {
      base: {}
    },
    changed: false
  };




  componentWillMount() {
    axios.get(API.GET_STAFF_BASE(this.props.id))
      .then(res => {
        this.setState({
          staff: {
            base: res.data.data
          }
        });
      });
    console.log(this.props.id)
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
        console.log('Received values of form: ', values);
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

    const baseInfo = this.state.staff.base

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
                <p>浙江德清县武康镇支行 张权</p>
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
                    rules: [{required: true, message: '请填写员工名称!'}],
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
                  {getFieldDecorator('sex', {
                    rules: [{required: false, message: '请选择性别!'}],
                    initialValue: baseInfo.sex
                  })(
                    <Select
                      getPopupContainer={ () => document.getElementById('staffEditor')}
                      onChange={() => {
                        this.setState({
                          changed: true
                        })
                      }}
                    >
                      <Option value="1">男</Option>
                      <Option value="0">女</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>证件类型</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('certificateType', {
                    rules: [{required: false, message: '请填写证件类型!'}],
                    initialValue: baseInfo.certificateType
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>证件号码</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('certificate', {
                    rules: [{required: true, message: '请填写证件号码!'}],
                    initialValue: baseInfo.certificate
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
                    initialValue: moment(baseInfo.birth)
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
                    rules: [{required: true, message: '请填写手机号码!'}],
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
                  label={<span>家庭住址</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('address', {
                    rules: [{required: false, message: '请填写家庭住址!'}],
                    initialValue: baseInfo.address
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
                30000
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                存款规模：
              </Col>
              <Col span={20}>
                ￥124819539
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                贷款规模：
              </Col>
              <Col span={20}>
                ￥17840129571305310
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

export default Form.create()(BranchesEditor)
