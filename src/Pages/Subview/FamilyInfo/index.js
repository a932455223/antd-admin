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
class editFamily extends Component{

}

class FamilyInfo extends Component {
  state = {
    familyRelation: [],//家庭成员关系
    commonJobCategory: [],//工作属性
    familyList: [],//家庭成员数组
    editFamilyList: [],//输入数据暂存区
    isModify: [],//card编辑状态
    isAdd:true,//添加状态
    addFamilyValue:{
      "id":"",
      "name":"",
      "certificate":"",
      "jobCategory":"",
      "phone":"",
      "relation":""
    }//新添加的消息
  };
  //家庭成员数组
  getFamilyInfo = (id) => {
    axios.get(api.GET_CUSTOMERS_FAMILY(id))
    .then((data) => {
        let familyList = data.data.data;
        let editFamilyList = _.cloneDeep(familyList);
        this.setState({
          familyList: familyList,
          editFamilyList: editFamilyList
        });
    })
  }
  //修改成员信息
  changeFamilyValue=(index, key, value)=>{
    let newState=update(
      this.state,{editFamilyList:{[index]:{[key]:{$set:value}}}}
    );
    this.setState(newState)
  };
  //保存修改
  saveFamilyValue(index) {
    let newState=update(
      this.state,{familyList:{[index]:{$set:this.state.editFamilyList[index] }}}
    );
    this.setState(newState);
    this.toggleEdit(index);
  };
  //取消修改
  cancelFamilyValue=(index)=>{
    let newState=update(
      this.state,{editFamilyList:{[index]:{$set:this.state.familyList[index] }}}
    );
    this.setState(newState);
    this.toggleEdit(index)
  };
  //查看和修改状态切换
  toggleEdit=(index)=>{
    this.state.isModify[index] = !this.state.isModify[index];
    let isModify = _.cloneDeep(this.state.isModify);
    this.setState({
      isModify: isModify
    })
  };
  //添加状态切换
  toggleAdd = () => {
    this.setState({
      isAdd:!this.state.isAdd
    });
  }
  //添加信息
  changeAddFamilyValue(key,value){
    
    let newState=update(
      this.state,{addFamilyValue:{[key]:{$set:value}}   }
    )
    this.setState(newState)
  }
  //保存添加的信息
  saveAddFamilyValue(){
    //新添加信息的id
    let newFamilyId=this.state.editFamilyList.length;
    let newFamilyValue=update(
      this.state,{addFamilyValue:{id:{$set:newFamilyId}}}
    )
    this.setState(newFamilyValue);
    setTimeout(()=> {
      let newState=update(
        this.state,{editFamilyList:{$push:[this.state.addFamilyValue]},familyList:{$push:[this.state.addFamilyValue]}}
      )
      this.setState(newState)
    }, 0);
    // console.log(this.state.editFamilyList)
    setTimeout(()=>{
      this.setState({
        addFamilyValue:{
        "id":"",
        "name":"",
        "certificate":"",
        "jobCategory":"",
        "phone":"",
        "relation":""
        }
      })
    },0)
    this.toggleAdd();
  }
  //取消添加的信息
  cancelAddFamilyValue(){
    setTimeout(()=>{
      this.setState({
        addFamilyValue:{
        "id":"",
        "name":"",
        "certificate":"",
        "jobCategory":"",
        "phone":"",
        "relation":""
        }
      })
    },0)
    this.toggleAdd();
  }
  componentWillMount() {
    //家庭成员
    this.getFamilyInfo(this.props.currentId);
    //成员关系下拉菜单,api接口
    // axios.get(api.GET_DROPDOWN('familyRelation'))
    // .then((data) => {
    //   console.log(data,"ddasdasdf")
    //   if (data.status === 200 && data.statusText === 'OK' && data.data) {
    //     let familyRelation = data.data.data;
    //     console.log(familyRelation)
    //     this.setState({
    //       familyRelation: familyRelation
    //     })
    //   }
    // })
    axios.get(api.GET_DROPDOWN_RELATION)
    .then((data) => {
      if (data.status === 200 && data.statusText === 'OK' && data.data) {
        let familyRelation = data.data.data;
        console.log(familyRelation)
        this.setState({
          familyRelation: familyRelation
        })
      }
    })
    //工作属性下拉菜单,api接口
    // axios.get(api.GET_DROPDOWN('commonJobCategory'))
    // .then((data) => {
    //   if (data.status === 200 && data.statusText === 'OK' && data.data) {
    //     let commonJobCategory = data.data.data;
    //     console.log(commonJobCategory)
    //     this.setState({
    //       commonJobCategory: commonJobCategory
    //     })
    //   }
    // })
    axios.get(api.GET_DROPDOWN_JOB)
    .then((data) => {
      if (data.status === 200 && data.statusText === 'OK' && data.data) {
        let commonJobCategory = data.data.data;
        console.log(commonJobCategory)
        this.setState({
          commonJobCategory: commonJobCategory
        })
      }
    })
  }
  componentWillReceiveProps(newProps){
    console.log('FamilyInfo will receive props.')
    this.getFamilyInfo(newProps.currentId)
  }
  constructor(props) {
    super(props);
  };

  render() {
    let addArea;
    if(this.state.isAdd){
      addArea=
      <Card
          className="family-card family-card-modify"
          title={
            <div className="my-card-title">
              <Input
                prefix={<i className="iconfont icon-customer1"></i>}
                type="text"
                placeholder='请输入姓名'
                value={this.state.addFamilyValue.name}
                onChange={(e) => { this.changeAddFamilyValue('name',e.target.value) }}
              />
              <span
                className="cancel-btn"
                onClick={()=>{this.cancelAddFamilyValue()}}
              >
                取消
              </span>
              <span
                className="save-btn"
                onClick={()=>{this.saveAddFamilyValue()}}
              >
                保存
              </span>
            </div>
          }
        >
            <Row>
                <Col span={8}>
                  <span>关系：</span>
                </Col>
                <Col span={16}>
                  <Select
                    getPopupContainer={() => document.getElementsByClassName('families')[0]}
                    defaultValue='请选择关系'
                    value={this.state.addFamilyValue.relation}
                    onChange={(e) => { this.changeAddFamilyValue('relation',e)  }}
                  >
                    {
                      this.state.familyRelation.map((rel) => {
                        return (
                          <Option value={rel.name} key={rel.id}>{rel.name}</Option >
                        )
                      })
                    }
                  </Select> 
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <span>联系方式：</span>
                </Col>
                <Col span={16}>
                  <Input type="text" 
                    placeholder='请输入联系方式' 
                    value={this.state.addFamilyValue.phone}
                    onChange={(e) => { this.changeAddFamilyValue('phone',e.target.value) }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <span>身份证号：</span>
                </Col>
                <Col span={16}>
                  <Input type="text" 
                    value={this.state.addFamilyValue.certificate} 
                    placeholder='请输入身份证号'
                    onChange={(e) => { this.changeAddFamilyValue('certificate',e.target.value) }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <span>工作属性：</span>
                </Col>
                <Col span={16}>
                  <Select
                    getPopupContainer={() => document.getElementsByClassName('families')[0]}
                    defaultValue='请选择工作属性'
                     value={this.state.addFamilyValue.jobCategory} 
                     onChange={(e) => { this.changeAddFamilyValue('jobCategory',e) }}
                  >
                    {
                      this.state.commonJobCategory.map((job) => {
                        return (
                          <Option value={job.name} key={job.id}>{job.name}</Option >
                        )
                      })
                    }
                  </Select> 
                </Col>
              </Row>
      </Card>

    }else{
      //添加按钮
      addArea=
        <Card  className="family-card family-add-card">
          <i className="iconfont icon-create"  onClick={()=>{this.toggleAdd()}}></i>
          <p>新建家庭关系</p>
        </Card>
    }
    return (
      <div className="families">
        {
          this.state.editFamilyList.map((item, i) => {
            //查看方式
              if (!this.state.isModify[i]) {
                return (
                  <Card
                    className="family-card"
                    title={item.name}
                    key={item.id}
                    extra={
                      <div>
                        <a href="javascript:void(0);" onClick={(e) => { this.toggleEdit(i) }}><i className="iconfont icon-edit"></i>编辑</a>
                        <a href="#"><i className="iconfont icon-delete"></i>删除</a>
                      </div>
                    }
                  >
                    <Row>
                      <Col span={8}>
                        <span>关系：</span>
                      </Col>
                      <Col span={16}>
                        <span>{item.relation}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <span>联系方式：</span>
                      </Col>
                      <Col span={16}>
                        <span>{item.phone}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <span>身份证号：</span>
                      </Col>
                      <Col span={16}>
                        <span>{item.certificate}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <span>工作属性：</span>
                      </Col>
                      <Col span={16}>
                        <span>{item.jobCategory}</span>
                      </Col>
                    </Row>
                  </Card>

                )
              } else {
                //编辑方式
                return(
                  <Card
                    className="family-card family-card-modify"
                    title={
                      <div className="my-card-title">
                        <Input
                            prefix={<i className="iconfont icon-customer1"></i>}
                            type="text"
                            value={item.name}
                            onChange={(e) => { this.changeFamilyValue(i, 'name', e.target.value) }}
                          />
                          <span
                            className="cancel-btn"
                            onClick={(e) => { this.cancelFamilyValue(i) }}
                          >
                            取消
                          </span>
                          <span
                            className="save-btn"
                            onClick={(e) => { this.saveFamilyValue(i) }}
                          >
                          保存
                          </span>
                      </div>
                    }
                    key={item.id}
                  >
                    <Row>
                      <Col span={8}>
                        <span>关系：</span>
                      </Col>
                      <Col span={16}>
                        <Select
                          defaultValue={item.relation}
                          onChange=
                            {(value) => { this.changeFamilyValue(i, 'relation', value) }}
                          getPopupContainer={() => document.getElementsByClassName('families')[0]}
                        >
                          {
                            this.state.familyRelation.map((rel) => {
                              return (
                                <Option value={rel.name} key={rel.id}>{rel.name}</Option >
                              )
                            })
                          }
                        </Select>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <span>联系方式：</span>
                      </Col>
                      <Col span={16}>
                        <Input type="text" value={item.phone} onChange={(e) => { this.changeFamilyValue(i, 'phone', e.target.value) }} />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <span>身份证号：</span>
                      </Col>
                      <Col span={16}>
                        <Input type="text" value={item.certificate} onChange={(e) => { this.changeFamilyValue(i, 'certificate', e.target.value) }} />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <span>工作属性：</span>
                      </Col>
                      <Col span={16}>
                        <Select defaultValue={item.jobCategory} onChange={(value) => { this.changeFamilyValue(i, 'jobCategory', value) }}
                          getPopupContainer={() => document.getElementsByClassName('families')[0]}
                        >
                          {
                            this.state.commonJobCategory.map((job) => {
                              return (
                                <Option value={job.name} key={job.id}>{job.name}</Option >
                              )
                            })
                          }
                        </Select>
                      </Col>
                    </Row>
                  </Card>

                )
              }
          })
        }
        {
          addArea
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
