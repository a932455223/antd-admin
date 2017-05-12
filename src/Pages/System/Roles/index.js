import React, {Component} from "react";
import {Button,Modal} from "antd";
//=============================================================
import RoleEdit from "../component/RoleEdit";
import Content from "../component/Content";
import SelectStaff from "../../../components/SelectStaff";
import RolePermission from "../component/RolePermission";
import NewRole from '../component/NewRole';
//===============================================================
import "./less/rolesStyle.less";
import API from "../../../../API";
import ajax from '../../../tools/POSTF.js';

export default class SystemRoles extends Component {

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
    searchContent: '',
    addStaffChange: false
  };

  componentWillMount() {
    // ajax.Get(API.GET_SYSTEM_ROLES_LIST)
    //   .then(res => {
    //     this.setState({
    //       table: {
    //         dataSource: res.data.list,
    //         loading: false
    //       }
    //     })
    //   })

    this.getRoles();
  }

  getRoles(index = this.state.table.index){
    ajax.Get(API.GET_SYSTEM_ROLES_LIST,{
      index: index,
      searchContent: this.state.searchContent,
      size: this.state.table.size
    })
      .then(res => {
        this.setState({
          table: {
            ...this.state.table,
            count: res.data.data.pagination.count,
            dataSource: res.data.data.roles,
            loading: false
          }
        })
      })
  }


  roleEdit = (id,mode) => {
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
  };

  // 表格分页点击
  tableChange(pagination) {
    this.setState({
      table: {
        ...this.state.table,
        index: pagination.current
      }
    },this.getUsers)

  }

  // 新增角色
  newClick() {
    this.setState({
      dock: {
        visible: true,
        children: <NewRole
          rolePermission={this.rolePermission.bind(this,-1,'create')}
          close={this.close.bind(this)}
        />
      }
    });
  }

  backConfirm(ok){
    Modal.confirm({
      content: '该页面存在未保存选项，是否退出',
      onOk: ok
    })
  }


  // 表格点击事件
  rowClick(rowData) {
    if(this.state.addStaffChange){
      this.backConfirm(() => {
        this.setState({
          dock: {
            visible: true,
            children: this.roleEdit(rowData.id,'edit')
          }
        });
      })
    }else {
      this.setState({
        dock: {
          visible: true,
          children: this.roleEdit(rowData.id,'edit')
        }
      });
    }
  }


  selectedStaff(){
    console.log('==================================')
    this.setState({
      addStaffChange: true
    })
    console.log(this.state.addStaffChange)
  }

  close() {
    this.setState({
      dock: {
        visible: false
      },
      addStaffChange: false
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
            addStaffChange={this.state.addStaffChange}
            onSelectedStaff={this.selectedStaff.bind(this)}
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
      },
      addStaffChange: false
    });
  }

  search(value){
    this.setState({
      searchContent: value
    },this.getUsers.bind(this,1))
  }

  // 权限分配
  rolePermission(id,mode,roleName) {
    this.setState({
      dock: {
        visible: true,
        children: (
          <RolePermission
            id={id}
            close={this.close.bind(this)}
            backRoleEdit={this.addUserBack.bind(this,id)}
            mode={mode}
            roleName={roleName}
          />
        )
      }
    });
  }

  render() {
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        width: '27%'
      },
      {
        title: '用户数',
        dataIndex: 'roleCount',
        key: 'roleCount',
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
