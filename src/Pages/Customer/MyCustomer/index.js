import React, { Component } from 'react';
import {
  Button,
  Icon
} from 'antd';
import axios from 'axios';

import TablePage from '../../../components/TablePage';

export default class MyCustomer extends Component {
  state = {
    loading: true,
    columnsLists: [],
    popularMovies: {},
    page: 1,
    type: 0
  }

  /*
  * 初始化加载的时候，调用接口获取返回的数据
  * 根据返回的状态，拿到相对应的数据
  */
  componentWillMount() {
    // 请求表头数据
    axios.get('/api/popular/columns')
    .then((data) => {
      if(data.status === 200 && data.statusText === 'OK' && data.data) {
        this.setState({
          columnsLists: data.data
        })
      }
    })

    // 请求列表数据
    axios.get('/api/movies/popular')
    .then((data) => {
      if(data.status === 200 && data.statusText === 'OK' && data.data) {
        // 将数据存入私有的 state中
        this.setState({
          loading: false,
          popularMovies: data.data[0]
        })
      }
    })
  }

  // 关注客户／取消关注
  customerFocus = (id, e) => {
    e.stopPropagation(); // 阻止事件冒泡
    // 拿到用户的 id，发送请求，取消关注／关注
    console.log(id);
  }

  // 传入 columnsLists的 key, 返回不同的数字，定义 table columns的宽度
  columnsWidth = (key) => {
    switch(key) {
      case 'clientName':
        return 15;

      case 'clientType':
        return 20;

      case 'clientPhone':
        return 15;

      case 'riskPreference':
        return 20;

      case 'customerManager':
        return 15;

      case 'subsidiaryOrgan':
        return 15;

      default:
        return 15;
    }
  }

  // 处理 columnsLists，生成新的 columns
  handleColumns = columnsLists => columnsLists.map((item) => {
    if(item && item.id) {
      // 当 item.key === 'subsidiaryOrgan'时，render() 关注，取消关注
      if(item.key && item.key === 'subsidiaryOrgan') {
        return {
          title: item.name,
          key: item.key,
          width: `${this.columnsWidth(item.key)}%`,
          render: record => (
            <div className='attention'>
              <p>{record.subsidiaryOrgan}</p>
              {record.focus && record.focus === true
                ?
                <a href="#" onClick={this.customerFocus.bind(this, record.id)}>
                  <Icon type="heart" />关注
                </a>
                :
                <a href="#" onClick={this.customerFocus.bind(this, record.id)}>
                  <Icon type="heart-o" />取消关注
                </a>
              }

            </div>
          )
        }
      }

      return {
        title: item.name,
        dataIndex: item.key,
        key: item.key,
        width: `${this.columnsWidth(item.key)}%`
      }
    }
  })

  // 拿到传入的 movies数组，遍历筛选得到新的数组
  filterMoviesData = movies => movies.map((item, sort) => {
    if(item && item.title) {
      return {
        key: item.id,
        id: item.id,
        clientName: item.title,
        clientType: item.subtype,
        riskPreference: item.rating.average,
        clientPhone: item.year,
        customerManager: item.genres[0],
        subsidiaryOrgan: item.original_title,
        focus: true
      }
    }
  });

  render() {
    const { popularMovies, page, loading, columnsLists } = this.state;

    // 渲染 Table表格的表头数据
    const columns =  columnsLists && this.handleColumns(columnsLists);

    // 渲染表单内部的数据
    const dataSource = popularMovies && popularMovies.subjects
                       ?
                       this.filterMoviesData(popularMovies.subjects)
                       :
                       [];

    const myCustomerProps = {
      columns: columns,
      dataSource: dataSource,
      page: page,
      loading: loading
    };

    return (
      <div>
        <header>
          <Button>新建客户</Button>
          <Button>更多操作</Button>
        </header>
        <TablePage {...myCustomerProps}/>
      </div>
    )
  }
}
