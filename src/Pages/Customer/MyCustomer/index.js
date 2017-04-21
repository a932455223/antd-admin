import React, { Component } from 'react';
import {
  Button,
  Icon,
  Input
} from 'antd';
import axios from 'axios';
import API from '../../../../API';

import TablePage from '../../../components/TablePage';
import Droplist from '../../../components/DropdownList';
import './less/myCustomerStyle.less';
import './indexStyle.less';
export default class MyCustomer extends Component {
  state = {
    loading: true,
    columnsLists: [],
    customers: [],
    pagination: {},
    type: 0,
    privilege: []
  }

  /*
  * 初始化加载的时候，调用接口获取返回的数据
  * 根据返回的状态，拿到相对应的数据
  */
  componentWillMount() {
    // 请求表头数据
    axios.get('/asd/popular/columns')
    .then((data) => {
      if(data.status === 200 && data.statusText === 'OK' && data.data) {
        this.setState({
          columnsLists: data.data
        })
      }
    })


    // 请求列表数据

    axios.get(API.GET_CUSTOMERS)
    .then((json) => {
        // 将数据存入私有的 state中
        this.setState({
          loading: false,
          customers: json.data.data.customers || [],
          pagination: json.data.pagination
        })
        return json.data.data.customers || []
    })
    .then((customers) => {
        let permission = customers.map((cstm) => ({customerId:cstm.id,permission:['system:update']}))
        axios.post(API.POST_CUSTOMER_PRIVILEGE,permission)
        .then((rest) => {
            let hasPermission = rest.data.data;
            this.setState({
                ...this.state,
                privilege:hasPermission
            })
        })
    })
  }

  // componentDidUpdate() {
  //   const customersMode = this.getCustomersMode(this.state.customers);
  //   if(customersMode.length !== 0) {
  //     console.log(customersMode);
  //   };
  // };
  //
  // // 发送 customers lists
  // getCustomersMode = customers => customers.map(customer => customer.id);

  // 关注客户／取消关注
  customerFocus = (id, e) => {
    e.stopPropagation(); // 阻止事件冒泡
    // 拿到用户的 id，发送请求，取消关注／关注
    console.log(id);
  }

  // 传入 columnsLists的 key, 返回不同的数字，定义 table columns的宽度
  // columnsWidth = (key) => {
  //   switch(key) {
  //     case 'clientName':
  //       return 15;
  //
  //     case 'clientType':
  //       return 20;
  //
  //     case 'clientPhone':
  //       return 15;
  //
  //     case 'riskPreference':
  //       return 20;
  //
  //     case 'customerManager':
  //       return 15;
  //
  //     case 'subsidiaryOrgan':
  //       return 15;
  //
  //     default:
  //       return 15;
  //   }
  // }

  // 处理 columnsLists，生成新的 columns
  // handleColumns = columnsLists => columnsLists.map((item) => {
  //   if(item && item.id) {
  //     // 当 item.key === 'subsidiaryOrgan'时，render() 关注，取消关注
  //     if(item.key && item.key === 'subsidiaryOrgan') {
  //       return {
  //         title: item.name,
  //         key: item.key,
  //         width: `${this.columnsWidth(item.key)}%`,
  //         render: record => (
  //           <div className='attention'>
  //             <p>{record.subsidiaryOrgan}</p>
  //             {record.attention && record.attention === true
  //               ?
  //               <a href="#" onClick={this.customerFocus.bind(this, record.id)}>
  //                 <Icon type="heart" />
  //                 <span>关注</span>
  //               </a>
  //               :
  //               <a href="#" onClick={this.customerFocus.bind(this, record.id)}>
  //                 <Icon type="heart-o" />
  //                 <span>取消关注</span>
  //               </a>
  //             }
  //
  //           </div>
  //         )
  //       }
  //     }
  //
  //     // 固定 table第一列
  //     // if(item.key && item.key === 'clientName') {
  //     //   return {
  //     //     title: item.name,
  //     //     dataIndex: item.key,
  //     //     key: item.key,
  //     //     width: `${this.columnsWidth(item.key)}%`,
  //     //     fixed: 'left'
  //     //   }
  //     // }
  //
  //     return {
  //       title: item.name,
  //       dataIndex: item.key,
  //       key: item.key,
  //       width: `${this.columnsWidth(item.key)}%`
  //     }
  //   }
  // })

  // 拿到传入的 movies数组，遍历筛选得到新的数组
  // filterMoviesData = customers => customers.map((item, sort) => {
  //   if(item && item.name) {
  //     return {
  //       key: item.id,
  //       id: item.id,
  //       clientName: item.name,
  //       clientType: item.category,
  //       riskPreference: item.risk,
  //       clientPhone: item.phone,
  //       customerManager: item.manager,
  //       subsidiaryOrgan: item.department,
  //       attention: item.attention
  //     }
  //   }
  // });

  render() {
    const { customers, pagination, loading, columnsLists,privilege } = this.state;

    // 渲染 Table表格的表头数据
    const columns = [
      {
        title: '客户名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%'
      },
      {
        title: '客户类别',
        dataIndex: 'category',
        key: 'category',
        width: '12%'
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
        width: '12%'
      },
      {
        title: '评级',
        dataIndex: 'level',
        key: 'level',
        width: '12%'
      },
      {
        title: '风险偏好',
        dataIndex: 'risk',
        key: 'risk',
        width: '12%'
      },
      {
        title: '客户经理',
        dataIndex: 'manager',
        key: 'manager',
        width: '12%'
      },
      {
        title: '所属机构',
        key: 'department',
        width: '20%',
        render: customer => (
          <div className='attention'>
            <p>{customer.department}</p>
            {customer.attention && customer.attention === true
              ?
              <a href="#" onClick={this.customerFocus.bind(this, customer.id)}>
                <Icon type="heart" />
                <span>关注</span>
              </a>
              :
              <a href="#" onClick={this.customerFocus.bind(this, customer.id)}>
                <Icon type="heart-o" />
                <span>取消关注</span>
              </a>
            }
          </div>
        )
      }
    ]
    // const columns =  columnsLists && this.handleColumns(columnsLists);

    // 渲染表单内部的数据
    // const dataSource = this.filterMoviesData(customers);
    const myCustomerProps = {
      columns: columns,
      dataSource: customers,
      pagination: pagination,
      loading: loading,
      privilege: privilege
    };
    return (
      <div className="customer">
        <Droplist />
        <TablePage {...myCustomerProps}/>
      </div>
    )
  }
}
