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
const FormItem = Form.Item;
const Option = Select.Option;
import styles from './indexStyle.less';
import api from './../../../../API';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import ajax from '../../../tools/POSTF.js';
import AddKeyPersonCard from './component/AddKeyPersonCard'
import KeyPersonCard from './component/KeyPersonCard'
import KeyPersonForm from './component/KeyPersonForm'
class KeyPersonInfo extends Component {
  state={
    isLoading:false,
    isModify:[],
    keyPersonList:[],
    newKeyPerson:{
      "phone": {
        "value": ""
      },
      "name": {
        "value": ""
      },
      "id": {
        "value": ""
      },
      "department": {
        "value": ""
      }
    }
  }
  //重置addcard信息
  resetAddCard=()=>{
    this.setState({
       newKeyPerson:{
        "phone": {
          "value": ""
        },
        "name": {
          "value": ""
        },
        "id": {
          "value": ""
        },
        "department": {
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
//更改表单
  handleFormChange = (index,changedFields) => {
    // console.log(index)
    // this.setState({
    //   fields: { ...this.state.fields, ...changedFields },
    // });
    let fields={ ...this.state.keyPersonList[index], ...changedFields };
    let newState=update(
      this.state,{keyPersonList:{[index]:{$set:fields}}}
    )
    // console.log("0000000000000",newState);
    this.setState(newState)
  }
  onAddChange=(changedFields)=>{
    let fields={...this.state.newKeyPerson,...changedFields};
    this.setState({newKeyPerson:fields});
  }
//--------------------APIS-----------------------
  //家庭成员数组
  getKeyPersonInfo = (id) => {
    ajax.Get(api.GET_CUSTOMETS_KEYPERSONS(id))
    .then((data) => {
      if(data.status===200&&data.statusText==='OK'){
        console.log(data.status)
        let newKeyPersonList= data.data.data.map((item)=>{
          return Object.keys(item).reduce((pre,ky)=>{
            pre[ky] = {value:item[ky]+""}
            return pre;
          },{})
        });
        this.setState({
          keyPersonList:newKeyPersonList,
          isModify:new Array(newKeyPersonList.length).fill(false),
          isLoading:false,
        })
        // this.resetAddCard();
        console.log("getkeypersons")
      }
    })
  }
  //添加关键人
  addKeyPersonValue=(data)=>{
    ajax.Post(api.POST_CUSTOMERS_KEYPERSONS(this.props.currentId),data)
      .then( res => {
            // if(res.data.message === 'OK'){
            //   this.getFamilyInfo(this.props.currentId);
            // }
            console.log(res)
            if(res.data.code===200){
              if(res.data.message==='OK'){
                console.log('添加成功')
                this.getKeyPersonInfo(this.props.currentId);
              }
            }else{
              console.log(res.data.message)
            }
          })
  }
   //删除关键人
  deleteKeyPersonValue=(keyPersonId)=>{
    ajax.Delete(api.DELETE_CUSTOMERS_KEYPERSONS(keyPersonId))
      .then(res=>{
        console.log(res)
            if(res.data.code===200){
              if(res.data.message==='OK'){
                console.log('删除成功')
                this.getKeyPersonInfo(this.props.currentId);
              }
            }else{
              console.log(res.data.message)
            }
      })
  }
  //保存修改
  saveChangeValue=(index,values)=>{
    ajax.Put(api.PUT_CUSTOMERS_KEYPERSONS(index),values)
      .then( res => {
            if(res.data.message === 'OK'){
              this.getKeyPersonInfo(this.props.currentId);
              console.log('savechange successful');
            }
          })

  };
  componentWillMount() {
    console.log("======","familyinfo willmount ")
    this.getKeyPersonInfo(this.props.currentId);
    // this.getFamilyRelation();
    // this.getCommonJobCategory();
  }
  
  componentWillReceiveProps(newProps){
    console.log("======","familyinfo receive props")
    //重置数据
    if(newProps.currentId!==this.props.currentId){
      this.setState({
        isLoading:true
      })
      this.getKeyPersonInfo(newProps.currentId);
      console.log('重置数据')
    }
  }
  render() {
    const loading=this.state.isLoading?(<div>loading</div>):"";
    return(
      <div className="my-cards-page">
        {loading}
        {
          this.state.keyPersonList.length?
          <div className='my-cards-area'>
            {
              this.state.keyPersonList.map((item,index)=>{
                if(this.state.isModify[index]){
                  return(
                    <KeyPersonForm 
                      item={item}
                      {...item}
                      index={index}
                      key={item.id.value}
                      toggleEdit={this.toggleEdit}
                      saveChangeValue={this.saveChangeValue}
                      onChange={(e)=>{this.handleFormChange(index,e)}}
                      
                    />
                  )
                }else{
                  return(
                    <KeyPersonCard
                        item={item}
                        index={index}
                        key={item.id.value}
                        toggleEdit={this.toggleEdit}
                        deleteKeyPersonValue={this.deleteKeyPersonValue}
                    />
                  )
                }
              })
            }
            <AddKeyPersonCard 
              {...this.state.newKeyPerson}
               onAddChange={this.onAddChange}
               resetAddCard={this.resetAddCard}
               addKeyPersonValue={this.addKeyPersonValue}
            />
            <pre className="language-bash" style={{textAlign:'left'}}>
              {JSON.stringify(this.state.newKeyPerson, null, 2)}
            </pre>
          </div>:
          <AddKeyPersonCard 
              {...this.state.newKeyPerson}
               onAddChange={this.onAddChange}
               resetAddCard={this.resetAddCard}
               addKeyPersonValue={this.addKeyPersonValue}
          />
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

export default connect(mapStateToProps)(KeyPersonInfo)