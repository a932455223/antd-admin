import React, { Component } from 'react';
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

  // 传入 columnsLists的 key, 返回不同的数字，定义 table columns的宽度
  columnsWidth = (key) => {
    switch(key) {
      case 'clientName':
        return 15;

      case 'clientCategory':
        return 20;

      case 'clientPhone':
        return 15;

      case 'riskPreference':
        return 22;

      case 'customerManager':
        return 15;

      case 'subsidiaryOrgan':
        return 10;

      default:
        return 15;
    }
  }

  // 处理 columnsLists，生成新的 columns
  handleColumns = columnsLists => columnsLists.map((item) => {
    if(item && item.id) {
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
        clientCategory: item.subtype,
        riskPreference: item.rating.average,
        clientPhone: item.year,
        customerManager: item.genres[0],
        subsidiaryOrgan: item.original_title
      }
    }
  });

  render() {
    const { popularMovies, page, loading, columnsLists } = this.state;

    // 渲染 Table表格的表头数据
    const columns =  columnsLists && this.handleColumns(columnsLists);

    // const columns = [
    //   {
    //     title: '客户名称',
    //     dataIndex: 'clientName',
    //     key: 'clientName',
    //     width: '15%'
    //   },
    //   {
    //     title: '客户类别',
    //     dataIndex: 'clientCategory',
    //     key: 'clientCategory',
    //     width: '20%'
    //   },
    //    {
    //     title: '电话',
    //     dataIndex: 'clientPhone',
    //     key: 'clientPhone',
    //     width: '15%'
    //   },
    //   {
    //     title: '风险偏好',
    //     dataIndex: 'riskPreference',
    //     key: 'riskPreference',
    //     width: '22%'
    //   },
    //   {
    //     title: '客户经理',
    //     dataIndex: 'customerManager',
    //     key: 'customerManager',
    //     width: '15%'
    //   },
    //   {
    //     title: '所属机构',
    //     key: 'subsidiaryOrgan',
    //     dataIndex: 'subsidiaryOrgan',
    //     width: '10%'
    //   }
    // ];

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

    return <TablePage {...myCustomerProps}/>
  }
}
