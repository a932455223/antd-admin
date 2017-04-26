/**
 * 文件说明： 组织机构管理/组件/ 员工新建组件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */
import React, {Component} from "react";
import {Button, Card, Col, Form, Input, Row,Select} from "antd";
import classNames from "classnames";
//========================================================================================================
//========================================================================================
import "./less/staffDetail.less";

const FormItem = Form.Item;
const Option = Select.Option;

class BranchesDetail extends Component {

  closeDock() {
    console.log('bye bye');
    this.props.closeDock()
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
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <div className={classNames('dock-container', 'newProduct')} id="staffDetail">
          <div className="dock-title">
            <Row>
              <Col span={22}>
                <strong>添加产品</strong>
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
          </div>
          <Card>
            <div className="staff-form">
              <Row>
                <h3>基础信息</h3>
                <FormItem
                  label={<span>产品名称</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('name', {
                    rules: [{required: true, message: '产品名称不得为空!'}],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  label={<span>产品简称</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('abbreviation', {
                    rules: [{required: true, message: '产品简称不得为空!'}],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  label={<span>产品类别</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('classify', {
                    rules: [{required: false, message: '产品类别!'}],
                  })(
                    <div>
                      <Select>
                        <Option value="1">线上产品</Option>
                        <Option value="2">线下产品</Option>
                      </Select>
                      <Select>
                        <Option value="1">负债类</Option>
                        <Option value="2">资产类</Option>
                      </Select>
                      <Select>
                        <Option value="1">活期存款</Option>
                        <Option value="2">定期存款</Option>
                      </Select>
                    </div>

                  )}
                </FormItem>
                <FormItem
                  label={<span>产品描述</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('describe', {
                    rules: [{required: false, message: '描述!'}],
                  })(
                    <Input type="textarea"/>
                  )}
                </FormItem>
              </Row>
              <Row>
                <h3>收益信息</h3>
                <FormItem
                  label={<span>产品利率</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('interestate', {
                    rules: [{required: false, message: '产品利率!'}],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  label={<span>产品费率</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('rate', {
                    rules: [{required: false, message: '产品费率!'}],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  label={<span>起购金融</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('firstAmount', {
                    rules: [{required: false, message: '起购金融!'}],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  label={<span>起购日期</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('beginDate', {
                    rules: [{required: false, message: '起购日期!'}],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Row>

              <Row className="submit-controller">
                <Button htmlType="submit" className="save">提交</Button>
              </Row>
            </div>
          </Card>
        </div>
      </Form>
    )
  }
}


export default Form.create()(BranchesDetail)
