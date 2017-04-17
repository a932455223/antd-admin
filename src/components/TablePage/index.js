import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
import { Table, Pagination, Spin } from 'antd';
import Dock from 'react-dock';

class TablePage extends Component {
  // const propTypes = {
  //   editDock: PropTypes.object
  // };

  state = {
    selectedRowKeys: [],
    dockVisible: false,
    editMyCustomerInfo: '',
    currentId: ''
  };

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
    });
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
      let editMyCustomer = require('../../Pages/Subview/CustomerSlider').default;

      setTimeout(() => {
        this.setState({
          editMyCustomerInfo: editMyCustomer,
          currentId: info.id
        })
      }, 300)
    }, 'CustomerSlider');
  };

  // close Dock
  closeDock = () => {
    this.setState({
      dockVisible: false
    })
  };

  render(){
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

    const { columns, dataSource, loading, page } = this.props

    return (
      <div>
        <Table
          style={{backgroundColor: '#fcfcfc'}}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          bordered={true}
          pagination={false}
          onRowClick={this.rowClick}
          // scroll={{ y: 240 }} // 固定表头
          rowSelection={{onChange: this.onSelectChange}} // 打开选择框
        />

        <Pagination
          defaultCurrent={page}
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

// const mapStateToProps = (store) => {
//   return {
//     editDock: store.common.editDock.data
//   }
// }

// export default connect(mapStateToProps)(TablePage);
export default TablePage;
