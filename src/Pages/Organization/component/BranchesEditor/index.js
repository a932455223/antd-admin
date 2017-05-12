/**
 * 文件说明： 组织机构管理/组件/ 组织机构新建组件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React, {Component} from "react";
import {Button, Card, Col, Form, Input, Row, Select} from "antd";
import classNames from 'classnames'
import axios from 'axios';
import {connect} from "react-redux";
import ajax from '../../../../tools/POSTF.js';
//=================================================
import "./less/branchesEditor.less";
import API from '../../../../../API';
import BranchBaseInfo from './Forms/BranchBaseInfo'


const FormItem = Form.Item;
const Option = Select.Option;


class BranchesEditor extends Component {

  state = {
    changed: false,
    categoryDropdown: [],
    parentDepartmentDropDown: [],
    province:[],
    city:[],
    area:[],
    branchInfo: false
  };

  componentWillMount(){
    ajax.Get(API.GET_ADD_DEPARTMENT_CATEGORIES)
      .then(res => {
        this.setState({
          categoryDropdown: res.data.data
        })
      })

    this.getDepartmnent(this.props.id)
  }

  componentDidMount(){
    // this.getDepartmnent()
  }

  componentWillReceiveProps(nextProps){
    if(this.props.id !==nextProps.id){
      this.getDepartmnent(nextProps.id);
    }
  }

  getDepartmnent = (id) => {
    axios.get(API.GET_DEPARTMENT_DETAIL(id))
      .then( res => {
        console.log(res);
        let branchBase = res.data.data;
        let arry = branchBase.regionCode ? branchBase.regionCode.split(' '):[]
        let addressDetail = branchBase.adress ? branchBase.adress.split(' ')[3]:''
        this.setState({
          branchInfo:{
            name:{
              value:branchBase.name
            },
            category:{
              value:branchBase.category.id ? branchBase.category.id.toString() : undefined
            },
            parentOrg:{
              value:branchBase.parentOrg.id ? branchBase.parentOrg.id.toString() : undefined
            },
            director:{
              value:branchBase.director
            },
            phone:{
              value:branchBase.phone
            },
            adress:{
              value:branchBase.adress
            },
            province:{
              value:arry[0]
            },
            city:{
              value:arry[1]
            },
            area:{
              value:arry[2]
            },
            addressDetail:{
              value:addressDetail
            }
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
        for(let k in values){
          if(values[k] === undefined || values[k] === null){
            delete values[k]
          }
        }
        console.log('Received values of form: ', values);
        ajax.Put(API.PUT_DEPARTMENT(this.props.id),values)
          .then( res => {
            alert(res.data.message);
            if(res.data.message === 'OK'){
              this.props.refresh()
            }
          })
      }
    });
  };

  render() {
    const branchInfo = this.state.branchInfo;
    // const departmentInfo = this.state.department;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };
    const {getFieldDecorator} = this.props.form;
    return (
        <div
          className={classNames('dock-container','departmentEditor')}
          id="departmentEditor"
          onKeyDown={this.hasChange.bind(this)}
          ref={ departmentEditor => this.departmentEditor = departmentEditor}
        >
          <Row className="dock-title">
            <Col span={22}>
              详情
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
                  <h3>编辑</h3>
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
                  label={<span>组织名称</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('name', {
                    rules: [{required: false, message: '组织名称!'}],
                    initialValue: departmentInfo.name
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>负责人</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('director', {
                    rules: [{required: false, message: '负责人!'}],
                    initialValue: departmentInfo.director
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>组织类别</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('category', {
                    rules: [{required: false, message: '组织类别!'}],
                    initialValue: departmentInfo.category && departmentInfo.category.id
                  })(
                    <Select
                      onSelect={(value) => {
                        ajax.Get(API.GET_ADD_DEPARTMENT_PARENT, {
                          level: value
                        }).then(res => {
                          this.setState({
                            parentDepartmentDropDown: res.data.data
                          })
                        })
                      }}
                    >
                      {
                        this.state.categoryDropdown.map((option, index) => {
                          return <Option value={option.id} key={ option.id + option.name}>{option.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>

              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>所属组织</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('parentDepartment', {
                    rules: [{required: false, message: '所属组织!'}],
                    // initialValue: departmentInfo.parentOrg
                  })(
                    <Select>
                      {
                        this.state.parentDepartmentDropDown.map(item => {
                          return <Option value={item.id} key={item.name + item.id}>{item.name}</Option>
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
                  label={<span>联系电话</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('phone', {
                    rules: [{required: false, message: '联系电话!'}],
                    initialValue: departmentInfo.phone
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>地址</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('address', {
                    rules: [{required: false, message: '地址!'}],
                    initialValue: departmentInfo.address
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Card>


          <BranchBaseInfo branchInfo= {branchInfo} id={this.props.id} getDepartments={this.props.getDepartments} closeDock={this.props.closeDock}/>
          {/*业务信息*/}
          <Card className="business" title={<h3>业务信息</h3>}>
            <Row>
              <Col span={4}>
                客户规模：
              </Col>
              <Col span={20}>
                {this.state.branchInfo.customerCount}
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                存款规模：
              </Col>
              <Col span={20}>
                ￥{this.state.branchInfo.depositCount}
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                贷款规模：
              </Col>
              <Col span={20}>
                ￥{this.state.branchInfo.loanCount}
              </Col>
            </Row>
          </Card>


          {/*操作日志*/}
          <Card className="business" title={<h3>查看日志</h3>}>
            <Row>
              <Col span={4}>
                王五
              </Col>
              <Col span={10}>
                查看任务
              </Col>
              <Col span={10}>
                time
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                王五
              </Col>
              <Col span={10}>
                查看任务
              </Col>
              <Col span={10}>
                time
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                王五
              </Col>
              <Col span={10}>
                查看任务
              </Col>
              <Col span={10}>
                time
              </Col>
            </Row>
          </Card>
        </div>
    )
  }

}


export default connect()(BranchesEditor)
