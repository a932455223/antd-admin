/**
 * Created by jufei on 2017/4/25.
 */

import React, {Component} from "react";
import {Button, Card, Form, Input, Select, Tabs} from "antd";
//================================================
import "./less/newUser.less";

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;


class NewUser extends Component {
  state = {
    username: null,
    formGroupVisible: false
  };


  saveUsername = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        this.setState({
          username: values.username,
          formGroupVisible: true
        })
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


    return (
      <div className="new-user">
        <div className="new-user-title">
          <h3>{this.state.username}</h3>
          <span>
            {this.state.formGroupVisible && <Button>保存</Button>}
            <Button
              className="close"
              onClick={this.props.close}
            >&times;</Button>
          </span>
        </div>

        <Card
          style={{display: this.state.formGroupVisible ? 'none' : 'block'}}
        >
          <Form onSubmit={this.saveUsername} className="edit-username">
            <FormItem
              label={<span>用户姓名</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('username', {
                rules: [{required: true, message: '用户姓名不得为空!'}],
              })(
                <Input/>
              )}
            </FormItem>
            <Button htmlType="submit">确认新建</Button>
          </Form>
        </Card>


        {
          this.state.formGroupVisible && <Card
            style={{display: this.state.formGroupVisible ? 'block' : 'none'}}
          >
            <Form>
              <FormItem
                label={<span>手机号</span>}
                {...formItemLayout}
              >
                {getFieldDecorator('phone', {
                  rules: [{required: true, message: '手机号不得为空!'}],
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem
                label={<span>登录密码</span>}
                {...formItemLayout}
              >
                {getFieldDecorator('password', {
                  rules: [{required: true, message: '登录密码不得为空!'}],
                  initialValue: '123456'
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem
                label={<span>所属角色</span>}
                {...formItemLayout}
              >
                {getFieldDecorator('role', {
                  rules: [{required: true, message: '所属角色不得为空!'}],
                })(
                  <Select>
                    <Option value="1">行长</Option>
                    <Option value="2">职员</Option>
                    <Option value="0">董事长</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                label={<span>所属机构</span>}
                {...formItemLayout}
              >
                {getFieldDecorator('department', {
                  rules: [{required: true, message: '所属机构不得为空!'}],
                })(
                  <Select>
                    <Option value="1">壶关农商行</Option>
                    <Option value="2">壶关农商行</Option>
                    <Option value="3">壶关农商行</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                label={<span>备注</span>}
                {...formItemLayout}
              >
                {getFieldDecorator('remark', {
                  rules: [{required: false, message: '备注'}],
                })(
                  <Input type="textarea"/>
                )}
              </FormItem>

            </Form>

          </Card>
        }

      </div>
    )
  }
}


export default Form.create()(NewUser)
