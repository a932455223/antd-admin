/**
 * Created by jufei on 2017/4/22.
 */
import React, {Component} from "react";
import {Card, Col, Icon, Row, Table, Tabs, Tree,Tag, Button, message} from "antd";
import update from 'immutability-helper';
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
    },
    staffs: []
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

  // rowSelection = {
  //   selectedRowKeys,
  //   onChange: (selectedRowKeys, selectedRows) => {},
  //   onSelect: (record, selected, selectedRows) => {
  //     this.setState({
  //       staffs: selectedRows
  //     })
  //   },
  //   onSelectAll: (selected, selectedRows, changeRows) => {
  //     this.setState({
  //       staffs: selectedRows
  //     })
  //   }
  // };

  initTableScroll(){
    let container = document.getElementById('selectStaffBody');
    let thead = document.getElementsByClassName('ant-table-thead')[0];
    let table = document.getElementsByClassName('participateTable')[0];
    let tableScroll = table.getElementsByClassName('ant-table-body')[0];
    let tabsScroll = table.getElementsByClassName('ant-tree')[0];
    let pagenationHeight = 52;

    tableScroll.style['max-height'] = container.offsetHeight - thead.offsetHeight - pagenationHeight + 'px';
    // if(tabsScroll && tabsScroll.style) {
    //   tabsScroll.style['max-height'] = container.offsetHeight - thead.offsetHeight - pagenationHeight + 'px';
    //   tabsScroll.style['overflow-y'] = 'auto';
    // }
    // tableScroll.style['overflow-y'] = 'auto';
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

  // treenode select
  onSelect = (selectedKeys, info) => {
    this.getStaffs(selectedKeys[0]);
  }

  // 选择客户
  selectStaffs = (record, selected, selectedRows) => {
    let newState = update(this.state, {
      staffs: {$set: selectedRows}
    })

    this.setState(newState);
  }

  // 选择所有客户
  selectAllStaffs = (selected, selectedRows, changeRows) => {
    let newState = update(this.state, {
      staffs: {$set: selectedRows}
    })

    this.setState(newState);
  }

  // 更新 customers lists的数据
  changeStaffsLists = (customer) => {
    let newState = update(this.state, {
      staffs: {$set: this.state.selectedCustomers.filter(item => item.id !== customer.id)}
    })

    this.setState(newState);
  }

  // 删除已选择的客户
  customersHandleClose = (customer) => {
    this.props.changeCustomersLists(customer);
  }

  // 删除已选择的员工
  staffHandleClose = (staff) => {
    let newState = update(this.state, {
      staffs: {$set: this.state.staffs.filter(item => item.id !== staff.id)}
    })

    this.setState(newState);
  }

  // 确认参与人员的信息
  confirmParticipant = () => {
    const { selectedCustomers } = this.props;
    const { staffs } = this.state;
    const customersArray = selectedCustomers.map(item => item.id);
    const staffsArray = staffs.map(item => item.id);

    // console.log(customersArray);
    // console.log(staffsArray);
    message.success('参与者修改成功');
    this.props.closeDock();
  }

  cancleParticipant = () => {}

  render() {
    const { selectedCustomers } = this.props;
    const { staffs } = this.state;
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
    const selectedRowKeys = staffs.map(item => item.id);

    const rowSelection = {
      selectedRowKeys,
      onChange: this.staffsChange,
      onSelect: this.selectStaffs,
      onSelectAll: this.selectAllStaffs
    }

    const tree = this.state.department && this.state.department !== {} ?
      <Tree
        defaultExpandedKeys={['1']}
        checkable
        onSelect={this.onSelect}>
        {this.createTree(this.state.department)}
      </Tree>
      :
      null

    const ParticipateCustomers = selectedCustomers && selectedCustomers.map((item,index) => {
      return (
        <Tag key={`${item.id}${index}`} closable="true" afterClose={() => this.customersHandleClose(item)}>
          {item.name}
        </Tag>
      )
    })

    const ParticipateStaffs = staffs && staffs.map((item,index) => {
      return (
        <Tag key={`${item.id}${index}`} closable="true" afterClose={() => this.staffHandleClose(item)}>
          {item.name}
        </Tag>
      )
    })

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
            {ParticipateCustomers}
          </div>


          <div className="tagsWrapper">
            <div className="tags-title">
              <span>已选成员:</span>
              <span>{staffs.length} 人</span>
            </div>
            <div>
              {ParticipateStaffs}
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
                  rowClassName={(record, index) => {return 'participate'}}
                  checkable
                  rowKey={record => record.id}
                  rowSelection={rowSelection}
                  scroll={{y: 1 }} // 固定表头
                  pagination={{
                    pageSize: 10
                  }}
                />
              </div>
            </div>
        </div>

        <div className="btn-group">
          <Button onClick={this.cancleParticipant}>取消</Button>
          <Button onClick={this.confirmParticipant}>确认</Button>
        </div>
      </div>
    )
  }
}
