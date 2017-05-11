/**
 * Created by jufei on 2017/4/22.
 */
import React, {Component} from "react";
import {Card, Col, Icon, Row, Table, Tabs, Tree,Tag, Button, message} from "antd";
import axios from "axios";
import ajax from '../../../../tools/POSTF';
//=============================================+
import "./less/indexStyle.less";
import API from "../../../../../API";


const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

export default class BatchParticipate extends Component {

  state = {
    department: {},
    table: {
      dataSource: []
    }
  };

  componentWillMount() {
    // console.log('add crew modal')
    // 获取 treeNode department
    ajax.Get(API.GET_DEPARTMENT_HIERARCHY)
    .then(res => {
      this.setState({
        department: res.data.data[0]
      })
    });

    this.getStaffs(1);
  }

  getStaffs = (departmentId) => {
    ajax.Get(API.GET_STAFFS, {departmentId: departmentId})
    .then(res => {
      this.setState({
        table: {
          dataSource: res.data.data.staffs
        }
      })
    })
  }

  createTree(data) {
    if (data.childDepartments && data.childDepartments.length > 0) {
      return (
        <TreeNode
          title={<span>{data.name}</span>}
          id={data.id}
          key={data.id}
        >
          {data.childDepartments.map(childrenDepartment => {
              return (
                this.createTree(childrenDepartment)
              )
            })
          }
        </TreeNode>  )
    } else {
      return <TreeNode title={<span>{data.name}</span>} id={data.id} key={data.id}/>
    }
  }

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
  };

  initTableScroll(){
    let container = document.getElementById('selectStaffBody');
    let thead = document.getElementsByClassName('ant-table-thead')[0];
    let table = document.getElementsByClassName('participateTable')[0];
    let tableScroll = table.getElementsByClassName('ant-table-body')[0];
    let tabsScroll = table.getElementsByClassName('ant-tabs-content')[0];
    let pagenationHeight = 52;

    tableScroll.style['max-height'] = container.offsetHeight - thead.offsetHeight - pagenationHeight + 'px';
    if(tabsScroll && tabsScroll.style) {
      tabsScroll.style['max-height'] = container.offsetHeight - thead.offsetHeight - pagenationHeight + 'px';
      tabsScroll.style['overflow-y'] = 'auto';
    }
    tableScroll.style['overflow-y'] = 'auto';
    // console.log(tableScroll.style['max-height'])
  }

  componentDidMount(){
    this.initTableScroll();
    addEventListener('resize', this.initTableScroll)
  }

  // 更新页面高度
  componentDidUpdate(){
    // this.initTableScroll();
  }

  // 卸载方法
  // componentWillUnmount(){
  //   removeEventListener('resize', this.initTableScroll)
  // }

  saveEditInfo = () => {
    this.props.closeDock();
  }

  // log
  log = (e) => {
    // console.log(e)
  }

  // 确认参与人员的信息
  confirmParticipant = () => {
    message.success('参与者修改成功');
    this.props.closeDock();
  }

  render() {
    const tableConf = {
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          width: '40%'
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
          width: '60%'
        }
      ],
      dataSource: this.state.table.dataSource
    };

    console.log(this.state.department && this.state.department.id)

    const tree = this.state.department && this.state.department !== {} ?
      <Tree
        defaultExpandedKeys={['1']}
        checkable
        onSelect={this.onSelect}>
        {this.createTree(this.state.department)}
      </Tree>
      :
      null

    return (
      <div className="batchParticipate" id="batchParticipate">
        <header className="title">
          <p>批量参与</p>
          <Icon
            className="close"
            onClick={this.saveEditInfo}
            type="close"
          />
        </header>

        <div className="select-staff-body" id="selectStaffBody">
          <div className="hadParticipated">
            <span>参与的客户：</span>
            <Tag closable onClose={this.log}>Mary Davis</Tag>
            <Tag closable onClose={this.log}>Nancy Hall</Tag>
            <Tag closable onClose={this.log}>Joseph Robinson</Tag>
          </div>


          <div className="tagsWrapper">
            <div className="tags-title">
              <h3>已选成员</h3>
              <span> 人</span>
            </div>
            <div>

            </div>
          </div>

            <div className="selectStaffs">
              <div className="departmentTrees">
                <Tabs defaultActiveKey="1">
                  <TabPane tab={<span>职位</span>} key="1">
                    <Tree checkable>
                      {tree}
                    </Tree>
                  </TabPane>
                  <TabPane tab={<span>群组</span>} key="2">
                    大同市分行
                  </TabPane>
                </Tabs>
              </div>

              <div>
                <Table
                  className="participateTable"
                  {...tableConf}
                  // rowClassName={(record, index) => {return 'participate'}}
                  // checkable
                  rowKey={record => record.id}
                  // rowSelection={this.rowSelection}
                  // scroll={{y: 1 }} // 固定表头
                  // pagination={{
                  //   pageSize:20
                  // }}
                />
              </div>
            </div>
        </div>

        <div className="btn-group">
          <Button>取消</Button>
          <Button onClick={this.confirmParticipant}>确认</Button>
        </div>
      </div>
    )
  }
}
