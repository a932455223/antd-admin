import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Icon,
  Input,
  Form,
  Select
} from 'antd';
import _ from 'lodash';
import axios from 'axios';
import styles from './indexStyle.less';
import api from './../../../../API';
import update from 'immutability-helper';
import { connect } from 'react-redux';
const FormItem = Form.Item;
const Option = Select.Option;
class FamilyInfo extends Component {
  state={
    isLoading:false,//是否正在加载
    isModify: [],//编辑状态
    familyList:[]//家庭信息数组
  }
  //家庭成员数组
  getFamilyInfo = (id) => {
    axios.get(api.GET_CUSTOMERS_FAMILY(4))
    .then((data) => {
        // let familyList = data.data.data;
        // let editFamilyList = _.cloneDeep(familyList);
        // this.setState({
        //   familyList: familyList,
        //   editFamilyList: editFamilyList
        // });
        // this.setState({
        //   familyList:data.data.data,
        //   isModify:[]
        // })
        // setTimeout(()=>{
        //   console.log(this.state.familyList);
        // },0)
        console.log(data);
    })
  }
  componentWillMount() {
    console.log("======","familyinfo willmount ")
    console.log(this.props.currentId);
    this.getFamilyInfo(this.props.currentId);
  }
  componentWillReceiveProps(newProps){
    console.log("======","familyinfo receive props")
    console.log(newProps.currentId);
    console.log(this.props.currentId);
    // if(nextProps.currentId!==this.props.currentId){
    //   //重置数据
    // }
  }
  
  constructor(props) {
    super(props);
  };

  render() {
    return(
      <div className='famlies'>
        

      </div>

    )
  }
}

const mapStateToProps = (store) => {
  return {
    currentId: store.customer.currentCustomerInfo.id,
    mode:store.customer.currentCustomerInfo.mode
  }
}

export default connect(mapStateToProps)(FamilyInfo);
