/**
 * 文件说明： 组织机构管理/员工
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */


import React, {Component} from "react";
import axios from "axios";
//========================================
import NewProduct from "../component/NewProduct";
import ProductEditor from "../component/ProductEditor";
//==================================================
import Content from "../component/Content";
import API from "../../../../API";


export default class Branches extends Component {
  state = {
    dock: {
      visible: false,
      // children: <ProductEditor id="id" closeDock={this.closeDock.bind(this)}/>
    },
    table: {
      dataSource: []
    }
  };

  componentWillMount() {
    axios.get(API.GET_ALL_PRODUCT)
      .then(res => {
        this.setState({
          table: {
            dataSource: res.data.data
          }
        });
      })
  }

  closeDock() {
    this.setState({
      dock: {
        visible: false,
      }
    })
  }


  newClick() {
    this.setState({
      dock: {
        visible: true,
        children:<ProductEditor id="id" closeDock={this.closeDock.bind(this)}/>
      }
    })
  }

  tableClick(id) {
    this.setState({
      dock: {
        visible: true,
        children: <ProductEditor id={id} closeDock={this.closeDock.bind(this)}/>
      }
    })
  }


  render() {
    const columns = [
      {
        title: '产品编号',
        dataIndex: 'code',
        key: 'code',
        width: '20%'
      },
      {
        title: '产品名称',
        dataIndex: 'name',
        key: 'name',
        width: '16%'
      },
      {
        title: '产品简称',
        dataIndex: 'abbreviation',
        key: 'abbreviation',
        width: '16%'
      },
      {
        title: '产品类别',
        dataIndex: 'classify',
        key: 'classify',
        width: '16%'
      },
      {
        title: '客户数',
        dataIndex: 'customerCount',
        key: 'customerCount',
        width: '16%'
      }
    ];

    const actionBarConf = {
      parent: 'all',
      newClick: this.newClick.bind(this),
    };

    const dockConf = {
      visible: this.state.dock.visible,
      closeDock: this.closeDock.bind(this),
      children: this.state.dock.children
    };

    const tableConf = {
      columns: columns,
      dataSource: this.state.table.dataSource,
      rowClick: this.tableClick.bind(this)
    };

    return <Content actionBarConf={actionBarConf} dockConf={dockConf} tableConf={tableConf}/>
  }
}
