/**
 * Created by jufei on 2017/4/25.
 */

import React, {Component} from "react";
import {Button, Card, Form, Input, Select, Tabs,Row,Col,Icon,Modal} from "antd";
//================================================
import "./less/newUser.less";
import API from "../../../../../API";
import ajax from "../../../../tools/POSTF.js";

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;


class NewUser extends Component {
  state = {
    username: null,
    formGroupVisible: false,
    rolesDropdown: [],
    departmentsDropdown: []
  };

  componentWillMount(){
    ajax.Get(API.GET_CUSTOMER_DEPARTMENT)
      .then(res => {
        console.log(res)
        this.setState({
          departmentsDropdown: res.data.data
        })
      });

    ajax.Get(API.GET_STAFF_ADD_ROLES)
      .then(res => {
        this.setState({
          rolesDropdown: res.data.data
        })
      })
  }



  saveUsername = (e) => {
    e.preventDefault();
    let username = this.props.form.getFieldValue('username');
    if (username.trim()) {
      this.setState({
        username: username,
        formGroupVisible: true
      })
    }
  };


  newSuccess(ok){
    Modal.info({
      content: '新建成功',
      onOk(){
        ok()
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.name = this.state.username;
        if(values.remark === undefined){
          delete values.remark
        }
        console.log('Received values of form: ', values);
        ajax.Post(API.POST_USER, values)
          .then(res => {
            if (res.data.message === 'OK') {
              this.props.refresh();
              this.newSuccess(this.props.close)
            }
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
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <div className="new-user">
          <div className="new-user-title">
            <h3>{this.state.username}</h3>
            <Icon
              className="close"
              onClick={this.props.close}
              type="close"
              style={{cursor:"pointer"}}
            />
          </div>

          {
            !this.state.formGroupVisible && (
              <Card className="edit-username">
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
                <Button onClick={this.saveUsername.bind(this)}>确认新建</Button>
              </Card>
            )
          }
          {
            this.state.formGroupVisible && (
              <Card
                style={{display: this.state.formGroupVisible ? 'block' : 'none'}}
              >
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
                  label={<span>所属角色</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('roleIds', {
                    rules: [{required: true, message: '所属角色不得为空!'}],
                  })(
                    <Select
                      mode="multiple"
                    >
                      {
                        this.state.rolesDropdown.map((item) => {
                          return <Option value={item.id} key={item.id}>{item.roleName}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  label={<span>所属机构</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('departmentIds', {
                    rules: [{required: true, message: '所属机构不得为空!'}],
                  })(
                    <Select
                      mode="multiple"
                    >
                      {
                        this.state.departmentsDropdown.map(item => {
                          return <Option value={item.id} key={item.id.toString()}>{item.name}</Option>
                        })
                      }
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
                <Row>
                  <Col span={6}>

                  </Col>
                  <Col>
                    {this.state.formGroupVisible && <Button htmlType="submit">保存</Button>}
                  </Col>
                </Row>
              </Card>

            )
          }
        </div>

      </Form>

    )
  }
}


export default Form.create()(NewUser)
