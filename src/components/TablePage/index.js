import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
import { Table, Pagination, Spin, Button, Icon } from 'antd';
import Dock from 'react-dock';
import './indexStyle.less';

class TablePage extends Component {
  // const propTypes = {
  //   editDock: PropTypes.object
  // };

  state = {
    selectedRowKeys: [], // 被选中的 row
    dockVisible: false, // slide visible
    CustomerSlider: '', // 异步加载组件
    currentId: '', // 当前用户的 id
    clientType: '个人客户', // 客户类型
    mode: 'create', // 模式
    step: 1, // 步骤
    customerName: ''
  };

  componentWillMount() {
    // 异步加载 edit component
    require.ensure([],() => {
      let CustomerSlider = require('../../Pages/Subview/CustomerSlider').default;

      setTimeout(() => {
        this.setState({
          CustomerSlider: CustomerSlider,
          // currentId: info.id
        })
      }, 300)
    }, 'CustomerSlider');
  }

  // 获取被选中的 row的 Id，打印当前的 Id
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({
      selectedRowKeys: selectedRowKeys
    });
  }

  // 分页
  pageShowSizeChange = (current, pageSize) => {
    // console.log(current, pageSize);
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
      mode: 'edit',
      customerName: info.name,
      dockVisible: true,
      currentId: info.id,
      clientType: info.category,
      step: 2
    })
    // const { dispatch, editDock } = this.props;
    // dispatch(showEditDock(true, info.id));

    // 判断被点击的 row和当前的 currentId是否相同，若不相同，则请求加载数据
    // if(info.id !== this.state.currentId) {
    //   this.setState({
    //     CustomerSlider: LoadSpin
    //   })
    // }
    //
    // // 异步加载 edit component
    // require.ensure([],() => {
    //   let editMyCustomer = require('../../Pages/Subview/CustomerSlider').default;
    //
    //   setTimeout(() => {
    //     this.setState({
    //       CustomerSlider: editMyCustomer,
    //       currentId: info.id
    //     })
    //   }, 300)
    // }, 'CustomerSlider');
  }

  // close slider
  closeDock = () => {
    this.setState({
      dockVisible: false
    })
  }

  // add new customer
  addNewCustomer = () => {
    this.setState({
      currentId: -1,
      dockVisible: true,
      step: 1,
      mode: 'create',
      customerName: this.state.customerName,
      clientType: this.state.clientType
    })
  }

  // 切换到 step 2，填写具体的信息
  stepByStep = () => {
    this.setState({
      step: 2
    })
  }

  // 添加 customers，获取所传递的参数
  getCustomersBriefInfo = (value) => {
    this.setState({
      clientType: value.clientType,
      customerName: value.clientName
    })
  }

  // customer创建成功后，修改 mode的状态
  changeModeStatus = () => {
    this.setState({
      mode: 'edit'
    })
  }

  render(){
    const { columns, dataSource, loading, pagination } = this.props;
    // // table 的选择框
    // const rowSelection = {
    //   onChange: this.onSelectChange,
    // };

    // table props lists
    const tableProps = {
      style: {
        backgroundColor: '#fcfcfc'
      },
      columns: columns,
      dataSource: dataSource,
      // scroll: { y: 600 }, // 固定表头
      loading: loading,
      bordered: true,
      pagination: false,
      onRowClick: this.rowClick,
      rowKey: record => record.id,
      // scroll: { y: 240 }, // 固定表头
      rowSelection: {
        onChange: this.onSelectChange
      } // 打开选择框
    }

    // page props lists
    const pageProps = {
      defaultCurrent: 1,
      total: pagination.count ? pagination.count : 0,
      // pageSize: pagination.size ? pagination.size : 10,
      showSizeChanger: true,
      pageSizeOptions: [`${pagination.size}`],
      // onShowSizeChange: this.pageShowSizeChange,
      showQuickJumper: true,
      onChange: this.pageChange,
      // showTotal: total => `Total ${total} items`,
      // simple: true,
      showTotal: (total, range) => `共${total}条`
    }

    // dock props lists
    const dockProps = {
      isVisible: this.state.dockVisible,
      position: "right", // 位置
      dimMode: "none", // 遮罩层
      dockStyle: {
        backgroundColor: '#f4f5f6',
        padding: '20px 0px',
        textAlign: 'center',
        // top: 64
      }, // 背景
      fluid: true,
      defaultSize: .5, // 初始 width/height
      duration: 350, // 动画时间
      zIndex: 100,
    }

    // slider visible and row click crrentId
    const sliderProps = {
      closeDock: this.closeDock,
      visible: this.state.dockVisible,
      currentId: this.state.currentId,
      clientType: this.state.clientType,
      mode: this.state.mode,
      step: this.state.step,
      nextStep: this.stepByStep,
      customerName: this.state.customerName,
      getCustomersBriefInfo: this.getCustomersBriefInfo, // 获取添加人员的 brief info
      changeModeStatus: this.changeModeStatus // 修改 mode的状态
    }

    return (
      <div className="tablepage">
        <header>
          <Button
            className="addNewCustomer"
            type="primary"
            onClick={this.addNewCustomer}
          >
            <Icon type="plus" />新建客户
          </Button>
          <Button>
            更多操作<Icon type="down" />
          </Button>
        </header>

        <Table {...tableProps} />

        <Pagination {...pageProps} />

        <Dock {...dockProps}>
          {this.state.CustomerSlider &&
            <this.state.CustomerSlider {...sliderProps}/>
          }
        </Dock>
      </div>
    )
  }
}

export default TablePage;

// const mapStateToProps = (store) => {
//   return {
//     editDock: store.common.editDock.data
//   }
// }

// export default connect(mapStateToProps)(TablePage);
