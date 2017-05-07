import React, { Component } from 'react';
import {
  Tabs,
  Form,
  Select,
  message
} from 'antd';
import moment from 'moment';
import $ from 'jquery';
import axios from 'axios';
import update from "immutability-helper";
import _ from 'lodash';
import { connect } from 'react-redux';
import API from '../../../../API';
import ajax from '../../../tools/POSTF';
import {
  createCustomerSuccess,
  increaseBeEditArray,
  decreaseBeEditArray,
  editCustomerSuccess
} from '../../../redux/actions/customerAction';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
import './indexStyle.less';
import AddMaintainRecord from './widget/AddMaintainRecordForm'
import MaintainRecord from './widget/MaintainRecord'

import ViewBriefBasicInfo from './widget/Form/ViewBriefBasicInfo'
import ViewDetailsBasicInfo from './widget/Form/ViewDetailsBasicInfo'
import EditBriefBasicInfo from './widget/Form/EditBriefBasicInfo'
import EditDetailsBasicInfo from './widget/Form/EditDetailsBasicInfo'

import BasicInfoEdit from './widget/BasicInfoEdit'
import AddCrewModal from './widget/AddCrewModal'

function info(msg,color){
  console.log('%c'+msg,'color:'+color);
}

//个人信息表单................
class BasicInfo extends Component {
  state = {
    eachCustomerInfo: '',
    modalVisible: false,
    edited: false,

    joinersBeEdited: false,
    joiners: [],

    accountsArr: ['row-0'],
    accounts: {},
    // originAccountsArr: ['row-0'],
    originAccounts: {},
    briefInfo: {
      department: {
        value: '',
        options: []
      },
      manager: {
        value: '',
        options: []
      },
      grid: {
        value: '',
        options: []
      },
      phone: {
        value: ''
      },
      wechat: {
        value: ''
      },
      certificate: {
        value: ''
      },
      birth: {
        value: null
      },
      origin: {
        value: ''
      },
      age: {
        value: ''
      },
      address: {
        value: ''
      },
      tags: [],
    },
    detailsInfo: {
      yearIncome: {
        // value: ''
      },
      yearExpense: {
        // value: ''
      },
      marryStatus: {
        // value: '',
        options: []
      },
      houseType: {
        // value: '',
        options: []
      },
      withCar: {
        // value: '',
        options: []
      },
      carPrice: {
        // value: '',
        options: []
      },
      withDebt: {
        // value: '',
        options: []
      },
      debtAmount: {
        // value: '',
        options: []
      },
      needLoan: {
        // value: '',
        options: []
      },
      loanAmount: {
        // value: '',
        options: []
      },
      loanPurpose: {
        // value: '',
        options: []
      },
    },
    commonDropDown:{}
  }

  // modal Show
  modalShow = () => {
    this.setState({
      modalVisible: true
    })
  }

  // modal hide
  modalHide = () => {
    let newState = update(this.state, {
      modalVisible: {$set: false}
    })

    this.setState(newState);
    return newState;
  }

  componentWillMount(){
    info('basicInfo will mount');
    this.getBaseInfo(this.props.currentCustomerInfo.id);

    const commonDropDownType = [
      'marryStatus',
      'houseType',
      'withCar',
      'carPrice',
      'withDebt',
      'debtAmount',
      'needLoan',
      'loanAmount',
      'loanPurpose'
    ];

    commonDropDownType.map(item => {
      ajax.Get(API.GET_COMMON_DROPDOWN(item))
      .then((res) => {
        let newState = update(this.state, {
          detailsInfo: {
            [item]: {
              options: {$set: res.data.data}
            }
          }
        })

        this.setState(newState);
      })
    });
  }

  componentWillReceiveProps(next){
    // info('basicInfo will receive props.');
    // 当前的客户 id发生变化时，或者当前用户的信息 beEditedNumber === true时，重置 state
    const { id, beEditedArray } = this.props.currentCustomerInfo;
    if(id !== next.currentCustomerInfo.id || (next.currentCustomerInfo.beEditedArray && next.currentCustomerInfo.beEditedArray.length === 0) ) {
      console.log('get info');
      this.getBaseInfo(next.currentCustomerInfo.id);
      // this.resetAccounts();
    }

    // 重置 joinersBeEdited
    if(beEditedArray && beEditedArray.length !== 0) {
      this.setState({
        joinersBeEdited: false
      })
    }
  }

  // reset accounts
  resetAccounts = () => {
    let originAccounts = _.cloneDeep(this.state.originAccounts);
    let accountsArr = _.cloneDeep(this.state.accountsArr);

    this.setState({
      originAccounts: originAccounts,
      accountsArr: accountsArr
    });
  };

  // 获取客户基本信息
  getBaseInfo = (id) => {
    if(id !== -1) {
      ajax.Get(API.GET_CUSTOMER_BASE(id))
      .then((res) => {
        const dateFormat = 'YYYY-MM-DD'; // 日期格式
        const commonDropDownType = [
          'marryStatus',
          'houseType',
          'withCar',
          'carPrice',
          'withDebt',
          'debtAmount',
          'needLoan',
          'loanAmount',
          'loanPurpose'
        ];
        commonDropDownType.map(item => {
          // 判断对应的值是否为 null
          if(res.data.data[item] !== null) {
            let newState = update(this.state, {
              detailsInfo: {
                [item]: {
                  value: {$set: res.data.data[item] + ''}
                },
              }
            })
            return this.state = newState; // 将 newState赋值给原先的 state

            if(item === commonDropDownType[commonDropDownType.length - 1]) {
              this.setState(newState);
            }
          } else {
            // 当该属性的 value为 null的时候，且该对象的属性发生了变化
            // 删除 detailsInfo中的 value属性
            if(this.state.detailsInfo[item].value) {
              delete this.state.detailsInfo[item].value
            }
          }
        })

        // 客户账户
        let accounts = res.data.data.accounts.map((item,index) => ({
          [`row-${index}-accountNo`]: {value: item.accountNo},
          [`row-${index}-remark`]: {value: item.remark}
        }));

        let accountsArr = res.data.data.accounts.map((item,index) => `row-${index}`);

        // 展平 accounts
        const accountsObj = accounts.reduce((pre, next) => {
          return {
            ...pre,
            ...next
          }
        },{});
        let originAccounts = _.cloneDeep(accountsObj);

        this.setState({
          accounts: accountsObj,
          originAccounts: originAccounts,
          accountsArr: accountsArr
        });

        // 更新 briefInfo, detailsInfo, eachCustomerInfo
        let newJoiners = _.cloneDeep(res.data.data.joiners);
        let newState = update(this.state, {
          joiners: {$set: res.data.data.joiners},
          briefInfo: {
            department: {
              $set: {
                // options: this.state.briefInfo.department.options,
                value: res.data.data.department + ''
              }
            },
            manager: {
              $set: {
                // options: this.state.briefInfo.manager.options,
                value: res.data.data.manager != null ? res.data.data.manager + '' : undefined
              }
            },
            grid: {
              $set: {
                // options: this.state.briefInfo.grid.options,
                value: res.data.data.grid != null ? res.data.data.grid + '' : undefined
              }
            },
            phone: {
              $set: {
                value: res.data.data.phone
              }
            },
            wechat: {
              $set: {
                value: res.data.data.wechat
              }
            },
            certificate: {
              $set: {
                value: res.data.data.certificate
              }
            },
            birth: {
              $set: {
                value: res.data.data.birth != null ? moment(res.data.data.birth, dateFormat) : undefined
              }
            },
            origin: {
              $set: {
                value: res.data.data.origin
              }
            },
            age: {
              $set: {
                value: res.data.data.age
              }
            },
            address: {
              $set: {
                value: res.data.data.address
              }
            },
            tags: {
              $set: newJoiners
            }
          },
          detailsInfo: {
            yearIncome: {
              value: {
                $set: res.data.data.yearIncome
              }
            },
            yearExpense: {
              value: {
                $set: res.data.data.yearExpense
              }
            },
          },
          eachCustomerInfo: {$set: res.data.data}
        });
        this.setState(newState);
      })
    }
  }

  // 新建/编辑客户
  addNewCustomer = (briefInfo) => {
    const { name, id } = this.props.currentCustomerInfo;
    const dateFormat = 'YYYY-MM-DD'; // 日期格式

    console.log(briefInfo);

    let joiners = this.state.briefInfo.tags.map(item => item.id);

    // let json = {
    //   accounts: [
    //     {
    //       accountNo: '7654321',
    //       priority: 1,
    //       remark: '工商银行'
    //     },
    //     {
    //       accountNo: '62227',
    //       priority: 2,
    //       remark: '工商银行'
    //     }
    //   ],
    //   address: briefInfo.address ? briefInfo.address : '',
    //   birth: briefInfo.birth != null ? moment(briefInfo.birth).format(dateFormat) : '',
    //   certificate: briefInfo.certificate ? briefInfo.certificate : '',
    //   department: briefInfo.department ? briefInfo.department - 0 : '',
    //   grid: briefInfo.grid ? briefInfo.grid - 0 : '',
    //   joinerIds: joiners ? joiners : '',
    //   manager: briefInfo.manager ? briefInfo.manager - 0 : '',
    //   name: name ? name : '',
    //   origin: briefInfo.origin ? briefInfo.origin : '',
    //   phone: briefInfo.phone	? briefInfo.phone : '',
    //   wechat: briefInfo.wechat ? briefInfo.wechat : '',
    // }

    // 如果 id不存在，则调用创建用户接口
    // if(id === -1) {
    //   ajax.PostJson(API.POST_CUSTOMER_INDIVIDUAL_BASE, json).then((res) => {
    //     if(res.message === 'OK') {
    //       message.success('创建用户成功');
    //       this.props.createCustomerSuccess(res.data);
    //       this.props.decreaseBeEditArray('basicInfo');
    //     } else {
    //       message.error(res.message);
    //     }
    //   });
    // } else {
    //   ajax.PutJson(API.PUT_CUSTOMER_INDIVIDUAL_BASE_TAB1(id), json).then((res)=>{
    //     if(res.message === 'OK') {
    //       message.success('编辑用户成功');
    //       this.props.decreaseBeEditArray('basicInfo');
    //     } else {
    //       message.error(res.message);
    //     }
    //   })
    // }
  }

  // update customer info
  updateCustomerInfo = (detailsInfo) => {
    const { name, id } = this.props.currentCustomerInfo;
    const {
      carPrice,
      debtAmount,
      houseType,
      loanAmount,
      loanPurpose,
      marryStatus,
      needLoan,
      withCar,
      withDebt,
      yearExpense,
      yearIncome,
    } = detailsInfo;

    let json = {
      carPrice: carPrice != undefined ? carPrice - 0 : '',
      debtAmount: debtAmount != undefined ? debtAmount - 0 : '',
      houseType: houseType != undefined ? houseType - 0 : '',
      loanAmount: loanAmount != undefined ? loanAmount - 0 : '',
      loanPurpose: loanPurpose != undefined ? loanPurpose - 0 : '',
      marryStatus: marryStatus != undefined ? marryStatus - 0 : '',
      needLoan: needLoan != undefined ? needLoan - 0 : '',
      withCar: withCar != undefined ? withCar - 0 : '',
      withDebt: withDebt != undefined ? withDebt - 0 : '',
      yearExpense: yearExpense != null && yearExpense != '' ? yearExpense - 0 : '',
      yearIncome: yearIncome != null && yearIncome != '' ? yearIncome - 0 : '',
    }

    if(id === -1) {
      message.error('请先创建用户');
    } else {
      ajax.PutJson(API.PUT_CUSTOMER_INDIVIDUAL_BASE_TAB2(id), json).then((res)=>{
        if(res.message === 'OK') {
          message.success('编辑用户成功');
          this.props.decreaseBeEditArray('detailsInfo');
        } else {
          message.error(res.message);
        }
      })
    }
  }

  // 表单数据的双向绑定
  handleFormChange = (changedFields) => {
    const { beEditedNumber } = this.props.currentCustomerInfo;

    // console.log(changedFields);
    // 所属机构，客户经理，所属网格三级联动
    let briefInfo;
    if(changedFields.department) {
      briefInfo = {
        ...this.state.briefInfo,
        ...changedFields,
        ...{manager: {
          value: undefined
        }},
        ...{grid: {
          value: undefined
        }}
      }
    } else {
      briefInfo = {
        ...this.state.briefInfo,
        ...changedFields
      }
    }

    let detailsInfo;
    // 是否有车
    if(changedFields.withCar) {
      detailsInfo = {
        ...this.state.detailsInfo,
        ...changedFields,
        ...{carPrice: {
          value: undefined,
          options: this.state.detailsInfo.carPrice.options
        }}
      }
    } else if(changedFields.withDebt) { // 是否负债
      detailsInfo = {
        ...this.state.detailsInfo,
        ...changedFields,
        ...{debtAmount: {
          value: undefined,
          options: this.state.detailsInfo.debtAmount.options
        }}
      }
    } else if(changedFields.needLoan) { // 是否有贷款需求
      detailsInfo = {
        ...this.state.detailsInfo,
        ...changedFields,
        ...{loanAmount: {
          value: undefined,
          options: this.state.detailsInfo.loanAmount.options
        }},
        ...{loanPurpose: {
          value: undefined,
          options: this.state.detailsInfo.loanPurpose.options
        }}
      }
    } else {
      detailsInfo = {
        ...this.state.detailsInfo,
        ...changedFields
      }
    }

    let accounts = {
      ...this.state.accounts,
      ...changedFields
    }

    let newState = update(this.state,{
      accounts: {$set: {...accounts}},
      briefInfo: {$set: {...briefInfo}},
      detailsInfo: {$set: {...detailsInfo}}
    })
    this.setState(newState);
  }

  // change joiners
  changeJoiners = (joiner) => {
    // console.log(joiner);
    const { tags } = this.state.briefInfo;
    const newJoiners = tags.filter(item => item.id !== joiner.id);
    let newState = update(this.state, {
      briefInfo: {
        tags: {$set: newJoiners}
      }
    })
    this.setState(newState);
  };

  // 重置参与人员
  resetJoiners = (state) => {
    let st = state || this.state;
    let newJoiners = _.cloneDeep(st.joiners);
    // console.log(newJoiners);
    // console.log(state);
    let newState = update(st, {
      briefInfo: {
        tags: {$set: newJoiners}
      }
    })
    this.setState(newState);
    return newState
  }

  // 参与人员被修改了
  joinersBeModified = () => {
    const { beEditedArray } = this.props.currentCustomerInfo;

    if(!this.state.joinersBeEdited && beEditedArray && !beEditedArray.includes('basicInfo')) {
      this.props.increaseBeEditArray('basicInfo');
      this.setState({
        joinersBeEdited: true
      })
    }
  }

  // 删除对应的 accounts字段
  deleteAccountsInfo = (row) => {
    const newState= _.cloneDeep(this.state.accounts) ;

    delete newState[`${row}-accountNo`];
    delete newState[`${row}-remark`];
    this.setState({
      accounts: newState
    })
  }

  // 新建 accounts字段
  addAccountsInfo = (key) => {
    const { accounts } = this.state;

    this.setState({
      accounts: {
        ...accounts,
        [`row-${key}-accountNo`]: {
          value: ''
        },
        [`row-${key}-remark`]: {
          value: ''
        },
      }
    })
  }

  render() {
    const {
      customerInfoBeEdit,
      increaseBeEditArray,
      decreaseBeEditArray
    } = this.props;
    const { step, mode, id, beEditedArray } = this.props.currentCustomerInfo;
    const {
      modalVisible,
      eachCustomerInfo,
      edited,
      detailsInfo,
      briefInfo,
      joiners,
      joinersBeEdited,
      accountsArr,
      accounts,
      originAccounts
    } = this.state;

    const modal = {
      // modal
      visible: modalVisible,
      hide: this.modalHide,

      // brief info
      id: id,
      staffs: briefInfo.tags,

      // joiners
      changeJoiners: this.changeJoiners,
      resetJoiners: this.resetJoiners,
      joinersBeModified: this.joinersBeModified,
    };

    const basicInfoProps = {
      // brief info
      id: id,
      beEditedArray: beEditedArray,
      increaseBeEditArray: increaseBeEditArray,
      decreaseBeEditArray: decreaseBeEditArray,
      addNewCustomer: this.addNewCustomer,
      updateCustomerInfo: this.updateCustomerInfo,
      eachCustomerInfo: eachCustomerInfo,

      // modal
      modalShow: this.modalShow,

      // joiners
      joiners: joiners,
      changeJoiners: this.changeJoiners,
      joinersBeEdited: joinersBeEdited,

      // accounts
      accounts: accounts,
      accountsArr: accountsArr,
      deleteAccountsInfo: this.deleteAccountsInfo,
      addAccountsInfo: this.addAccountsInfo
    }

    const maintainRecordProps = {
      mode: mode
    }

    return(
      <div style={{textAlign: 'left'}}>
        <AddCrewModal key={id} {...modal}/>

        <div className="">
          {mode && mode === 'view' &&
            <div>
              <ViewBriefBasicInfo
                briefInfo={briefInfo}
                {...basicInfoProps}
              />
              <ViewDetailsBasicInfo
                detailsInfo={detailsInfo}
                {...basicInfoProps}
              />
            </div>
          }

          {mode && mode !== 'view' &&
            <div>
              <EditBriefBasicInfo
                briefInfo={briefInfo}
                {...basicInfoProps}
                onChange={this.handleFormChange}
              />
              <EditDetailsBasicInfo
                detailsInfo={detailsInfo}
                {...basicInfoProps}
                onChange={this.handleFormChange}
              />
            </div>
          }
        </div>

        <div className="maintain">
          <Tabs>
            <TabPane tab="维护记录" key="basicInfo" className="tab01">
              {mode && mode !== 'view' &&
                <AddMaintainRecord />
              }
              <MaintainRecord {...maintainRecordProps}/>
            </TabPane>
            <TabPane tab="操作记录" key="familyInfo" className="tab02">
              <div className="history">
                <div><span>王祎</span><span> 编辑了客户手机号 </span></div>
                <p>2017/03/10 13:40:23</p>
              </div>
              <div className="history">
                <div><span>王祎</span><span> 编辑了客户手机号 </span></div>
                <p>2017/03/10 13:40:23</p>
              </div>
              <div className="history">
                <div><span>王祎</span><span> 编辑了客户手机号 </span></div>
                <p>2017/03/10 13:40:23</p>
              </div>
              <div className="history">
                <div><span>王祎</span><span> 编辑了客户手机号 </span></div>
                <p>2017/03/10 13:40:23</p>
              </div>
              <div className="history">
                <div><span>王祎</span><span> 编辑了客户手机号 </span></div>
                <p>2017/03/10 13:40:23</p>
              </div>

            </TabPane>
            <TabPane tab="修改记录" key="jobInfo" className="tab03">
                <div className="history">
                <div><span>王祎</span><span> 修改了客户手机号 </span></div>
                <p>2017/03/10 13:40:23</p>
              </div>
              <div className="history">
                <div><span>王祎</span><span> 修改了客户手机号 </span></div>
                <p>2017/03/10 13:40:23</p>
              </div>
              <div className="history">
                <div><span>王祎</span><span> 修改了客户手机号 </span></div>
                <p>2017/03/10 13:40:23</p>
              </div>
              <div className="history">
                <div><span>王祎</span><span> 修改了客户手机号 </span></div>
                <p>2017/03/10 13:40:23</p>
              </div>
              <div className="history">
                <div><span>王祎</span><span> 修改了客户手机号 </span></div>
                <p>2017/03/10 13:40:23</p>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (store) => {
  return {
    currentCustomerInfo: store.customer.currentCustomerInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCustomerSuccess:(id) => {dispatch(createCustomerSuccess(id))},
    increaseBeEditArray: (item) => {dispatch(increaseBeEditArray(item))},
    decreaseBeEditArray: (item) => {dispatch(decreaseBeEditArray(item))},
    editCustomerSuccess: () => {dispatch(editCustomerSuccess())},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BasicInfo);
