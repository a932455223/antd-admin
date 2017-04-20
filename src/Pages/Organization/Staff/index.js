/**
 * 文件说明： 组织机构管理/员工
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */



import React, {Component} from "react";
//========================================
import Container from "../component/Container";
import BranchesDetail from '../component/BranchesDetail';


export default class Branches extends Component {
  state = {
    dock: {
      visible: false
    }
  };

  closeDock() {
    this.setState({
      dock: {
        visible: false
      }
    })
  }

  showDock(id = -1) {
    this.setState({
      dock: {
        visible: true,
        children: <BranchesDetail closeDock={this.closeDock.bind(this)} id={id}/>
      }
    })
  }

  render() {
    const columns = [
      {
        title: '员工姓名',
        dataIndex: 'clientName',
        key: 'clientName',
        width: '20%'
      },
      {
        title: '员工工号',
        dataIndex: 'customCount',
        key: 'customCount',
        width: '16%'
      },
      {
        title: '所属组织',
        dataIndex: 'branches',
        key: 'branches',
        width: '16%'
      },
      {
        title: '职务',
        dataIndex: 'duty',
        key: 'duty',
        width: '16%'
      },
      {
        title: '联系方式',
        dataIndex: 'contact',
        key: 'contact',
        width: '16%'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: '16%',
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
      parent: 'staff',
      newClick: this.showDock.bind(this),
    };

    const dockConf = {
      visible: this.state.dock.visible,
      closeDock: this.closeDock.bind(this),
      children: this.state.dock.children
    };

    const tableConf = {
      columns: columns
    };

    return <Container actionBarConf={actionBarConf} dockConf={dockConf} tableConf={tableConf}/>
  }
}
