/**
 * Created by jufei on 2017/4/25.
 */

import React, {Component} from "react";
import {Button, Card, Form, Input, Select, Tabs, Icon,Row} from "antd";
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
        console.log(values);
        this.setState({
          roleName: values.username,
          formGroupVisible: true
        })
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
        span: 16
      }
    };


    return (
      <div className="newcreate">
        <div style={{clear:'both'}}></div>
        <Card className="new-role" 
          style={{display: this.state.formGroupVisible ? 'none' : 'block'}}
          className="cardbox"
        >
          {/*<div className="newroletitle">
            <h3>{this.state.roleName}</h3>
            <span>
              {this.state.formGroupVisible && <Button onClick={this.save.bind(this)}>保存</Button>}
              
            </span>
          </div>     */}
          <Row>
          <Form onSubmit={this.saveUsername} className="editrolename">
            <FormItem
              label={<span style={{fontSize:'14px'}}>输入网格名称</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('username', {
                rules: [{required: true, message: '网格名称不得为空!'}],
              })(
                <Input />
              )}
            </FormItem>
            <Button htmlType="submit">确认新建</Button>
          </Form>
          </Row>
        </Card>
        {
          this.state.formGroupVisible && <RolePermission ajaxFaFun={this.props.ajaxFaFun} roleName={this.state.roleName} close={this.props.close} />
        }
      </div>
    )
  }
}


export default Form.create()(NewRole)
