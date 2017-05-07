import React, { Component } from 'react';
import update from "immutability-helper";
import {
  Tabs,
  Select,
  Row,
  Col,
  Icon,
  Form,
  InputNumber,
  Input,
  Button,
  Tag,
  DatePicker,
  message
 } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import API from '../../../../API';
import ajax from '../../../tools/POSTF';

import { connect } from 'react-redux';
import {
  createCustomerSuccess,
  increaseBeEditArray,
  decreaseBeEditArray,
} from '../../../redux/actions/customerAction';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
import './indexStyle.less';

import AddMaintainRecord from './widget/AddMaintainRecordForm'
import MaintainRecord from './widget/MaintainRecord'

import ViewBriefBasicInfo from './widget/Form/ViewBriefBasicInfo'
import EditBriefBasicInfo from './widget/Form/EditBriefBasicInfo'

import BasicInfoEdit from './widget/BasicInfoEdit'
import AddCrewModal from '../PersonalBasicInfo/widget/AddCrewModal'

class EnterpriseBasicInfo extends Component {
  state = {
    modalVisible: false,
    // edited: false,

    joinersBeEdited: false,
    joiners: [],
    tags: [],

    accountsArr: [],
    accounts: {},
    originAccounts: {},

    eachCompanyInfo: {
      department: {
        value: ''
      },
      manager: {
        value: ''
      },
      grid: {
        value: ''
      },
      accounts: [],
      registeTime: {
        value: null
      },
      industory: {
        value: ''
      },
      mainBusiness: {
        value: ''
      },
      yearIncome: {
        value: ''
      },
      legalPerson: {
        value: ''
      },
      telephone: {
        value: ''
      },
      staffCount: {
        value: ''
      },
      avgSalary: {
        value: ''
      },
      address: {
        value: ''
      },
      addressCode: {
        value: ''
      }
    }
  }

  componentWillMount(){
    // console.log('will mount');

    this.getBaseInfo(this.props.currentCustomerInfo.id);
  }

  componentWillReceiveProps(next){
    console.log('will recieve props');

    const { id, beEditedArray } = this.props.currentCustomerInfo;
    if(id !== next.currentCustomerInfo.id || (beEditedArray && beEditedArray.length === 0) ) {
      this.getBaseInfo(next.currentCustomerInfo.id);
    }

    // 重置 joinersBeEdited
    if(beEditedArray && beEditedArray.length === 0) {
      this.setState({
        joinersBeEdited: false
      })
    }
  }

  // 获取客户基本信息
  getBaseInfo = (id) => {
    if(id !== -1) {
      ajax.Get(API.GET_CUSTOMER_ENTERPRISE_BASE(5))
      .then((res) => {
        // console.log(res.data.data)
        const dateFormat = 'YYYY-MM-DD'; // 日期格式

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

        let newJoiners = _.cloneDeep(res.data.data.joiners);
        let newState = update(this.state, {
          accounts: {$set: accountsObj},
          originAccounts: {$set: originAccounts},
          accountsArr: {$set: accountsArr && accountsArr.length !== 0 ? accountsArr : ['row-0']},
          joiners: {$set: res.data.data.joiners},
          tags: {$set: newJoiners},
          eachCompanyInfo: {
            department: {
              $set: {
                value: res.data.data.department + ''
              }
            },
            manager: {
              $set: {
                value: res.data.data.manager + ''
              }
            },
            grid: {
              $set: {
                value: res.data.data.grid + ''
              }
            },
            accounts: {
              $set: res.data.data.accounts
            },
            registeTime: {
              $set: {
                value: res.data.data.registeTime != null ? moment(res.data.data.registeTime, dateFormat) : undefined
              }
            },
            industory: {
              $set: {
                value: res.data.data.industory
              }
            },
            mainBusiness: {
              $set: {
                value: res.data.data.mainBusiness
              }
            },
            yearIncome: {
              $set: {
                value: res.data.data.yearIncome
              }
            },
            legalPerson: {
              $set: {
                value: res.data.data.legalPerson
              }
            },
            telephone: {
              $set: {
                value: res.data.data.telephone
              }
            },
            staffCount: {
              $set: {
                value: res.data.data.staffCount
              }
            },
            avgSalary: {
              $set: {
                value: res.data.data.avgSalary
              }
            },
            address: {
              $set: {
                value: res.data.data.address
              }
            },
            addressCode: {
              $set: {
                value: res.data.data.addressCode
              }
            }
          }
        })

        this.setState(newState);
      })
    }
  }

  // 表单数据的双向绑定
  handleFormChange = (changedFields) => {
    let oldDepartment = this.state.eachCompanyInfo.department.value;
    let newDepartment = changedFields.department && changedFields.department.value;

    // 所属机构，客户经理，所属网格三级联动
    let eachCompanyInfo;
    if(changedFields.department && oldDepartment !== newDepartment) {
      eachCompanyInfo = {
        ...this.state.eachCompanyInfo,
        ...changedFields,
        ...{manager: {
          value: undefined
        }},
        ...{grid: {
          value: undefined
        }}
      }
    } else {
      eachCompanyInfo = {
        ...this.state.eachCompanyInfo,
        ...changedFields
      }
    }

    let accounts = {
      ...this.state.accounts,
      ...changedFields
    }

    let newState = update(this.state, {
      accounts: {$set: {...accounts}},
      eachCompanyInfo: {$set: {...eachCompanyInfo}}
    })
    this.setState(newState);
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

  // 参与人员被修改了
  joinersBeModified = () => {
    const { beEditedArray } = this.props.currentCustomerInfo;

    if(!this.state.joinersBeEdited && beEditedArray && !beEditedArray.includes('basicInfo')) {
      this.props.increaseBeEditArray('enterpriseBasicInfo');
      this.setState({
        joinersBeEdited: true
      })
    }
  }

  // change joiners
  changeJoiners = (joiner) => {
    // console.log(joiner);
    const { tags } = this.state;
    const newJoiners = tags.filter(item => item.id !== joiner.id);
    let newState = update(this.state, {
      tags: {$set: newJoiners}
    })
    this.setState(newState);
  };

  // 重置参与人员
  resetJoiners = (state) => {
    let st = state || this.state;
    let newJoiners = _.cloneDeep(st.joiners);
    let newState = update(st, {
      tags: {$set: newJoiners}
    })
    this.setState(newState)
    return newState
  }

  // 新建/编辑客户
  addNewCustomer = (briefInfo) => {
    const { id, name } = this.props.currentCustomerInfo;
    const { accountsArr } = this.state;
    const dateFormat = 'YYYY-MM-DD'; // 日期格式

    // 参与人数信息
    let joiners = this.state.tags.map(item => item.id);
    // 账户信息
    let accountsInfo = accountsArr.map((item, index) => {
      return {
        accountNo: briefInfo[`${item}-accountNo`],
        priority: index + 1,
        remark: briefInfo[`${item}-remark`]
      }
    })

    const {
      address,
      avgSalary,
      department,
      grid,
      industory,
      joinerIds,
      legalPerson,
      mainBusiness,
      manager,
      registeTime,
      staffCount,
      telephone,
      yearIncome
    } = briefInfo

    console.log(briefInfo);
    let json = {
      accounts: accountsInfo,
      address: address ? address : '',
      avgSalary: avgSalary != null && avgSalary != '' ? avgSalary - 0 : '',
      department: department ? department - 0 : '',
      grid: grid ? grid - 0 : '',
      joinerIds: joiners ? joiners : '',
      manager: manager ? manager - 0 : '',
      name: name ? name : '',
      industory: industory ? industory : '',
      legalPerson: legalPerson ? legalPerson : 0,
      registeTime: registeTime != null ? moment(registeTime).format(dateFormat) : '',
      staffCount: staffCount ? staffCount : 0,
      telephone: telephone ? telephone : 0,
      yearIncome: yearIncome != null && yearIncome != '' ? yearIncome - 0 : ''
    }

    console.log(json);

    // 如果 id不存在，则调用创建用户接口
    if(id === -1) {
      ajax.PostJson(API.POST_CUSTOMER_ENTERPRISE_BASE, json).then((res) => {
        if(res.message === 'OK') {
          message.success('创建用户成功');
          this.props.createCustomerSuccess(res.data);
          this.props.decreaseBeEditArray('enterpriseBasicInfo');
        } else {
          message.error(res.message);
        }
      });
    } else {
      ajax.PutJson(API.PUT_CUSTOMER_ENTERPRISE_BASE(5), json).then((res)=>{
        if(res.code === 200) {
          message.success('编辑用户成功');
          this.props.decreaseBeEditArray('enterpriseBasicInfo');
        } else {
          message.error(res.message);
        }
      })
    }
  }

  render() {
    const { increaseBeEditArray, decreaseBeEditArray } = this.props;
    const { step, mode, id, beEditedArray } = this.props.currentCustomerInfo;
    const {
      modalVisible,
      eachCompanyInfo,
      // edited,
      tags,
      joinersBeEdited,

      accountsArr,
      accounts,
      originAccounts
    } = this.state;

    const modal = {
      visible: modalVisible,
      hide: this.modalHide,

      staffs: tags,
      joinersBeModified: this.joinersBeModified,
      resetJoiners: this.resetJoiners,
    };

    // console.log(tags);

    const basicInfoProps = {
      // basic info
      currentId: id,
      beEditedArray: beEditedArray,
      increaseBeEditArray: increaseBeEditArray,
      decreaseBeEditArray: decreaseBeEditArray,
      eachCompanyInfo: eachCompanyInfo,
      addNewCustomer: this.addNewCustomer,

      accountsArr: accountsArr,
      accounts: accounts,
      deleteAccountsInfo: this.deleteAccountsInfo,
      addAccountsInfo: this.addAccountsInfo,

      tags: tags,
      changeJoiners: this.changeJoiners,
      joinersBeEdited: joinersBeEdited,

      modalShow: this.modalShow,
    }

    return(
      <div style={{textAlign: 'left'}}>
        <AddCrewModal
          key={id}
          {...modal}
        />

        <div>
          {mode && mode !== 'view' &&
            <EditBriefBasicInfo
              {...basicInfoProps}
              onChange={this.handleFormChange}
            />
          }
          {mode && mode === 'view' &&
            <ViewBriefBasicInfo {...basicInfoProps}/>
          }
        </div>

        <div className="maintain">
          <Tabs type='card'>
            <TabPane tab="维护记录" key="basicInfo" className="tab01">
              <AddMaintainRecord />
              <MaintainRecord />
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
    decreaseBeEditArray: (item) => {dispatch(decreaseBeEditArray(item))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EnterpriseBasicInfo);
