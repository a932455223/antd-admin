import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Icon,
  Input,
  Form,
  Select
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import styles from './indexStyle.less';
export default class KeyPersonInfo extends Component {
  render() {
    return(
      <div className='keypersons'>
        {/*查看card*/}
        <Card 
          className="keyperson-card"
          title="姓名"
          extra={
            <div>
              <span>
                <i className="iconfont icon-edit"></i>编辑
              </span>
              <span href="#">
                <i className="iconfont icon-delete"></i>删除
              </span>
            </div>
          }
        >
          <Row>
            <Col span={8}>
              所属部门:
            </Col>
            <Col span={16}>
              业务部
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              联系方式
            </Col>
            <Col span={16}>
              12345678901
            </Col>
          </Row>
        </Card>
        {/*修改card*/}
        <Form className="keyperson-form">
          <Card 
            className="keyperson-card keyperson-card-modify"
            title={
              <div className="my-card-title">
                <Input 
                  prefix={
                    <i className="iconfont icon-customer1"></i>}
                  type="text"
                  placeholder="请输入关键人姓名"
                  value=""
                />
                <span
                  className="cancel-btn"
                >
                  取消
                </span>
                <span
                  className="save-btn"
                >
                保存
                </span>
              </div>
            }
          >
            <Row>
              <Col span={8}>
                <span>所属部门：</span>
              </Col>
              <Col span={16}>
                <FormItem>
                  <Input 
                    prefix={
                      <i className="iconfont icon-customer1"></i>}
                    type="text"
                    placeholder="请输入部门"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <span>联系方式：</span>
              </Col>
              <Col span={16}>
                <FormItem>
                  <Input 
                    prefix={
                      <i className="iconfont icon-customer1"></i>}
                    type="text"
                    placeholder="请输入手机号"
                  />
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
        {/*添加按钮*/}
        <Card
          className="keyperson-card keyperson-add-card"
        >
          <i className="iconfont icon-create"></i>
          <p>添加关键联系人</p>
        </Card>
        {/*添加card*/}
           <Card 
            className="keyperson-card keyperson-card-modify"
            title={
              <div className="my-card-title">
                <Input 
                  prefix={
                    <i className="iconfont icon-customer1"></i>}
                  type="text"
                  placeholder="请输入关键人姓名"
                />
                <span
                  className="cancel-btn"
                >
                  取消
                </span>
                <span
                  className="save-btn"
                >
                保存
                </span>
              </div>
            }
          >
            <Row>
              <Col span={8}>
                <span>所属部门：</span>
              </Col>
              <Col span={16}>
                <FormItem>
                  <Input 
                    prefix={
                      <i className="iconfont icon-customer1"></i>}
                    type="text"
                    placeholder="请输入部门"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <span>联系方式：</span>
              </Col>
              <Col span={16}>
                <FormItem>
                  <Input 
                    prefix={
                      <i className="iconfont icon-customer1"></i>}
                    type="text"
                    placeholder="请输入手机号"
                  />
                </FormItem>
              </Col>
            </Row>
          </Card>
      </div>
    )
  }
}
