import React, { Component } from 'react';
import {
  Tabs,
  Form,
  Select,
 } from 'antd';
import axios from 'axios';
import API from '../../../../API';
import ajax from '../../../tools/POSTF';
import { connect } from 'react-redux';
import { createCustomerSuccess, customerInfoBeEdit } from '../../../redux/actions/customerAction';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
import './indexStyle.less';
import AddMaintainRecordForm from './widget/AddMaintainRecordForm'
import MaintainRecord from './widget/MaintainRecord'
import BasicInfoEdit from './widget/BasicInfoEdit'
import AddCrewModal from './widget/AddCrewModal'


function info(msg,color){
  console.log('%c'+msg,'color:'+color);
}

// 新增维护记录
const AddMaintainRecord = Form.create()(AddMaintainRecordForm);

//个人信息表单................
const BasicInfoListsEdit = Form.create()(BasicInfoEdit);

class BasicInfo extends Component {
  state = {
    modalVisible: false,
    edited:false,
    eachCustomerInfo: ''
  }
  componentWillMount(){
      info('basicInfo will mount')
      this.getBaseInfo(this.props.currentCustomerInfo.id)
  }

  componentWillReceiveProps(next){
    info('basicInfo will receive props.')
      this.getBaseInfo(next.currentCustomerInfo.id);
  }


  getBaseInfo = (id) => {
      ajax.Get(API.GET_CUSTOMER_BASE(id))
      .then((res) => {
          this.setState({
              ...this.state,
              eachCustomerInfo: res.data.data
          })
      })
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

  // x(next) {
    // console.log(this.props);
    // console.log(next);
  // }

  render() {
    const { customerInfoBeEdit } = this.props;
    const { step, mode, currentId } = this.props.currentCustomerInfo;
    const { eachCustomerInfo, edited } = this.state;
    
    const modal = {
      visible: this.state.modalVisible,
      hide: this.modalHide
    };

    const basicInfoProps = {
      mode: mode,
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
          { <BasicInfoListsEdit {...basicInfoProps}/> }
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
  // console.log(store)
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
