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
//=================================================
import "./less/productEditor.less";
import API from "../../../../../API";


const FormItem = Form.Item;
const Option = Select.Option;


class ProductEditor extends Component {
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

    const baseInfo = this.state.staff.base;

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
                <p>产品详情</p>
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
          <Card>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>产品名称</span>}
                  {...formItemLayout}

                >
                  {getFieldDecorator('name', {
                    rules: [{required: true, message: '请填写员工名称!'}],
                    initialValue: baseInfo.name
                  })(
                    <p>基金001</p>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>产品简称</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('sex', {
                    rules: [{required: false, message: '请选择性别!'}],
                    initialValue: baseInfo.sex
                  })(
                    <p>基001</p>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>产品类型</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('certificateType', {
                    rules: [{required: false, message: '请填写证件类型!'}],
                    initialValue: baseInfo.certificateType
                  })(
                    <p>基金</p>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>产品描述</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('certificate', {
                    rules: [{required: true, message: '请填写证件号码!'}],
                    initialValue: baseInfo.certificate
                  })(
                    <p>基金类 产品 001号</p>
                  )}
                </FormItem>
              </Col>
            </Row>

          </Card>

          {/*收益信息*/}
          <Card className="business" title={<h3>收益信息</h3>}>
            <Row>
              <Col span={4}>
                产品利率：
              </Col>
              <Col span={8}>
                3.0%
              </Col>
              <Col span={4}>
                产品费率：
              </Col>
              <Col span={8}>
                3.0%
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                起购金额：
              </Col>
              <Col span={8}>
                100000000
              </Col>
              <Col span={4}>
                购买期限：
              </Col>
              <Col span={8}>
                三个月
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                购买日期：
              </Col>
              <Col span={8}>
                2011-1-1
              </Col>
              <Col span={4}>
                结束日期：
              </Col>
              <Col span={8}>
                2099-1-1
              </Col>
            </Row>
          </Card>


          {/*业务信息*/}
          <Card className="business" title={<h3>业务信息</h3>}>
            <Row>
              <Col span={4}>
                累计金额：
              </Col>
              <Col span={8}>
                1000000000000
              </Col>
              <Col span={4}>
                客户数：
              </Col>
              <Col span={8}>
                2412345
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                当前金额：
              </Col>
              <Col span={8}>
                13264519
              </Col>
            </Row>
          </Card>

          {/*操作日志*/}
          <Card className="business" title={<h3>操作记录</h3>}>
            <Row>
              <Col span={5}>
                王五：
              </Col>
              <Col span={6}>
                查看任务
              </Col>
              <Col span={8}>
                2011-1-1
              </Col>
            </Row>
            <Row>
              <Col span={5}>
                小二：
              </Col>
              <Col span={6}>
                更新任务
              </Col>
              <Col span={8}>
                2011-1-1
              </Col>
            </Row>
            <Row>
              <Col span={5}>
                离散型：
              </Col>
              <Col span={6}>
                查看任务
              </Col>
              <Col span={8}>
                2011-1-1
              </Col>
            </Row>
          </Card>
        </div>
      </Form>
    )
  }

}

export default Form.create()(ProductEditor)
