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
import styles from './indexStyle.less';
import api from './../../../../API';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import ajax from '../../../tools/POSTF.js';
import AddFamilyCard from './component/addFamilyCard'
import FamilyCard from './component/familyCard'
import FamilyForm from './component/familyForm'
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
    console.log(api.GET_CUSTOMERS_FAMILY(id));
    //第四个参数有值
    ajax.Get(api.GET_CUSTOMERS_FAMILY(id))
    .then((data) => {
        let newFamilyList= data.data.data.map((item)=>{
          return Object.keys(item).reduce((pre,ky)=>{
            pre[ky] = {value:item[ky]}
            return pre;
          },{})
        });
        console.log(newFamilyList)
        this.setState({
          familyList:newFamilyList,
          isModify:new Array(newFamilyList.length).fill(true),
          isLoading:false
        })
    })
    setTimeout(()=>{
      console.log(this.state)
    },100)
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
    //重置数据
    if(newProps.currentId!==this.props.currentId){
      console.log("======","重置数据")
      this.setState({
        isLoading:true
      })
      this.getFamilyInfo(newProps.currentId);
    }
  }
  
  constructor(props) {
    super(props);
  };
  render() {
    const loading=this.state.isLoading?(<div>loading</div>):"";
    /*const familyCards=(
      <div className="familyCards">
        <AddFamilyCard /> 
      </div>
    );*/
    
    return(
      <div className="families">
        {loading}
        {
          this.state.familyList.length>0?
          <div className="familiyCards">
            {
              {/*this.state.familyList.map((item,index)=>{
                if(this.state.isModify[index]){
                  return(
                    <FamilyForm key={item[index].id.value.toString()} item={item} />
                  )
                }else{
                  return(
                    <FamilyCard key={item[index].id.value.toString()} item={item}/>
                  )
                }
              })*/}
            }
            <AddFamilyCard />
          </div>:
          <AddFamilyCard />
        }
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
