/**
 * 文件说明： 组织机构管理/ 容器组件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React, {Component} from "react";
import {Button, Col, Icon, Layout, Table, Tree} from "antd";
import axios from "axios";
import Dock from "react-dock";
//======================================================
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
    },
    refresh: false
  };


  componentWillMount() {
    axios.get(API.GET_DEPARTMENT_HIERARCHY)
      .then(res => {
        this.setState({
          department: res.data.data[0]
        })
      }).catch(err => {
      console.log(err)
    })
  }

  initTableScroll() {
    let sider = document.getElementById('organizationSider');
    let tableScroll = document.getElementsByClassName('ant-table-body')[0];
    let contentTitle = document.getElementById('contentTitle');
    let content = document.getElementById('content');
    let thead = document.getElementsByTagName('thead')[0];

    tableScroll.style['height'] = content.offsetHeight - contentTitle.offsetHeight - thead.offsetHeight - 74 + 'px';
    tableScroll.style['max-height'] = content.offsetHeight - contentTitle.offsetHeight - thead.offsetHeight - 74 + 'px';
    tableScroll.style['overflow-y'] = 'auto';

    sider.style.width = '260px';
    sider.style.flex = '0 0 260px';
  }

  componentDidMount() {
    this.initTableScroll();
    addEventListener('resize', this.initTableScroll)
  }

  componentDidUpdate() {
    this.initTableScroll();
  }

  componentWillUnmount() {
    removeEventListener('resize', this.initTableScroll)
  }

  componentWillReceiveProps(){
    axios.get(API.GET_DEPARTMENT_HIERARCHY)
      .then(res => {
        this.setState({
          department: res.data.data[0]
        })
      })
  }




  createTree(data) {
    if (data.childDepartments && data.childDepartments.length !== 0) {
      return (
        <TreeNode title={<span><Icon type="folder-open"/>{data.name}</span>} id={data.id} key={data.id}>
          {
            data.childDepartments.map(childrenDepartment => {
              return this.createTree(childrenDepartment)
            })
          }
        </TreeNode>)
    } else {
      return <TreeNode title={<span><Icon type="folder-open"/>{data.name}</span>} id={data.id} key={data.id}/>
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

    let tree = Object.keys(this.state.department).length > 0 ? (<Tree
      defaultExpandedKeys={[this.state.department.id.toString()]}
      onSelect={this.props.treeConf.onSelect}
    >
      {this.createTree(this.state.department)}
    </Tree>)
      : null

    return (
      <div className="organization">
        {/*<ActionBar  {...this.props.actionBarConf}/>*/}
        <Layout>
          <Sider style={{width: "260px", flex: " 0 0 260px"}}
                 id="organizationSider"
          >
            <div className="sider-title">
              <h3>组织机构</h3>
              {                   this.props.actionBarConf.parent === 'department' &&
              (
                <Button onClick={this.props.actionBarConf.newClick.bind(this, 'department')}>
                  <Icon type="plus"/>
                  新增机构
                </Button>
              )
              }
            </div>
            {tree}
          </Sider>
          <Content id="content">
            <div className="content-title" id="contentTitle">
              <Col span="18">
                <h3>金融科技部</h3>
              </Col>
              <Col span="4">
                {
                  this.props.actionBarConf.parent === 'staff' &&
                  <Button
                    onClick={this.props.actionBarConf.newClick.bind(this)}
                    className="newStaff"
                  >
                    <Icon type="plus"/>
                    新增员工
                  </Button>
                }
              </Col>
            </div>
            <Table
              onChange={this.props.tableConf.onChange}
              {...this.props.tableConf}
              onRowClick={(rowData) => {
                this.props.tableConf.rowClick(rowData.id)
              }}
              rowKey={record => record.id}
              scroll={{y: 1}}
              loading={this.props.tableConf.loading}
              pagination={this.props.tableConf.pagination}
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
