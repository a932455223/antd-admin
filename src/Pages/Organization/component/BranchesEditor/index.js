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
//=================================================
import "./less/branchesEditor.less";
import API from '../../../../../API';


const FormItem = Form.Item;
const Option = Select.Option;


class BranchesEditor extends Component {

  state = {
    changed: false,
    department: {}
  };

  componentWillMount(){
    axios.get(API.GET_DEPARTMENT_BASE(this.props.id))
      .then( res => {
        this.setState({
          department: res.data.data
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

    const departmentInfo = this.state.department;

    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
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
                    rules: [{required: true, message: '组织名称!'}],
                    initialValue: departmentInfo.name
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>组织类别</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('category', {
                    rules: [{required: true, message: '组织类别!'}],
                    initialValue: departmentInfo.category
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>所属组织</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('parentDepartment', {
                    rules: [{required: true, message: '所属组织!'}],
                    initialValue: departmentInfo.parentDepartment
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
                    rules: [{required: true, message: '负责人!'}],
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
                  label={<span>联系电话</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('phone', {
                    rules: [{required: true, message: '联系电话!'}],
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
                    rules: [{required: true, message: '地址!'}],
                    initialValue: departmentInfo.address
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
      </Form>
    )
  }

}


export default Form.create()(BranchesEditor)
