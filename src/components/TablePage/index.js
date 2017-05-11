import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { Table, Pagination, Spin, Button, Icon, message, Modal } from 'antd';
import Dock from 'react-dock';
import './indexStyle.less';

import ajax from '../../tools/POSTF';
import axios from 'axios';
import API from '../../../API';

import {
  saveCurrentCustomerInfo,
  createCustomer,
  resetCustomerInfo,
  resetBeEditArray
} from '../../redux/actions/customerAction';

// let uuid = 1000;

class TablePage extends Component {
  // static propTypes = {
  //   editDock: PropTypes.object
  // };

  state = {
    uuid: 1000,

    selectedRowKeys: [], // 被选中的 row
    selectedCustomers: [],

    dockVisible: false, // slide visible
    modalVisible: false,
    dockContent: '',
    CustomerSlider: '', // 异步加载组件
    BatchParticipate: '',
    ImportCustomers: '',

    currentCustomer: {},
    temporary: {},
    currentId: '', // 当前用户的 id
    clientType: '个人客户', // 客户类型
    mode: 'create', // 模式
    step: 1, // 步骤
    customerName: '',
    batchProcessing: false,

    changeId: false,
    onlyCloseModal: false,

    addCustomerPrivilege: false // 添加客户的权限
  };

  componentWillMount() {
    console.log('%c/ TablePage /_____will mount', 'color: red');

    // 异步加载 edit component
    require.ensure([],() => {
      let CustomerSlider = require('../../Pages/Subview/CustomerSlider').default;
      let BatchParticipate = require('./widget/BatchParticipate').default;
      let ImportCustomers = require('./widget/ImportCustomers').default;
      this.setState({
        CustomerSlider: CustomerSlider,
        BatchParticipate: BatchParticipate,
        ImportCustomers: ImportCustomers
      })
    }, 'CustomerSlider');

    let permissions = {permissions:['system:user:add']}
    ajax.Post(API.POST_PRIVILEGE_COMMON, permissions)
        .then((res) => {
          this.setState({
            addCustomerPrivilege: res.data.data['system:user:add']
          })
        })
  }

  componentWillReceiveProps(next) {
    // console.log(this.state.uuid)
  }

  // 点击某一栏，编辑客户信息
  rowClick = (info) => {
    const { dockVisible, uuid } = this.state;
    const { dispatch, privilege, currentCustomer } = this.props;
    const mode = privilege[info.id]['system:update'] ? 'edit' : 'view';
    const beEditedArray = currentCustomer.beEditedArray;

    // 如果前一个客户的信息被编辑之后，未被保存，切换客户，则显示弹窗
    if(beEditedArray && beEditedArray.length !== 0 && currentCustomer.id !== info.id) {
      // 当数组被编辑并且当前的 id不同于被点击的 id，重新渲染页面
      let newState = update(this.state, {
        dockContent: {$set: this.state.CustomerSlider},
        onlyCloseModal: {$set: false},
        temporary: {$set: info},
        modalVisible: {$set: true}
      })
      this.setState(newState);
    } else if(currentCustomer.id === info.id && beEditedArray && beEditedArray.length === 0 && !dockVisible) {
      // 当点击同一行并且当前的 dock处于被关闭状态，
      // 则 uuid+1，并且重新发一个 action改回原来的姓名
      let newState = update(this.state, {
        dockContent: {$set: this.state.CustomerSlider},
        temporary: {$set: info},
        dockVisible: {$set: true},
        // uuid: {$set: this.state.uuid + 1}
      })
      this.setState(newState);
      dispatch(saveCurrentCustomerInfo(info, mode))
    } else if(currentCustomer.id === info.id && beEditedArray && beEditedArray.length !== 0){
      // 当前的 id被编辑之后，点击相同的一行，不触发重新渲染
      let nextStepState = update(this.state, {
        dockVisible: {$set: true},
      })
      this.setState(nextStepState);
    } else if(currentCustomer.id !== info.id) {
      // 如果当前 id不一样，则 uuid不 +1
      let newState = update(this.state, {
        dockContent: {$set: this.state.CustomerSlider},
        mode: {$set: mode},
        onlyCloseModal: {$set: false},
        dockVisible: {$set: true},
        currentCustomer: {$set: info},
        // uuid: {$set: this.state.uuid + 1}
      })

      this.setState(newState);
      dispatch(saveCurrentCustomerInfo(info, mode))
    } else {
      // 判断 dock是否显示，若未显示，则弹出 slider
      let newState = update(this.state, {
        dockContent: {$set: this.state.CustomerSlider},
        mode: {$set: mode},
        onlyCloseModal: {$set: false},
        dockVisible: {$set: true},
        currentCustomer: {$set: info},
        // uuid: {$set: this.state.uuid + 1}
      })

      this.setState(newState);
      dispatch(saveCurrentCustomerInfo(info, mode))
    }
  }

  // not save the be edited info
  confirmNotSave = () => {
    /*
    ** 场景一，点击关闭 slider，点击放弃保存按钮，隐藏 dock和 modal
    ** 场景二，客户信息被编辑后，切换客户，点击放弃保存按钮，隐藏 modal，显示心的客户信息
    */
    const { mode, currentCustomer, onlyCloseModal } = this.state;
    const { dispatch } = this.props;
    const { id, beEditedArray } = this.props.currentCustomer;

    let newState;
    if(onlyCloseModal) { // 关闭 modal和 dock
      newState = update(this.state, {
        modalVisible: {$set: false},
        dockVisible: {$set: false},
        // uuid: {$set: this.state.uuid + 1}
      })
      dispatch(resetBeEditArray());

    } else if(beEditedArray && beEditedArray.length !== 0) { // 仅关闭 modal,
      newState = update(this.state, {
        currentCustomer: {$set: this.state.temporary},
        modalVisible: {$set: false},
        // uuid: {$set: this.state.uuid + 1}
      })

      dispatch(saveCurrentCustomerInfo(this.state.temporary, mode))
    }

    this.setState(newState);
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
    // slider visible and row click crrentId

    let newState = update(this.state, {
      dockContent: {$set: this.state.CustomerSlider},
      dockVisible: {$set: true}
    })
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

  // // 获取被选中的 row的 Id，打印当前的 Id
  customerChange = (selectedRowKeys) => {
    let newState = {
      selectedRowKeys: selectedRowKeys
    }

    // if(selectedRowKeys.length === 0) {
    //   newState.batchProcessing = false
    // } else {
    //   newState.batchProcessing = true
    // }

    this.setState(newState)
  }

  // 选择客户
  selectCustomers = (record, selected, selectedRows) => {
    let newState = update(this.state, {
      selectedCustomers: {$set: selectedRows}
    })

    this.setState(newState);
  }

  // 选择所有客户
  selectAllCustomers = (selected, selectedRows, changeRows) => {
    let newState = update(this.state, {
      selectedCustomers: {$set: selectedRows}
    })

    this.setState(newState);
  }

  // 更新 customers lists的数据
  changeCustomersLists = (customer) => {
    let newState = update(this.state, {
      selectedCustomers: {$set: this.state.selectedCustomers.filter(item => item.id !== customer.id)}
    })

    this.setState(newState);
  }

  // 批量参加
  batchParticipate = () => {
    const { dispatch } = this.props;
    dispatch(resetCustomerInfo());

    this.setState({
      dockContent: this.state.BatchParticipate,
      dockVisible: true
    })
  }

  // 批量关注
  batchFocus = () => {
    message.success('关注成功');
  }

  // 批量关注
  batchUnfocus = () => {
    message.success('取关成功');
  }

  // 批量关注
  batchTrans = () => {
    message.success('转移成功');
  }

  // Import Customers
  importCustomersLists = () => {
    // 判断 dock是否显示，若未显示，则弹出 slider
    let newState = {
      dockContent: this.state.ImportCustomers,
    }

    if(!this.state.dockVisible ) {
      newState.dockVisible = true;
    }
    this.setState(newState);
  }

  render(){
    const { columns, dataSource, loading, pagination, refreshCustomerLists } = this.props;
    const { selectedCustomers } = this.state;
    const selectedRowKeys = selectedCustomers.map(item => item.id);

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
        selectedRowKeys,
        onChange: this.customerChange,
        onSelect: this.selectCustomers,
        onSelectAll: this.selectAllCustomers
      }, // 打开选择框
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

    // sliderProps
    const sliderProps = {
      showModal: this.showModal,
      closeDock: this.closeDock,
      onlyModalClose: this.onlyModalClose,
      visible: this.state.dockVisible,
      refreshCustomerLists: this.props.refreshCustomerLists,
      uuid: this.state.uuid
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
      defaultSize: .48, // 初始 width/height
      duration: 500, // 动画时间
      zIndex: 100,
    }

    const batchProps = {
      changeCustomersLists: this.changeCustomersLists,
      selectedCustomers: this.state.selectedCustomers,
      closeDock: this.closeDock
    }

    const importCustomersProps = {
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

        {this.state.selectedCustomers.length !== 0 &&
          <ul
            className={this.state.selectedCustomers.length !== 0 ? "batchProcessing batchProcessingActive" : "batchProcessing"}
          >
            <p>
              <Icon type=""/>
              <span>已选</span>
              <span className="counter">{selectedCustomers.length}</span>
              <span>位客户</span>
            </p>
            <li onClick={this.batchFocus}>
              <Icon type=""/>
              <span>批量关注</span>
            </li>
            <li onClick={this.batchParticipate}>
              <Icon type=""/>
              <span>批量参与</span>
            </li>
            <li onClick={this.batchUnfocus}>
              <Icon type=""/>
              <span>取消关注</span>
            </li>
            <li  onClick={this.batchTrans}>
              <Icon type=""/>
              <span>批量转移</span>
            </li>
          </ul>
        }

        {this.state.addCustomerPrivilege &&
          <header id="customerTableHeader">
            <Button
              className="addNewCustomer"
              type="primary"
              onClick={this.addNewCustomer}
            >
              <Icon type="plus" />
              <span>新建客户</span>
            </Button>
            <Button onClick={this.importCustomersLists}>
              <Icon type="download" />
              <span>导入客户</span>
            </Button>
          </header>
        }

        <Table {...tableProps} />

        <Pagination {...pageProps} />

        <div className="slider">
          <Dock {...dockProps}>
            {this.state.dockContent !== '' &&
              <this.state.dockContent
                {...batchProps}
                {...sliderProps}
                {...importCustomersProps}
              />
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
