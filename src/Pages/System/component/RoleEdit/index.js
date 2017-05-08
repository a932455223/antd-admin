/**
 * Created by jufei on 2017/4/25.
 */
import React, {Component} from "react";
import {Button, Card, Input, Table} from "antd";
//=====================================================================
import './less/roleEdit.less';

export default class RoleEdit extends Component {
  state = {};


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
          <h3>角色</h3>
          <span>
          <Button onClick={this.props.rolePermission.bind(this,this.props.id)}>分配权限</Button>
          <Button
            className="save"
            onClick={() => {
              alert('保存成功');
              this.props.close()
            }}
          >保存</Button>
          <Button className="close" onClick={this.props.close}>&times;</Button>
        </span>
        </div>

        <Card className="base-info">
          <p>
            <span>创建人</span>
            {this.props.id}XX
          </p>
          <p>
            <span>创建时间</span>
            2012-11-12
          </p>
          <p>
            <span>备注</span>
            <Input type="textarea"/>
          </p>
        </Card>

        <Card
          title={(
            <p>
              <h3>包含用户</h3>
              <Button onClick={this.props.addUser.bind(this,this.props.id)}>添加</Button>
            </p>
          )}
        >
          <Table {...tableConf}/>
        </Card>
      </div>
    )
  }
}


