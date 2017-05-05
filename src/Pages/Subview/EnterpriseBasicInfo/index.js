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
 } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import API from '../../../../API';
import ajax from '../../../tools/POSTF';

import { connect } from 'react-redux';
import { createCustomerSuccess, customerInfoBeEdit } from '../../../redux/actions/customerAction';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
import './indexStyle.less';

import AddMaintainRecord from './widget/AddMaintainRecordForm'
import MaintainRecord from './widget/MaintainRecord'

import ViewBriefBasicInfo from './widget/Form/ViewBriefBasicInfo'
import EditBriefBasicInfo from './widget/Form/EditBriefBasicInfo'

import BasicInfoEdit from './widget/BasicInfoEdit'
import AddCrewModal from './widget/AddCrewModal'

class EnterpriseBasicInfo extends Component {
  state = {
    modalVisible: false,
    // edited: false,

    joinersBeEdited: false,
    joiners: [],
    tags: '',

    eachCompanyInfo: {
      registertime: {
        value: ''
      },
      industry: {
        value: ''
      },
      business: {
        value: ''
      },
      yearmoney: {
        value: ''
      },
      owner: {
        value: ''
      },
      phone: {
        value: ''
      },
      people: {
        value: ''
      },
      saliary: {
        value: ''
      },
      address: {
        value: ''
      },
      addressinfo: {
        value: ''
      }
    }
  }

  componentWillMount(){
    console.log('will mount');

    this.getBaseInfo(this.props.currentCustomerInfo.id);
  }

  componentWillReceiveProps(next){
    console.log('will recieve props');

    const { id, beEdited } = this.props.currentCustomerInfo;
    if(id !== next.currentCustomerInfo.id || beEdited === true ) {
      this.getBaseInfo(next.currentCustomerInfo.id);
    }
  }

  // 获取客户基本信息
  getBaseInfo = (id) => {
    if(id !== -1) {
      ajax.Get(API.GET_COMPANY_BASE(id))
      .then((res) => {
        // const dateFormat = 'YYYY-MM-DD'; // 日期格式

        let newJoiners = _.cloneDeep(res.data.data.joiner);
        let newState = update(this.state, {
          joiners: {$set: res.data.data.joiner},
          tags: {$set: newJoiners},
          eachCompanyInfo: {
            registertime: {
              value: {$set: res.data.data.registertime}
            },
            industry: {
              value: {$set: res.data.data.industry}
            },
            business: {
              value: {$set: res.data.data.business}
            },
            yearmoney: {
              value: {$set: res.data.data.yearmoney}
            },
            owner: {
              value: {$set: res.data.data.owner}
            },
            phone: {
              value: {$set: res.data.data.phone}
            },
            people: {
              value: {$set: res.data.data.people}
            },
            saliary: {
              value: {$set: res.data.data.saliary}
            },
            address: {
              value: {$set: res.data.data.address}
            },
            addressinfo: {
              value: {$set: res.data.data.addressinfo}
            }
          }
        })
        this.setState(newState);
      })
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

  // 参与人员被修改了
  joinersBeModified = () => {
    if(!this.state.joinersBeEdited) {
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
    console.log(newJoiners);
    console.log(this.state.tags);
    // debugger;
    // let newState = update(state, {
    //   tags: {$set: newJoiners}
    // })
    this.setState({
      tags: newJoiners
    });
    // return newState
  }

  render() {
    const { customerInfoBeEdit } = this.props;
    const { step, mode, id, beEdited } = this.props.currentCustomerInfo;
    const {
      modalVisible,
      eachCompanyInfo,
      // edited,
      tags,
      joinersBeEdited
    } = this.state;
    // console.log(eachCompanyInfo);

    const modal = {
      visible: modalVisible,
      hide: this.modalHide,

      staffs: tags,
      joinersBeModified: this.joinersBeModified,
      resetJoiners: this.resetJoiners,
    };

    const basicInfoProps = {
      // basic info
      currentId: id,
      beEdited: beEdited,
      customerInfoBeEdit: customerInfoBeEdit,
      eachCompanyInfo: eachCompanyInfo,

      tags: tags,
      changeJoiners: this.changeJoiners,
      joinersBeEdited: joinersBeEdited,

      modalShow: this.modalShow,
    }

    // console.log(this.props);
    return(
      <div style={{textAlign: 'left'}}>
        <AddCrewModal key={id} {...modal}/>

        <div>
          <EditBriefBasicInfo
            {...basicInfoProps}
          />
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
    customerInfoBeEdit: () => {dispatch(customerInfoBeEdit())}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EnterpriseBasicInfo);
