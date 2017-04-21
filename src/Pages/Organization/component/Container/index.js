/**
 * 文件说明： 组织机构管理/ 容器组件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React, {Component} from "react";
import {Layout, Tree,Table} from "antd";
import axios from "axios";
import Dock from 'react-dock';
//======================================================
import ActionBar from "../ActionBar";
import BranchesDetail from '../BranchesDetail';
//========================================================
import "./less/organization.less";
import API from "../../../../../API";


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
        children: <div>asd</div>
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

    const dockConfig = {
      position: 'right',
      isVisible: this.props.dockConf.visible,
      dimMode: 'opaque',
      defaultSize: .5,
      onVisibleChange: this.props.dockConf.closeDock,
      zIndex: 100
    };


    return (
      <div className="organization">
        <ActionBar  {...this.props.actionBarConf}/>
        <Layout>
          <Sider>
            <Tree
              defaultExpandAll={true}
            >
              {this.createTree(this.state.department)}
            </Tree>
          </Sider>
          <Content>
            <Table {...this.props.tableConf}/>
          </Content>
        </Layout>
        <Dock {...dockConfig}>
          {this.props.dockConf.children}
        </Dock>
      </div>
    )
  }
}
