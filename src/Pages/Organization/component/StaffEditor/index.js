/**
* 文件说明： 组织机构管理/组件/ 组织机构编辑组件
* 详细描述：
* 创建者： JU
* 时间： 17.3.2
*/

import React, {Component} from "react";
import {Button, Card, Col, Form, Input, Row, Select,DatePicker} from "antd";
import classNames from 'classnames';
//=================================================
import "./less/staffEditor.less";


const FormItem = Form.Item;
const Option = Select.Option;


class BranchesEditor extends Component {
  constructor(props){
    super(props);

  }

  closeDock() {
    console.log('bye bye');
    this.props.closeDock()
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      }
    };

    return (
      <Form>
        <div className={classNames('dock-container','staffEditor')} id="staffEditor">
          <Row className="dock-title">
            <Col span={22}>
              <Row className="avatar">
                <div></div>
                <p>浙江德清县武康镇支行  张权</p>
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
                  <Button className="cancel">取消</Button>
                </Col>
                <Col span="3">
                  <Button className="save">保存</Button>
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
                  })(
                    <Select
                      getPopupContainer = { () => document.getElementById('staffEditor')}
                    >
                      <Option value={1}>男</Option>
                      <Option value={0}>女</Option>
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
                  {getFieldDecorator('birthday', {
                    rules: [{required: true, message: '请选择出生日期!'}],
                  })(
                    <DatePicker getCalendarContainer = { () => document.getElementById('staffEditor')}/>
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
                    rules: [{required: true, message: '请输入微信号!'}],
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
                    rules: [{required: true, message: '请输入微信号!'}],
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
                  {getFieldDecorator('家庭住址', {
                    rules: [{required: false, message: '请填写家庭住址!'}],
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
