/**
 * 文件说明： 组织机构管理/ 容器组件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React, {Component} from "react";
import {Icon, Layout, Table, Tree} from "antd";
import axios from "axios";
import Dock from "react-dock";
//======================================================
import ActionBar from "../CustomerFilter";
//========================================================
import "./less/organization.less";
import API from "../../../../../API";


const {Sider, Content} = Layout;
const TreeNode = Tree.TreeNode;

export default class Branches extends Component {

  state = {
    classify: {},
    dock: {
      visible: false,
      children: null
    }
  };


  componentWillMount() {
    axios.get(API.GET_PRODUCT_HIERARCHY)
      .then(res => {
        this.setState({
          classify: res.data.data
        })
      })
  }

  initTableScroll(){
    let sider = document.getElementById('organizationSider');
    let tableScroll = document.getElementsByClassName('ant-table-body')[0];
    let content = document.getElementById('content');
    let thead = document.getElementsByTagName('thead')[0];

    tableScroll.style['height'] = content.offsetHeight - thead.offsetHeight - 74  + 'px';
    tableScroll.style['max-height'] = content.offsetHeight - thead.offsetHeight - 74  + 'px';
    tableScroll.style['overflow-y'] = 'auto';

    sider.style.width = '260px';
    sider.style.flex = '0 0 260px';
  }

  componentDidMount(){
    this.initTableScroll();
    addEventListener('resize',this.initTableScroll)
  }

  componentDidUpdate(){
    this.initTableScroll();
  }

  componentWillUnmount(){
    removeEventListener('resize',this.initTableScroll)
  }

  createTree(data) {
    if (data.childDepartment) {
      return (
        <TreeNode title={<span><Icon type="folder-open" />{data.name}</span>} id={data.id} key={data.id}>
          {
            data.childDepartment.map(childrenDepartment => {
              return (
                this.createTree(childrenDepartment)
              )
            })
          }
        </TreeNode>  )
    } else {
      return <TreeNode title={<span><Icon type="folder-open" />{data.name}</span>} id={data.id} key={data.id}/>
    }
  }


  showDock(id = -1) {
    this.setState({
      dock: {
        visible: true,
        children: <div>asd</div>
      }
    })
  }





  render() {
    const dockConfig = {
      position: 'right',
      isVisible: this.props.dockConf.visible,
      dimMode: 'none',
      defaultSize: .5,
      zIndex: 100
    };



    return (
      <div className="organization">
        <ActionBar  {...this.props.actionBarConf}/>
        <Layout>
          <Sider style={{width: "260px", flex:" 0 0 260px"}}
            id="organizationSider"
          >
            <Tree
              defaultExpandAll={true}
            >
              {this.createTree(this.state.classify)}
            </Tree>
          </Sider>
          <Content id="content">

            <Table
              {...this.props.tableConf}
              onRowClick={(rowData) => {
                this.props.tableConf.rowClick(rowData.id)
              }}
              rowKey={record => record.id}
              scroll={{y: 1}}
            />
          </Content>
        </Layout>
        <Dock {...dockConfig}>
          {this.props.dockConf.children}
        </Dock>
      </div>
    )
  }
}
