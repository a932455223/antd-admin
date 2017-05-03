import React, { Component } from 'react';
import {
  Tabs,
  Form,
  Select,
} from 'antd';
import moment from 'moment';
import $ from 'jquery';
import axios from 'axios';
import update from "immutability-helper";
import { connect } from 'react-redux';
import API from '../../../../API';
import ajax from '../../../tools/POSTF';
import { createCustomerSuccess, customerInfoBeEdit } from '../../../redux/actions/customerAction';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
import './indexStyle.less';
import AddMaintainRecordForm from './widget/AddMaintainRecordForm'
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

// 新增维护记录
const AddMaintainRecord = Form.create()(AddMaintainRecordForm);

//个人信息表单................
class BasicInfo extends Component {
  state = {
    modalVisible: false,
    edited: false,
    eachCustomerInfo: '',
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
        value: []
      },
      age: {
        value: ''
      },
      address: {
        value: ''
      },
      tags: '',
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
    }
  }

  // modal Show
  modalShow = () => {
    this.setState({
      modalVisible: true
    })
  }

  // modal hide
  modalHide = () => {
    this.setState({
      modalVisible: false
    })
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

    // // 所属机构
    // ajax.Get(API.GET_CUSTOMER_DEPARTMENT)
    // .then((res) => {
    //   let newState = update(this.state, {
    //     briefInfo: {
    //       department: {
    //         options: {$set: res.data.data},
    //       }
    //     },
    //   });
    //   this.setState(newState);
    // })
    //
    // // 所属客户经理

    //
    // ajax.Get(API.GET_DEPARTMENT_AREAS(1))
    // .then((res) => {
    //   let newState = update(this.state, {
    //     briefInfo: {
    //       grid: {
    //         options: {$set: res.data.data},
    //       }
    //     },
    //   });
    //   this.setState(newState);
    // })
  }

  componentWillReceiveProps(next){
    info('basicInfo will receive props.');
    // 当前的客户 id发生变化时，或者当前用户的信息 beEdited === true时，重置 state
    const { id, beEdited} = this.props.currentCustomerInfo;
    if(id !== next.currentCustomerInfo.id || beEdited === true ) {
      this.getBaseInfo(next.currentCustomerInfo.id);
    }
  }

  // 获取客户基本信息
  getBaseInfo = (id) => {
    if(id !== -1) {
      ajax.Get(API.GET_CUSTOMER_BASE(4))
      .then((res) => {
        // console.log(res.data.data);
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

        // 更新 briefInfo, detailsInfo, eachCustomerInfo
        let newState = update(this.state, {
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
                value: res.data.data.manager + ''
              }
            },
            grid: {
              $set: {
                // options: this.state.briefInfo.grid.options,
                value: res.data.data.grid + ''
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
                value: moment(res.data.data.birth, dateFormat)
              }
            },
            origin: {
              $set: {
                value: [res.data.data.origin]
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
              $set: res.data.data.joiners
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

  // 新建客户
  addNewCustomer = (briefInfo) => {
    const { name } = this.props.currentCustomerInfo;

    // console.log(briefInfo);
    let json = {
      accounts: [],
      address: briefInfo.address ? briefInfo.address : '',
      birth: '',
      certificate: briefInfo.certificate ? briefInfo.certificate : '',
      department: briefInfo.department ? briefInfo.department - 0 : '',
      grid: briefInfo.grid ? briefInfo.grid - 0 : '',
      joiners: briefInfo.joiners ? briefInfo.joiners : '',
      manager: briefInfo.manager ? briefInfo.manager - 0 : '',
      name: name ? name : '',
      origin: '',
      phone: briefInfo.phone	? briefInfo.phone : '',
      wechat: briefInfo.wechat ? briefInfo.wechat : '',
    }

    // console.log(json);

    $.ajax({
      type: 'POST',
      // url: 'http://106.14.69.82/crm/customer/individual/base',
      url: '/crm/api/customer/individual/base',
      data: JSON.stringify(json),
      success: function(data){
      	console.info(data);
      },
      dataType: "json",
      contentType: "application/json"
    });

    // ajax.Post(API.POST_CUSTOMER_INDIVIDUAL_BASE, json)
    // .then((res) => {
    //   console.log(res.data.data)
    // })
  }


  handleFormChange = (changedFields) => {
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

    let detailsInfo = {
      ...this.state.detailsInfo,
      ...changedFields
    }

    let newState = update(this.state,{
      briefInfo: {$set: {...briefInfo}},
      detailsInfo: {$set: {...detailsInfo}}
    })
    this.setState(newState);
  }

  render() {
    const { customerInfoBeEdit } = this.props;
    const { step, mode, id, beEdited } = this.props.currentCustomerInfo;
    const { eachCustomerInfo, edited, detailsInfo, briefInfo, updateBriefInfo } = this.state;
    // console.log(briefInfo);

    const modal = {
      visible: this.state.modalVisible,
      hide: this.modalHide,
      id: id
    };

    const basicInfoProps = {
      addNewCustomer: this.addNewCustomer,
      beEdited: beEdited,
      customerInfoBeEdit: customerInfoBeEdit,
      id: id,
      eachCustomerInfo: eachCustomerInfo,
      modalShow: this.modalShow
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
    customerInfoBeEdit: () => {dispatch(customerInfoBeEdit())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BasicInfo);
