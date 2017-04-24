/**
 * 文件说明： 组织机构管理/组件/ 员工新建组件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */
import React, {Component} from "react";
import {Button, Card, Col, Form, Icon, Row} from "antd";
import classNames from "classnames";
//========================================================================================================
import FormCreator from "../FormCreator";
import {baseDataForForm, connectDataForForm, eductionDataForForm, wordDataForForm} from "./formConf.js";
//========================================================================================
import "./less/staffDetail.less";


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
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <div className={classNames('dock-container', 'staffDetail')} id="staffDetail">
          <div className="dock-title">
            <Row>
              <Col span={22}>
                <i className="iconfont">&#xe696;</i>
                <strong>新增员工</strong>
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
                <Col span={9} className="avatar-wrapper">
                  <Icon type="user-add" className="avatar"/>
                </Col>
                <Col span={15}>
                  <FormCreator
                    items={baseDataForForm}
                    getFieldDecorator={getFieldDecorator}
                    containerID="staffDetail"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <div>
                  <h1>基本信息</h1>
                </div>
               <div>
                 <FormCreator
                   items={connectDataForForm}
                   getFieldDecorator={getFieldDecorator}
                   containerID="staffDetail"
                 />
               </div>
              </Row>
              <Row className="form-group">
                <div>
                  <h1>工作信息</h1>
                </div>
                <div>
                  <FormCreator
                    items={wordDataForForm}
                    getFieldDecorator={getFieldDecorator}
                    containerID="staffDetail"
                  />
                </div>
              </Row>
              <Row className="form-group">
                <div>
                  <h1>教育经历</h1>
                </div>
                <div>
                  <FormCreator
                    items={eductionDataForForm}
                    getFieldDecorator={getFieldDecorator}
                    containerID="staffDetail"
                  />
                </div>
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
