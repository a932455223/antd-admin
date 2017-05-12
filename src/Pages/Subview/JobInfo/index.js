import React, { Component } from 'react';
import {
  Card,
  Tabs,
  Row,
  Col,
  Icon,
  Form,
  InputNumber,
  Input,
  Button,
  Tag,
  Select,
  DatePicker,
  Timeline,
  Modal,
  Spin,
  message
 } from 'antd';
// import axios from 'axios';
import API from '../../../../API';
import { connect } from 'react-redux';
import ajax from '../../../tools/POSTF.js';
import update from 'immutability-helper';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
import './indexStyle.less';

function info(msg, color = 'red') {
  console.log("%c" + msg, 'color:' + color);
}

class MyJobInfo extends Component{
  state={
    inputDisabled:false,
    btnEdit:false
  }
  inputChange = (e) => {
    // console.log('things changed');
    // console.log(e)
    this.setState({btnEdit:true})
    
    if(typeof e === 'string'){
      this.setState({inputDisabled:this.getDisabled(e)})
      if( e!= '61'&& e != '64'){
        // let newState={...this.state.eachJobInfo,businessPrice:"",businessScope:"",businessYield:""};
        // this.setState({eachJobInfo,newState})
        
        this.props.resetJob();
      }
        
    }
    // const { dispatch } = this.props;
    // dispatch(customerInfoBeEdit())
  }

  handleClose = () => {

  }
  getDisabled=(id)=>{
    // console.log(id)
    if(id==='61'||id==='64')
      return false;
    else
      return true;
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    this.props.form.validateFields()
    let formErrors = this.props.form.getFieldsError()
    let noError=true;
    let values=this.props.form.getFieldsValue();
    // console.log('=====',values)
    // console.log(formErrors)
    Object.keys(formErrors).map((item,index)=>{
          
        if(!(formErrors[item]===undefined)){
            Modal.error({
                title:'情仔细填写表单',
            });
            noError=false;
        }
    })
    if(noError){
      this.props.toggleBtnLoading();
      setTimeout(()=>{
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.putJobinfo(values)

            // console.log('Received values of form: ', values);
            // _this.setState({
            //   answers:Object.values(values).filter(Boolean)
            // })
            // this.putCustomerRiskQuestion(Object.values(values).filter(Boolean));
            // this.getCustomerPreRiskQuestions(this.props.currentId);
            // console.log(values.filter(Boolean))
            // values.map((Item)=>{
            // })
            this.props.toggleBtnLoading();
            this.setState({btnEdit:false});
          }
        });
      },2000)
    }

  }
  render() {
    const {eachJobInfo, edited, currentId, createCustomerSuccess} = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
    return (
        <Form id="myjobbase" className="basicinfolist" onSubmit={this.handleSubmit}>
          {/*<pre className="language-bash" style={{textAlign:'left'}}>
            {JSON.stringify(this.state, null, 2)}
          </pre>*/}
          <Row className={currentId === -1 ? "briefinfocreate" : "briefinfoedit"} type="flex" justify="space-between">
            <Col span={8}>
              <FormItem labelCol={{span: 11}}
                        wrapperCol={{span: 13}}
                        label="工作属性">
                {getFieldDecorator('jobCategory', {
                  rules: [{
                    required: true, message: '工作属性不能为空'
                  }],
                  initialValue:eachJobInfo.jobCategory===null?undefined:eachJobInfo.jobCategory.toString(),
                  onChange: this.inputChange
                })(
                    <Select
                      showSearch
                      placeholder="选择工作属性"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      getPopupContainer={() => document.getElementById('myjobbase')}
                    >
                      {
                        this.props.commonJobCategory.map((rel)=>{
                          return(
                             <Option 
                                  value={rel.id.toString()}
                                  key={rel.id.toString()}
                              >
                                  {rel.name}
                              </Option >
                          )
                        })
                      }
                    </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <div className="personinfo">
            <Row>
              <Col span={24} className={currentId === -1 ? "phonecreate" : "phoneedit"}>
                <FormItem labelCol={{span: 4}}
                          wrapperCol={{span: 20}}
                          label="经营范围">
                  {getFieldDecorator('businessScope', {
                    initialValue: eachJobInfo.businessScope,
                    onChange: this.inputChange,
                  })(
                    <Input disabled={this.state.inputDisabled}/>
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12} className={currentId === -1 ? "idcreate" : "idedit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="经营产量"
                          className="idnumber"
                          >

                  {getFieldDecorator('businessYield', {
                    initialValue: eachJobInfo.businessYield,
                    onChange: this.inputChange,
                    
                  })(
                    <Input disabled={this.state.inputDisabled}/>
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "birthcreate" : "birthedit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="产量单价">
                  {getFieldDecorator('businessPrice', {
                    initialValue: eachJobInfo.businessPrice,
                    onChange: this.inputChange,
                  })(
                    <Input disabled={this.state.inputDisabled} />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12} className={currentId === -1 ? "idcreate" : "idedit"}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 15}}
                          label="月收入"
                          className="idnumber"
                          >

                  {getFieldDecorator('monthIncome', {
                    initialValue: eachJobInfo.monthIncome,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "birthcreate" : "birthedit"}>
                <FormItem labelCol={{span: 8,offset:1}}
                          wrapperCol={{span: 15}}
                          label="年收入">
                  {getFieldDecorator('yearIncome', {
                    initialValue: eachJobInfo.yearIncome,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
          </div>
          <Row className="buttonsave">
            <Col span={24} >
              <Col span={4}>
              </Col>
                <Button type="primary"  
                htmlType="submit" 
                onClick={createCustomerSuccess}
                disabled={!this.state.btnEdit}
                loading={this.props.btnLoading}
                >保存</Button>
            </Col>
          </Row>
        </Form>
      )
  }
}
const JobInfoForm = Form.create()(MyJobInfo);

class JobInfo extends Component {
  state = {
    modalVisible: false,
    edited:false,
    eachJobInfo: '',
    commonJobCategory:[],
    btnLoading:false,
  }
  resetJob=()=>{
    let newState=update(
        this.state,{
            eachJobInfo:{
              businessPrice:{$set:''},
              businessScope:{$set:''},
              businessYield:{$set:''},
            },
          }
      )
      // console.log(newState)
      this.setState(newState)
  }
  toggleBtnLoading=()=>{
    this.setState({btnLoading:!this.state.btnLoading})
  }
  getInitialState(){
  }
  componentWillMount(){
    this.getBaseInfo(this.props.currentCustomerInfo.id)
    this.getCommonJobCategory();
  }
  componentWillReceiveProps(next){
      if(next.currentCustomerInfo.id!==this.props.currentCustomerInfo.id){
        this.getBaseInfo(next.currentCustomerInfo.id);
      }
  }
  
  //获得工作信息
  getBaseInfo = (id) => {
      ajax.Get(API.GET_JOBINFO_BASE(id))
      .then((res) => {
        if(res.data.code===200&&res.data.message==='OK'){
          this.setState({
              ...this.state,
            eachJobInfo: res.data.data,
            currentId:this.props.currentCustomerInfo.id
          })
        }
          
      })
  }
  //修改工作信息
  putJobinfo=(data)=>{
    // console.log('putjoninfo')
    ajax.Put(API.PUT_JOBINFO_BASE(this.props.currentCustomerInfo.id),data)
      .then((res)=>{
        if(res.data.code===200&&res.data.message==='OK'){
          this.getBaseInfo(this.props.currentCustomerInfo.id);
          message.success('更改成功');
        }
      })
  }
  //获取工作属性下拉菜单
  getCommonJobCategory(){
    ajax.Get(API.GET_COMMON_DROPDOWN('commonJobCategory'))
      .then((res)=>{
        if(res.data.code===200&&res.data.message==='OK'){
          this.setState({
            commonJobCategory:res.data.data
          })
        }
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
    const {eachJobInfo,edited} = this.state;
    // console.log(this.props);
    return(
        <div className="">
          {/*<pre className="language-bash" style={{textAlign:'left'}}>
          {JSON.stringify(this.state, null, 2)}
          </pre>*/}
        
          {
            Object.keys(this.state.eachJobInfo).length > 0 ? 
            <JobInfoForm
              key={this.state.currentId}
              customerInfoBeEdit={customerInfoBeEdit}
              currentId={this.props.currentId}
              eachJobInfo={this.state.eachJobInfo}
              commonJobCategory={this.state.commonJobCategory}
              putJobinfo={this.putJobinfo}
              btnLoading={this.state.btnLoading}
              toggleBtnLoading={this.toggleBtnLoading}
              resetJob={this.resetJob}
            />:
            <Spin />
          }
        </div>
    )
  }
}


const mapStateToProps = (store) => {
  // console.log(store)
  return {
    currentCustomerInfo: store.customer.currentCustomerInfo,
    currentId: store.customer.currentCustomerInfo.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCustomerSuccess:(id) => {dispatch(createCustomerSuccess(id))},
    customerInfoBeEdit: () => {dispatch(customerInfoBeEdit())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(JobInfo);
