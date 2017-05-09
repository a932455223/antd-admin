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
  message,
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
    financeList:[],
    financeCategoryDropdown:[],//金融业务信息产品下拉菜单
    addFinanceCardLoading:false,
    isAdd:false,
    newFinance:{//放到组件中
        "buyDate": {
            "value":undefined
          },
          "expireDate": {
            "value":undefined
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
          let newFinanceList= data.data.data.map((item)=>{
            return Object.keys(item).reduce((pre,ky)=>{
              if(item[ky]===null){
                
                if(ky==='buyDate'||ky==='expireDate'){

                  pre[ky] = {value:undefined}
                }else{
                  pre[ky] = {value:""}
                }
              }else{
                if(ky==='buyDate'||ky==='expireDate'){

                  let time=moment(item[ky]);
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
            isAdd:false
          })
          this.resetAddCard(); 
          // this.AddFamilyCard.toggleAdd();
        }
      })
  }
  // 增加
  postCustomersFinances=(data)=>{
    setTimeout(()=>{

        for(let key in data){
            if(data[key] === undefined){
              data[key]=''
            }else{
              if(key==='buyDate'||key==='expireDate'){
                data[key]=data[key].format('YYYY-MM-DD')
                // console.log(data[key].format('YYYY-MM-DD').toString())
              }
            }
          }
      ajax.Post(api.POST_CUSTOMER_FINANCES(this.props.currentId),data)
        .then( res => {
              if(res.data.code===200){
                if(res.data.message==='OK'){
                  // console.log('增加成功')
                  this.getCustomersFinances(this.props.currentId);
                  this.toggleAdd();
                  this.toggleAddFinanceCardLoading();
                }
              }else{
                // console.log(res.data.message)
              }
            })
    },2000)

  }
  // 删除
  deleteCustomersFinances=(financesId)=>{
    ajax.Delete(api.DELETE_CUSTOMERS_FINANCES(financesId))
      .then(res=>{
            if(res.data.code===200){
              if(res.data.message==='OK'){
                // console.log('删除成功')
                this.getCustomersFinances(this.props.currentId);
              }
            }else{
              // console.log(res.data.message)
            }
      })
  }
  // 修改
  putCustomersFinances=(id,values,index)=>{
    setTimeout(()=>{
          // console.log(index,values)
          for(let key in values){
            if(values[key] === undefined){
              values[key]=''
            }else{
              if(key==='buyDate'||key==='expireDate'){
                values[key]=values[key].format('YYYY-MM-DD')
                // console.log(values[key].format('YYYY-MM-DD').toString())
              }
            }
          }
      ajax.Put(api.PUT_CUSTOMERS_FINANCES(id),values)
        .then( res => {
            // console.log(res);
            switch(res.status){
                case(200):
                  {
                    if(res.data.code===200&&res.data.message==='OK')
                      message.success('更改成功');
                      this.getCustomersFinances(this.props.currentId);
                    if(res.data.code!==200){
                      // message.error(res.data.message)
                      Modal.error({
                        title:res.data.message,
                      });
                    }
                  }
                  break;
                default:
                  {
                    Modal.error({
                      title: res.statusText,
                    });
                  }
            }
          })

          // console.log(values);
      },2000)
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
  //添加状态切换
    toggleAdd = () => {
      // console.log("click toggleAdd  ");
      this.setState({isAdd:!this.state.isAdd})
      
    }
//重置addcard信息
  resetAddCard=()=>{
    this.setState({
      newFinance:{
        "buyDate": {
            "value":undefined
          },
          "expireDate": {
            "value":undefined
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
  toggleAddFinanceCardLoading=()=>{
    this.setState({addFinanceCardLoading:!this.state.addFinanceCardLoading})
  }
  //查看和修改状态切换
  toggleEdit=(index)=>{
    let newState=update(
      this.state,{isModify:{[index]:{$set:!this.state.isModify[index]}}}
    )
    this.setState(newState);
  };
  handleFormChange = (index,changedFields) => {
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
    // console.log("======","familyinfo receive props")
    //重置数据
    if(newProps.currentId!==this.props.currentId){
      this.setState({
        isLoading:true
      })
      this.getCustomersFinances(newProps.currentId);
      // console.log('重置数据')
      
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
                        putCustomersFinances={this.putCustomersFinances}
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
                        deleteCustomersFinances={this.deleteCustomersFinances}
                      />
                    )
                  }
                })
              }
              <AddFinanceCard 
                financeCategoryDropdown={this.state.financeCategoryDropdown}
                addNewFinanceCategoryValue={this.addFinanceCategoryValue}
                postCustomersFinances={this.postCustomersFinances}
                addFinanceCategoryLoading={this.addFinanceCategoryLoading}
                {...this.state.newFinance}
                resetAddCard={this.resetAddCard}
                onAddChange={this.onAddChange}
                toggleAdd={this.toggleAdd}
                isAdd={this.state.isAdd}
                toggleAddFinanceCardLoading={this.toggleAddFinanceCardLoading}
                addFinanceCardLoading={this.state.addFinanceCardLoading}
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
             toggleAdd={this.toggleAdd}
             isAdd={this.state.isAdd}
              toggleAddFinanceCardLoading={this.toggleAddFinanceCardLoading}
              addFinanceCardLoading={this.state.addFinanceCardLoading}
          />

        }
        {/*<pre className="language-bash" style={{textAlign:'left'}}>
          {JSON.stringify(this.state.addFinanceCardLoading, null, 2)}
        </pre>
        */}

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
