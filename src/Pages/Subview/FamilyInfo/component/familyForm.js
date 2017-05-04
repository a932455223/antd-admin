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
import styles from './../indexStyle.less';
import { connect } from 'react-redux';
const FormItem = Form.Item;
const Option = Select.Option;
class familyForm extends Component{
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
    }
    clickSavaBtn=()=>{
        this.props.saveChangeValue(this.props.id.value,this.props.form.getFieldsValue())
        this.props.toggleEdit(this.props.index)
        // console.log(this.props.form.getFieldsValue())
        // console.log(this.props.id.value)
    }
    clickCancelBtn=()=>{
        this.props.cancelChangeValue();
        this.props.toggleEdit(this.props.index);
    }
    findDropDownItem(value,dropDownType){
        return this.props[dropDownType].filter((item)=>{
            let bool;
            Object.getOwnPropertyNames(item).
                forEach((val, idx, array)=> {
                    if(item[val]==value){
                        bool=true;
                    }
                });
            return bool;
        })[0];
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form  className="family-card family-card-modify">
                <Card
                    title={
                        <div className="my-card-title">
                            <FormItem>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '姓名不能为空' }],
                                })(<Input />)}
                            </FormItem>
                            <span
                                className="cancel-btn"
                                onClick={this.clickCancelBtn}
                            >
                                取消
                            </span>
                            <span
                                className="save-btn"
                                onClick={this.clickSavaBtn}
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
                        <FormItem>
                        {getFieldDecorator('relation', {
                            rules: [{ required: true, message: '姓名不能为空' }],
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
                        <span>联系方式：</span>
                        </Col>
                        <Col span={16}>
                            <FormItem>
                                {getFieldDecorator('phone', {
                                    rules: [{ required: true, message: '联系方式不能为空' }],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span={8}>
                        <span>身份证号：</span>
                        </Col>
                        <Col span={16}>
                            <FormItem>
                                {getFieldDecorator('certificate', {
                                    rules: [{ required: true, message: '身份证不能为空' }],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                        <span>工作属性：</span>
                        </Col>
                        <Col span={16}>
                            <FormItem>
                                {getFieldDecorator('jobCategory', {
                                    rules: [{ required: true, message: '姓名不能为空' }],
                                })(
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