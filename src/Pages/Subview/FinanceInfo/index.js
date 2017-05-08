import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Icon,
  Input,
  Form,
  Select,
  Modal,
  message
} from 'antd';
import styles from './indexStyle.less';
import api from './../../../../API';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import ajax from '../../../tools/POSTF.js';
import AddFinanceCard from './component/AddFinanceCard'
import FinanceCard from './component/FinanceCard'
import FinanceForm from './component/FinanceForm'
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
class FinanceInfo extends Component {
  state = {
    isLoading:false,//是否正在加载
    isModify: [],//编辑状态
    financeList:[],//家庭信息数组
    financeCategoryDropdown:[],//金融业务信息产品下拉菜单
    addFinanceCardLoading:false,
    newFinance:{//放到组件中
        "buyDate": {
            "value": ""
          },
          "expireDate": {
            "value": ""
          },
          "financeCategory": {
            "value": ""
          },
          "id": {
            "value": ""
          },
          "money": {
            "value": ""
          },
          "org": {
            "value": ""
          },
          "profit": {
            "value": ""
          }
  
    }
  };
//--------------------APIS-------------------
  //查询
  getCustomersFinances=(customerId)=>{
    ajax.Get(api.GET_CUSTOMER_FINANCES(customerId))
      .then((data)=>{
        if(data.status===200&&data.statusText==='OK'){
          console.log(data.status)
          let newFinanceList= data.data.data.map((item)=>{
            return Object.keys(item).reduce((pre,ky)=>{
              if(item[ky]===null){
                pre[ky] = {value:""}
              }else{
                if(ky==='buyDate'||ky==='expireDate'){

                  let time=moment(item[ky]);
                  console.log(time)
                  pre[ky] = {value:time};
                }else{
                  pre[ky] = {value:item[ky]+""}

                }
              }
              return pre;
            },{})
          });
          this.setState({
            financeList:newFinanceList,
            isModify:new Array(newFinanceList.length).fill(false),
            isLoading:false,
          })
          // this.resetAddCard();
          // this.AddFamilyCard.toggleAdd();
          console.log(this)
          console.log("getfamilies")
        }
      })
  }
  // 增加
  postCustomersFinances=()=>{
      ajax.Post(api.POST_CUSTOMER_FINANCES(2),{
        buyDate	:'2017-10-02',
        expireDate	:'2019-02-09',
        financeCategory:11,
        money	:99000,
        org	:2,
        profit :34000,
      })
        .then( res => {
              console.log(res)
              if(res.data.code===200){
                if(res.data.message==='OK'){
                  console.log('成功')
                  this.getCustomersFinances(this.props.currentId);
                }
              }else{
                console.log(res.data.message)
              }
            })

  }
  // 删除
  deleteCustomersFinances=()=>{

  }
  // 修改
  putCustomersFinances=()=>{

  }
  // 金融业务信息下拉
  getCustomFinanceCategory=()=>{
     ajax.Get(api.GET_CUSTOMER_FINANCE_CATEGORY)
      .then((data)=>{
        if(data.data.code===200&&data.data.message==='OK'){
          this.setState({
            financeCategoryDropdown:data.data.data
          })
        }
          // console.log(data.data)

      })
  }
//------------状态改变----------
  onAddChange=(changedFields)=>{
    let fields={...this.state.newFinance,...changedFields};
    this.setState({newFinance:fields});
  }
//重置addcard信息
  resetAddCard=()=>{
    this.setState({
      newFinance:{
        "buyDate": {
            "value": ""
          },
          "expireDate": {
            "value": ""
          },
          "financeCategory": {
            "value": ""
          },
          "id": {
            "value": ""
          },
          "money": {
            "value": ""
          },
          "org": {
            "value": ""
          },
          "profit": {
            "value": ""
          }
      }
    })
  }
  //查看和修改状态切换
  toggleEdit=(index)=>{
    let newState=update(
      this.state,{isModify:{[index]:{$set:!this.state.isModify[index]}}}
    )
    this.setState(newState);
  };
  handleFormChange = (index,changedFields) => {
    console.log("handleFormChange")
    let fields={ ...this.state.financeList[index], ...changedFields };
    let newState=update(
      this.state,{financeList:{[index]:{$set:fields}}}
    )
    this.setState(newState)
  }
  cancelChangeValue=()=>{
    this.getCustomersFinances(this.props.currentId);
  };
  componentWillMount() {
   this.getCustomersFinances(this.props.currentId);
   this.getCustomFinanceCategory();
  }
  componentWillReceiveProps(newProps){
    console.log("======","familyinfo receive props")
    //重置数据
    if(newProps.currentId!==this.props.currentId){
      this.setState({
        isLoading:true
      })
      this.getCustomersFinances(newProps.currentId);
      console.log('重置数据')
      
    }
    
  }
  constructor(props) {
    super(props);
  };
  render() {
      const loading=this.state.isLoading?(<div>loading</div>):"";
    return (
      <div className="my-cards-page">
        {loading}
        {
          this.state.financeList.length?
          <div className="my-cards-area">
              {
                this.state.financeList.map((item,index)=>{
                  if(this.state.isModify[index]){
                    return(
                      <FinanceForm
                        toggleEdit={this.toggleEdit}
                        key={item.id.value}
                        {...item}
                        //item={item}
                        onChange={(e)=>{this.handleFormChange(index,e)}}
                        index={index}
                        financeCategoryDropdown={this.state.financeCategoryDropdown}
                        //saveChangeValue={this.saveChangeValue}
                        cancelChangeValue={this.cancelChangeValue}
                      />
                    )
                  }else{
                    return(
                      <FinanceCard
                        toggleEdit={this.toggleEdit}
                        key={item.id.value}
                        item={item}
                        index={index}
                        financeCategoryDropdown={this.state.financeCategoryDropdown}
                        //deleteFamilyValue={this.deleteFamilyValue}
                      />
                    )
                  }
                })
              }
              <AddFinanceCard 
                 financeCategoryDropdown={this.state.financeCategoryDropdown}

              />

              
          </div>:
          <AddFinanceCard
             financeCategoryDropdown={this.state.financeCategoryDropdown}
             addNewFinanceCategoryValue={this.addFinanceCategoryValue}
             postCustomersFinances={this.postCustomersFinances}
             addFinanceCategoryLoading={this.addFinanceCategoryLoading}
             {...this.state.newFinance}
             resetAddCard={this.resetAddCard}
             onAddChange={this.onAddChange}
          />

        }
        <pre className="language-bash" style={{textAlign:'left'}}>
          {JSON.stringify(this.state, null, 2)}
        </pre>

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

export default connect(mapStateToProps)(FinanceInfo);
