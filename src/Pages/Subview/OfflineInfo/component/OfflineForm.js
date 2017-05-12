import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Icon,
  Input,
  Form,
  Button,
  Select,
  DatePicker,
  InputNumber
} from 'antd';
import { connect } from 'react-redux';
import Reg from "../../../../tools/Reg"
import moment from 'moment';
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
        // this.props.toggleEdit(this.props.index)
    }
    clickSavaBtn=()=>{
        this.props.form.validateFields()
        let formErrors = this.props.form.getFieldsError()
        let noError=true;
        let values=this.props.form.getFieldsValue();
        // console.log('=====',values)
        // console.log(formErrors)
        Object.keys(formErrors).map((item,index)=>{
            
            if(!(formErrors[item]===undefined)){
                Modal.error({
                    title:'情仔细填写表单',
                });
                noError=false;
            }
        })
        if(noError){
            this.setState({btnLoading:true});
            this.props.putCustomersFinances(this.props.id.value,this.props.form.getFieldsValue(),this.props.index)
        }
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
                <pre className="language-bash" style={{textAlign:'left'}}>
          {JSON.stringify(this.state, null, 2)}
          </pre>
                <Card
                    title={
                        <div className="my-card-title">
                            <FormItem>
                                {getFieldDecorator('financeCategory',{
                                    rules: [{ required: true, message: '业务项目不能为空' }],
                                })(
                                    <Select 
                                    >
                                        {
                                            this.props.financeCategoryDropdown.map((fcd) => {
                                                return (
                                                    <Option 
                                                        value={fcd.id.toString()}
                                                        key={fcd.id.toString()}
                                                    >
                                                        {fcd.name}
                                                    </Option >
                                                )
                                            })
                                        }
                                    </Select>)
                                    
                                }
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
                        业务机构名称：
                    </Col>
                    <Col span={16}>
                        <FormItem>
                            {getFieldDecorator('org',{
                                    rules: [{ required: true, message: '业务机构名称不能为空' }],
                            })(
                                <Select 
                                >
                                        <Option 
                                            value='1'
                                        >
                                            我行
                                        </Option>
                                        <Option 
                                            value='2'
                                        >
                                            他行
                                        </Option>
                                    
                                </Select>)
                                
                            }
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
                                rules:[{pattern:Reg.Integer,message:'请输入数字'}]
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
                                 rules: [{pattern:Reg.percentage,message:'小数点后精确到两位'}]
                            })(
                                <InputNumber min={0.01} max={99.99} step={0.01} 
                                />
                            )}
                            %
                        </FormItem>
                    </Col>
                </Row>
                    <Row>
                        <Col span={8}>
                            购买日：
                        </Col>
                        <Col span={16}>
                            <FormItem>
                                {
                                    getFieldDecorator('buyDate',{
                                         initialValue:this.props.buyDate.value==undefined?undefined:this.props.buyDate.value.format('YYYY/MM/DD')
                                    })(
                                        <DatePicker
                                            getCalendarContainer={ () => document.getElementsByClassName('my-cards-page')[0]}
                                        />
                                    )
                                    
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            到期日／销毁日：
                        </Col>
                        <Col span={16}>
                            <FormItem>
                                {
                                    getFieldDecorator('expireDate',{
                                        initialValue:this.props.expireDate.value==undefined?undefined:this.props.expireDate.value
                                    })(
                                        <DatePicker
                                            getCalendarContainer={ () => document.getElementsByClassName('my-cards-page')[0]}
                                        />
                                    ) 
                                }
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