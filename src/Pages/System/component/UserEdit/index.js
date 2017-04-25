/**
 * Created by jufei on 2017/4/25.
 */
import React, {Component} from "react";
import {Button, Card, Form,Input,Select,Tabs,Timeline} from "antd";
//================================================
import "./less/userEdit.less";

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

class UserEdit extends Component {

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


    return (
      <div className="user-edit">
        {/*头部信息*/}
        <div className="user-edit-title">
          <h3>张三</h3>
          <span>
            <Button>重置密码</Button>
            <Button
              className="close"
              onClick={this.props.close}
            >&times;</Button>
          </span>
        </div>

        {/*基础信息*/}
        <Card>
          <FormItem
            label={<span>手机号</span>}
            {...formItemLayout}
          >
            {getFieldDecorator('phone', {
              rules: [{required: true, message: '组织名称!'}],
              initialValue: '13312341234'
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            label={<span>性别</span>}
            {...formItemLayout}
          >
            {getFieldDecorator('sex', {
              rules: [{required: false, message: '请选择性别!'}],
              initialValue: "1"
            })(
              <Select>
                <Option value="1">男</Option>
                <Option value="0">女</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            label={<span>身份证号</span>}
            {...formItemLayout}
          >
            {getFieldDecorator('certificate', {
              rules: [{required: true, message: '身份证号!'}],
              initialValue: '1234123412341234123412'
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            label={<span>所属角色</span>}
            {...formItemLayout}
          >
            {getFieldDecorator('role', {
              rules: [{required: true, message: '所属角色!'}],
              initialValue: '职员'
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            label={<span>所属机构</span>}
            {...formItemLayout}
          >
            {getFieldDecorator('department', {
              rules: [{required: true, message: '所属机构!'}],
              initialValue: '壶关农商行'
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            label={<span>备注</span>}
            {...formItemLayout}
          >
            {getFieldDecorator('remark', {
              rules: [{required: false, message: '备注!'}],
            })(
              <Input type="textarea"/>
            )}
          </FormItem>
        </Card>

        {/*操作记录*/}
        <Card>
          <Tabs defaultActiveKey="1" >
            <TabPane tab="操作记录" key="1">
              <Timeline>

                <Timeline.Item>小刘查看了 2015-09-01</Timeline.Item>
                <Timeline.Item>小张查看了 2015-09-01</Timeline.Item>
                <Timeline.Item>小王查看了 2015-09-01</Timeline.Item>
                <Timeline.Item>小钱查看了 2015-09-01</Timeline.Item>
              </Timeline>
            </TabPane>
            <TabPane tab="修改记录" key="2">
             <Timeline>
               <Timeline.Item>小王 添加了员工 小黄 2013-12-1</Timeline.Item>
               <Timeline.Item>小王 修改了 小黄的电话 2013-12-1</Timeline.Item>
               <Timeline.Item>小张 给小黄分配了 新角色 2015-09-01</Timeline.Item>
             </Timeline>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    )
  }
}

export default Form.create()(UserEdit);

