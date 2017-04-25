/**
 * Created by jufei on 2017/4/22.
 */
import React, {Component} from "react";
import {Button, Card, Icon, Table, Tabs, Tag, Tree} from "antd";
import axios from "axios";
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
    }
  };


  componentWillMount() {
    axios.get(API.GET_DEPARTMENT_HIERARCHY)
      .then(res => {
        this.setState({
          department: res.data.data
        })
      });


    axios.get(API.GET_STAFFS)
      .then(res => {
        this.setState({
          table: {
            dataSource: res.data.data.staffs
          }
        })
      })
  }

  componentDidMount() {
    this.initTableScroll();
    addEventListener('resize',this.initTableScroll)
  }

  componentDidUpdate() {
    this.initTableScroll();
  }

  componentWillUnmout(){
    removeEventListener('resize',this.initTableScroll)
  }

  createTree(data) {
    if (data.childDepartment) {
      return (
        <TreeNode title={<span>{data.name}</span>} id={data.id} key={data.id}>
          {
            data.childDepartment.map(childrenDepartment => {
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

  initTableScroll() {
    let selectStaff = document.getElementById('selectStaff');
    let container = selectStaff.getElementsByClassName('ant-card-body')[0];
    let tableScroll = selectStaff.getElementsByClassName('ant-table-body')[0];
    tableScroll.style['max-height'] = container.offsetHeight - 83 - 130 + 'px';
    tableScroll.style['height'] = container.offsetHeight - 83 - 130 + 'px';
    tableScroll.style['overflow-y'] = 'auto';
    console.log(tableScroll)
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

    return (
      <div className="select-staff" id="selectStaff">
        <Card
          className="card-body"
          title={
            <div className="title">
              <h3>选择人员</h3>
              <Icon
                type="close"
                onClick={this.props.back.bind(this,this.props.id)}
                className="back"
              />
            </div>
          }
        >

          <div className="select-staff-body" id="mainBody">

            <div>
              <div>
                <Tabs defaultActiveKey="1">
                  <TabPane tab={<span>职位</span>} key="1">
                    <Tree
                      checkable
                    >
                      {this.createTree(this.state.department)}
                    </Tree>
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
              <Tag>Tag 1</Tag>
              <Tag><a href="https://github.com/ant-design/ant-design/issues/1862">Link</a></Tag>
              <Tag closable>Tag 2</Tag>
              <Tag closable>Prevent Default</Tag>
            </div>
            <div className="btn-group">
              <Button onClick={this.props.back.bind(this,this.props.id)}>取消</Button>
              <Button>确认</Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}



