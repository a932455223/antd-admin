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
  Select,
  DatePicker,
  message,
  InputNumber
} from 'antd';
// import styles from './../indexStyle.less';
import { connect } from 'react-redux';
import api from './../../../../../API';
import ajax from '../../../../tools/POSTF.js';
import Reg from "../../../../tools/Reg"
import update from 'immutability-helper';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

class addFinanceCard extends Component{
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
            this.props.toggleAddFinanceCardLoading();
            this.props.postCustomersFinances(this.props.form.getFieldsValue())
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
                                {getFieldDecorator('financeCategory', {
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
                                loading={this.props.addFinanceCardLoading}
                            >
                                取消
                            </Button>
                            <Button
                                className="save-btn"
                                onClick={this.clickSavaBtn}
                                loading={this.props.addFinanceCardLoading}
                            >
                            
                                保存
                            </Button>
                        </div>
                    }
                >
                <Row>
                    <Col span={8}>
                     业务机构名称
                    </Col>
                    <Col span={16}>
                        <FormItem>
                            {getFieldDecorator('org', {
                                    rules: [{ required: true, message: '业务机构不能为空' }],
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
                                         initialValue:undefined

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
                                        initialValue:undefined
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
                {/*<pre className="language-bash" style={{textAlign:'left'}}>
                    {JSON.stringify(this.props, null, 2)}
                </pre>*/}
            </Form>)
        }else{
        //添加按钮 
        addArea=
            (<Card  className="my-card my-add-card">
                <i className="iconfont icon-create"   onClick={()=>{this.props.toggleAdd()}}></i>
                <p>新建线下业务</p>
            </Card>)
        }
        // const { getFieldDecorator } = this.props.form;
        return (
            addArea
        )
    }
}
const AddFinanceCard =Form.create({
    onFieldsChange(props, changedFields) {
        props.onAddChange(changedFields);
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
})(addFinanceCard);
export default AddFinanceCard;