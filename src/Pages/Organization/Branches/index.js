/**
 * 文件说明： 组织机构管理/组织管理
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

  showDock(id) {
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
        title: '组织名称',
        dataIndex: 'clientName',
        key: 'clientName',
        width: '20%'
      },
      {
        title: '负责人',
        dataIndex: 'customCount',
        key: 'customCount',
        width: '16%'
      },
      {
        title: '客户规模',
        dataIndex: 'createTime',
        key: 'createTime',
        width: '16%'
      },
      {
        title: '存款规模',
        dataIndex: 'a',
        key: 'a',
        width: '16%'
      },
      {
        title: '贷款规模',
        dataIndex: 'b',
        key: 'b',
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
      parent: 'branches',
      newClick: this.showDock.bind(this,-1),
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
