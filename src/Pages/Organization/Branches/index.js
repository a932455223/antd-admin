/**
 * 文件说明： 组织机构管理/组织管理
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React, {Component} from "react";
import {Layout, Tree,Table} from "antd";
import axios from "axios";
import Dock from 'react-dock';
//======================================================
import ActionBar from "../component/ActionBar";
import BranchesDetail from '../component/BranchesDetail';
//========================================================
import "./less/branchesStyle.less";
import API from "../../../../API";


const {Sider, Content} = Layout;
const TreeNode = Tree.TreeNode;

export default class Branches extends Component {

  state = {
    department: {},
    dock: {
      visible: false,
      children: null
    }
  };



  componentWillMount() {
    axios.get(API.GET_DEPARTMENT_HIERARCHY)
      .then(res => {
        this.setState({
          department: res.data.data
        })
      })
  }

  createTree(data) {

    if (data.childDepartment) {
      return (
        <TreeNode title={data.name} id={data.id} key={data.id}>
          {
            data.childDepartment.map(childrenDepartment => {
              return (
                this.createTree(childrenDepartment)
              )
            })
          }
        </TreeNode>  )
    } else {
      return <TreeNode title={data.name} id={data.id} key={data.id}/>
    }
  }

  showDock(id = -1){
    this.setState({
      dock: {
        visible: true,
        children: <BranchesDetail closeDock={this.closeDock.bind(this)} id={id}/>
      }
    })
  }

  closeDock(){
    this.setState({
      dock: {
        visible: false
      }
    })
  }

  render() {
    const columns = [
      {
        title: '组织名称',
        dataIndex: 'clientName',
        key: 'clientName',
        width: '20%'
      },
      {
        title: '负责人',
        dataIndex: 'customCount',
        key: 'customCount',
        width: '16%'
      },
      {
        title: '客户规模',
        dataIndex: 'createTime',
        key: 'createTime',
        width: '16%'
      },
      {
        title: '存款规模',
        dataIndex: 'a',
        key: 'a',
        width: '16%'
      },
      {
        title: '贷款规模',
        dataIndex: 'b',
        key: 'b',
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
              <Button>{text}</Button>
            </div>
          )
        }
      }
    ];

    const tableConf = {
      columns: columns
    };

    const dockConfig = {
      position: 'right',
      isVisible: this.state.dock.visible,
      dimMode: 'opaque',
      defaultSize: .5,
      onVisibleChange: () => {
        this.setState({
          dock: {
            visible: false
          }
        })
      },
      zIndex: 100
    };

    const actionBarConf = {
      newClick: this.showDock.bind(this)
    };


    return (
      <div className="organizationBranches">
        <ActionBar parent="branches" {...actionBarConf}/>
        <Layout>
          <Sider>
            <Tree
              defaultExpandAll={true}
            >
              {this.createTree(this.state.department)}
            </Tree>
          </Sider>
          <Content>
            <Table {...tableConf}/>
          </Content>
        </Layout>
        <Dock {...dockConfig}>
          {this.state.dock.children}
        </Dock>
      </div>
    )
  }
}
