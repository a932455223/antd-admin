/**
 * Created by jufei on 2017/4/25.
 */
import React, {Component} from "react";
import {Button, Card, Form, Input, Model, Select, Tabs, Timeline,Modal} from "antd";
import $ from 'jquery'
//================================================
import "./less/userEdit.less";
import ajax from "../../../../tools/POSTF.js";
import API from "../../../../../API";


const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

class UserEdit extends Component {
  state = {
    userInfo: {},
    departmentDropdown: [],
    rolesDropDown: [],
    hasChange: false,
    initRolesCantDelete: [],
    initDepartmentCantDelete: [],
    initRoles: [],
    initDepartment: []
  };

  componentWillMount() {
    ajax.Get(API.GET_USER_BASE(this.props.id))
      .then(res => {
        this.setState({
          userInfo: res.data.data
        });

        let info = res.data.data,
          initRoles = [],
          initRolesCantDelete = [],
          initDepartment = [],
          initDepartmentCantDelete = [];

        if (info.roles) {
          info.roles.map(item => {
            if(item.canDelete){
              initRoles.push(item.id)
            }else {
              initRolesCantDelete.push(item)
            }
          });
        }

        let cantDeleteRoles = '';
        initRolesCantDelete.map( item => {
          cantDeleteRoles += `<li class="ant-select-selection__choice" title=${item.name} style="user-select: none;"><div class="ant-select-selection__choice__content">${item.name}</div></li>`
        });
        $("#roleIds ul").append(cantDeleteRoles);
        console.log('==============================================',cantDeleteRoles)
        if (info.departments) {
          info.departments.map(item => {
            if(item.canDelete){
              initDepartment.push(item.id)
            }else {
              initDepartmentCantDelete.push(item)
            }
          })
        }

        this.setState({
          initRolesCantDelete: initRolesCantDelete,
          initDepartmentCantDelete: initDepartmentCantDelete,
          initRoles: initRoles,
          initDepartment: initDepartment
        })
      });

    ajax.Get(API.GET_CUSTOMER_DEPARTMENT)
      .then(res => {
        console.log(res)
        this.setState({
          departmentDropdown: res.data.data
        })


      })

    ajax.Get(API.GET_STAFF_ADD_ROLES)
      .then(res => {
        this.setState({
          rolesDropDown: res.data.data
        })
      });

  }

  componentWillUpdate(){
  }

  componentDidMount() {

  }

  componentWillReceiveProps(next) {
    if(this.props.id !== next.id){
      ajax.Get(API.GET_USER_BASE(next.id))
        .then(res => {
          this.setState({
            userInfo: res.data.data
          })
        })
    }
  }

  hasChange() {
    this.setState({
      hasChange: true
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        for (let k in values) {
          if (values[k] === undefined || values[k] === null) {
            delete values[k]
          }
          if (k === 'department' || k === 'role') {
            values[k].map(item => parseInt(item))
          }
        }
        console.log('Received values of form: ', values);
        ajax.Put(API.PUT_USER(this.props.id), values)
          .then(res => {
            if (res.data.message === 'OK') {
              this.props.refresh();
              this.saveSuccess(this.props.close.bind(this))
            }
          })
      }
    });
  };

  resetpsd(){
    Modal.info({
      // title: '重置成功',
      content: (
        <div>
          <p>重置成功</p>
        </div>
      )
    });
  }

  saveSuccess(ok){
    Modal.confirm({
      // title: '',
      content: '保存成功，是否返回',
      onOk() {
        console.log(ok)
        ok();
      },
      onCancel() {
        // console.log('Cancel');
      },
    })
  }

  render() {
    const info = this.state.userInfo;
    console.log(info);
    let initRoles = [];
    let initDepartment = [];
    if (info.roles) {
      info.roles.map(item => {
        initRoles.push(item.id)
      });
    }
    if (info.departments) {
      info.departments.map(item => {
        initDepartment.push(item.id)
      })
    }

    initRoles = this.state.initRoles;
    initDepartment = this.state.initDepartment;


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
      <div className="user-edit" id="userEd">
        {/*头部信息*/}
        <div className="user-edit-title">
          <h3>{info.name}</h3>
          <span>
            <Button onClick={this.resetpsd}>重置密码</Button>
            <Button
              className="close"
              onClick={this.props.close}
            >&times;</Button>
          </span>
        </div>

        {/*基础信息*/}
        <Card>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem
              label={<span>姓名</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('name', {
                rules: [{required: true, message: '姓名不得为空!'}],
                initialValue: info.name,
                onChange: this.hasChange.bind(this)
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label={<span>手机号</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('phone', {
                rules: [{required: true, message: '电话不得为空!'}],
                initialValue: info.phone,
                onChange: this.hasChange.bind(this)
              })(
                <Input/>
              )}
            </FormItem>
            <div
              id="roleIds"
              // key={Math.random()}
            >
            <FormItem
                label={<span>所属角色</span>}
                {...formItemLayout}
              >
              {getFieldDecorator('roleIds', {
                rules: [{required: true, message: '所属角色!'}],
                initialValue: initRoles,
                onChange: this.hasChange.bind(this)
              })(
                <Select
                  mode="multiple"
                  getPopupContainer={ () => document.getElementById('userEd')}
                >
                  {
                    this.state.rolesDropDown.map((item) => {
                      return <Option value={item.id.toString()} key={item.id.toString()}>{item.roleName}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
              
            </div>
            <FormItem
              label={<span>所属机构</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('departmentIds', {
                rules: [{required: true, message: '所属机构!'}],
                initialValue: initDepartment,
                onChange: this.hasChange.bind(this)
              })(
                <Select
                  mode="multiple"
                  getPopupContainer={ () => document.getElementById('userEd')}

                >
                  {
                    this.state.departmentDropdown.map((item) => {
                      return <Option value={item.id.toString()} key={item.id.toString()}>{item.name}</Option>
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
                rules: [{required: false, message: '备注!'}],
                onChange: this.hasChange.bind(this)
              })(
                <Input type="textarea"/>
              )}
            </FormItem>
            <Button disabled={this.state.hasChange ? false : true} htmlType='submit'>保存</Button>
          </Form>
        </Card>

        {/*操作记录*/}
        <Card>
          <Tabs defaultActiveKey="1">
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

