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
import AddFamilyCard from './component/addFamilyCard'
import FamilyCard from './component/familyCard'
import FamilyForm from './component/familyForm'
const FormItem = Form.Item;
const Option = Select.Option;
class FamilyInfo extends Component {
  state={
    isLoading:false,//是否正在加载
    isModify: [],//编辑状态
    familyList:[],//家庭信息数组
    familyRelation: [],//家庭成员关系
    commonJobCategory: [],//工作属性
    addFamilyCardLoading:false,
    isAdd:false,
    financeAddLoading:false,//add form loading button
    newFamily:{//放到组件中
      "certificate": {
        "value": ""
      },
      "jobCategory": {
        "value": ""
      },
      "name": {
        "value": ""
      },
      "phone": {
        "value": ""
      },
      "relation": {
        "value": ""
      }
    }
  }
//-----------------APIS----------------------
  //家庭成员数组
  getFamilyInfo = (id) => {
    ajax.Get(api.GET_CUSTOMERS_FAMILY(id))
    .then((data) => {
      if(data.status===200&&data.statusText==='OK'){
        // console.log(data.status)
        let newFamilyList= data.data.data.map((item)=>{
          return Object.keys(item).reduce((pre,ky)=>{
            if(item[ky]===null){
              pre[ky] = {value:""}
            }else{
              pre[ky] = {value:item[ky]+""}
            }
            // console.log(item[ky]===null)
            // pre[ky] = {value:item[ky]+""}
            return pre;
          },{})
        });
        this.setState({
          familyList:newFamilyList,
          isModify:new Array(newFamilyList.length).fill(false),
          isLoading:false,
          
        })
        this.resetAddCard();
        // this.AddFamilyCard.toggleAdd();
        // console.log(this)
        // console.log("getfamilies")
      }
    })
  }
  //成员关系下拉菜单
  getFamilyRelation(){
    ajax.Get(api.GET_COMMON_DROPDOWN('familyRelation'))
    .then((data) => {
      if (data.status === 200 && data.statusText === 'OK' && data.data) {
        let familyRelation = data.data.data;
        this.setState({
          familyRelation: familyRelation
        })
      }
    })
  }
  //工作属性下拉菜单
  getCommonJobCategory(){
    ajax.Get(api.GET_COMMON_DROPDOWN('commonJobCategory'))
    .then((data) => {
      if (data.status === 200 && data.statusText === 'OK' && data.data) {
        let commonJobCategory = data.data.data;
        this.setState({
          commonJobCategory: commonJobCategory
        })
      }
    })
  }
  //删除family信息
  deleteFamilyValue=(familyId)=>{
    ajax.Delete(api.DELETE_CUSTOMERS_FAMILY(familyId))
      .then(res=>{
        // console.log(res)
            if(res.data.code===200){
              if(res.data.message==='OK'){
                // console.log('成功')
                this.getFamilyInfo(this.props.currentId);
              }
            }else{
              // console.log(res.data.message)
            }
      })
  }
  //增加新的card
  addNewFamilyValue=(data)=>{
    this.changeAddFamilyCardLoading();
    // console.log(data);
    setTimeout(()=>{
      ajax.Post(api.POST_CUSTOMERS_FAMILY(this.props.currentId),data)
        .then( res => {
              // if(res.data.message === 'OK'){
              //   this.getFamilyInfo(this.props.currentId);
              // }
              // console.log(res)
              if(res.data.code===200){
                if(res.data.message==='OK'){
                  // console.log('成功')
                  this.getFamilyInfo(this.props.currentId);
                }
              }else{
                // console.log(res.data.message)
              }
              this.changeAddFamilyCardLoading();
              this.toggleAdd();
            })

    },2000)
  }
  //保存修改
  saveChangeValue=(index,values,num)=>{
    setTimeout(()=>{
    ajax.Put(api.PUT_CUSTOMERS_FAMILY(index),values)
      .then( res => {
          // console.log(res);
          switch(res.status){
              case(200):
                {
                  if(res.data.code===200&&res.data.message==='OK')
                    message.success('更改成功');
                    this.getFamilyInfo(this.props.currentId);
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
                  // message.error(res.statusText)
                   Modal.error({
                    title: res.statusText,
                  });
                }
          }
          this.toggleEdit(num);//编辑状态改变
        })

    },2000)
    
  };
//状态修改：
//添加状态切换
    toggleAdd = () => {
        let newState=update(
            this.state,{isAdd:{$set:!this.state.isAdd}}
        )
        this.setState(newState);
    }
  //add按钮loading
  changeAddFamilyCardLoading(){
    this.setState({"addFamilyCardLoading":!this.state.addFamilyCardLoading})
  }
  //查看和修改状态切换
  toggleEdit=(index)=>{
    let newState=update(
      this.state,{isModify:{[index]:{$set:!this.state.isModify[index]}}}
    )
    this.setState(newState);
  };
  
  
  cancelChangeValue=()=>{
    this.getFamilyInfo(this.props.currentId);
  };
  //重置addcard信息
  resetAddCard=()=>{
    this.setState({
      newFamily:{
        "certificate": {
          "value": ""
        },
        "jobCategory": {
          "value": ""
        },
        "name": {
          "value": ""
        },
        "phone": {
          "value": ""
        },
        "relation": {
          "value": ""
        }
      }
    })
  }
  handleFormChange = (index,changedFields) => {
    // console.log(index)
    // this.setState({
    //   fields: { ...this.state.fields, ...changedFields },
    // });
    let fields={ ...this.state.familyList[index], ...changedFields };
    let newState=update(
      this.state,{familyList:{[index]:{$set:fields}}}
    )
    // console.log("0000000000000",newState);
    this.setState(newState)
  }
  onAddChange=(changedFields)=>{
    let fields={...this.state.newFamily,...changedFields};
    this.setState({newFamily:fields});
  }

  componentWillMount() {
    // console.log("======","familyinfo willmount ")
    this.getFamilyInfo(this.props.currentId);
    this.getFamilyRelation();
    this.getCommonJobCategory();
    
  }
  componentWillReceiveProps(newProps){
    // console.log("======","familyinfo receive props")
    //重置数据
    if(newProps.currentId!==this.props.currentId){
      this.setState({
        isLoading:true,
      })
      this.getFamilyInfo(newProps.currentId);
      this.toggleAdd();
      // console.log('重置数据')
      // console.log(this.props.AddFamilyCard)
    }
  }

  constructor(props) {
    super(props);
  };
  render() {
    const loading=this.state.isLoading?(<div>loading</div>):"";
    return(
      <div className="my-cards-page">
        {loading}
        {
          this.state.familyList.length?
          <div className="my-cards-area">
            {
              this.state.familyList.map((item,index)=>{
                if(this.state.isModify[index]){
                  return(
                    <FamilyForm
                      toggleEdit={this.toggleEdit}
                      key={item.id.value.toString()}
                      {...item}
                      onChange={(e)=>{this.handleFormChange(index,e)}}
                      index={index}
                      familyRelation={this.state.familyRelation}
                      commonJobCategory={this.state.commonJobCategory}
                      saveChangeValue={this.saveChangeValue}
                      cancelChangeValue={this.cancelChangeValue}
                    />
                  )
                }else{
                  return(
                    <FamilyCard
                      toggleEdit={this.toggleEdit}
                      key={item.id.value.toString()}
                      item={item}
                      index={index}
                      familyRelation={this.state.familyRelation}
                      commonJobCategory={this.state.commonJobCategory}
                      deleteFamilyValue={this.deleteFamilyValue}
                    />

                  )
                }
              })
            }
            <AddFamilyCard
              commonJobCategory={this.state.commonJobCategory}
              addNewFamilyValue={this.addNewFamilyValue}
              familyRelation={this.state.familyRelation}
              addFamilyCardLoading={this.state.addFamilyCardLoading}
              changeAddFamilyCardLoading={this.changeAddFamilyCardLoading}
              {...this.state.newFamily}
              resetAddCard={this.resetAddCard}
              onAddChange={this.onAddChange}
              isAdd={this.state.isAdd}
              toggleAdd={this.toggleAdd}
            />
            {/*<pre className="language-bash" style={{textAlign:'left'}}>
              {JSON.stringify(this.state.addFamilyCardLoading, null, 2)}
            </pre>*/}
          </div>:
          <AddFamilyCard
            commonJobCategory={this.state.commonJobCategory}
            addNewFamilyValue={this.addNewFamilyValue}
            familyRelation={this.state.familyRelation}
            addFamilyCardLoading={this.state.addFamilyCardLoading}
            changeAddFamilyCardLoading={this.changeAddFamilyCardLoading}
            {...this.state.newFamily}
            resetAddCard={this.resetAddCard}
            onAddChange={this.onAddChange}
            isAdd={this.state.isAdd}
            toggleAdd={this.toggleAdd}
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

export default connect(mapStateToProps)(FamilyInfo);
