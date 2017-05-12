/**
 * Created by jufei on 2017/4/25.
 */
import React, {Component} from "react";
import {Button, Card, Col, Icon, Input, Modal, Row, Table} from "antd";
//=====================================================================
import "./less/roleEdit.less";
import ajax from "../../../../tools/POSTF.js";
import API from "../../../../../API";

export default class RoleEdit extends Component {
  state = {
    departments: [],
    roleInfo: {},
    changed: false
  };

  componentWillMount() {
    ajax.Get(API.GET_ROLE(this.props.id))
      .then(res => {
        console.log(res)
        this.setState({
          roleInfo: res.data.data
        })
      });
    console.log('i am come back')
  }

  render() {
    const columns = [{
      title: '用户编号',
      dataIndex: 'id',
      key: 'id',
      width: '20%'
    }, {
      title: '用户名称',
      dataIndex: 'name',
      key: 'name',
      width: '20%'
    }, {
      title: '所属机构',
      dataIndex: 'department',
      key: 'department',
      width: '20%'
    }, {
      title: '其他角色',
      dataIndex: 'user',
      key: 'user',
      width: '20%'
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, rowData) => {
        return <Button className="delete">删除</Button>
      }
    }];

    const roleInfo = this.state.roleInfo;

    const dataSource = [{
      id: 1,
      name: 'asd',
      department: 'asd',
      user: 'asd'
    }];

    const tableConf = {
      columns: columns,
      dataSource: dataSource
    };


    return (
      <div className="role-edit">
        <div className="role-edit-title">
          <h3>{roleInfo.name}</h3>
          <span>
          <Button onClick={this.props.rolePermission.bind(this, this.props.id)}>分配权限</Button>

          <Icon
            className="close"
            onClick={() => {
              this.props.close;
              if (this.state.changed) {
                Modal.confirm({
                  content: '页面存在未保存修改，是否推迟',
                  onOk: () => {
                    this.props.close()
                  }
                })
              } else {
                this.props.close()
              }
            }}
            type="close"
            style={{cursor: "pointer"}}
          />
        </span>
        </div>

        <Card className="base-info">
          {/*<p>*/}
          {/*<span>创建人</span>*/}
          {/*{this.props.id}XX*/}
          {/*</p>*/}
          <p>
            <span>创建时间</span>
            {roleInfo.createTime}
          </p>
          <p>
            <span>备注</span>
            <Input
              type="textarea"
              key={roleInfo.remark}
              onChange={() => {
                this.setState({
                  changed: true
                })
              }}
              defaultValue={roleInfo.remark}
            />
          </p>
          <Row className="buttonrow">
            {/*<Col span="3">
             <Button
             className="cancel"
             // disabled={this.state.changed ? true : false}
             >取消</Button>
             </Col>  */}
            <Col span="3"></Col>
            <Col span="20">
              <Button
                className={this.state.changed ? "ablesavebtn" : "disablesavebtn"}
                disabled={this.state.changed ? false : true}
              >保存</Button>
            </Col>
          </Row>
        </Card>

        <Card
          className="users"
          title={(
            <p>
              <h3>包含用户</h3>
              <Button onClick={this.props.addUser.bind(this, this.props.id)} className="addusers">添加</Button>
            </p>
          )}
        >
          <Table {...tableConf}/>
        </Card>
      </div>
    )
  }
}


