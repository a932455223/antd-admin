/**
 * 文件说明： 组织机构管理/员工
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */


import React, {Component} from "react";
import axios from "axios";
import {Button, Icon} from "antd";
//========================================
import StaffDetail from "../component/StaffDetail";
import StaffEditor from "../component/StaffEditor";
import BranchesDetail from "../component/BranchesDetail";
//==================================================
import Content from "../component/Content";
import API from "../../../../API";
import ajax from "../../../tools/POSTF.js";


export default class Branches extends Component {
  state = {
    parentId: 1,
    dock: {
      visible: false,
      // children: <StaffEditor id="id" closeDock={this.closeDock.bind(this)}/>
    },
    table: {
      dataSource: [],
      loading: true,
      count: 100,
      size: 15,
      index: 1
    }
  };

  componentWillMount() {
   this.getStaffs()
  }

  // 获取组织列表 表格 数据
  getStaffs(index = 1) {
    this.setState({
      table: {
        ...this.state.table,
        loading: true
      }
    });
    ajax.Get(API.GET_STAFFS, {
      index: this.state.table.index,
      departmentId: this.state.parentId,
      size: this.state.table.size
    }).then(res => {
      this.setState({
        table: {
          ...this.state.table,
          count: res.data.data.pagination.count,
          dataSource: res.data.data.staffs,
          loading: false
        }
      })
    })
  }

  closeDock() {
    this.setState({
      dock: {
        visible: false,
      }
    })
  }

  showDock(id = -1) {
    this.setState({
      dock: {
        visible: true,
        children:(
          <StaffDetail
            closeDock={this.closeDock.bind(this)}
            refresh={this.refresh.bind(this)}
            id={id}
          />
        )
      }
    })
  }

  newClick(target) {
    if (target === 'department') {
      this.setState({
        dock: {
          visible: true,
          children: (
            <BranchesDetail
              id="-1"
              closeDock={this.closeDock.bind(this)}
              refresh={this.refresh.bind(this)}
            />
          )
        }
      })
    } else {
      this.setState({
        dock: {
          visible: true,
          children: (
            <StaffDetail
              id="-1"
              closeDock={this.closeDock.bind(this)}
              refresh={this.refresh.bind(this)}
            />
          )
        }
      })
    }
  }

  tableClick(id) {
    this.setState({
      dock: {
        visible: true,
        children:(
          <StaffEditor
            id={id}
            closeDock={this.closeDock.bind(this)}
            refresh={this.refresh.bind(this)}
          />
        )
      }
    })
  }

  // 表格分页点击事件
  tableChange(pagination) {
    console.log(pagination);
    this.setState({
      table: {
        ...this.state.table,
        index: pagination.current
      }
    },this.getStaffs)

  }

  // 树 选择事件
  treeChange(selectKey) {
    console.log(selectKey);
    this.setState({
      parentId: parseInt(selectKey[0])
    }, () => {
      this.getStaffs()
    })
  }

  refresh(){
    this.getStaffs()
  }

  render() {

    const columns = [
      {
        title: '员工姓名',
        dataIndex: 'name',
        key: 'name',
        width: '20%'
      },
      {
        title: '员工工号',
        dataIndex: 'code',
        key: 'code',
        width: '16%'
      },
      {
        title: '所属组织',
        dataIndex: 'department',
        key: 'department',
        width: '16%'
      },
      {
        title: '职务',
        dataIndex: 'position',
        key: 'position',
        width: '16%'
      },
      {
        title: '联系方式',
        dataIndex: 'phone',
        key: 'phone',
        width: '16%'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: '16%',
        render: (text = '编辑', rowData) => {
          return (
            <div>
              <Button className="edit">
                <Icon type="edit"/>
                {text}
              </Button>
            </div>
          )
        }
      }
    ];

    const actionBarConf = {
      parent: 'staff',
      newClick: this.newClick.bind(this),
    };

    const dockConf = {
      visible: this.state.dock.visible,
      closeDock: this.closeDock.bind(this),
      children: this.state.dock.children
    };

    const tableConf = {
      columns: columns,
      dataSource: this.state.table.dataSource,
      rowClick: this.tableClick.bind(this),
      onChange: this.tableChange.bind(this),
      loading: this.state.table.loading,
      pagination: {
        total: this.state.table.count,
        pageSize: this.state.table.size,
        current: this.state.table.index
      }
    };

    const treeConf = {
      onSelect: this.treeChange.bind(this)
    };

    return <Content actionBarConf={actionBarConf} dockConf={dockConf} tableConf={tableConf} treeConf={treeConf}/>
  }
}
