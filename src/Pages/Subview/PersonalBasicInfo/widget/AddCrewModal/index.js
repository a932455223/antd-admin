import React,{Component} from 'react'
import axios from "axios";
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
    ajax.Get(API.GET_DEPARTMENT_HIERARCHY)
      .then(res => {
        this.setState({
          department: res.data.data
        })
      });

    ajax.Get(API.GET_STAFFS, {departmentId: 1})
      .then(res => {
        this.setState({
          table: {
            dataSource: res.data.data.staffs
          }
        })
      })
  }

  componentWillReceiveProps(next){
    // this.initTableScroll();
  }

  componentDidUpdate(){
    if(this.props.visible){
      this.initTableScroll();
    }
  }

  componentDidMount() {
    // addEventListener('resize',this.initTableScroll)
  }

  // componentDidUpdate() {
  //   this.initTableScroll();
  // }

  componentWillUnmout(){
    // removeEventListener('resize',this.initTableScroll)
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

    return(
      <Modal  title="选择人员"
              width="600px"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={this.state.confirmLoading}
              onCancel={this.handleCancel}>

        <div className="select-staff" id="selectStaff">
          <Card
            className="card-body"
          >

            <div className="select-staff-body">
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
                <Button onClick={()=>{}}>取消</Button>
                <Button>确认</Button>
              </div>
            </div>
          </Card>
        </div>
      </Modal>
    )
  }
}
