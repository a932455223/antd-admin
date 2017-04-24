import React, { Component } from 'react';
import {
  Button,
  Icon,
  Input
} from 'antd';
import axios from 'axios';
import API from '../../../../API';

import TablePage from '../../../components/TablePage';
import CustomerFilter from '../../../components/CustomerFilter';
import '../MyCustomer/less/myCustomerStyle.less';
import '../MyCustomer/indexStyle.less';

import queryString from 'query-string'


export default class Focused extends Component {
  state = {
    loading: true,
    columnsLists: [],
    customers: [],
    pagination: {},
    type: 0,
    privilege: []
  }

  initTableScroll = () => {
    const tableScroll     = document.getElementsByClassName('ant-table-body')[0];
    const customer        = document.getElementById('customer');
    const customerFilter  = document.getElementById('customerFilter');
    const thead           = document.getElementsByTagName('thead')[0];
    const customerPadding = 48;
    const pageFooter      = 74;

    tableScroll.style['max-height'] = customer.offsetHeight - customerFilter.offsetHeight -  thead.offsetHeight - customerPadding - pageFooter  + 'px';
    tableScroll.style['overflow-y'] = 'auto';
  }

  componentDidMount(){
    this.initTableScroll();
    addEventListener('resize', this.initTableScroll)
  }

  // 更新页面高度
  componentDidUpdate(){
    this.initTableScroll();
  }

  // 卸载方法
  componentWillUnmount(){
    removeEventListener('resize', this.initTableScroll)
  }

  /*
  * 初始化加载的时候，调用接口获取返回的数据
  * 根据返回的状态，拿到相对应的数据
  */
  componentWillMount() {
    console.log('%c/ myCustomer /_____will mount', 'color: red');
    // 请求表头数据
    axios.get('/asd/popular/columns')
    .then((data) => {
      if(data.status === 200 && data.statusText === 'OK' && data.data) {
        this.setState({
          columnsLists: data.data
        })
      }
    })

      this.getCustomers();
  }

  getCustomers = (params) => {
      axios.get(API.GET_CUSTOMERS+'?'+queryString.stringify(params||{page:1}))
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
                      this.setState({
                          privilege: rest.data.data.map(item => ({[item.id]:item.permissions}))
                      })
                  })
          })
  }

  // 关注客户／取消关注
  customerFocus = (id, e) => {
    e.stopPropagation(); // 阻止事件冒泡
    // 拿到用户的 id，发送请求，取消关注／关注
  }


  render() {
    const { customers, pagination, loading, columnsLists,privilege } = this.state;

    // 渲染 Table表格的表头数据
    const columns = [
      {
        title: '客户名称',
        dataIndex: 'name',
        key: 'name',
        width: '16%'
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
        width: '24%',
        render: customer => (
          <div className='attention'>
            <p>{customer.department}</p>
            {customer.attention
              ?
              <a className="cancel" href="#" onClick={this.customerFocus.bind(this, customer.id)}>
                  <Icon style={{color: '#a66800'}} type="star" />
                  <span>取消关注</span>
              </a>
              :
              <a className="focus" href="#" onClick={this.customerFocus.bind(this, customer.id)}>
                <Icon style={{color: '#ffa102'}} type="star" />
                <span>关注客户</span>
              </a>
            }
          </div>
        )
      }
    ]

    // 需要传入 Table page的数据 props
    const myCustomerProps = {
      columns: columns,
      dataSource: customers,
      pagination: pagination,
      loading: loading,
      privilege: privilege,
      pageChange:(pageNumber) => {
          this.setState({
              ...this.state,
              loading:true
          })

          this.getCustomers({page:pageNumber});
      }
    };
    return (
      <div className="customer" id="customer">
        <div>
          <CustomerFilter onChange={(filters)=>{

          }} />
          <TablePage {...myCustomerProps}/>
        </div>
      </div>
    )
  }
}
