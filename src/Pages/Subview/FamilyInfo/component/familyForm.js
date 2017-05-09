import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Icon,
  Input,
  Form,
  Button,
  Select
} from 'antd';
import { connect } from 'react-redux';
import Reg from "../../../../tools/Reg"
const FormItem = Form.Item;
const Option = Select.Option;
class familyForm extends Component{
    state={
        btnLoading:false
    }
    constructor(props) {
        super(props);
    };
    componentWillMount() {
        // console.log(this.props.item.phone.value);
        // console.log(this.props.item)
        // console.log(this)
    }
    componentWillReceiveProps(newProps){
        // console.log(this.props)
        this.setState({btnLoading:false})
    }
    clickSavaBtn=()=>{
        this.props.saveChangeValue(this.props.id.value,this.props.form.getFieldsValue(),this.props.index)
        // this.props.toggleEdit(this.props.index)
        this.setState({btnLoading:true})
        // console.log(this.props.form.getFieldsValue())
        // console.log(this.props.id.value)
    }
    clickCancelBtn=()=>{
        this.props.cancelChangeValue();
        this.props.toggleEdit(this.props.index);
    }
    findDropDownItem(value,dropDownType){
        // console.log(value);
        let dropDown='';
        this.props[dropDownType].map((item)=>{
            for(let prop in item) {
                // console.log('prop:',prop,",item[prop]:"+item[prop])
                if(item[prop]==value){
                    dropDown=item;
                }
            }
        })[0];
        return(dropDown);
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form  className="my-form-card">
                <Card
                    title={
                        <div className="my-card-title">
                            <FormItem>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '姓名不能为空' }],
                                })(<Input 
                                    prefix={<i className="iconfont icon-customer1" />}
                                />)}
                            </FormItem>
                            <Button
                                className="cancel-btn"
                                onClick={this.clickCancelBtn}
                                loading={this.state.btnLoading}
                            >
                                取消
                            </Button>
                            <Button
                                className="save-btn"
                                onClick={this.clickSavaBtn}
                                loading={this.state.btnLoading}
                            >
                            
                                保存
                            </Button>
                        </div>
                    }
                >
                <Row>
                    <Col span={8}>
                    关系：
                    </Col>
                    <Col span={16}>
                        <FormItem>
                        {getFieldDecorator('relation', {
                            rules: [{ required: true, message: '关系不能为空' }],
                        })(
                            <Select 
                                
                            >
                                {
                                    this.props.familyRelation.map((rel) => {
                                        return (
                                            <Option 
                                                value={rel.id.toString()}
                                                key={rel.id.toString()}
                                            >
                                                {rel.name}
                                            </Option >
                                        )
                                    })
                                }
                            </Select>)}
                        </FormItem>
                    </Col>
                </Row>
                    <Row>
                        <Col span={8}>
                            联系方式：
                        </Col>
                        <Col span={16}>
                            <FormItem>
                                {getFieldDecorator('phone',{
                                    rules: [{pattern:Reg.mobile, message: "联系方式格式不正确"}],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span={8}>
                        身份证号
                        </Col>
                        <Col span={16}>
                            <FormItem>
                                {getFieldDecorator('certificate', {
                                    rules: [{ pattern:Reg.certificate, message: '身份证格式不正确' }],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                        工作属性：
                        </Col>
                        <Col span={16}>
                            <FormItem>
                                {getFieldDecorator('jobCategory')(
                                    <Select >
                                        {
                                            this.props.commonJobCategory.map((rel) => {
                                                return (
                                                    <Option 
                                                        value={rel.id.toString()}
                                                        key={rel.id.toString()}
                                                    >
                                                        {rel.name}
                                                    </Option >
                                                )
                                            })
                                        }
                                    </Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                </Card>

            </Form>
        )
    }
}
// var that=this
const FamilyForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        // console.log('map triggered.',props)
        return {
            name: {
                ...props.name
            },
            relation: {
                ...props.relation
            },
            certificate: {
                ...props.certificate
            },
            jobCategory: {
                ...props.jobCategory
            },
            phone:{
                ...props.phone
            }
        };
    },
    onValuesChange(_, values) {
        // console.log(_, values)
        // console.log(familyForm)
        // familyForm.setState({values,values})
    },
})(familyForm);

export default FamilyForm;