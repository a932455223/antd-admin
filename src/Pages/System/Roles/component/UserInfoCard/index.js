/**
 * Created by jufei on 2017/4/17.
 */
import React, {Component} from "react";
import {Card, Col, Row,Button,Input} from "antd";
import axios from "axios";
//=======================================================
import './less/rolesUserInfoCard.less'

export default class UserInfo extends Component {

  state = {
    info: {}
  };

  componentWillMount() {
    axios.get('/asd/system/roles/users', {
      params: {
        id: this.props.id
      }
    }).then(res => {
      console.log(res)
      this.setState({
        info: res.data.user
      })
    })
  }

  render() {
    const title = (
      <div>
        <Row>
          <Col span="16">{this.state.info.clientName}</Col>
          <Col span="4">
            <Button onClick={() => {
              this.props.showLimit(this.props.id)
            }}>分配权限</Button>
          </Col>
          <Col span="4">
            <Button>保存</Button>
          </Col>
        </Row>
      </div>
    );

    const defaultRemark = this.state.info.remark + this.props.id;

    return (
      <div className="rolesUserInfoCard">
        <Card title={title}>
          <Row>
            <Col span={4}>
              角色编号
            </Col>
            <Col>{this.props.id}</Col>
          </Row>
          <Row>
            <Col span={4}>
              创建人
            </Col>
            <Col>{this.state.info.clientName}</Col>
          </Row>
          <Row>
            <Col span={4}>
              创建时间
            </Col>
            <Col>{this.state.info.createTime}</Col>
          </Row>
          <Row>
            <Col span={4}>
              备注
            </Col>
            <Col span={20}>
              <Input placeholder={defaultRemark}/>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}
