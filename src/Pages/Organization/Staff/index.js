/**
 * 文件说明： 组织机构管理/员工管理
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React, {Component} from "react";
import {Layout, Tree} from "antd";
import axios from 'axios';
import Dock from 'react-dock';
//======================================================
import ActionBar from "../component/ActionBar";
//========================================================
import "./less/staffStyle.less";
import API from '../../../../API'

const {Sider, Content} = Layout;
const TreeNode = Tree.TreeNode;

export default class Home extends Component {

  state = {
    department: {}
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

  render() {
    return (
      <div className="organizationStaff">
        <ActionBar parent="staff"/>
        <Layout>
          <Sider>
            <Tree
              defaultExpandAll={true}
            >
              {this.createTree(this.state.department)}
            </Tree>
          </Sider>
          <Content>asd</Content>
        </Layout>
      </div>
    )
  }
}
