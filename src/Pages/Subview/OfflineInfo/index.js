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
import { Calendar } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import styles from './indexStyle.less';
export default class OfflineInfo extends Component {
  render() {
    return(
      <div className='keypersons'>
        {/*查看card*/}
        <Card 
          className="keyperson-card"
          title="业务项目"
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
            <Col span={10}>
              业务机构名称：
            </Col>
            <Col span={14}>
              我行
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              业务额：
            </Col>
            <Col span={14}>
              1234345
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              收益/利润：
            </Col>
            <Col span={14}>
              1.20
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              购买日：
            </Col>
            <Col span={14}>
              2017/01/29
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              到期日/销毁日：
            </Col>
            <Col span={14}>
              2017/01/29
            </Col>
          </Row>
        </Card>
        {/*修改card*/}
        <Form className="keyperson-form">
          <Card 
            className="keyperson-card keyperson-card-modify"
            title={
              <div className="my-card-title">
                <Select
                  defaultValue='贷款总额'
                >
                  <Option value="定期存款">定期存款</Option>
                  <Option value="活期存款">活期存款</Option>
                  <Option value="贷款总额">贷款总额</Option>
                  <Option value="手机银行">手机银行</Option>
                  <Option value="网上银行">网上银行</Option>
                  <Option value="理财">理财</Option>
                  <Option value="保险">保险</Option>
                  <Option value="基金">基金</Option>
                  <Option value="贵金属">贵金属</Option>
                  <Option value="信用卡">信用卡</Option>
                  <Option value="其他">其他</Option>
                </Select>
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
              <Col span={10}>
                <span>业务机构名称：</span>
              </Col>
              <Col span={14}>
                <FormItem>
                  <Input 
                    type="text"
                    value="我行"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <span>业务额：</span>
              </Col>
              <Col span={14}>
                <FormItem>
                  <Input 
                    prefix={
                      <i className="iconfont icon-customer1"></i>}
                    type="text"
                    value='23445'
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <span>收益/利润：</span>
              </Col>
              <Col span={14}>
                <FormItem>
                  <Input 
                    prefix={
                      <i className="iconfont icon-customer1"></i>}
                    type="text"
                    value='1.20%'
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <span>购买日：</span>
              </Col>
              <Col span={14}>
                <FormItem>
                  
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
              <Col span={10}>
                <span>所属部门：</span>
              </Col>
              <Col span={14}>
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
              <Col span={10}>
                <span>联系方式：</span>
              </Col>
              <Col span={14}>
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
