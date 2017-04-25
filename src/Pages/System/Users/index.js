import React, {Component} from "react";
import {Button, Table} from "antd";
import Dock from "react-dock";
import axios from "axios";
//=============================================================
import Content from '../component/Content';
import UserEdit from '../component/UserEdit';
import NewUser from '../component/NewUser';
//===============================================================
import './less/user.less';
import API from '../../../../API';

export default class SystemUsers extends Component {

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
    axios.get(API.GET_USERS)
      .then(res => {
        this.setState({
          table: {
            dataSource: res.data.data,
            loading: false
          }
        })
      })
  }

  // 表格点击事件
  rowClick(rowData) {
    this.setState({
      dock: {
        visible: true,
        children: (
          <UserEdit
            id={rowData.id}
            close={this.close.bind(this)}
          />
        )
      }
    });
  }

  // 新增用户
  newClick(){
    this.setState({
      dock: {
        visible: true,
        children: <NewUser close={this.close.bind(this)}/>
      }
    })
  }

  // 关闭dock
  close(){
    this.setState({
      dock: {
        visible: false,
      }
    });
  }

  render() {
    const columns = [
      {
        title: '用户姓名',
        dataIndex: 'name',
        key: 'name',
        width: '10%'
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phoe',
        width: '16%'
      },
      {
        title: '所属角色',
        dataIndex: 'post',
        key: 'post',
        width: '16%'
      },
      {
        title: '所属机构',
        dataIndex: 'department',
        key: 'department',
        width: '16%'
      },
      {
        title: '最近登录时间',
        dataIndex: 'lastTime',
        key: 'lastTime',
        width: '16%'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: '16%',
        render: (text = '编辑', rowData) => {
          return (
              <Button>{text}</Button>
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
      children: this.state.dock.children,
    };

    const actionBarConf = {
      mode: 'user',
      newClick: this.newClick.bind(this)
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
