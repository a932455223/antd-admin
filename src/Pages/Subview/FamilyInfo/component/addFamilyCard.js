import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Icon,
  Input,
  Form,
  Modal,
  Button,
  Select
} from 'antd';
// import styles from './../indexStyle.less';
import { connect } from 'react-redux';
import api from './../../../../../API';
import ajax from '../../../../tools/POSTF.js';
import Reg from "../../../../tools/Reg"
import update from 'immutability-helper';
const FormItem = Form.Item;
const Option = Select.Option;

class addFamilyCard extends Component{
    constructor(props) {
        super(props);
    };
    
    clickSavaBtn=()=>{
        // let newState=update(
        //     this.state,{btnLoading:{$set:true}}
        // )
        // this.setState(newState);
        
        this.props.form.validateFields()
        let formErrors = this.props.form.getFieldsError()
        let noError=true;
        Object.keys(formErrors).reduce((pre,ky)=>{
            if(!(formErrors[ky]===undefined)){
                Modal.error({
                    title:'情仔细填写表单',
                });
                noError=false;
            }
        })
        if(noError){
            this.props.addNewFamilyValue(this.props.form.getFieldsValue())
        }
    }
    clickCancelBtn=()=>{
        this.props.toggleAdd()
        this.props.resetAddCard();
    }
    componentWillMount(){
            
            // console.log(this.props.item.certificate)
            // console.log(this.props.item.id)
            // console.log(this.props.item.name)
            // console.log(this.props.item.relation)
    }
    componentWillReceiveProps(newProps){
        // let newState=update(
        //     this.state,{btnLoading:{$set:false}}
        // )
        // this.setState(newState);
        // this.setState({btnLoading:false})
    }
    render(){
        let addArea;
        const { getFieldDecorator } = this.props.form;
        if(this.props.isAdd){
        addArea=
            
            (<Form  className="my-form-card">
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
                            <span
                                className="cancel-btn"
                                onClick={this.clickCancelBtn}
                            >
                                取消
                            </span>
                            <Button
                                className="save-btn"
                                onClick={this.clickSavaBtn}
                                loading={this.props.addFamilyCardLoading}
                            >
                            
                                保存
                            </Button>
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
                        <span>联系方式：</span>
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
                        <span>身份证号：</span>
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
                        <span>工作属性：</span>
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
                <pre className="language-bash" style={{textAlign:'left'}}>
                {JSON.stringify(this.state, null, 2)}
                </pre>
            </Form>)
        }else{
        //添加按钮
        addArea=
            (<Card  className="my-card my-add-card">
                <i className="iconfont icon-create"   onClick={()=>{this.props.toggleAdd()}}></i>
                <p>新建家庭关系</p>
            </Card>)
        }
        // const { getFieldDecorator } = this.props.form;
        return (
            addArea
        )
    }
}
const AddFamilyCard =Form.create({
    onFieldsChange(props, changedFields) {
        props.onAddChange(changedFields);
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
})(addFamilyCard);
export default AddFamilyCard;