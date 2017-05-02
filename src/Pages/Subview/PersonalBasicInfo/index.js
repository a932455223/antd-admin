import React, { Component } from 'react';
import {
  Tabs,
  Form,
  Select,
} from 'antd';
import moment from 'moment';
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
      }
    },
    detailsInfo: {
      yearIncome: {
        value: ''
      },
      yearExpense: {
        value: ''
      },
      marryStatus: {
        value: '',
        options: []
      },
      houseType: {
        value: '',
        options: []
      },
      withCar: {
        value: '',
        options: []
      },
      carPrice: {
        value: '',
        options: []
      },
      withDebt: {
        value: '',
        options: []
      },
      debtAmount: {
        value: '',
        options: []
      },
      needLoan: {
        value: '',
        options: []
      },
      loanAmount: {
        value: '',
        options: []
      },
      loanPurpose: {
        value: '',
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
    })
  }

  componentWillReceiveProps(next){
    info('basicInfo will receive props.');
    // 当前的客户 id发生变化时，或者当前用户的信息 beEdited === true时，重置 state
    const { id, beEdited} = this.props.currentCustomerInfo;
    if(id !== next.currentCustomerInfo.id || beEdited === true) {
      this.getBaseInfo(next.currentCustomerInfo.id);
    }
  }

  // 获取客户基本信息
  getBaseInfo = (id) => {
    ajax.Get(API.GET_CUSTOMER_BASE(4))
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
              value: {$set: res.data.data[item] + ''}
            },
          }
        })

        // 将 newState赋值给原先的 state
        return this.state = newState;

        if(item === commonDropDownType[commonDropDownType.length - 1]) {
          this.setState(newState);
        }
      })

      let newState = update(this.state, {
        briefInfo: {
          department: {
            value: {$set: res.data.data.department + ''}
          },
          manager: {
            value: {$set: res.data.data.manager + ''}
          },
          grid: {
            value: {$set: res.data.data.grid + ''}
          },
          phone: {
            value: {$set: res.data.data.phone}
          },
          wechat: {
            value: {$set: res.data.data.wechat}
          },
          certificate: {
            value: {$set: res.data.data.certificate}
          },
          birth: {
            value: {$set: moment(res.data.data.birth, dateFormat)}
          },
          origin: {
            value: {$set: [res.data.data.origin]}
          },
          age: {
            value: {$set: res.data.data.age}
          },
          address: {
            value: {$set: res.data.data.address}
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

    // 所属机构
    ajax.Get(API.GET_CUSTOMER_DEPARTMENT)
    .then((res) => {
      let newState = update(this.state, {
        briefInfo: {
          department: {
            options: {$set: res.data.data},
          }
        },
      });
      this.setState(newState);
    })

    // 所属客户经理
    ajax.Get(API.GET_DEPARTMENT_STAFFS(1))
    .then((res) => {
      let newState = update(this.state, {
        briefInfo: {
          manager: {
            options: {$set: res.data.data},
          }
        },
      });
      this.setState(newState);
    })

    ajax.Get(API.GET_DEPARTMENT_AREAS(1))
    .then((res) => {
      let newState = update(this.state, {
        briefInfo: {
          grid: {
            options: {$set: res.data.data},
          }
        },
      });
      this.setState(newState);
    })
  }

  handleFormChange = (changedFields) => {
    let newState = update(this.state,{
      briefInfo: {
        $set: {
          ...this.state.briefInfo,
          ...changedFields
        }
      },
      detailsInfo: {
        $set: {
          ...this.state.detailsInfo,
          ...changedFields
        }
      }
    })
    this.setState(newState);
  }

  render() {
    const { customerInfoBeEdit } = this.props;
    const { step, mode, currentId, beEdited } = this.props.currentCustomerInfo;
    const { eachCustomerInfo, edited, detailsInfo, briefInfo } = this.state;

    const modal = {
      visible: this.state.modalVisible,
      hide: this.modalHide
    };

    const basicInfoProps = {
      beEdited: beEdited,
      customerInfoBeEdit: customerInfoBeEdit,
      currentId: eachCustomerInfo.id,
      eachCustomerInfo: eachCustomerInfo
    }

    const maintainRecordProps = {
      mode: mode
    }

    return(
      <div style={{textAlign: 'left'}}>
        <AddCrewModal {...modal}/>

        <div className="">
          {mode && mode === 'view' &&
            <div>
              <ViewBriefBasicInfo {...basicInfoProps}/>
              <ViewDetailsBasicInfo {...basicInfoProps}/>
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
