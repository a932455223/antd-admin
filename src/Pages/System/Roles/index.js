import React, {Component} from "react";
import {Button} from "antd";
import axios from "axios";
//=============================================================
import RoleEdit from "../component/RoleEdit";
import Content from "../component/Content";
import SelectStaff from "../../../components/SelectStaff";
import RolePermission from "../component/RolePermission";
import NewRole from '../component/NewRole';
//===============================================================
import "./less/rolesStyle.less";
import API from "../../../../API";

export default class SystemRoles extends Component {
  constructor(props) {
    super(props);
    this.roleEdit = (id,mode) => {
      return (
        <RoleEdit
          id={id}
          close={() => {
            this.setState({
              dock: {
                visible: false
              }
            })
          }}
          rolePermission={this.rolePermission.bind(this,id,mode)}
          addUser={this.addUser.bind(this)}
        />
      )
    }
  }

  state = {
    table: {
      loading: true,
      dataSource: []
    },
    dock: {
      visible: false,
      children: null
    }
  };

  componentWillMount() {
    axios.get(API.GET_SYSTEM_ROLES_LIST)
      .then(res => {
        this.setState({
          table: {
            dataSource: res.data.list,
            loading: false
          }
        })
      })
  }

  // 新增角色
  newClick() {
    this.setState({
      dock: {
        visible: true,
        children: <NewRole close={this.close.bind(this)}/>
      }
    });
  }

  // 表格点击事件
  rowClick(rowData) {
    this.setState({
      dock: {
        visible: true,
        children: this.roleEdit(rowData.id,'edit')
      }
    });
  }

  close() {
    this.setState({
      dock: {
        visible: false
      }
    })
  }

  // 添加包含用户
  addUser(id) {
    this.setState({
      dock: {
        visible: true,
        children: (
          <SelectStaff
            back={this.addUserBack.bind(this)}
            id={id}
          />
        )
      }
    })
  }

  // 添加包含用户返回
  addUserBack(id) {
    this.setState({
      dock: {
        visible: true,
        children: this.roleEdit(id,'edit')
      }
    });
  }

  // 权限分配
  rolePermission(id,mode) {
    this.setState({
      dock: {
        visible: true,
        children: (
          <RolePermission
            id={id}
            close={this.close.bind(this)}
            backRoleEdit={this.addUserBack.bind(this,id)}
            mode={mode}
          />
        )
      }
    });
  }

  render() {
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'clientName',
        key: 'clientName',
        width: '27%'
      },
      {
        title: '用户数',
        dataIndex: 'customCount',
        key: 'customCount',
        width: '27%'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: '27%'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: '20%',
        render: (text = '编辑', rowData) => {
          return (
            <div>
              <Button>{text}</Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  this.rolePermission(rowData.id)
                }}
              >
                分配权限
              </Button>
            </div>
          )
        }
      }
    ];

    const actionBarConf = {
      mode: 'role',
      newClick: this.newClick.bind(this)
    };

    const tableConf = {
      columns: columns,
      dataSource: this.state.table.dataSource,
      loading: this.state.table.loading,
      onRowClick: this.rowClick.bind(this)
    };

    const dockConf = {
      visible: this.state.dock.visible,
      children: this.state.dock.children,
    };

    return (
      <Content
        actionBarConf={actionBarConf}
        tableConf={tableConf}
        dockConf={dockConf}
      />
    )
  }
}
