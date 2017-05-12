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
    departmentId: 1,
    table: {
      dataSource: []
    },
    staffs: [],

    tableContent: '',
    Paticipate: '',
    Trans: '',
    Distribute: ''
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

    // 异步加载 edit component
    require.ensure([],() => {
      let Paticipate = require('./Table/PaticipateTable').default;
      let Trans = require('./Table/TransTable').default;
      let Distribute = require('./Table/DistributeTable').default;
      this.setState({
        Paticipate: Paticipate,
        Trans: Trans,
        Distribute: Distribute
      })
    }, 'TableContent');
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

  saveEditInfo = () => {
    this.props.closeDock();
  }

  // 删除已选择的客户
  customersHandleClose = (customer) => {
    this.props.changeCustomersLists(customer);
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

  participantStaffs = (staffs) => {
    let newState = update(this.state, {
      staffs: {$set: staffs}
    })

    this.setState(newState);
  }

  updateDepartmentId = (departmentId) => {
    let newState = update(this.state, {
      departmentId: {$set: departmentId}
    })

    this.setState(newState);
  }

  // 确认参与人员的信息
  confirmParticipant = () => {
    const { selectedCustomers } = this.props;
    const { staffs } = this.state;
    const customersArray = selectedCustomers.map(item => item.id);
    const staffsArray = staffs.map(item => item.id);

    if(customersArray.length === 0 ) {
      message.error('参与客户不能为空');
    } else if(staffsArray.length === 0) {
      message.error('参与员工不能为空');
    } else {
      ajax.Put(API.PUT_CUSTOMER_JOIN, {customerIds: customersArray, joinerIds: staffsArray})
          .then(res => {
            if(res.data.code === 200) {
              message.success('参与者修改成功');
              this.props.closeDock();
            } else {
              message.error(res.data.message)
            }
          })
    }
  }

  // 确认批量转移
  confirmTrans = () => {
    const { selectedCustomers } = this.props;
    const { staffs } = this.state;
    const customersArray = selectedCustomers.map(item => item.id);
    const staffsArray = staffs.map(item => item.id);

    if(customersArray.length === 0 ) {
      message.error('参与客户不能为空');
    } else if(staffsArray.length === 0) {
      message.error('参与员工不能为空');
    } else {
      ajax.Put(API.PUT_CUSTOMER_TRANSFER, {customerIds: customersArray, staffId: staffsArray[0] - 0, orgId: this.state.departmentId})
          .then(res => {
            console.log(res);
            if(res.data.code === 200) {
              message.success('批量转移成功');
              this.props.closeDock();
            } else {
              message.error(res.data.message);
            }
          })
    }
  }

  // 确认批量分配
  confirmDistribute = () => {
    const { selectedCustomers } = this.props;
    const { staffs } = this.state;
    const customersArray = selectedCustomers.map(item => item.id);
    const staffsArray = staffs.map(item => item.id);

    if(customersArray.length === 0 ) {
      message.error('参与客户不能为空');
    } else if(staffsArray.length === 0) {
      message.error('参与员工不能为空');
    } else {
      ajax.Put(API.PUT_CUSTOMER_TRANSFER, {customerIds: customersArray, staffId: staffsArray[0] - 0, orgId: this.state.departmentId})
          .then(res => {
            console.log(res);
            if(res.data.code === 200) {
              message.success('批量转移成功');
              this.props.closeDock();
            } else {
              message.error(res.data.message);
            }
          })
    }
  }

  cancleParticipant = () => {
    this.props.closeDock();
  }

  render() {
    const { selectedCustomers, batchComfirmButton } = this.props;
    const { staffs } = this.state;

    let newStaffs;
    if(batchComfirmButton === 'participate') {
      newStaffs = staffs;
    } else {
      newStaffs = staffs.length !== 0 ? [staffs[0]] : [];
    }

    const ParticipateCustomers = selectedCustomers && selectedCustomers.map((item,index) => {
      return (
        <Tag key={`${item.id}${index}`} closable="true" afterClose={() => this.customersHandleClose(item)}>
          {item.name}
        </Tag>
      )
    })

    return (
      <div className="batchParticipate" id="batchParticipate">
        <header className="title">
          {batchComfirmButton && batchComfirmButton === 'participate' &&
            <p>批量参与</p>
          }
          {batchComfirmButton && batchComfirmButton === 'trans' &&
            <p>批量转移</p>
          }
          {batchComfirmButton && batchComfirmButton === 'distribute' &&
            <p>批量分配</p>
          }
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

          {batchComfirmButton && batchComfirmButton === 'participate' && this.state.Paticipate !== '' &&
            <this.state.Paticipate
              participantStaffs={this.participantStaffs}
              updateDepartmentId={this.updateDepartmentId}
            />
          }
          {batchComfirmButton && batchComfirmButton === 'trans' && this.state.Trans !== '' &&
            <this.state.Trans
              participantStaffs={this.participantStaffs}
              updateDepartmentId={this.updateDepartmentId}
            />
          }
          {batchComfirmButton && batchComfirmButton === 'distribute' && this.state.Distribute !== '' &&
            <this.state.Distribute
              participantStaffs={this.participantStaffs}
              updateDepartmentId={this.updateDepartmentId}
            />
          }
        </div>

        <div className="btn-group">
          <Button onClick={this.cancleParticipant}>取消</Button>
          {batchComfirmButton && batchComfirmButton === 'participate' &&
            <Button onClick={this.confirmParticipant}>确认</Button>
          }
          {batchComfirmButton && batchComfirmButton === 'trans' &&
            <Button onClick={this.confirmTrans}>确认</Button>
          }
          {batchComfirmButton && batchComfirmButton === 'distribute' &&
            <Button onClick={this.confirmDistribute}>确认</Button>
          }
        </div>
      </div>
    )
  }
}
