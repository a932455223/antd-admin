/**
 * Created by jufei on 2017/4/25.
 */
import React,{Component} from 'react';
import {Button, Form, Input, Select, Icon,Row,Col,Modal,message} from "antd";
import API from "../../../../../API";
import ajax from '../../../../tools/POSTF'
const FormItem = Form.Item;
const Option = Select.Option;


 class  GridPermission extends Component{

  state={
    GridTypes:[],
    orgNameDropDown:'',
    staffs:[],
    province:[],
    city:[],
    region:[]
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
    this.getCity(value)
     this.setState({
       region:[]
     })
     this.props.form.setFieldsValue({
       city:undefined,
       region:undefined
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

  componentWillMount() {
    this.getorgNameDropDown();
    this.getGridTypes()

    ajax.Get(API.GET_AREA_SELECT(1))
      .then(res => {
        this.setState({
          province:res.data.data
        })
      })
  }

  getGridTypes= () =>{
    ajax.Get(API.GET_COMMON_DROPDOWN('gridType'))
      .then((res)=>{
      this.setState({
        GridTypes:res.data.data
      })
      })
  }
  getorgNameDropDown = () => {
    ajax.Get(API.GET_AREAS_ADD_DEPARTMENTS)
    .then(res => {
      this.setState({
        orgNameDropDown : res.data.data
      })
    })
   }

   orgIdChange = (value)=>{
    this.props.form.setFieldsValue({
      director:undefined
    })
    ajax.Get(API.GET_DEPARTMENT_STAFFS(value)).then((res)=>{
      this.setState({
        staffs:res.data.data
      })
    })
   }

   onSubmit = () => {
 		const { getFieldsValue} = this.props.form;
 		const FieldsValue = getFieldsValue();
 		if(!(FieldsValue.province && FieldsValue.city && FieldsValue.region)){

 		  Modal.error({
        content:'请重新填写地址信息'
      })

    }else{
      FieldsValue.address = this.state.province.find(item=>item.id == FieldsValue.province).name +' '+ this.state.city.find(item=>item.id == FieldsValue.city).name +' '+ this.state.region.find(item=>item.id == FieldsValue.region).name +' '+ FieldsValue.addressDetail
      delete FieldsValue.city
      delete FieldsValue.region
      delete FieldsValue.province
      delete FieldsValue.addressDetail
      console.dir(FieldsValue)
      ajax.Post(API.POST_API_AREA,FieldsValue)
        .then((res) => {
          if(res.data.code === 200){
            this.props.getTableData()
            message.success("网格创建成功")
          }else{
            Modal.error({content:res.data.message})
          }
          this.props.getTableData
        })
    }


 	}
  render(){
    const { getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
    const {orgNameDropDown} = this.state;

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
    	<div className="formbox" >
        <Form className="formboxsub">
        	<Row className="fristrow">
            <Col span={12} className="fristcol">
              <FormItem
                        wrapperCol={{span: 20}}
                        className="idnumber"
              >

                {getFieldDecorator('name', {
                  initialValue:this.props.roleName ,
                  onChange: this.inputChange
                })(
                  <span className="newrolename">{this.props.roleName}</span>
                )}
              </FormItem>
            </Col>
          <Icon
              className="close"
              onClick={this.props.close}
              type="close"
              style={{fontSize:"24px",cursor:"pointer"}}
            />
        </Row>
        <div className="bgrow">
          <Row>
            <Col span={12}>
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="所属机构">
                {
                  orgNameDropDown.length > 0 ? getFieldDecorator('orgId',{
                    rules: [{ message: '请选择所属机构' , whitespace:"ture"}],
                    onChange:this.orgIdChange
                  })(
                  <Select
                      getPopupContainer={() => document.getElementById('newgridh')}
                      className="selectorgId"
                      placeholder="请选择所属机构"
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
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 15}}
                        label="网格负责人"
                        className="idnumber"
              >

                {getFieldDecorator('director', {
                  // initialValue:this.props.roleName ,
                  onChange: this.inputChange
                })(
                  <Select placeholder="请选择负责人">
                    {this.state.staffs.map((item,index)=>(<Option key={item.id.toString()}>{item.name}</Option>))}
                  </Select>
                )}
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

                {getFieldDecorator('areaType', {
                  onChange: this.inputChange
                })(
                  <Select
                    placeholder="请填写网格类型"
                  >
                    {this.state.GridTypes.map(item => <Option key={item.id.toString()}>{item.name}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={12} className="">
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="网格面积">
                {getFieldDecorator('landArea', {
                  onChange: this.inputChange
                })(
                  <Input placeholder="请填写网格面积"/>
                )}
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

                {getFieldDecorator('residenceCount', {
                  onChange: this.inputChange
                })(
                  <Input placeholder="请填写网格户口数"/>
                )}
              </FormItem>
            </Col>

            <Col span={12} className="">
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="网格人口数">
                {getFieldDecorator('personCount', {
                  onChange: this.inputChange
                })(
                  <Input placeholder="请填写网格人口数"/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={9}>
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
          <Row gutter={8}>
            <Col span={24} className="">
              <FormItem labelCol={{span: 4}}
                        wrapperCol={{span: 20}}
                        label="详细地址"
                        className="idnumber"
              >
                {getFieldDecorator('addressDetail', {
                  onChange: this.inputChange
                })(
                  <Input placeholder="详细地址信息"/>
                )}
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

                {getFieldDecorator('remark', {
                  onChange: this.inputChange
                })(
                  <Input placeholder="请填写网格描述"/>
                )}
              </FormItem>
            </Col>
          </Row>
          </div>
         </Form>
         <Row className="buttonsave">
            <Col span={24} >
              <Col span={4}>
              </Col>
              <Button htmlType="button" onClick={this.onSubmit}>保存</Button>
            </Col>
          </Row>
      </div>
    	)
  }
}

const GridPermissionF = Form.create()(GridPermission);
export default GridPermissionF;
