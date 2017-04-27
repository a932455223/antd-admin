import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table, Pagination, Spin, Button, Icon, message } from 'antd';
import Dock from 'react-dock';
import './indexStyle.less';

import { saveCurrentCustomerInfo, createCustomer, resetCustomerInfo } from '../../redux/actions/customerAction';

class TablePage extends Component {
  // static propTypes = {
  //   editDock: PropTypes.object
  // };

  state = {
    selectedRowKeys: [], // 被选中的 row
    dockVisible: false, // slide visible

    dockContent: 'CustomerSlider',
    CustomerSlider: '', // 异步加载组件
    BatchParticipate: '',

    currentId: '', // 当前用户的 id
    clientType: '个人客户', // 客户类型
    mode: 'create', // 模式
    step: 1, // 步骤
    customerName: '',
    batchProcessing: false
  };

  componentWillMount() {
    console.log('%c/ TablePage /_____will mount', 'color: red');

    // 异步加载 edit component
    require.ensure([],() => {
      let CustomerSlider = require('../../Pages/Subview/CustomerSlider').default;
      let BatchParticipate = require('./widget/BatchParticipate').default;

      setTimeout(() => {
        this.setState({
          CustomerSlider: CustomerSlider,
          BatchParticipate: BatchParticipate
        })
      }, 300)
    }, 'CustomerSlider');
  }

  // 获取被选中的 row的 Id，打印当前的 Id
  onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    this.setState({
      selectedRowKeys: selectedRowKeys
    });

    if(selectedRowKeys.length === 0) {
      this.setState({
        batchProcessing: false
      })
    } else {
      this.setState({
        batchProcessing: true
      })
    }
  }

  // 点击某一栏，编辑客户信息
  rowClick = (info) => {
    const { dispatch, privilege } = this.props;
    const mode = privilege[info.id]['system:update'] ? 'edit' : 'view';
    dispatch(saveCurrentCustomerInfo(info, mode))
    this.setState({
      dockContent: 'CustomerSlider',
      dockVisible: true,
    });
  }

  // close slider
  closeDock = () => {
    this.setState({
      dockVisible: false
    })
  }

  // add new customer
  addNewCustomer = () => {
    const { dispatch } = this.props;
    this.setState({
      dockVisible: true
    });
    dispatch(createCustomer());
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

  // 批量参加
  batchParticipate = () => {
    const { dispatch } = this.props;
    dispatch(resetCustomerInfo());

    this.setState({
      dockContent: 'BatchParticipate',
      dockVisible: true
    })
  }

  // 批量关注
  batchFocus = () => {
    message.success('关注成功');
  }

  render(){
    const { columns, dataSource, loading, pagination } = this.props;

    // table props lists
    const tableProps = {
      className: 'myTable',
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
      scroll: { y: 1 }, // 固定表头
      rowSelection: {
        onChange: this.onSelectChange
      } // 打开选择框
    }

    // page props lists
    const pageProps = {
      className: 'page',
      defaultCurrent: 1,
      total: pagination.count,
      // showSizeChanger: true,
      pageSizeOptions: [`${pagination.size}`],
      // showQuickJumper: true,
      onChange: this.props.pageChange,
      // simple: true,
      showTotal: (total, range) => `共${total}条`
    }

    // dock props lists
    const dockProps = {
      className: 'slider',
      isVisible: this.state.dockVisible,
      position: "right", // 位置
      dimMode: "none", // 遮罩层
      dockStyle: {
        backgroundColor: '#f4f5f6',
        padding: '13px 18px',
        textAlign: 'center',
        // top: 64
      }, // 背景
      fluid: true,
      defaultSize: .47, // 初始 width/height
      duration: 350, // 动画时间
      zIndex: 100,
    }

    // slider visible and row click crrentId
    const sliderProps = {
      closeDock: this.closeDock,
      visible: this.state.dockVisible
    }

    const batchProps = {
      closeDock: this.closeDock
    }

    return (
      <div className="tablepage" id="tablePage">
        {this.state.batchProcessing &&
          <div
            className={this.state.batchProcessing ? "batchProcessing batchProcessingActive" : "batchProcessing"}
          >
            <Button onClick={this.batchFocus}>批量关注</Button>
            <Button onClick={this.batchParticipate}>批量参与</Button>
            <Button>批量提醒</Button>
            <Button>取消关注</Button>
            <Button>批量转移</Button>
          </div>
        }

        <header id="customerTableHeader">
          <Button
            className="addNewCustomer"
            type="primary"
            onClick={this.addNewCustomer}
          >
            <Icon type="plus" />
            <span>新建客户</span>
          </Button>
          <Button>
            <Icon type="download" />
            <span>导入客户</span>
          </Button>
        </header>

        <Table {...tableProps} />

        <Pagination {...pageProps} />

        <div className="slider">
          <Dock {...dockProps}>
            {this.state.dockContent === 'CustomerSlider' && this.state.CustomerSlider &&
              <this.state.CustomerSlider {...sliderProps}/>
            }
            {this.state.dockContent === 'BatchParticipate' && this.state.BatchParticipate &&
              <this.state.BatchParticipate {...batchProps}/>
            }
          </Dock>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (store) => {
  return {
    currentCustomer: store.customer.currentCustomerInfo
  }
}

export default connect(mapStateToProps)(TablePage);
