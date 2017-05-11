import React,{Component} from 'react'
import {Button, Card, Col, DatePicker, Form, Input, Row, Select,Radio,Modal,message} from "antd";
import {connect} from "react-redux";
import API from "../../../../../../API";
import ajax from '../../../../../tools/POSTF'
import Reg from "../../../../../tools/Reg"
import $ from 'jquery'
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class StaffBaseForm extends Component{

  state = {
    changed:false,
    rolesDropDown:[],
    rolesHide : false,
    loading:false,
    province:[],
    city:[],
    region:[]
  }

  inputChange=()=>{
    this.setState({
      changed:true,
      loading : false
    })
    this.props.hasChangeBase()
  }
  componentWillMount() {
    console.log('%cStaffBaseForm will mount','color:red');
    ajax.Get(API.GET_ROLES)
    .then((res)=>{
      this.setState({
        rolesDropDown:res.data.data
      })
    })
    //省
    ajax.Get(API.GET_AREA_SELECT(1))
      .then(res => {
        this.setState({
          province:res.data.data
        })
      })
    this.getCity(this.props.baseInfo.provinceCode.value);
    this.getRegion(this.props.baseInfo.cityCode.value);

  }

  getCity = (value) => {
    ajax.Get(API.GET_AREA_SELECT(value))
      .then(res => {
        this.setState({
          city:res.data.data
        })
      })
  }

  getRegion = (value) => {
    ajax.Get(API.GET_AREA_SELECT(value))
      .then(res => {
        this.setState({
          region:res.data.data
        })
      })
  }

  componentWillReceiveProps(nextProps){
    console.log('StaffBaseForm will receive props.')
    const { getFieldValue} = this.props.form;

    if(nextProps.id !== this.props.id){
      this.setState({
        changed:false
      })
      ajax.Get(API.GET_AREA_SELECT(1))
      .then(res => {
        this.setState({
          province:res.data.data
        })
      })
      this.getCity(this.props.baseInfo.provinceCode.value);
      this.getRegion(this.props.baseInfo.cityCode.value);
    }

    this.setState({
       rolesHide:  getFieldValue("isUser")
    })
  }

  inputProvinceChange = (e) => {
    this.getCity(e)
    this.props.form.setFieldsValue({
      cityCode:undefined,
      regionNum:undefined
    })
    this.setState({
      changed:true,
      loading : false
    })
    this.props.hasChangeBase()
  }

  inputCityChange = (e) => {
       this.getRegion(e)
       this.props.form.setFieldsValue({
          regionNum:undefined
        })
       this.setState({
      changed:true,
      loading : false
    })
    this.props.hasChangeBase()
  }

  onHandleSubmit = () => {
    const { getFieldsValue,getFieldsError,getFieldValue} = this.props.form;
    this.props.form.validateFields()
    this.props.hasNoChangeBase()

    this.setState({
      loading:true
    })
    const id = this.props.id;
    const FieldsValue = getFieldsValue();
    FieldsValue.birth = FieldsValue.birth && FieldsValue.birth.format('YYYY-MM-DD')
    // FieldsValue.roles = FieldsValue.roles.map(item => parseInt(item));

   
    this.props.form.validateFields()
    let fieldErrors = this.props.form.getFieldsError();
    let hasError = false;
    for(let [key,value] of Object.entries(fieldErrors)){
      if(Array.isArray(value)){
        hasError = true;
        break; 
      }
    }
    
    if (getFieldValue('provinceCode') && getFieldValue('cityCode') &&  getFieldValue('regionNum')) {
       let provinceName = this.state.province.find(item => item.id == getFieldValue('provinceCode')).name;
      let cityName = this.state.city.find(item => item.id == getFieldValue('cityCode')).name;
      let regionName = this.state.region.find(item => item.id == getFieldValue('regionNum')).name;
      let address = provinceName + ' ' + cityName + ' ' + regionName + ' ' + getFieldValue('addressDetial');
      FieldsValue.address = address;
      delete FieldsValue.provinceCode;
      delete FieldsValue.cityCode;
      delete FieldsValue.regionNum;
      if(hasError){
        Modal.error({content: '信息填写有误',})
      }else{
        ajax.Put(API.PUT_STAFF_BASIC(id),FieldsValue)
      .then(() => {
        this.props.getStaffs()
        this.setState({
          changed:false,
          loading:false
        })
        message.success('您已经修改成功！');
        })
      }
      
    }else{
      Modal.error({content: '地址选择不能为空',})
    }
    
  }



  render(){
    let {baseInfo} = this.props;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };

    const {getFieldDecorator} = this.props.form;
    const {rolesDropDown,rolesHide} = this.state;
    const {gender} = this.props.dropdown;
    const Gender = gender.length>0 ? getFieldDecorator('gender', {
      rules: [{required: true, message: '请选择性别!'}],
      onChange:this.inputChange,
    })(
      <Select
        placeholder="请选择性别"
        getPopupContainer={ () => document.getElementById('staffEditor')}
      >
        {
          gender.map(item => {
            return <Option value={item.id.toString()} key={item.id}>{item.name}</Option>
          })
        }
      </Select>)
  : null
  

    return (
      <Card
        title={(
          <Row>
            <Col span="18">
              <h3>个人档案</h3>
            </Col>
            
          </Row>
        )}
        className="staffbase"
      >
        <Form>
        <Row>
          <Col span={12}>
            <FormItem
              label={<span>姓名</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('name', {
                rules: [{required: true, message: '请填写员工姓名!'}],
                onChange:this.inputChange,
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={<span>性别</span>}
              {...formItemLayout}
            >
              {Gender}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              label={<span>证件号码</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('certificateNo', {
                rules: [{required: false, message: '请填写证件号码!'}],
                onChange:this.inputChange,
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={<span>邮箱</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('email', {
                rules: [{required: false, message: '请输入邮箱!'}],
                onChange:this.inputChange,
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              label={<span>出生日期</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('birth', {
                rules: [{required: false, message: '请选择出生日期!'}],
                onChange:this.inputChange,
              })(
                <DatePicker
                  getCalendarContainer={ () => document.getElementById('staffEditor')}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={<span>手机</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('phone', {
                rules: [{required: true, message: '请填写手机号码!',len:11}],
                onChange:this.inputChange,
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              label={<span>微信号</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('wechat', {
                rules: [{required: false, message: '请输入微信号!',min:1,max:50}],
                onChange:this.inputChange,
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={<span>添加用户</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('isUser', {
                rules: [{required: true, message: '添加用户!'}],
                onChange:this.inputChange,
              })(
                <RadioGroup>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
        </Row>
        {
          rolesHide ? 
          <Row>
          <Col span={24}>
            <FormItem
              label={<span>选择角色</span>}
              labelCol={{span:3}}
              wrapperCol={{span:19}}
            >
              {getFieldDecorator('roles', {
                rules: [{required: true, message: '请选择角色！'}],
                onChange:this.inputChange,
              })(
                <Select
                  mode="multiple"
                  getPopupContainer={ () => document.getElementById('staffEditor')}
                >
                  {
                    rolesDropDown && rolesDropDown.map(item => {
                      return <Option value={item.id.toString()} key={item.id.toString()}>{item.roleName}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        : null
        }
        













        <Row gutter= {8}>
          <Col span={9}>
            <FormItem
              label={<span>家庭住址</span>}
              labelCol={{span:8}}
              wrapperCol={{span:16}}
              key='province'
            >
              {getFieldDecorator('provinceCode', {
                rules: [{ message: '省份'}],
                onChange:this.inputProvinceChange
                // initialValue: ''
              })(
                <Select
                  placeholder="省份"
                  getPopupContainer={
                    () => document.getElementById('staffEditor')
                  }
                >
                  {this.state.province && this.state.province.map((option, index) => {
                    return <Option value={option.id.toString()} key={'position' + index}>{option.name}</Option>
                  })}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={6}>
            <FormItem
              wrapperCol={{span:24}}
              key='city'
            >
              {getFieldDecorator('cityCode', {
                rules: [{ message: '城市'}],
                onChange:this.inputCityChange
                // initialValue: ''
              })(
                <Select
                  placeholder="城市"
                  getPopupContainer={
                    () => document.getElementById('staffEditor')
                  }
                >
                  {this.state.city && this.state.city.map((option, index) => {
                    return <Option value={option.id.toString()} key={'position' + index}>{option.name}</Option>
                  })}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={6}>
            <FormItem
              wrapperCol={{span:24}}
              key='region'
            >
              {getFieldDecorator('regionNum', {
                rules: [{ message: '地区'}],
                onChange:this.inputChange
                // initialValue: ''
              })(
                <Select
                  placeholder="地区"
                  getPopupContainer={
                    () => document.getElementById('staffEditor')
                  }
                >
                  {this.state.region && this.state.region.map((option, index) => {
                    return <Option value={option.id.toString()} key={'position' + index}>{option.name}</Option>
                  })}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

















        <Row>
          <Col span={24}>
            <FormItem
              label={<span>详细地址</span>}
              labelCol={{span:3}}
              wrapperCol={{span:19}}
            >
              {getFieldDecorator('addressDetial', {
                rules: [{required: false, message: '请填写家庭住址!'}],
                onChange:this.inputChange,
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
        </Form>
        <Row className="buttonrow">
          {/*<Col span="3">
              <Button
                className="cancel"
                // disabled={this.state.changed ? true : false}
              >取消</Button>
            </Col>  */}
            <Col span="3"></Col>
            <Col span="20">
              <Button
                className={this.state.changed ? "ablesavebtn" : "disablesavebtn"}
                disabled={this.state.changed ? false : true}
                htmlType="submit"
                onClick={this.onHandleSubmit}
                loading={this.state.loading}

              >保存</Button>
            </Col>
        </Row>
      </Card>
    )
  }
}

function mapStateToProps(store) {
  return {
    dropdown: store.dropdown
  }
}


function mapPropsToFields(props){
  console.log("StaffBaseForm, mapStateToProps");
  const {baseInfo} = props;
  console.log(baseInfo)
  return {
    name:{
      ...baseInfo.name
    },
    certificateNo:{
      ...baseInfo.certificateNo
    },
    email:{
      ...baseInfo.email
    },
    birth:{
      ...baseInfo.birth
    },
    phone:{
      ...baseInfo.phone
    },
    wechat:{
      ...baseInfo.wechat
    },
    address:{
      ...baseInfo.address
    },
    gender:{
      ...baseInfo.gender
    },
    isUser:{
      ...baseInfo.isUser
    },
    roles:{
      ...baseInfo.roles
    },
    province:{
      ...baseInfo.province
    },
    city:{
      ...baseInfo.city
    },
    region:{
      ...baseInfo.region
    },
    regionCode:{
      ...baseInfo.regionCode
    },
    provinceCode:{
      ...baseInfo.provinceCode
    },
    cityCode:{
      ...baseInfo.cityCode
    },
    regionNum:{
      ...baseInfo.regionNum
    },
    addressDetial:{
      ...baseInfo.addressDetial
    }
  }
}

function onFieldsChange(props,changedFields){
  props.onChange(changedFields)
}

export default connect(mapStateToProps)(Form.create({
  mapPropsToFields
})(StaffBaseForm));
