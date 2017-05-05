import React, {Component} from "react";
import {Button} from "antd";
import axios from "axios";
// import {qs} from 'qs'
//=============================================================
import GridEdit from "../component/GridEdit";
import Content from "../component/Content";
import SelectStaff from "../../../components/SelectStaff";
import GridPermission from "../component/GridPermission";
import NewGrid from '../component/NewGrid';
//===============================================================
import "../style/rolesStyle.less";
import API from "../../../../API";
import ajax from '../../../tools/POSTF'
import update from 'immutability-helper'
export default class GridsList extends Component {
  constructor(props) {
    super(props);
  }

  GridEdit = (id,mode) => {
      return (
        <GridEdit
          id={id}
          close={() => {
            this.setState({
              dock: {
                visible: false
              }
            })
          }}
          GridPermission={this.GridPermission.bind(this,id,mode)}
          addUser={this.addUser.bind(this)}
          getTableData = {this.getTableData}
        />
      )
  }

  state = {
    table: {
      loading: true,
      dataSource: []
    },
    dock: {
      visible: false,
      children: null
    }

  };

  componentWillMount() {
   this.getTableData();
  }

  getTableData =() => {
    this.setState(update(this.state,{table:{loading:{$set:true}}}))
    ajax.Post(API.POST_GRIDS_AREAS,{areaType:72})
    .then( res => {
      this.setState({
        table: {
            dataSource: res.data.data.areas,
            loading: false
        }
      })
    })
  }

  // 新增角色
  newClick() {
    this.setState({
      dock: {
        visible: true,
        children: <NewGrid close={this.close.bind(this)}  getTableData={this.getTableData}/>
      }
    });
  }





  // 表格点击事件
  rowClick(rowData) {
    this.setState({
      dock: {
        visible: true,
        children: this.GridEdit(rowData.id,'edit')
      }
    });

  }

  close() {
    this.setState({
      dock: {
        visible: false
      }
    })
  }

  // 添加包含用户
  addUser(id) {
    this.setState({
      dock: {
        visible: true,
        children: (
          <SelectStaff
            back={this.addUserBack.bind(this)}
            id={id}
          />
        )
      }
    })
  }

  // 添加包含用户返回
  addUserBack(id) {
    this.setState({
      dock: {
        visible: true,
        children: this.GridEdit(id,'edit')
      }
    });
  }

  // 权限分配
  GridPermission(id,mode) {
    this.setState({
      dock: {
        visible: true,
        children: (
          <GridPermission
            id={id}
            close={this.close.bind(this)}
            backGridEdit={this.addUserBack.bind(this,id)}
            mode={mode}
          />
        )
      }
    });
  }

  render() {
    const columns = [
      {
        title: '网格名称',
        dataIndex: 'name',
        key: 'name',
        width: '12%'
      },
      {
        title: '网格负责人',
        dataIndex: 'director',
        key: 'director',
        width: '11%'
      },
      {
        title: '所属机构',
        dataIndex: 'orgName',
        key: 'orgName',
        width: '12%'
      },
      {
        title: '网格类型',
        dataIndex: 'gridType',
        key: 'gridType',
        width: '10%'
      },
      {
        title: '网格户口数',
        dataIndex: 'residenceCount',
        key: 'residenceCount',
        width: '10%'
      },
      {
        title: '网格人口数',
        dataIndex: 'personCount',
        key: 'personCount',
        width: '10%'
      },
      {
        title: '网格面积',
        dataIndex: 'landArea',
        key: 'landArea',
        width: '10%'
      },
      {
        title: '操作',
        dataIndex: 'action0',
        key: 'action0',
        width: '10%',
        render: (text = '编辑', rowData) => {
          return (
            <div>
              <Button>{text}</Button>
            </div>
          )
        }
      }
    ];

    const actionBarConf = {
      mode: 'role',
      newClick: this.newClick.bind(this)
    };

    const tableConf = {
      columns: columns,
      dataSource: this.state.table.dataSource,
      loading: this.state.table.loading,
      onRowClick: this.rowClick.bind(this)
    };

    const dockConf = {
      visible: this.state.dock.visible,
      children: this.state.dock.children,
    };

    return (
      <Content
        actionBarConf={actionBarConf}
        tableConf={tableConf}
        dockConf={dockConf}
      />
    )
  }
}
