import React,{Component} from 'react'
import {Button, Card, Col, DatePicker, Form, Input, Row, Select,Radio,Modal,message,Icon} from "antd";
import {connect} from "react-redux";
import API from "../../../../../../API";
import ajax from '../../../../../tools/POSTF'
import Reg from "../../../../../tools/Reg"
import $ from 'jquery'
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class BranchBaseInfoForm extends Component{
	state = {
    changed : false,
    loading:false,
    categoryDropdown: [],
    parentDepartmentDropDown:[],
    province:[],
    area:[],
    city:[]
  }

  componentWillMount() {
  	 ajax.Get(API.GET_ADD_DEPARTMENT_CATEGORIES)
  	 .then((res) => {
  	 	this.setState({
  	 		categoryDropdown : res.data.data
  	 	})
  	 }) 

  	ajax.Get(API.GET_AREA_SELECT(1))
      .then((res) => {
      	console.log(res)
        this.setState({
          province:res.data.data
        })
  	})
  }

  componentWillReceiveProps(nextProps) {
  	if(nextProps.branchInfo){
  		if(!this.props.branchInfo || this.props.branchInfo.category.value !== nextProps.branchInfo.category.value){
  			let value = nextProps.branchInfo.category.value;
		  	ajax.Get(API.GET_ADD_DEPARTMENT_PARENT, {
			      level: value
			    }).then(res => {
			      this.setState({
			        parentDepartmentDropDown: res.data.data
			      })
			    })
  		}

  		if(!this.props.branchInfo || this.props.branchInfo.province.value !== nextProps.branchInfo.province.value && nextProps.branchInfo.province.value){
	    		this.getCity(nextProps.branchInfo.province.value)
  		}

  		if(!this.props.branchInfo || this.props.branchInfo.city.value !== nextProps.branchInfo.city.value && nextProps.branchInfo.city.value){
	    		this.getArea(nextProps.branchInfo.city.value)
  		}
  	}
  
  }
  onhandleClick = () => {
  	this.setState({
      loading:true
    })
    const id = this.props.id;
    const { getFieldsValue,getFieldValue} = this.props.form;
    const FieldsValue = getFieldsValue();
    console.log(7777,FieldsValue);

    const pid = getFieldValue('province')
    const cid = getFieldValue('city')
    const rid = getFieldValue('area')
    if(pid === undefined || cid === undefined || rid === undefined){
      Modal.error({
        content:'请仔细检查您填写的地址'
      })
    }else{
      const province = this.state.province.find(item => item.id == pid) && this.state.province.find(item => item.id == pid).name
      const city = this.state.city.find(item => item.id == cid) && this.state.city.find(item => item.id == cid).name
      const area = this.state.area.find(item => item.id == rid) && this.state.area.find(item => item.id == rid).name
      let address = province +' '+ city +' '+area + ' ' + getFieldValue('addressDetail')
      FieldsValue.address = address
      delete FieldsValue.city
      delete FieldsValue.province
      delete FieldsValue.area

		    this.props.form.validateFields()
		    let fieldErrors = this.props.form.getFieldsError();
		    let hasError = false;
		    for(let [key,value] of Object.entries(fieldErrors)){
		      if(Array.isArray(value)){
		        hasError = true;
		       break; 
		      }
		    }
		    if(hasError){
			      Modal.error({content: '信息填写有误',})
			    }else{
			    	console.log(8888)
			      ajax.Put(API.PUT_DEPARTMENT(id),FieldsValue)
			      .then(() => {
			      this.props.getDepartments()
			      this.setState({
			        changed:false,
			        loading:false
			      })
			      message.success('您已经修改成功！');
			    })
		    }
		  }
  }
  onHandleSelect = (value) => {
  	console.log(value)
  	ajax.Get(API.GET_ADD_DEPARTMENT_PARENT, {
	      level: value
	    }).then(res => {
	    	console.log(res)
	      this.setState({
	        parentDepartmentDropDown: res.data.data
	      })
	    })
	  this.props.form.setFieldsValue({
      parentOrg:undefined
    })
  }

  inputChange=()=>{
    this.setState({
      changed:true,
      loading : false
    })
  }

  getCity = (value) => {
    ajax.Get(API.GET_AREA_SELECT(value))
      .then(res => {
      	console.log(res)
        this.setState({
          city:res.data.data
        })
      })
  }

  getArea = (value) => {
    ajax.Get(API.GET_AREA_SELECT(value))
      .then(res => {
        this.setState({
          area:res.data.data
        })
      })
  }
  onHandleSelectProvince = (value) => {
  		this.getCity(value)
  		this.props.form.setFieldsValue({
      city:undefined,
      area:undefined
    })
  }

  onHandleSelectCity = (value) => {
  		this.getArea(value)
  		this.props.form.setFieldsValue({
      area:undefined
    })
  }
	render() {
		const {getFieldDecorator} = this.props.form;
		const {province,city,area} = this.state;
    const Province = province.length > 0 ? getFieldDecorator('province',{
    	rules:[{require:true}]
    })(
      <Select
        placeholder="选择省份"
        notFoundContent="没有省份"
        onChange={this.getCity}
        onSelect={this.onHandleSelectProvince}
      >
        {province.map((item,index)=>(<Option key={item.id.toString()}>{item.name}</Option>))}
      </Select>):null


    const City = getFieldDecorator('city',{
    	rules:[{require:true}]
    })(
      <Select
       placeholder="选择城市"
       notFoundContent="没有城市"
       onChange={this.getArea}
       onSelect={this.onHandleSelectCity}
      >
        {city.map((item,index)=>(<Option key={item.id.toString()}>{item.name}</Option>))}
      </Select>)

    const Area = getFieldDecorator('area',{
    	rules:[{require:true}]
    })(
      <Select
        placeholder="选择地区"
        notFoundContent="没有地区"
      >
        {area.map((item,index)=>(<Option key={item.id.toString()}>{item.name}</Option>))}
      </Select>)

    const {categoryDropdown,parentDepartmentDropDown} = this.state;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };

    return (
    	<div>
      <Form>
          <Row className="dock-title">
            <Col span={22}>
              详情
            </Col>
            <Col span={2}>
            <Icon
              className="close"
              onClick={this.props.closeDock}
              type="close"
              style={{cursor:"pointer"}}
            />
            </Col>
          </Row>

          {/*组织信息*/}
          <Card
            title={(
                  <h3>个人档案</h3>
            )}
          >
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>组织名称</span>}
                  {...formItemLayout}

                >
                  {getFieldDecorator('name', {
                    rules: [{required: true, message: '组织名称!',min:4,max:100}],
                    onChange:this.inputChange,
                  })(
                    <Input readOnly/>	
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>负责人</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('director', {
                    rules: [{required: true, message: '负责人!',min:1,max:100}],
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
                  label={<span>组织级别</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('category', {
                    rules: [{required: true, message: '组织级别!'}],
                    onChange:this.inputChange,
                  })(
                    <Select
                      onSelect={this.onHandleSelect}
                    >
                      {
                        categoryDropdown && categoryDropdown.map((option, index) => {
                          return <Option value={option.id.toString()} key={ option.id + option.name}>{option.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>

              </Col>
              <Col span={12}>
                <FormItem
                  label={<span>所属组织</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('parentOrg', {
                    rules: [{required: true, message: '所属组织!'}],
                    onChange:this.inputChange,
                  })(
                    <Select
                    placeholder="请选择所属组织">
                      {
                        parentDepartmentDropDown && parentDepartmentDropDown.map(item => {
                          return <Option value={item.id.toString()} key={item.name + item.id}>{item.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label={<span>联系电话</span>}
                  {...formItemLayout}
                >
                  {getFieldDecorator('phone', {
                    rules: [{required: false, message: '联系电话!',max:20}],
                    onChange:this.inputChange,
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8}>

              <Col span={6}>
                <FormItem
                  label={<span>地址</span>}
                  labelCol={{span:12}}
                  wrapperCol={{span:12}}
                >
                {Province}
                </FormItem>
              </Col>
              <Col span={3}>
                <FormItem
                  wrapperCol={{span:24}}
                >
                 {City}
                </FormItem>
              </Col>
              <Col span={3}>
                <FormItem
                  wrapperCol={{span:24}}
                >
                 {Area}
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
                  {getFieldDecorator('addressDetail', {
                    rules: [{required: true, message: '详细地址!',max:300}],
                    onChange:this.inputChange,
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
          <Col span="3">
          
          </Col>
          <Col span="3">
            <Button
              className="save"
              disabled={this.state.changed ? false : true}
              htmlType="submit"
              onClick = {this.onhandleClick}
            >保存</Button>
          </Col>
        </Row>
          </Card>
        </Form>
      </div>)
	}
}

function mapStateToProps(store) {
  return {
    dropdown: store.dropdown
  }
}

function mapPropsToFields(props){
  const {branchInfo} = props;
  console.dir(branchInfo)
  return {
    name:{
      ...branchInfo.name
    },
    category:{
    	...branchInfo.category
    },
    parentOrg:{
    	...branchInfo.parentOrg
    },
    director:{
			...branchInfo.director
    },
    phone:{
			...branchInfo.phone
    },
    adress:{
			...branchInfo.adress
    },
    province:{
    	...branchInfo.province
    },
    city:{
    	...branchInfo.city
    },
    area:{
    	...branchInfo.area
    },
    addressDetail:{
    	...branchInfo.addressDetail
    }
  }
}

export default connect(mapStateToProps)(Form.create({
  mapPropsToFields
})(BranchBaseInfoForm));

