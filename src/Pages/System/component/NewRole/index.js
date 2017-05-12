/**
 * Created by jufei on 2017/4/25.
 */

import React, {Component} from "react";
import {Button, Card, Form, Input, Select, Tabs} from "antd";
//============================================================
import RolePermission from '../RolePermission';
//================================================
import "./less/newRole.less";

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;


class NewRole extends Component {
  state = {
    roleName: null,
    formGroupVisible: false
  };


  saveUsername = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.rolePermission(values.username)
        // this.setState({
        //   roleName: values.username,
        //   formGroupVisible: true
        // })
      }
    });
  };

  save(){
    alert('保存成功');
    this.props.close();
  }



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
      <div className="new-role">
        <div className="new-role-title">
          <h3>{this.state.roleName}</h3>
          <span>
            {this.state.formGroupVisible && <Button onClick={this.save.bind(this)}>保存</Button>}
            <Button
              className="close"
              onClick={this.props.close}
            >&times;</Button>
          </span>
        </div>

        <Card
          style={{display: this.state.formGroupVisible ? 'none' : 'block'}}
        >
          <Form onSubmit={this.saveUsername} className="edit-rolename">
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
          this.state.formGroupVisible && <RolePermission/>
        }
      </div>
    )
  }
}


export default Form.create()(NewRole)
