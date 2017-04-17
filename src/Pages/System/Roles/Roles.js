import React, {Component} from "react";
import {Button, Table} from "antd";
import Dock from "react-dock";
//=============================================================
import ActionBar from "../component/ActionBar";
import UserInfo from "../component/UserInfoCard";
import LimitCard from "../component/LimitCard";
//===============================================================
import axios from "axios";

export default class SystemUsers extends Component {

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
    axios.get('/api/get/system/roles/users/list')
      .then(res => {
        this.setState({
          table: {
            dataSource: res.data.list,
            loading: false
          }
        })
      })
  }

  componentDidMount() {

  }

  rowClick(rowData) {
    this.setState({
      dock: {
        visible: true,
        children: (
          <UserInfo
            id={rowData.id}
            showLimit={this.showLimitCardFromUserInfoCard.bind(this)}
          />
        )
      }
    });
  }

  showLimitCardFromTable(id) {
    this.setState({
      dock: {
        visible: true,
        children: <LimitCard
          id={id}
          saveClick={() => {
            this.setState({
              dock: {
                visible: false
              }
            })
          }}
        />
      }
    })
  }

  showLimitCardFromUserInfoCard(id) {
    this.setState({
      dock: {
        visible: true,
        children: (
          <LimitCard
            id={id}
            saveClick={() => {
              this.setState({
                dock: {
                  visible: true,
                  children: (
                    <UserInfo
                      id={id}
                      showLimit={this.showLimitCardFromUserInfoCard.bind(this)}
                    />
                  )
                }
              })
            }}
          />
        )
      }
    })
  }

  render() {
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'clientName',
        key: 'clientName',
        width: '15%'
      },
      {
        title: '用户数',
        dataIndex: 'customCount',
        key: 'customCount',
        width: '20%'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: '15%'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: '22%',
        render: (text = '编辑', rowData) => {
          return (
            <div>
              <Button>{text}</Button>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  this.showLimitCardFromTable(rowData.id)
                }}
              >
                分配权限
              </Button>
            </div>
          )
        }
      }
    ];


    const tableConfig = {
      columns: columns,
      dataSource: this.state.table.dataSource,
      loading: this.state.table.loading,
      onRowClick: this.rowClick.bind(this)
    };

    const dockConfig = {
      position: 'right',
      isVisible: this.state.dock.visible,
      dimMode: 'opaque',
      defaultSize: .5,
      onVisibleChange: () => {
        this.setState({
          dock: {
            visible: false
          }
        })
      }
    };

    return (
      <div>
        <ActionBar/>
        <Table {...tableConfig}/>
        <Dock {...dockConfig}>
          {this.state.dock.children}
        </Dock>
      </div>
    )
  }
}
