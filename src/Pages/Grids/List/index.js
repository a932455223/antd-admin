import React, {Component} from "react";
import {Button} from "antd";
import axios from "axios";
//=============================================================
import RoleEdit from "../component/RoleEdit";
import Content from "../component/Content";
import SelectStaff from "../../../components/SelectStaff";
import RolePermission from "../component/RolePermission";
import NewRole from '../component/NewRole';
//===============================================================
import "../style/rolesStyle.less";
import API from "../../../../API";

export default class GridsList extends Component {
  constructor(props) {
    super(props);
    this.roleEdit = (id,mode) => {
      return (
        <RoleEdit
          id={id}
          close={() => {
            this.setState({
              dock: {
                visible: false
              }
            })
          }}
          rolePermission={this.rolePermission.bind(this,id,mode)}
          addUser={this.addUser.bind(this)}
        />
      )
    }
  }

  state = {
    table: {
      loading: true,
      dataSource: [],
      currentId:''
    },
    dock: {
      visible: false,
      children: null
    }
  };

  componentWillMount() {
    axios.post(API.POST_GRIDS_AREAS)
      .then(res => {
        console.log(res);
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
        children: <NewRole close={this.close.bind(this)}/>
      }
    });
  }

  // 表格点击事件
  rowClick(rowData) {
    console.log(rowData)
    this.setState({
      dock: {
        visible: true,
        children: this.roleEdit(rowData.id,'edit')
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
        children: this.roleEdit(id,'edit')
      }
    });
  }

  // 权限分配
  rolePermission(id,mode) {
    this.setState({
      dock: {
        visible: true,
        children: (
          <RolePermission
            id={id}
            close={this.close.bind(this)}
            backRoleEdit={this.addUserBack.bind(this,id)}
            mode={mode}
          />
        )
      }
    });
  }

  render() {
    let datasource = this.state.table.dataSource.map((item,index) => ({...item, id:`data-${index}`}));
    console.dir(datasource);
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
        dataIndex: 'orgId',
        key: 'orgId',
        width: '12%'
      },
      {
        title: '网格类型',
        dataIndex: 'customCount',
        key: 'customCount',
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
      dataSource: datasource,
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
