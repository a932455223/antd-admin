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
    familyList:[],//家庭信息数组
    familyRelation: [],//家庭成员关系
    commonJobCategory: [],//工作属性
  }
  //查看和修改状态切换
  toggleEdit=(index)=>{
    // this.state.isModify[index] = !this.state.isModify[index];
    // let isModify = _.cloneDeep(this.state.isModify);
    // this.setState({
    //   isModify: isModify
    // })
    let newState=update(
      this.state,{isModify:{[index]:{$set:!this.state.isModify[index]}}}
    )
    this.setState(newState);
  };
  //-----------------APIS----------------------
  //家庭成员数组
  getFamilyInfo = (id) => {
    ajax.Get(api.GET_CUSTOMERS_FAMILY(id))
    .then((data) => {
        let newFamilyList= data.data.data.map((item)=>{
          return Object.keys(item).reduce((pre,ky)=>{
            pre[ky] = {value:item[ky]}
            return pre;
          },{})
        });
        this.setState({
          familyList:newFamilyList,
          isModify:new Array(newFamilyList.length).fill(false),
          isLoading:false
        })
    })
  }
  //成员关系下拉菜单,api接口
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
  //工作属性下拉菜单,api接口
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
  handleFormChange = (index,changedFields) => {
    console.log(index)
    // this.setState({
    //   fields: { ...this.state.fields, ...changedFields },
    // });
    let fields={ ...this.state.familyList[index], ...changedFields };
    let newState=update(
      this.state,{familyList:{[index]:{$set:fields}}}
    )
    console.log("0000000000000",newState);
    this.setState(newState)
  }
  componentWillMount() {
    console.log("======","familyinfo willmount ")
    this.getFamilyInfo(this.props.currentId);
    this.getFamilyRelation();
    this.getCommonJobCategory();
  }
  componentWillReceiveProps(newProps){
    console.log("======","familyinfo receive props")
    //重置数据
    if(newProps.currentId!==this.props.currentId){
      this.setState({
        isLoading:true
      })
      this.getFamilyInfo(newProps.currentId);
      console.log('重置数据')
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
          this.state.familyList.length?
          <div className="familiyCards">
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
                    />
                    
                  )
                }
              })
            }
            <AddFamilyCard 
              familyRelation={this.state.familyRelation}
              commonJobCategory={this.state.commonJobCategory}
            />
            <pre className="language-bash" style={{textAlign:'left'}}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
          </div>:
          <AddFamilyCard 
            familyRelation={this.state.familyRelation}
            commonJobCategory={this.state.commonJobCategory}
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
