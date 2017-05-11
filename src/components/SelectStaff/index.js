/**
 * Created by jufei on 2017/4/22.
 */
import React, {Component} from "react";
import {Button, Card, Icon, Table, Tabs, Tag, Tree} from "antd";
import ajax from "../../tools/POSTF";
//=============================================+
import "./less/selectStaff.less";
import API from "../../../API";


const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

export default class SelectStaff extends Component {

  state = {
    department: {},
    table: {
      dataSource: []
    },
    loading: true,
    selectedStaff: [],
    selectedRowKeys: [19]
  };

  componentWillMount() {
    ajax.Get(API.GET_DEPARTMENT_HIERARCHY)
      .then(res => {
        this.setState({
          department: res.data.data[0]
        })
      });
    this.getStaff();

  }

  componentDidMount() {
    this.initTableScroll();
    addEventListener('resize', this.initTableScroll)
  }

  componentDidUpdate() {
    this.initTableScroll();
  }

  componentWillUnmout() {
    removeEventListener('resize', this.initTableScroll)
  }

  getStaff(departmentId = 1) {
    this.setState({
      loading: true
    })
    ajax.Get(API.GET_STAFFS, {departmentId: departmentId})
      .then(res => {
        console.log(res.data.data);
        this.setState({
          table: {
            dataSource: res.data.data.staffs
          },
          loading: false
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

  rowSelection = {
    // selectedRowKeys: this.state.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log('state',this.state.selectedRowKeys)
      console.log(`selectedRowKeys:`,selectedRowKeys, 'selectedRows: ', selectedRows);
      this.setState({
        selectedRowKeys: selectedRowKeys,
        selectedStaff: selectedRows
      })
    },
    onSelect: (record, selected, selectedRows) => {
      console.log('onSelect',record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
  };

  treeSelect(selectKey) {
    console.log(selectKey)
    this.getStaff(selectKey[0])
  }

  initTableScroll() {
    let selectStaff = document.getElementById('selectStaff');
    let container = selectStaff.getElementsByClassName('ant-card-body')[0];
    let tableScroll = selectStaff.getElementsByClassName('ant-table-body')[0];
    tableScroll.style['max-height'] = container.offsetHeight - 83 - 130 + 'px';
    tableScroll.style['height'] = container.offsetHeight - 83 - 130 + 'px';
    tableScroll.style['overflow-y'] = 'auto';
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

    let tree = Object.keys(this.state.department).length > 0 ? (<Tree
      defaultExpandedKeys={[this.state.department.id.toString()]}
      onSelect={this.treeSelect.bind(this)}
    >
      {this.createTree(this.state.department)}
    </Tree>)
      : null

    return (
      <div className="select-staff" id="selectStaff">
        <Card
          className="card-body"
          title={
            <div className="title">
              <h3>选择人员</h3>
              <Icon
                type="close"
                onClick={this.props.back.bind(this, this.props.id)}
                className="back"
              />
            </div>
          }
        >

          <div className="select-staff-body">
            <div>
              <div>
                <Tabs defaultActiveKey="1">
                  <TabPane tab={<span>职位</span>} key="1">
                    {tree}
                  </TabPane>
                  <TabPane tab={<span>群组</span>} key="2">
                    Tab 2
                  </TabPane>
                </Tabs>
              </div>
              <div>
                <Table
                  {...tableConf}
                  checkable
                  rowKey={record => record.id}
                  rowSelection={this.rowSelection}
                  scroll={{y: 300}}
                  loading={this.state.loading}
                  pagination={{
                    pageSize: 20
                  }}
                />
              </div>
            </div>
          </div>

          <div className="tags-wrapper">
            <div className="tags-title">
              <h3>已选成员</h3>
              <span>6ren</span>
            </div>
            <div>
              {
                this.state.selectedStaff.map( item => {
                  return <Tag closable={false}>{item.name}</Tag>
                })
              }
            </div>
            <div className="btn-group">
              <Button onClick={this.props.back.bind(this, this.props.id)}>取消</Button>
              <Button>确认</Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}
