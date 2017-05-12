import React, {Component} from "react";
import {Button, Card, Input ,Modal,message, Row, Col, Form, Icon, Select,Spin} from "antd";
import API from "../../../../../../API";
import ajax from '../../../../../tools/POSTF'
import Reg from "../../../../../tools/Reg"
import { connect } from 'react-redux';
import {gridBeEdited,gridNotBeEdited} from '../../../../../redux/actions/gridsAction.js'
import update from 'immutability-helper'
import cloneDeep from 'lodash/cloneDeep'
import schema  from 'async-validator'
const FormItem = Form.Item;
const Option = Select.Option;

const validateConfig = {
  landArea:[{pattern:Reg.IntegerAndWhite,message:"必须为数字"}],
  residenceCount:[{pattern:Reg.IntegerAndWhite,message:"必须为数字"}],
  personCount:[{pattern:Reg.IntegerAndWhite,message:"必须为数字"}],
  addressDetail:[{len:100,message:'最多100个字符'}],
  remark:[{len:300,message:'最多300个字符'}]
}

function info(msg,color){
  console.log('%c'+msg,'color:'+color)
}

class AreaForm extends Component{
  state = {
	  provinceText:'',
    cityText:'',
    regionText:'',
    province:[],
    city:[],
    region:[],
    staffs:[],
    gridTypes:[],
    fields:{},
    validate:{}
  }
  componentWillMount(){
    let getProvinces = ajax.Get(API.GET_AREA_SELECT(1))
    let getGridTypes = ajax.Get(API.GET_COMMON_DROPDOWN('gridType'))
    let getOrganization = ajax.Get(API.GET_AREAS_ADD_DEPARTMENTS)
   ajax.all([getProvinces,getGridTypes,getOrganization])
      .then((res) =>{
        this.setState({
          province:res[0].data.data,
          gridTypes:res[1].data.data,
          organization:res[2].data.data
        })
      })
    this.resetState(this.props.area)
  }

  //处理输入的数据格式
  resetState = (obj) =>{
    let arry = obj.address.split(' ')
    let regionArry = obj.regionCode.split(' ')
    if(this.props.area.orgId !==undefined){
      this.getStaffsByDepartmentId(obj.orgId)
    }

    let getRegionPromise = []
    if(regionArry[0] !==undefined){
     let getCity =  ajax.Get(API.GET_AREA_SELECT(regionArry[0]))
      getRegionPromise.push(getCity)
    }

    if(regionArry[1] !==undefined){
      let getRegion = ajax.Get(API.GET_AREA_SELECT(regionArry[1]))
      getRegionPromise.push(getRegion)
    }

    ajax.all(getRegionPromise).then((res)=>{
      let newState;
      if(res.length === 1){
        newState = update(this.state,{city:{$set:res[0].data.data}})
      }
      if(res.length === 2){
        newState = update(this.state,{city:{$set:res[0].data.data},region:{$set:res[1].data.data}})
      }
      this.setState(newState)
    })

    let fields = this.transformData(obj);
    let validate = this.createValidate(fields)

    this.setState({
      fields:fields,
      validate:validate,
      provinceText:arry[0],
      cityText:arry[1],
      regionText:arry[2]
    })

  }

  createValidate = (obj) =>{
    return Object.keys(obj).reduce(function(pre,key){
      pre[key] = {validateStatus:"",message:""}
      return pre
    },{})
  }

  componentWillReceiveProps(nextProps){
    info('this.props.id'+this.props.id,'red')
    info('nextProps'+nextProps.id,'blue')
    if(this.props.area.id !== nextProps.area.id){
      this.resetState(nextProps.area)
    }
  }

  transformData = (obj) => {
    let intToStringKeys= ['director','orgId','areaType']
    let result = {}
    for(let key in obj){
      if(intToStringKeys.indexOf(key) > -1) {
        result[key] = obj[key] ? obj[key].toString() : undefined
      }else if(key === 'regionCode'){
        let arry = obj.regionCode.split(' ')
        result.province = arry[0]
        result.city = arry[1]
        result.region = arry[2]
      }else if(key === 'address'){
        result.addressDetail = obj[key].split(' ')[3]
      }else{
        result[key] = obj[key]
      }
    }
    return result;
  }

  getCity = (value) => {
    ajax.Get(API.GET_AREA_SELECT(value))
      .then(res => {
        this.setState({
          city:res.data.data
        })
      })
  }

  handleProvinceChange = (value)=>{
    this.getCity(value);
    let newState = update(this.state,{fields:{province:{$set:value},city:{$set:''},region:{$set:''}},region:{$set:[]}})
    this.props.dispatch(gridBeEdited())
    this.setState(newState)
  }

  getRegion = (value) => {
    ajax.Get(API.GET_AREA_SELECT(value))
      .then(res => {
        this.setState({
          region:res.data.data
        })
      })
  }


  handleCityChange = (value) =>{
    this.getRegion(value)
    let newState = update(this.state,{fields:{city:{$set:value},region:{$set:''}}})
    this.setState(newState)
    this.props.dispatch(gridBeEdited())
  }

  handleRegionChange = (value) =>{
    let newState = update(this.state,{fields:{region:{$set:value}}})
    this.setState(newState)
    this.props.dispatch(gridBeEdited())
  }

  orgIdChange = (value) => {
    this.getStaffsByDepartmentId(value);
    let newState = update(this.state,{fields:{orgId:{$set:value},director:{$set:''}}})
    this.setState(newState)
    this.props.dispatch(gridBeEdited())
  }

  getStaffsByDepartmentId = (id) => {
    ajax.Get(API.GET_DEPARTMENT_STAFFS(id))
      .then((res)=>{
        this.setState({
          staffs:res.data.data
        })
      })
  }

  handleClose = () => {
    const okHandler = ()=>{
      this.props.close()
      this.props.dispatch(gridNotBeEdited())
    }


    if(this.props.gridBeEdited){
      Modal.confirm({
        title:"确认关闭?",
        content:"您有修改没有保存，确认关闭?",
        onOk:okHandler
      })
    }else{
      this.props.close()
    }
  }

  validateSigleValue = (field,value) => {
    for(let index in validateConfig[field]){
      let rule = validateConfig[field][index]
      if(rule.pattern !== undefined){
        if(rule.pattern.test(value)){
          return {[field]:{validateStatus:'',message:''}}
        }else{
          return {[field]:{validateStatus:'error',message:rule.message}}
        }
      }else if(rule.len !== undefined){
        if(value.length <= rule.len){
          return {[field]:{validateStatus:'',message:''}}
        }else{
          return {[field]:{validateStatus:'error',message:rule.message}}
        }
      }
    }
  }

  handleChange = (e)=>{
    let errors = this.validateSigleValue(e.target.name,e.target.value)
    let field = e.target.name;
    let newState = update(this.state,{fields:{[field]:{$set:e.target.value}}})
    if(errors){
      newState = update(newState,{validate:{[field]:{$set:{...errors[field]}}}})
    }
    this.props.dispatch(gridBeEdited())
    this.setState(newState)
  }

  handleSelectChange(field,value){
    this.props.dispatch(gridBeEdited())
    let newState = update(this.state,{fields:{[field]:{$set:value}}})
    this.setState(newState)
  }


  transformToServer = (obj) => {
    delete obj.areaName
    delete obj.addressDetail
    delete obj.city
    delete obj.directorName
    delete obj.orgName
    obj.director = obj.director === undefined ? "":obj.director
  }
  handleSubmit = () => {
    const id = this.props.id;
    const {province,city,region,addressDetail} = this.state.fields
    if(province === "" || city === "" || region === "" || addressDetail === ''){
      Modal.error({
        content:'请完善您的地址信息'

      })
    }else{
      const pName = this.state.province.find(item => item.id == province).name
      const cName = this.state.city.find(item => item.id == city).name
      const rName = this.state.region.find(item => item.id == region).name
      let address = pName +' '+ cName +' '+rName + ' ' + addressDetail

      let fieldsValue = cloneDeep(this.state.fields)
      fieldsValue.address = address;
      this.transformToServer(fieldsValue)
      console.dir(fieldsValue)
      ajax.Put(API.PUT_API_AREA(id),fieldsValue)
        .then((res) => {
          console.dir(res)
          if(res.data.code === 200){
            this.props.getTableData()
            message.success('员工修改成功',5)
            this.props.dispatch(gridNotBeEdited())
          }else{
            Modal.error({
              title:'操作失败',
              content:res.data.message
            })
          }

        })
    }
  }

	render(){
    console.log(this.state.validate.landArea.validateStatus)
    const Province = <Select
      placeholder="选择省份"
      notFoundContent="没有省份"
      onChange={this.handleProvinceChange}
      value={this.state.fields.province}
    >
      {this.state.province.map((item,index)=>(<Option value={item.id.toString()} key={item.id.toString()}>{item.name}</Option>))}
    </Select>


    const City = <Select
      placeholder="选择城市"
      notFoundContent="没有城市"
      onChange={this.handleCityChange}
      name="city"
      value={this.state.fields.city || undefined}
    >
      {this.state.city.map((item,index)=>(<Option value={item.id.toString()} key={item.id.toString()}>{item.name}</Option>))}
    </Select>

    const Region = <Select
      placeholder="选择地区"
      notFoundContent="没有地区"
      name="region"
      onChange={this.handleRegionChange}
      value={this.state.fields.region || undefined}
    >
      {this.state.region.map((item,index)=>(<Option value={item.id.toString()} key={item.id.toString()}>{item.name}</Option>))}
    </Select>

    let forms = ()=>{
      if(this.state.province.length > 0){
        return <div>
          <Form>
            <Row className="fristrow">
              <Col span={12} className="fristcol">
                <FormItem
                  wrapperCol={{span: 20}}
                  className="idnumber"
                >
                  <span className="gridname">{this.props.area.name}</span>
                </FormItem>
              </Col>
              <Icon
                className="close"
                onClick={this.handleClose}
                type="close"
                style={{fontSize:"24px",cursor:"pointer"}}
              />
            </Row>
            <div className="ant-form-white">
              <Row>
                <Col span={12}>
                  <FormItem labelCol={{span: 8}}
                            wrapperCol={{span: 15}}
                            label="所属机构"
                            className="required"

                  >
                    <Select
                      getPopupContainer={() => document.getElementById('RoleEdit')}
                      className="selectorgId"
                      name="orgId"
                      onChange={this.orgIdChange}
                      value={this.state.fields.orgId}
                      validateStatus={this.state.validate.orgId.validateStatus}
                      help={this.state.validate.orgId.message}
                    >
                      {
                        this.state.organization.map((item,index)=>(<Option key={item.id.toString()} value={item.id.toString()}>{item.name}</Option>))
                      }
                    </Select>
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem  labelCol={{span: 8,offset:1}}
                             wrapperCol={{span: 15}}
                             label="网格负责人"
                             className="idnumber"
                  >
                    <Select
                      placeholder="选择网格负责人"
                      notFoundContent="没有找到对应员工"
                      onChange={this.handleSelectChange.bind(this,'director')}
                      name="director"
                      value={this.state.fields.director || undefined}
                      validateStatus={this.state.validate.director.validateStatus}
                      help={this.state.validate.director.message}
                    >
                      {this.state.staffs.map((item,index)=>(<Option key={item.id.toString()}>{item.name}</Option>))}
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12} >
                  <FormItem labelCol={{span: 8}}
                            wrapperCol={{span: 15}}
                            label="网格类型"
                            className="required"
                            validateStatus={this.state.validate.areaType.validateStatus}
                            help={this.state.validate.areaType.message}
                  >
                    <Select
                      name="areaType"
                      onChange={this.handleSelectChange.bind(this,'areaType')}
                      value={this.state.fields.areaType}
                    >
                      {this.state.gridTypes.map((item)=>(<Option key={item.id.toString()}>{item.name}</Option>))}
                    </Select>
                  </FormItem>
                </Col>

                <Col span={12} className="">
                  <FormItem labelCol={{span: 8,offset:1}}
                            wrapperCol={{span: 15}}
                            label="网格面积"
                            validateStatus={this.state.validate.landArea.validateStatus}
                            help={this.state.validate.landArea.message}
                  >
                    <Input name="landArea" value={this.state.fields.landArea} onChange={this.handleChange}/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12} className="">
                  <FormItem labelCol={{span: 8}}
                            wrapperCol={{span: 15}}
                            label="网格户口数"
                            className="idnumber"
                            validateStatus={this.state.validate.residenceCount.validateStatus}
                            help={this.state.validate.residenceCount.message}
                  >
                    <Input name="residenceCount" value={this.state.fields.residenceCount} onChange={this.handleChange} />
                  </FormItem>
                </Col>

                <Col span={12} className="">
                  <FormItem labelCol={{span: 8,offset:1}}
                            wrapperCol={{span: 15}}
                            label="网格人口数"
                            validateStatus={this.state.validate.personCount.validateStatus}
                            help={this.state.validate.personCount.message}
                  >
                    <Input name="personCount" value={this.state.fields.personCount} onChange={this.handleChange} />
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={8} className="required">
                <Col span={8}>
                  <FormItem
                    label={<span>地址</span>}
                    labelCol={{span:12}}
                    wrapperCol={{span:12}}
                  >
                    {Province}
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem
                    wrapperCol={{span:24}}
                  >
                    {City}
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem
                    wrapperCol={{span:24}}
                  >
                    {Region}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem
                    labelCol={{span: 4}}
                    wrapperCol={{span: 20}}
                    label="详细地址"
                    className="required"
                    validateStatus={this.state.validate.addressDetail.validateStatus}
                    help={this.state.validate.addressDetail.message}
                  >
                    <Input name="addressDetail" value={this.state.fields.addressDetail} onChange={this.handleChange}/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24} className="">
                  <FormItem labelCol={{span: 4}}
                            wrapperCol={{span: 20}}
                            label="网格描述"
                            className="idnumber"
                            validateStatus={this.state.validate.remark.validateStatus}
                            help={this.state.validate.remark.message}
                  >
                    <Input name="remark" type="textarea" autosize={{ minRows: 2, maxRows: 8 }} value={this.state.fields.remark} onChange={this.handleChange}/>
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Form>
          <Row className="buttonsave buttonrow">
            <Col span={24} >
              <Col span={4}>
              </Col>
              <Button type="primary" disabled={!this.props.gridBeEdited} onClick={this.handleSubmit} className={this.props.gridBeEdited ? "ablesavebtn" : "disablesavebtn"}>保存</Button>
            </Col>
          </Row>
        </div>
      }else{
        return <Spin />
      }
    }
    return forms()
	}
}




function mapStateToProp(store){
  return {
    gridBeEdited:store.grids.beEdited
  }
}

export default connect(mapStateToProp)(AreaForm);
