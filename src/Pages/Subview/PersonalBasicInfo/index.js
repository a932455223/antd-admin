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
    id: '',

    eachCustomerInfo: '',
    modalVisible: false,

    joinersBeEdited: false,
    joiners: [],
    staffs: [],

    accountsArr: ['row-0'],
    accounts: {},
    originAccountsArr: ['row-0'],
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
      }
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

    ajax.all([
      ajax.Get(API.GET_COMMON_DROPDOWN('marryStatus')),
      ajax.Get(API.GET_COMMON_DROPDOWN('houseType')),
      ajax.Get(API.GET_COMMON_DROPDOWN('withCar')),
      ajax.Get(API.GET_COMMON_DROPDOWN('carPrice')),
      ajax.Get(API.GET_COMMON_DROPDOWN('withDebt')),
      ajax.Get(API.GET_COMMON_DROPDOWN('debtAmount')),
      ajax.Get(API.GET_COMMON_DROPDOWN('needLoan')),
      ajax.Get(API.GET_COMMON_DROPDOWN('loanAmount')),
      ajax.Get(API.GET_COMMON_DROPDOWN('loanPurpose'))
    ]).then((res)=>{
      let newState = update(this.state, {
        detailsInfo: {
          marryStatus: {
            options: {$set: res[0].data.data}
          },
          houseType: {
            options: {$set: res[1].data.data}
          },
          withCar: {
            options: {$set: res[2].data.data}
          },
          carPrice: {
            options: {$set: res[3].data.data}
          },
          withDebt: {
            options: {$set: res[4].data.data}
          },
          debtAmount: {
            options: {$set: res[5].data.data}
          },
          needLoan: {
            options: {$set: res[6].data.data}
          },
          loanAmount: {
            options: {$set: res[7].data.data}
          },
          loanPurpose: {
            options: {$set: res[8].data.data}
          }
        }
      });
      this.setState(newState);
    })
  }

  componentWillReceiveProps(next){
    info('basicInfo will receive props.');
    // 当前的客户 id发生变化时，或者当前用户的信息 beEditedNumber === true时，重置 state
    const { id, beEditedArray } = this.props.currentCustomerInfo;
    if(id !== next.currentCustomerInfo.id ||
      (next.currentCustomerInfo.beEditedArray && next.currentCustomerInfo.beEditedArray.length === 0) ) {
      console.log('get info');
      let newState = this.getBaseInfo(next.currentCustomerInfo.id);
      this.resetAccounts();
    }

    // 重置 joinersBeEdited
    if(beEditedArray && beEditedArray.length !== 0) {
      this.setState({
        joinersBeEdited: false
      })
    }
  }

  // reset accounts
  resetAccounts = (state) => {
    let st = state || this.state;
    const { originAccounts, originAccountsArr } = st;
    let newAccounts = _.cloneDeep(originAccounts);
    let newAccountsArr = _.cloneDeep(originAccountsArr);

    console.log(originAccounts['row-0-accountNo']);

    let newState = update(this.state, {
      accounts: {$set: newAccounts},
      accountsArr: {$set: newAccountsArr}
    })

    this.setState(newState);
    return newState
  }

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
          let newState = update(this.state, {
            detailsInfo: {
              [item]: {
                // 判断对应的值是否为 null
                value: {$set: res.data.data[item] !== null ? res.data.data[item] + '' : undefined}
              },
            }
          })
          return this.state = newState; // 将 newState赋值给原先的 state

          if(item === commonDropDownType[commonDropDownType.length - 1]) {
            this.setState(newState);
          }
        })

        // 客户账户
        let originAccounts = res.data.data.accounts.map((item,index) => ({
          [`row-${index}-accountNo`]: {value: item.accountNo},
          [`row-${index}-remark`]: {value: item.remark}
        }));
        let originAccountsArr = res.data.data.accounts.map((item,index) => `row-${index}`);
        // 展平 accounts
        const originAccountsObj = originAccounts.reduce((pre, next) => {
          return {
            ...pre,
            ...next
          }
        },{});
        let accountsObj = _.cloneDeep(originAccountsObj);
        let accountsArr = _.cloneDeep(originAccountsArr);

        console.log(originAccountsObj['row-0-accountNo']);

        // 更新 briefInfo, detailsInfo, eachCustomerInfo
        let newJoiners = _.cloneDeep(res.data.data.joiners);

        let newState = update(this.state, {
          id: {$set: res.data.data.id},

          accounts: {$set: accountsObj},
          originAccounts: {$set: originAccountsObj},
          originAccountsArr: {$set: originAccountsArr.length !== 0 ? originAccountsArr : ['row-0']},
          accountsArr: {$set: accountsArr.length !== 0 ? accountsArr : ['row-0']},

          joiners: {$set: res.data.data.joiners},
          staffs: {$set: newJoiners},

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
        return newState;
      })
    }
  }

  // 新建/编辑客户
  addNewCustomer = (briefInfo) => {
    const { name, id } = this.props.currentCustomerInfo;
    const { accountsArr } = this.state;
    const dateFormat = 'YYYY-MM-DD'; // 日期格式
    // 参与人数信息
    let joiners = this.state.staffs.map(item => item.id);
    console.log(briefInfo['row-0-accountNo'] == undefined);
    // 账户信息
    let accountsInfo = accountsArr.map((item, index) => {
      return {
        accountNo: briefInfo[`${item}-accountNo`] != undefined ? briefInfo[`${item}-accountNo`] : '',
        priority: index + 1,
        remark: briefInfo[`${item}-remark`] != undefined ? briefInfo[`${item}-remark`] : ''
      }
    })

    let json = {
      accounts: accountsInfo,
      address: briefInfo.address ? briefInfo.address : '',
      birth: briefInfo.birth != null ? moment(briefInfo.birth).format(dateFormat) : '',
      certificate: briefInfo.certificate ? briefInfo.certificate : '',
      department: briefInfo.department ? briefInfo.department - 0 : '',
      grid: briefInfo.grid ? briefInfo.grid - 0 : '',
      joinerIds: joiners ? joiners : '',
      manager: briefInfo.manager ? briefInfo.manager - 0 : '',
      name: name ? name : '',
      origin: briefInfo.origin ? briefInfo.origin : '',
      phone: briefInfo.phone	? briefInfo.phone : '',
      wechat: briefInfo.wechat ? briefInfo.wechat : '',
    }

    console.log(json);

    // 如果 id不存在，则调用创建用户接口
    if(id === -1) {
      ajax.PostJson(API.POST_CUSTOMER_INDIVIDUAL_BASE, json).then((res) => {
        if(res.code === 200) {
          message.success('创建用户成功');
          this.props.createCustomerSuccess(res.data);
          this.props.decreaseBeEditArray('basicInfo');
          this.props.refreshCustomerLists(); // 实时刷新
        } else {
          message.error(res.message);
        }
      });
    } else {
      ajax.PutJson(API.PUT_CUSTOMER_INDIVIDUAL_BASE_TAB1(id), json).then((res)=>{
        if(res.code === 200) {
          message.success('编辑用户成功');
          this.props.decreaseBeEditArray('basicInfo');
          this.props.refreshCustomerLists(); // 实时刷新
        } else {
          message.error(res.message);
        }
      })
    }
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
        if(res.code === 200) {
          message.success('编辑用户成功');
          this.props.decreaseBeEditArray('detailsInfo');
          this.props.refreshCustomerLists(); // 实时刷新
        } else {
          message.error(res.message);
        }
      })
    }
  }

  // 表单数据的双向绑定
  handleFormChange = (changedFields) => {
    const { beEditedNumber } = this.props.currentCustomerInfo;
    let oldDepartment = this.state.briefInfo.department.value;
    let newDepartment = changedFields.department && changedFields.department.value;

    // 所属机构，客户经理，所属网格三级联动
    let briefInfo;
    if(changedFields.department && oldDepartment !== newDepartment) {
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

      // console.dir(briefInfo.manager)
    } else {
      briefInfo = {
        ...this.state.briefInfo,
        ...changedFields
      }
    }

    // console.dir(briefInfo.manager);
    let oldWithCar = this.state.detailsInfo.withCar.value;
    let newWithCar = changedFields.withCar && changedFields.withCar.value;
    let oldNeedLoan = this.state.detailsInfo.needLoan.value;
    let newNeedLoan = changedFields.needLoan && changedFields.needLoan.value;

    let detailsInfo;
    // 是否有车
    if(changedFields.withCar && oldWithCar !== newWithCar) {
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
    } else if(changedFields.needLoan && oldNeedLoan !== newNeedLoan) { // 是否有贷款需求
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
    const { staffs } = this.state;
    const newJoiners = staffs.filter(item => item.id !== joiner.id);
    let newState = update(this.state, {
      staffs: {$set: newJoiners}
    })
    this.setState(newState);
  };

  // 重置参与人员
  resetJoiners = (state) => {
    let st = state || this.state;
    let newJoiners = _.cloneDeep(st.joiners);
    let newState = update(st, {
      staffs: {$set: newJoiners}
    })
    this.setState(newState);
    return newState
  }

  // 参与人员被修改了
  joinersBeModified = (state) => {
    let st = state || this.state;

    if(!st.joinersBeEdited) {
      let newState = update(st, {
        joinersBeEdited: {$set: true}
      })
      this.setState(newState);
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
      increaseBeEditArray,
      decreaseBeEditArray,
      refreshCustomerLists
    } = this.props;
    const { step, mode, beEditedArray } = this.props.currentCustomerInfo;
    const {
      id,
      modalVisible,
      eachCustomerInfo,

      detailsInfo,
      briefInfo,

      staffs,
      joiners,
      joinersBeEdited,

      accountsArr,
      accounts,
      originAccountsArr,
      originAccounts
    } = this.state;
    console.log(accounts['row-0-accountNo']);
    console.log(originAccounts['row-0-accountNo']);

    const modal = {
      // modal
      visible: modalVisible,
      hide: this.modalHide,

      // brief info
      id: id,
      staffs: staffs,

      // joiners
      changeJoiners: this.changeJoiners,
      resetJoiners: this.resetJoiners,
      joinersBeModified: this.joinersBeModified,
    };

    const basicInfoProps = {
      // brief info
      briefInfo: briefInfo,
      detailsInfo: detailsInfo,

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
      staffs: staffs,
      changeJoiners: this.changeJoiners,
      joinersBeEdited: joinersBeEdited,

      // accounts
      accounts: accounts,
      accountsArr: accountsArr,
      deleteAccountsInfo: this.deleteAccountsInfo,
      addAccountsInfo: this.addAccountsInfo,

      onChange: this.handleFormChange
    }

    const maintainRecordProps = {
      mode: mode
    }

    return(
      <div style={{textAlign: 'left'}}>
        <div>
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
              <AddCrewModal key={id} {...modal}/>
              <EditBriefBasicInfo
                key={this.state.eachCustomerInfo ? 'edit'+this.state.eachCustomerInfo.id.toString():'-1'}
                {...basicInfoProps}
              />
              <EditDetailsBasicInfo
                {...basicInfoProps}
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
