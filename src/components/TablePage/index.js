import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { Table, Pagination, Spin, Button, Icon, message, Modal } from 'antd';
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
    modalVisible: false,

    dockContent: 'CustomerSlider',
    CustomerSlider: '', // 异步加载组件
    BatchParticipate: '',

    currentCustomer: {},
    currentId: '', // 当前用户的 id
    clientType: '个人客户', // 客户类型
    mode: 'create', // 模式
    step: 1, // 步骤
    customerName: '',
    batchProcessing: false,

    changeId: false,
    onlyCloseModal: false
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

  // componentWillReceiveProps(next) {
  //   console.log(this.state.changeId)
  // }

  // 点击某一栏，编辑客户信息
  rowClick = (info) => {
    const { dockVisible } = this.state;
    const { dispatch, privilege, currentCustomer } = this.props;
    const mode = privilege[info.id]['system:update'] ? 'edit' : 'view';
    const beEdited = currentCustomer.beEdited;

    // 如果前一个客户的信息被编辑之后，未被保存，切换客户，则显示弹窗
    if(beEdited && dockVisible) {
      let newState = update(this.state, {
        modalVisible: {$set: true}
      })
      this.setState(newState);
    } else {
      dispatch(saveCurrentCustomerInfo(info, mode))
    }

    // 判断 dock是否显示，若未显示，则弹出 slider
    if(!this.state.dockVisible) {
      let newState = update(this.state, {
        dockContent: {$set: 'CustomerSlider'},
        dockVisible: {$set: true}
      })
      this.setState(newState);
    }

    this.setState({
      mode: mode,
      currentCustomer: info,
      onlyCloseModal: false
    });
  }

  // not save the be edited info
  confirmNotSave = () => {
    /*
    ** 场景一，点击关闭 slider，点击放弃保存按钮，隐藏 dock和 modal
    ** 场景二，客户信息被编辑后，切换客户，点击放弃保存按钮，隐藏 modal，显示心的客户信息
    */
    const { mode, currentCustomer, onlyCloseModal } = this.state;
    const { dispatch } = this.props;
    const { id, beEdited } = this.props.currentCustomer;

    if(onlyCloseModal) { // 关闭 modal和 dock
      let newState = update(this.state, {
        modalVisible: {$set: false},
        dockVisible: {$set: false}
      })
      this.setState(newState);
    } else if(beEdited) { // 仅关闭 modal,
      let newState = update(this.state, {
        modalVisible: {$set: false}
      })
      this.setState(newState);
      dispatch(saveCurrentCustomerInfo(currentCustomer, mode))
    }
  }

  // 只关闭 modal
  onlyModalClose = () => {
    let newState = update(this.state, {
      modalVisible: {$set: true},
      onlyCloseModal: {$set: true}
    })
    this.setState(newState);
  }

  // 取消弹窗，回复到上一个信息
  handleCancel = (e) => {
    let newState = update(this.state, {modalVisible: {$set: false}})
    this.setState(newState);
  }

  // close slider
  closeDock = () => {
    let newState = update(this.state, {dockVisible: {$set: false}})
    this.setState(newState);
  }

  // show modal
  showModal = () => {
    let newState = update(this.state, {modalVisible: {$set: true}})
    this.setState(newState);
  }

  // hide modal
  hideModal = () => {
    let newState = update(this.state, {modalVisible: {$set: false}})
    this.setState(newState);
  }

  // add new customer
  addNewCustomer = () => {
    const { dispatch } = this.props;
    let newState = update(this.state, {dockVisible: {$set: true}})
    this.setState(newState);
    dispatch(createCustomer());
  }

  // 切换到 step 2，填写具体的信息
  stepByStep = () => {
    let newState = update(this.state, {step: {$set: 2}})
    this.setState(newState);
  }

  // 添加 customers，获取所传递的参数
  getCustomersBriefInfo = (value) => {
    let newState = update(this.state, {
      clientType: {$set: value.clientType},
      customerName: {$set: value.clientName}
    })
    this.setState(newState);
  }

  // customer创建成功后，修改 mode的状态
  changeModeStatus = () => {
    let newState = update(this.state, {mode: {$set: 'edit'}})
    this.setState(newState);
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
      showModal: this.showModal,
      closeDock: this.closeDock,
      onlyModalClose: this.onlyModalClose,
      visible: this.state.dockVisible
    }

    const batchProps = {
      closeDock: this.closeDock
    }

    return (
      <div className="tablepage" id="tablePage">
        <Modal
          title="警告"
          visible={this.state.modalVisible}
          onOk={this.confirmNotSave}
          onCancel={this.handleCancel}
          okText="放弃保存"
        >
          <p>您已更新了该客户的信息，是否需要保存？</p>
        </Modal>

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
