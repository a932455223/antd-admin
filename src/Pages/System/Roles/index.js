import React, {Component} from "react";
import {Button, Table} from "antd";
import Dock from "react-dock";
import axios from "axios";
//=============================================================

import Content from '../component/Content';
//===============================================================
import './less/rolesStyle.less';
import API from '../../../../API';

export default class SystemRoles extends Component {

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

  rowClick(rowData) {
    this.setState({
      dock: {
        visible: true,
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
                }}
                className="tableRolesBtn"
              >
                分配权限
              </Button>
            </div>
          )
        }
      }
    ];


    const tableConf = {
      columns: columns,
      dataSource: this.state.table.dataSource,
      loading: this.state.table.loading,
      onRowClick: this.rowClick.bind(this)
    };

    const dockConf = {
      visible: this.state.dock.visible,
      children: this.state.dock.children
    };

    return (
      <Content
        tableConf={tableConf}
        dockConf={dockConf}
      />
    )
  }
}
