/**
 * 文件说明： 组织机构管理/组织管理
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */


import React, {Component} from "react";
import axios from "axios";
import {Button,Icon} from "antd";
//=========================================================
import Content from "../component/Content";
import BranchesDetail from "../component/BranchesDetail";
//=========================================================
import API from "../../../../API";
import BrabchesEditor from "../component/BranchesEditor/index";

export default class Branches extends Component {
  state = {
    dock: {
      visible: false
    },
    table: {
      dataSource: []
    }
  };


  componentWillMount() {
    axios.get(API.GET_DEPARTMENTS)
      .then(res => {
        this.setState({
          table: {
            dataSource: res.data.data
          }
        })
      })
  }

  closeDock() {
    this.setState({
      dock: {
        visible: false
      }
    })
  }

  showDock(id) {
    this.setState({
      dock: {
        visible: true,
        children: <BranchesDetail closeDock={this.closeDock.bind(this)} id={id}/>
      }
    })
  }

  tableClick(id) {
    this.setState({
      dock: {
        visible: true,
        children: <BrabchesEditor closeDock={this.closeDock.bind(this)} id={id}/>
      }
    })
  }

  render() {
    const columns = [
      {
        title: '组织名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%'
      },
      {
        title: '负责人',
        dataIndex: 'director',
        key: 'director',
        width: '16%'
      },
      {
        title: '客户规模',
        dataIndex: 'customerCount',
        key: 'customerCount',
        width: '16%'
      },
      {
        title: '存款规模',
        dataIndex: 'depositCount',
        key: 'depositCount',
        width: '16%'
      },
      {
        title: '贷款规模',
        dataIndex: 'loanCount',
        key: 'loanCount',
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
      parent: 'department',
      newClick: this.showDock.bind(this, -1),
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
