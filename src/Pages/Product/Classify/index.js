/**
 * 文件说明： 组织机构管理/员工
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */


import React, {Component} from "react";
import axios from "axios";
//========================================
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
    axios.get(API.GET_PRODUCT_CLASSIFY_LIST)
      .then(res => {
        this.setState({
          table: {
            dataSource: res.data.data
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
      }
    })
  }



  render() {
    const columns = [
      {
        title: '产品名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%'
      },
      {
        title: '所属类别',
        dataIndex: 'classify',
        key: 'classify',
        width: '20%'
      },
      {
        title: '类别描述',
        dataIndex: 'describe',
        key: 'describe',
        width: '40%'
      },
      {
        title: '产品数量',
        dataIndex: 'count',
        key: 'count',
        width: '20%'
      }
    ];

    const actionBarConf = {
      parent: 'classify',
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
