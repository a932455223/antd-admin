import React, { Component } from 'react';
import {
  Tabs,
  Form,
  Select,
 } from 'antd';
import axios from 'axios';
import API from '../../../../API';
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

// 维护记录


// 添加人员弹窗




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
      axios.get(API.GET_CUSTOMER_BASE(id))
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

  // handleChange(){
  //   this.setState({
  //     edited:true
  //   })
  // }

  x(next) {
    // console.log(this.props);
    // console.log(next);
  }

  render() {
    const modal = {
      visible: this.state.modalVisible,
      hide: this.modalHide
    };
    const {step, mode, currentId, customerInfoBeEdit} = this.props;
    const {eachCustomerInfo,edited} = this.state;
    let BasicInfo;
    if(mode === "view"){
      BasicInfo = <BasicInfoListsRead />
    }else{
      BasicInfo = <BasicInfoListsEdit
        customerInfoBeEdit={customerInfoBeEdit}
        currentId={this.props.currentId}
        eachCustomerInfo={this.state.eachCustomerInfo}
      />
    }
    return(
      <div style={{textAlign: 'left'}}>

        <AddCrewModal {...modal}/>

        <div className="">
          { BasicInfo }
        </div>

        <div className="maintain">
          <Tabs type='card'>
            <TabPane tab="维护记录" key="basicInfo">
              <AddMaintainRecord />
              <MaintainRecord />
            </TabPane>
            <TabPane tab="操作记录" key="familyInfo">
              <p></p>
            </TabPane>
            <TabPane tab="修改记录" key="jobInfo">
              <p>3</p>
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
