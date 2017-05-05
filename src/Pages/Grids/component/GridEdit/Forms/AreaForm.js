import React, {Component} from "react";
import {Button, Card, Input, Table , Row, Col, Form, Icon, Select} from "antd";
import API from "../../../../../../API";
import ajax from '../../../../../tools/POSTF'
import Reg from "../../../../../tools/Reg"
import { Modal,message } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

class AreaForm extends Component{



  state = {
	  provinceText:'',
    cityText:'',
    regionText:'',
    province:[],
    city:[],
    region:[],
    staffs:[],
    gridTypes:[]
  }


  componentWillMount(){
    ajax.Get(API.GET_AREA_SELECT(1))
      .then(res => {
        this.setState({
          province:res.data.data
        })
      })


    ajax.Get(API.GET_COMMON_DROPDOWN('gridType'))
      .then((res)=>{
        this.setState({
          gridTypes:res.data.data
        })
      })

  }


  componentWillReceiveProps(nextProps){
    if(this.props.id !== nextProps.id && nextProps.area !==''){
      let arry = nextProps.area.address.value.split(' ')
      this.setState({
        provinceText:arry[0],
        cityText:arry[1],
        regionText:arry[2]
      })

    }

    if(this.props.area ==='' && nextProps.area !==''){
      this.getStaffsByDepartmentId(nextProps.area.orgId.value)
    }

    if((this.props.area ==='' && nextProps.area !=='') || (nextProps.area !== '' && this.props.area !=='' && nextProps.area.city.value !==this.props.area.city.value)){
      if(nextProps.area.province.value !==undefined){
        this.getCity(nextProps.area.province.value)
      }

      if(nextProps.area.city.value !==undefined){
        this.getRegion(nextProps.area.city.value)
      }
    }
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
    this.setState({
      region:[]
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

  orgIdChange = (value) => {
    this.getStaffsByDepartmentId(value);
  }

  getStaffsByDepartmentId = (id) => {
    ajax.Get(API.GET_DEPARTMENT_STAFFS(id))
      .then((res)=>{
        this.setState({
          staffs:res.data.data
        })
      })
  }

  handleSubmit = () => {
    const id = this.props.id;
    const { getFieldsValue , getFieldValue} = this.props.form;
    const FieldsValue = getFieldsValue();
    const pid = getFieldValue('province')
    const cid = getFieldValue('city')
    const rid = getFieldValue('region')
    if(pid === undefined || cid === undefined || rid === undefined){
      Modal.error({
        content:'请仔细检查您填写的地址'
      })
    }else{
      const province = this.state.province.find(item => item.id == pid).name
      const city = this.state.city.find(item => item.id == cid).name
      const region = this.state.region.find(item => item.id == rid).name
      let address = province +' '+ city +' '+region + ' ' + getFieldValue('addressDetail')
      FieldsValue.address = address
      delete FieldsValue.city
      delete FieldsValue.province
      delete FieldsValue.region

      const FieldsValueAll = {...FieldsValue, ...{name:this.props.area.name.value}}
      console.dir(FieldsValueAll)
      ajax.Put(API.PUT_API_AREA(id),FieldsValueAll)
        .then(() => {
          this.props.getTableData()
          message.success('员工修改成功',5)
        })
    }
  }

	render(){
		 const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched , getFieldValue} = this.props.form;
		 const {orgNameDropDown} = this.props;

		 const Address = <Row>
       <Col span={24} className="">
         <FormItem labelCol={{span: 4}}
                   wrapperCol={{span: 20}}
                   label="网格地址"
                   className="idnumber"
         >
           {
             getFieldDecorator('address')(
               <Input/>
             )
           }
         </FormItem>
       </Col>
     </Row>;

    const Province = getFieldDecorator('province')(
      <Select
        placeholder="选择省份"
        notFoundContent="没有省份"
        onChange={this.handleProvinceChange}
      >
        {this.state.province.map((item,index)=>(<Option value={item.id.toString()} key={item.id.toString()}>{item.name}</Option>))}
      </Select>)


    const City = getFieldDecorator('city')(
      <Select
        placeholder="选择城市"
        notFoundContent="没有城市"
        onChange={this.getRegion}
      >
        {this.state.city.map((item,index)=>(<Option value={item.id.toString()} key={item.id.toString()}>{item.name}</Option>))}
      </Select>)

    const Region = getFieldDecorator('region')(
      <Select
        placeholder="选择地区"
        notFoundContent="没有地区"
      >
        {this.state.region.map((item,index)=>(<Option value={item.id.toString()} key={item.id.toString()}>{item.name}</Option>))}
      </Select>)

		return (
      <div>
		<Form>
          <Row className="fristrow">
            <Col span={12} className="fristcol">
              <FormItem
                        wrapperCol={{span: 20}}
                        className="idnumber"
              >
             <span className="gridname">{this.props.area.name &&  this.props.area.name.value}</span>
              </FormItem>
            </Col>
          <Icon
              className="close"
              onClick={this.props.close}
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
              >
                {
                  orgNameDropDown.length > 0 ? getFieldDecorator('orgId',{
                    rules: [{ message: '请选择所属机构' , whitespace:"ture"}],
                    onChange:this.orgIdChange
                  })(
                    <Select
                      getPopupContainer={() => document.getElementById('RoleEdit')}
                      className="selectorgId"
                    >
                      {
                        orgNameDropDown.map((item,index)=>(<Option key={item.id.toString()} value={item.id.toString()}>{item.name}</Option>))
                      }
                    </Select>
                  ):null
                }

              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem  labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="网格负责人"
                        className="idnumber"
              >
              {
                getFieldDecorator('director')(
                 <Select
                   placeholder="选择网格负责人"
                   notFoundContent="没有找到对应员工"
                 >
                   {this.state.staffs.map((item,index)=>(<Option key={item.id.toString()}>{item.name}</Option>))}
                 </Select>
                  )
              }

              </FormItem>
            </Col>


          </Row>
          <Row>
            <Col span={12} >
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 15}}
                        label="网格类型"
                        className="idnumber"
              >
              {
              	getFieldDecorator('areaType')(
                  <Select>
                    {this.state.gridTypes.map((item)=>(<Option key={item.id.toString()}>{item.name}</Option>))}
                  </Select>
              		)
              }
              </FormItem>
            </Col>

            <Col span={12} className="">
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="网格面积">
              {
              	getFieldDecorator('landArea',{
                  rules: [{pattern:Reg.Integer, message: "请填写数字"}],
                })(
              		<Input/>
              		)
              }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="">
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 15}}
                        label="网格户口数"
                        className="idnumber"
              >
              {
              	getFieldDecorator('residenceCount',{
                  rules: [{pattern:Reg.Integer, message: "请填写数字"}],
                })(
              		<Input/>
              		)
              }
              </FormItem>
            </Col>

            <Col span={12} className="">
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="网格人口数">
               		{
               			getFieldDecorator('personCount',{
                      rules: [{pattern:Reg.Integer, message: "请填写数字"}],
                    })(
              				<Input/>
              				)
               		}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={9}>
              <FormItem
                label={<span>地址</span>}
                labelCol={{span:10}}
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
                className="idnumber"
               >
                {
                  getFieldDecorator('addressDetail')(
                    <Input/>
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="">
              <FormItem labelCol={{span: 4}}
                        wrapperCol={{span: 20}}
                        label="网格描述"
                        className="idnumber"
              >
               {
           			getFieldDecorator('remark')(
          				<Input/>
          				)
               	}
              </FormItem>
            </Col>
          </Row>
          </div>
          </Form>
          <Row className="buttonsave">
            <Col span={24} >
              <Col span={4}>
              </Col>
              <Button type="primary" onClick={this.handleSubmit}>保存</Button>
            </Col>
          </Row>
          </div>)
	}
}

function mapPropsToFields(props){

  console.dir(props)
	return {
		name:{
		...props.area.name
	},
	director:{
		...props.area.director
	},
	orgId:{
		...props.area.orgId
	},
    areaType:{
		...props.area.areaType
	},
	landArea:{
		...props.area.landArea
	},
	residenceCount:{
		...props.area.residenceCount
	},
	personCount:{
		...props.area.personCount
	},
	address:{
		...props.area.address
	},
	remark:{
		...props.area.remark
	},
    province:{
      ...props.area.province
    },
    city:{
      ...props.area.city
    },
    region:{
      ...props.area.region
    },
    addressDetail:{
      ...props.area.addressDetail
    }

	}
}

function onFieldsChange(props,changedFields){
	props.onChange(changedFields)

}
export default Form.create({
	mapPropsToFields,
	onFieldsChange
})(AreaForm)
