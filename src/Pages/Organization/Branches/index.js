/**
 * 文件说明： 组织机构管理/组织管理
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */


import React, {Component} from "react";
import {Button, Icon} from "antd";
//=========================================================
import Content from "../component/Content";
import BranchesDetail from "../component/BranchesDetail";
import ajax from "../../../tools/POSTF.js";
//=========================================================
import API from "../../../../API";
import BrabchesEditor from "../component/BranchesEditor/index";

export default class Branches extends Component {
  state = {
    parentId: 1,
    dock: {
      visible: false
    },
    table: {
      dataSource: [],
      loading: true
    },
  };


  componentWillMount() {
    this.getDepartments();
  }

  // 获取组织列表 表格 数据
  getDepartments(index = 1){
    this.setState({
      table: {
        ...this.state.table,
        loading: true
      }
    });
    ajax.Post(API.GET_DEPARTMENTS, {
      index: index,
      parentId: this.state.parentId,
      size: 10
    })
      .then(res => {
        console.log(res.data.data.departments);
        this.setState({
          table: {
            ...this.state.table,
            dataSource: res.data.data.departments,
            loading: false
          }
        })
      }).catch(err => {
      console.log(err)
    })
  }


  // 关闭dick
  closeDock() {
    this.setState({
      dock: {
        visible: false
      }
    })
  }


  // 展示dock
  showDock(id) {
    this.setState({
      dock: {
        visible: true,
        children: (
          <BranchesDetail
            closeDock={this.closeDock.bind(this)}
            id={id}
            refresh={this.refresh.bind(this)}
          />
        )
      }
    })
  }

  // 表格 行 点击事件
  tableClick(id) {
    this.setState({
      dock: {
        visible: true,
        children: (
          <BrabchesEditor
            closeDock={this.closeDock.bind(this)}
            id={id}
          />
        )
      }
    })
  }

  // 表格分页点击事件
  tableChange(pagination) {
    console.log(pagination)
  }

  // 树 选择事件
  treeChange(selectKey) {
    console.log(selectKey);
    this.setState({
      parentId: parseInt(selectKey[0])
    },() => {
      this.getDepartments()
    })
  }

  refresh(){
    this.getDepartments();
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
                <Icon type="edit"/>
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

    const treeConf = {
      onSelect: this.treeChange.bind(this)
    };

    const tableConf = {
      columns: columns,
      dataSource: this.state.table.dataSource,
      rowClick: this.tableClick.bind(this),
      onChange: this.tableChange.bind(this),
      loading: this.state.table.loading
    };

    return <Content actionBarConf={actionBarConf} dockConf={dockConf} tableConf={tableConf} treeConf={treeConf}/>
  }
}
