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
class financeForm extends Component{
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
        // this.setState({btnLoading:false})
    }
    clickSavaBtn=()=>{
        // this.props.saveChangeValue(this.props.id.value,this.props.form.getFieldsValue(),this.props.index)
        // this.props.toggleEdit(this.props.index)
        // this.setState({btnLoading:true})
        // console.log(this.props.form.getFieldsValue())
        // console.log(this.props.id.value)
    }
    clickCancelBtn=()=>{
        this.props.cancelChangeValue();
        this.props.toggleEdit(this.props.index);
    }
    // findDropDownItem(value,dropDownType){
    //     console.log(value);
    //     let dropDown='';
    //     this.props[dropDownType].map((item)=>{
    //         for(let prop in item) {
    //             // console.log('prop:',prop,",item[prop]:"+item[prop])
    //             if(item[prop]==value){
    //                 dropDown=item;
    //             }
    //         }
    //     })[0];
    //     return(dropDown);
    // }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form  className="my-form-card">
                <Card
                    title={
                        <div className="my-card-title">
                            <FormItem>
                                {getFieldDecorator('financeCategory', {
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
                                loading={this.state.btnLoading}
                            >
                            
                                保存
                            </Button>
                        </div>
                    }
                >
                <Row>
                    <Col span={8}>
                        业务机构名称：
                    </Col>
                    <Col span={16}>
                        <FormItem>
                            {getFieldDecorator('org',{
                                rules: [{pattern:Reg.mobile, message: "联系方式格式不正确"}],
                            })(<Input />)}
                        </FormItem>
                    </Col>
                </Row>
                    <Row>
                        <Col span={8}>
                            业务额：
                        </Col>
                        <Col span={16}>
                            <FormItem>
                                {getFieldDecorator('money',{
                                    rules: [{pattern:Reg.mobile, message: "联系方式格式不正确"}],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span={8}>
                            收益／利润：
                        </Col>
                        <Col span={16}>
                           <FormItem>
                                {getFieldDecorator('profit',{
                                    rules: [{pattern:Reg.mobile, message: "联系方式格式不正确"}],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            购买日：
                        </Col>
                        <Col span={16}>
                            <FormItem>
                                {getFieldDecorator('buyDate',{
                                    rules: [{pattern:Reg.mobile, message: "联系方式格式不正确"}],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            到期日／销毁日：
                        </Col>
                        <Col span={16}>
                            <FormItem>
                                {getFieldDecorator('expireDate',{
                                    rules: [{pattern:Reg.mobile, message: "联系方式格式不正确"}],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                </Card>

            </Form>
        )
    }
}
const FinanceForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        // console.log('map triggered.',props)
        return {
            buyDate: {
                ...props.buyDate
            },
            expireDate: {
                ...props.expireDate
            },
            financeCategory: {
                ...props.financeCategory
            },
            money: {
                ...props.money
            },
            org:{
                ...props.org
            },
            profit:{
                ...props.profit
            }
        };
    },
    onValuesChange(_, values) {
        // console.log(_, values)
        // console.log(financeForm)
        // financeForm.setState({values,values})
    },
})(financeForm);

export default FinanceForm;