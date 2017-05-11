import React, {Component} from "react";
import {Button, Table} from "antd";
import Dock from "react-dock";
import ajax from "../../../tools/POSTF.js";
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
      dataSource: [],
      count: 100,
      size: 15,
      index: 1
    },
    dock: {
      visible: false,
      children: null
    },
    searchContent: ''
  };

  componentWillMount() {
    // ajax.Get(API.GET_USERS)
    //   .then(res => {
    //     this.setState({
    //       table: {
    //         dataSource: res.data.data.users,
    //         loading: false
    //       }
    //     })
    //   })
    this.getUsers()
  }

  // 获取表格数据
  getUsers(index = this.state.table.index){
    ajax.Get(API.GET_USERS,{
      index: index,
      searchContent: this.state.searchContent,
      size: this.state.table.size
    })
      .then(res => {
        this.setState({
          table: {
            ...this.state.table,
            count: res.data.data.pagination.count,
            dataSource: res.data.data.users,
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
            key={rowData.id}
            close={this.close.bind(this)}
            refresh={this.refresh.bind(this)}
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
        children: <NewUser
          close={this.close.bind(this)}
          refresh={this.refresh.bind(this)}
        />
      }
    })
  }

  // 表格分页点击
  tableChange(pagination) {
    this.setState({
      table: {
        ...this.state.table,
        index: pagination.current
      }
    },this.getUsers)

  }

  search(value){
    this.setState({
      searchContent: value
    },this.getUsers.bind(this,1))
  }


  // 关闭dock
  close(){
    this.setState({
      dock: {
        visible: false,
      }
    });
  }

  // 刷新数据
  refresh(){
    this.getUsers()
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
        dataIndex: 'role',
        key: 'role',
        width: '16%'
      },
      {
        title: '所属机构',
        dataIndex: 'org',
        key: 'org',
        width: '16%'
      },
      {
        title: '最近登录时间',
        dataIndex: 'latestLogin',
        key: 'latestLogin',
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
      onRowClick: this.rowClick.bind(this),
      onChange: this.tableChange.bind(this),
      pagination: {
        total: this.state.table.count,
        pageSize: this.state.table.size,
        current: this.state.table.index
      }
    };

    const dockConf = {
      visible: this.state.dock.visible,
      children: this.state.dock.children,
    };

    const actionBarConf = {
      mode: 'user',
      newClick: this.newClick.bind(this),
      onChange: this.search.bind(this)
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
