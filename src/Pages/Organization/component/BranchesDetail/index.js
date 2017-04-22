/**
 * 文件说明： 组织机构管理/组件/ 组织机构新建编辑组件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React, {Component} from "react";
import {Card, Col, Form, Input, Row, Select,Button} from "antd";
import classNames from 'classnames';
//=================================================
import "./less/branchesDetail.less";


const FormItem = Form.Item;
const Option = Select.Option;


class BranchesDetail extends Component {

  closeDock() {
    console.log('bye bye');
    this.props.closeDock()
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form>
        <div className={classNames('dock-container','departmentDetail')}>
          <Row className="dock-title">
            <Col span={22}>
              {this.props.id === -1 ? '添加组织机构' : '编辑'}
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
          <Card
            title={(
              <Row>
                <Col span="18">
                  <h3>添加组织机构</h3>
                </Col>
                <Col span="3">
                  <Button>取消</Button>
                </Col>
                <Col span="3">
                  <Button>保存</Button>
                </Col>
              </Row>
            )}
          >
            <div className="branches-form">

              {/*组织机构名称*/}
              <FormItem
                label={<span>组织机构名称</span>}
                labelCol={{span: 6}}
                wrapperCol={{span: 8}}
              >
                {getFieldDecorator('branchesName', {
                  rules: [{required: true, message: '请填写组织机构名称!'}],
                })(
                  <Input placeholder="组织机构名称"/>
                )}
              </FormItem>

              {/*负责人*/}
              <FormItem
                label={<span>负责人</span>}
                labelCol={{span: 6}}
                wrapperCol={{span: 8}}
              >
                {getFieldDecorator('leader', {
                  rules: [{required: true, message: '请填写组织负责人!'}],
                })(
                  <Input placeholder="组织负责人"/>
                )}
              </FormItem>

              {/*组织类别*/}
              <FormItem
                label={<span>组织类别</span>}
                labelCol={{span: 6}}
                wrapperCol={{span: 8}}
              >
                {getFieldDecorator('classes', {
                  rules: [{required: true, message: '请选择组织类别!'}],
                })(
                  <Select
                    placeholder="Please select a country"
                  >
                    <Option value="china">China</Option>
                    <Option value="use">U.S.A</Option>
                  </Select>
                )}
              </FormItem>

              {/*所属组织*/}
              <FormItem
                label={<span>所属组织</span>}
                labelCol={{span: 6}}
                wrapperCol={{span: 8}}
              >
                {getFieldDecorator('branches', {
                  rules: [{required: true, message: '请选择组织类别!'}],
                })(
                  <Select
                    placeholder="Please select a country"
                  >
                    <Option value="china">China</Option>
                    <Option value="use">U.S.A</Option>
                  </Select>
                )}
              </FormItem>

                {/*地址 省市区*/}
              <FormItem
                label={<span>组织地址</span>}
                labelCol={{span: 6}}
                wrapperCol={{span: 12}}
              >
                {getFieldDecorator('address', {
                  rules: [{required: true, message: '请选择组织类别!'}],
                })(
                  <Row>
                    <Col span="8">
                      <Select
                        placeholder="Please select a country"
                      >
                        <Option value="china">China</Option>
                        <Option value="use">U.S.A</Option>
                      </Select>
                    </Col>
                    <Col span="8">
                      <Select
                        placeholder="Please select a country"
                      >
                        <Option value="china">China</Option>
                        <Option value="use">U.S.A</Option>
                      </Select>
                    </Col>
                    <Col span="8">
                      <Select
                        placeholder="Please select a country"
                      >
                        <Option value="china">China</Option>
                        <Option value="use">U.S.A</Option>
                      </Select>
                    </Col>
                  </Row>
                )}
              </FormItem>

              {/* 详细地址*/}
              <FormItem
                label={<span>详细地址</span>}
                labelCol={{span: 6}}
                wrapperCol={{span: 8}}
              >
                {getFieldDecorator('fullAddress', {
                  rules: [{required: false, message: '请选择组织类别!'}],
                })(
                  <Input placeholder="请填写详细地址"/>
                )}
              </FormItem>

              {/* 备注信息*/}
              <FormItem
                label={<span>备注信息</span>}
                labelCol={{span: 6}}
                wrapperCol={{span: 8}}
              >
                {getFieldDecorator('remark', {
                  rules: [{required: false, message: '请选择组织类别!'}],
                })(
                  <Input type="textarea" placeholder="备注"/>
                )}
              </FormItem>
            </div>
          </Card>
        </div>
      </Form>
    )
  }

}


export default Form.create()(BranchesDetail)
