import React,{Component} from 'react'
import axios from "axios";
import "./AddCrewModal.less";
import ajax from '../../../../../tools/POSTF';
import API from "../../../../../../API";
import {
  Modal,
  Button, Card, Icon, Table, Tabs, Tag, Tree
} from 'antd';

const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

export default class AddCrewModal extends Component {
  state = {
    department: {},
    table: {
      dataSource: []
    },
    open:false
  };

  componentWillMount() {
    console.log('add crew modal')
    // 获取 treeNode department
    ajax.Get(API.GET_DEPARTMENT_HIERARCHY)
    .then(res => {
      this.setState({
        department: res.data.data[0]
      })
    });

    this.getStaffs(1);
  }

  componentWillReceiveProps(next){
    // this.initTableScroll();
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

  // componentDidUpdate(){
  //   if(this.props.visible){
  //     this.initTableScroll();
  //   }
  // }

  // componentDidMount() {
  //   addEventListener('resize',this.initTableScroll)
  // }

  // componentDidUpdate() {
  //   this.initTableScroll();
  // }

  componentWillUnmout(){
    removeEventListener('resize', this.initTableScroll)
  }

  initTableScroll() {
    let addCrew = document.getElementById('addCrew');
    let tabsContent = addCrew.getElementsByClassName('ant-tabs-content')[0];
    let container = addCrew.getElementsByClassName('ant-card-body')[0];
    let tableScroll = addCrew.getElementsByClassName('ant-table-body')[0];
    tabsContent.style['max-height'] = container.offsetHeight - 83 - 130 + 'px';
    tableScroll.style['max-height'] = container.offsetHeight - 83 - 130 + 'px';
    tabsContent.style['overflow-y'] = 'auto';
    tableScroll.style['overflow-y'] = 'auto';
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

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });

    setTimeout(() => {
      this.props.hide();
      this.setState({
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    this.props.hide();
  };

  onSelect = (selectedKeys, info) => {
    this.getStaffs(selectedKeys[0]);
  }

  render() {
    const { visible } = this.props;
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
    const tree = this.state.department && this.state.department !== {} ?
      <Tree checkable onSelect={this.onSelect}>
        {this.createTree(this.state.department)}
      </Tree>
      :
      null

    return(
      <Modal
        title="选择人员"
        width="600px"
        visible={visible}
        className="addCrewModal"
        onOk={this.handleOk}
        confirmLoading={this.state.confirmLoading}
        onCancel={this.handleCancel}
      >
        <div className="select-staff" id="addCrew">
          <Card className="card-body">
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
                <span>6 人</span>
              </div>
              <div>
                <Tag>Tag 1</Tag>
                <Tag><a href="https://github.com/ant-design/ant-design/issues/1862">Link</a></Tag>
                <Tag closable>Tag 2</Tag>
                <Tag closable>Prevent Default</Tag>
              </div>
            </div>
          </Card>
        </div>
      </Modal>
    )
  }
}
