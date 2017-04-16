import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table, Pagination, Spin } from 'antd';
import Dock from 'react-dock';
import axios from 'axios';

import { showEditDock, hideEditDock } from '../../redux/actions/commonAction';

class MyCustomer extends Component {
  // const propTypes = {
  //   editDock: PropTypes.object
  // };

  state = {
    loading: true,
    popularMovies: {},
    page: 1,
    selectedRowKeys: [],
    dockVisible: false,
    editMyCustomerInfo: '',
    currentId: ''
  };

  /*
  * 初始化加载的时候，调用接口获取返回的数据
  * 根据返回的状态，拿到相对应的数据
  */
  componentDidMount(){
    axios.get('/api/movies/popular').then((popularMovies) => {
      if(popularMovies.status === 200 && popularMovies.statusText === 'OK' && popularMovies.data) {
        // 将数据存入私有的 state中
        this.setState({
          loading: false,
          popularMovies: popularMovies.data[0]
        })
      }
    })
  };

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

  // 获取被选中的 row的 Id，打印当前的 Id
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({
      selectedRowKeys: selectedRowKeys
    });
  }

  // 页面快速跳转
  pageChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  };

  // 点击某一栏，编辑客户信息
  rowClick = (info) => {
    const LoadSpin = () => {
      return(
        <div>
          <Spin />
        </div>
      )
    }

    this.setState({
      dockVisible: true
    })
    // const { dispatch, editDock } = this.props;
    // dispatch(showEditDock(true, info.id));

    // 判断被点击的 row和当前的 currentId是否相同，若不相同，则请求加载数据
    if(info.id !== this.state.currentId) {
      this.setState({
        editMyCustomerInfo: LoadSpin
      })
    }

    // 异步加载 edit component
    require.ensure([],() => {
      let editMyCustomer = require('./MyCustomerDock/MyCustomerDock').default;

      setTimeout(() => {
        this.setState({
          editMyCustomerInfo: editMyCustomer,
          currentId: info.id
        })
      }, 300)
    }, 'editDock');
  }

  // close Dock
  closeDock = () => {
    this.setState({
      dockVisible: false
    })
  }

  render(){
    const { popularMovies } = this.state;
    const { editDock } = this.props;

    // 渲染 Table表格的表头数据
    const columns = [
      {
        title: '客户名称',
        dataIndex: 'clientName',
        key: 'clientName',
        width: '15%'
      },
      {
        title: '客户类别',
        dataIndex: 'clientCategory',
        key: 'clientCategory',
        width: '20%'
      },
       {
        title: '电话',
        dataIndex: 'clientPhone',
        key: 'clientPhone',
        width: '15%'
      },
      {
        title: '风险偏好',
        dataIndex: 'riskPreference',
        key: 'riskPreference',
        width: '22%'
      },
      {
        title: '客户经理',
        dataIndex: 'customerManager',
        key: 'customerManager',
        width: '15%'
      },
      {
        title: '所属机构',
        key: 'subsidiaryOrgan',
        dataIndex: 'subsidiaryOrgan',
        width: '10%'
      }
    ];

    // 渲染表单内部的数据
    const dataSource = popularMovies && popularMovies.subjects
                       ?
                       this.filterMoviesData(popularMovies.subjects)
                       :
                       [];

    //  console.log(popularMovies && popularMovies.subjects);
    //  console.log(dataSource);

    // table 的选择框
    const rowSelection = {
      onChange: this.onSelectChange,
    };

    // dock visible and row click crrentId
    const dockProps = {
      closeDock: this.closeDock,
      visible: this.state.dockVisible,
      currentId: this.state.currentId
    }

    return (
      <div>
        <Table
          style={{backgroundColor: '#fcfcfc'}}
          columns={columns}
          dataSource={dataSource}
          loading={this.state.loading}
          bordered={true}
          pagination={false}
          onRowClick={this.rowClick}
          // scroll={{ y: 240 }} // 固定表头
          rowSelection={{onChange: this.onSelectChange}} // 打开选择框
        />

        <Pagination
          defaultCurrent={this.state.page}
          total={50}
          // defaultPageSize={20}
          // showSizeChanger
          // onShowSizeChange={this.pageShowSizeChange}
          showQuickJumper
          onChange={this.pageChange}
          // showTotal={total => `Total ${total} items`}
          // simple
          // showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        />

        <Dock
          isVisible={this.state.dockVisible}
          position="right" // 位置
          dimMode="none" // 遮罩层
          dockStyle={{backgroundColor: '#f4f5f6',
                      padding: '20px 0px',
                      textAlign: 'center'}} // 背景
          fluid={true}
          defaultSize={.5} // 初始 width/height
          duration={350} // 动画时间
          zIndex={1}
        >
        {this.state.editMyCustomerInfo &&
          <this.state.editMyCustomerInfo {...dockProps}/>
        }
        </Dock>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    editDock: store.common.editDock.data
  }
}

export default connect(mapStateToProps)(MyCustomer);
