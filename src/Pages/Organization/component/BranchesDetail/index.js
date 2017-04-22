/**
 * 文件说明： 组织机构管理/组件/ 组织机构编辑组件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React, {Component} from "react";
import {Card, Col, Form, Input, Row, Select,Button} from "antd";
import classNames from 'classnames';
//=========================================================================
import FormCreator from '../FormCreator';
//=================================================
import "./less/branchesDetail.less";
import {addDepartmentForForm} from './formConf.js';


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
        <div
          className={classNames('dock-container','departmentDetail')}
          id="branchesDetail"
        >
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
                  <Button className="cancel">取消</Button>
                </Col>
                <Col span="3">
                  <Button className="save">保存</Button>
                </Col>
              </Row>
            )}
          >
            <div className="branches-form">
              {/*form*/}
              <FormCreator
                getFieldDecorator={getFieldDecorator}
                items={addDepartmentForForm}
                containerID="branchesDetail"
              />
            </div>
          </Card>
        </div>
      </Form>
    )
  }

}


export default Form.create()(BranchesDetail)
