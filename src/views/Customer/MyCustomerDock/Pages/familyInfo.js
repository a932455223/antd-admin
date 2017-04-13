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

import styles from './familyInfo.scss';


const AddNew = () => (
  <div className={styles.addNew}>
    <Icon type="plus" />
    <p>新建家庭关系</p>
  </div>
)

// 具体的添加内容
class addContentForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form>
        <FormItem labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  label="关系">
          {getFieldDecorator('relationship', {})(
            <Select placeholder="请选择关系类型">
              <Option value="marriage">夫妻</Option>
              <Option value="fraternity">兄弟</Option>
              <Option value="parent">父母</Option>
            </Select>
          )}
        </FormItem>

        <FormItem labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  label="联系方式">
          {getFieldDecorator('contactMethod', {})(
            <Input placeholder='请输入手机号'/>
          )}
        </FormItem>

        <FormItem labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  label="身份证号">
          {getFieldDecorator('idCard', {})(
            <Input placeholder='请输入身份证号'/>
          )}
        </FormItem>

        <FormItem labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  label="工作属性">
          {getFieldDecorator('functionalAttributes', {})(
            <Select placeholder="请选择工作属性">
              <Option value="worker">上班族</Option>
              <Option value="retired">退休</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    )
  }
}

const addContent = Form.create()(addContentForm);

export default class FamilyInfo extends Component {
  state = {
    title: '',
    cardStyle: false,
    addNew: AddNew
  };

  // 点击新建家庭关系
  addNew = () => {
    // 定义 title
    const title = (
      <div className={styles.title}>
        <Input />
        <p>
          <span>保存</span>
          <span>取消</span>
        </p>  
      </div>
    )

    this.setState({
      title: title,
      cardStyle: true,
      addNew: addContent
    })
  };

  render() {
    return(
      <Row  className={styles.family}
            gutter={8}>
        <Col span={12}>
          <Card title='家庭关系姓名'>
            <Col span={6}>
              <span>关系：</span>
            </Col>
            <Col span={18}>
              <span>夫妻</span>
            </Col>

            <Col span={6}>
              <span>联系方式：</span>
            </Col>
            <Col span={18}>
              <span>12345678901</span>
            </Col>

            <Col span={6}>
              <span>身份证号：</span>
            </Col>
            <Col span={18}>
              <span>31012345619920103</span>
            </Col>

            <Col span={6}>
              <span>工作属性：</span>
            </Col>
            <Col span={18}>
              <span>个体商户</span>
            </Col>
          </Card>
        </Col>

        <Col span={12}>
          <Card className={this.state.cardStyle ? styles.fillInfo : styles.newFamily}
                title={this.state.title}
                onClick={this.addNew}>
          {this.state.addNew &&
            <this.state.addNew />
          }
          </Card>
        </Col>
      </Row>
    )
  }
}
