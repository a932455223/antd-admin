/**
 * 文件说明： 组织机构管理/员工
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */


import React, {Component} from "react";
import axios from "axios";
import {Button,Icon} from "antd";
//========================================
import StaffDetail from "../component/StaffDetail";
import StaffEditor from "../component/StaffEditor";
import BranchesDetail from "../component/BranchesDetail";
//==================================================
import Content from "../component/Content";
import API from "../../../../API";


export default class Branches extends Component {
  state = {
    dock: {
      visible: false,
      // children: <StaffEditor id="id" closeDock={this.closeDock.bind(this)}/>
    },
    table: {
      dataSource: []
    }
  };

  componentWillMount() {
    axios.get(API.GET_STAFFS)
      .then(res => {
        this.setState({
          table: {
            dataSource: res.data.data.staffs
          }
        });
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
        children: <StaffDetail closeDock={this.closeDock.bind(this)} id={id}/>
      }
    })
  }

  newClick(target) {
    if (target === 'department') {
      this.setState({
        dock: {
          visible: true,
          children: <BranchesDetail id="-1" closeDock={this.closeDock.bind(this)}/>
        }
      })
    } else {
      this.setState({
        dock: {
          visible: true,
          children: <StaffDetail id="-1" closeDock={this.closeDock.bind(this)}/>
        }
      })
    }
  }

  tableClick(id) {
    this.setState({
      dock: {
        visible: true,
        children: <StaffEditor id={id} closeDock={this.closeDock.bind(this)}/>
      }
    })
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
                <Icon type="edit" />
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
      rowClick: this.tableClick.bind(this)
    };

    return <Content actionBarConf={actionBarConf} dockConf={dockConf} tableConf={tableConf}/>
  }
}
