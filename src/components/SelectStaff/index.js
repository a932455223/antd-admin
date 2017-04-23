/**
 * Created by jufei on 2017/4/22.
 */
import React, {Component} from "react";
import {Card, Col, Icon, Row, Table, Tabs, Tree,Tag,Button} from "antd";
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
      dataSource: [{
        name: 'asd',
        phone: '1241325'
      }]
    }
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
      <div className="select-staff">
        <Card
          title={
            <div className="title">
              <h3>选择人员</h3>
              <Icon type="close"/>
            </div>
          }
        >
          <Row className="select-staff-body">
            <Col span="11">
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
            </Col>


            <Col span="13">
              <Table
                {...tableConf}
                checkable
                rowKey={record => record.phone}
                rowSelection
                pagination={false}
              />
            </Col>
          </Row>
          <div className="tags-wrapper">
            <div className="selected-staff">
              <h3>已选成员</h3>
              <span>6ren</span>
            </div>
            <div>
              <Tag>Tag 1</Tag>
              <Tag><a href="https://github.com/ant-design/ant-design/issues/1862">Link</a></Tag>
              <Tag closable >Tag 2</Tag>
              <Tag closable >Prevent Default</Tag>
            </div>
            <div>
              <Button>取消</Button>
              <Button>确认</Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}



