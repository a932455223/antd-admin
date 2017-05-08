/**
 * 文件说明： 组织机构管理/组织管理
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */


import React, {Component} from "react";
import {Button, Icon,Modal,message} from "antd";
//=========================================================
import Content from "../component/Content";
import BranchesDetail from "../component/BranchesDetail";
import ajax from "../../../tools/POSTF.js";
//=========================================================
import API from "../../../../API";
import BrabchesEditor from "../component/BranchesEditor/index";

export default class Branches extends Component {
  state = {
    haschange:false,
    parentId: 1,
    dock: {
      visible: false
    },
    table: {
      dataSource: [],
      loading: true,
      total: 100,
      size: 15,
      index: 1
    },
  };


  componentWillMount() {
    this.getDepartments();
  }

  // 获取组织列表 表格 数据
  getDepartments= () => {
    this.setState({
      table: {
        ...this.state.table,
        loading: true
      }
    });
    ajax.Post(API.GET_DEPARTMENTS, {
      index: this.state.table.index,
      parentId: this.state.parentId,
      size: this.state.table.size
    })
      .then(res => {
        this.setState({
          table: {
            ...this.state.table,
            dataSource: res.data.data.departments,
            loading: false,
            count: res.data.data.pagination.count
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
  closeDockHasChange = () => {
    if (this.state.haschange){
      Modal.error({content: '您要离开此页面吗？',})
    }
  }
  hasChange = () => {
    console.log(888888)
    this.setState({
      haschange:true
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
            refresh={this.refresh.bind(this)}
            id={id}
            getDepartments={this.getDepartments}
            
          />
        )
      }
    })
  }

  // 表格分页点击事件
  tableChange(pagination) {
    this.setState({
      table: {
        ...this.state.table,
        index: pagination.current
      }
    },this.getDepartments)
  }

  // 树 选择事件
  treeChange(selectKey) {
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
        dataIndex: 'deposit',
        key: 'deposit',
        width: '16%'
      },
      {
        title: '贷款规模',
        dataIndex: 'loan',
        key: 'loan',
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
      loading: this.state.table.loading,
      pagination: {
        total: this.state.table.count,
        pageSize: this.state.table.size,
        current: this.state.table.index
      }
    };

    return <Content actionBarConf={actionBarConf} dockConf={dockConf} tableConf={tableConf} treeConf={treeConf}/>
  }
}
