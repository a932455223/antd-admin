import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Icon,
  Input,
  Form,
  Select,
  Button,
  Modal,
} from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;
const Option = Select.Option;
class keyPersonForm extends Component{
    constructor(props) {
        super(props);
    };
    state={
        btnLoading:false,
    }
    componentWillMount() {
        // console.log(this.props.item.phone.value);
        // console.log(this.props.item)
        // console.log(this)
    }
    componentWillReceiveProps(newProps){
        // console.log(this.props)
        // this.setState({btnLoading:false});
        console.log("receiveeeeeeeeeeeeeeeee ")
    }
    clickSavaBtn=()=>{
        this.props.form.validateFields()
        let formErrors = this.props.form.getFieldsError()
        console.log(formErrors)
        if(formErrors.name===undefined){
            // this.props.toggleEdit(this.props.index)
            this.setState({btnLoading:true})
            // this.props.saveChangeValue(this.props.id.value,this.props.form.getFieldsValue(),this.props.index)

        }else if(formErrors.name.length>0){

             Modal.error({
                title:'情仔细填写表单',
            });
        }
    }
    clickCancelBtn=()=>{
        // this.props.cancelChangeValue();
        this.props.toggleEdit(this.props.index);
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="my-form-card">
                <Card
                    title={
                        <div className="my-card-title">
                            <FormItem>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '关键人信息不能为空' }],
                                })(<Input 
                                    prefix={<i className="iconfont icon-customer1" />}
                                    placeholder="请输入关键人信息"
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
                        所属部门：
                        </Col>
                        <Col span={16}>
                            <FormItem>
                                {getFieldDecorator('department', {
                                    rules: [{ required: true, message: '所属部门不能为空' }],
                                })(<Input
                                    placeholder="请输入所属部门"
                                 />)}
                            </FormItem>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span={8}>
                        联系方式：
                        </Col>
                        <Col span={16}>
                            <FormItem>
                                {getFieldDecorator('phone')(<Input 
                                    placeholder="请输入联系方式"
                                />)}
                            </FormItem>
                        </Col>
                    </Row>
                </Card>

            </Form>
        )
    }
}
// var that=this
const KeyPersonForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        // console.log('map triggered.',props)
        return {
            name: {
                ...props.name
            },
            department: {
                ...props.department
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
})(keyPersonForm);

export default KeyPersonForm;