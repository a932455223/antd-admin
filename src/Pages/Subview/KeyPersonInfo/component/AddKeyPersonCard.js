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
import api from './../../../../../API';
import ajax from '../../../../tools/POSTF.js';
const FormItem = Form.Item;
const Option = Select.Option;

class addFamilyCard extends Component{
    state = {
        isAdd:false
    }
    
    constructor(props) {
        super(props);
    };
    //添加状态切换
    toggleAdd = () => {
        this.setState({
        isAdd:!this.state.isAdd
        });
    }
    clickSavaBtn=()=>{
        this.props.addKeyPersonValue(this.props.form.getFieldsValue())
        this.toggleAdd()
        this.props.resetAddCard();
    }
    clickCancelBtn=()=>{
        this.toggleAdd()
        this.props.resetAddCard();
    }
    componentWillMount(){
            
            // console.log(this.props.item.certificate)
            // console.log(this.props.item.id)
            // console.log(this.props.item.name)
            // console.log(this.props.item.relation)
    }
    render(){
        let addArea;
        const { getFieldDecorator } = this.props.form;
        if(this.state.isAdd){
        addArea=
            
            (<Form  className="keyperson-card-modify">
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
                        <span>所属部门</span>
                        </Col>
                        <Col span={16}>
                            <FormItem>
                                {getFieldDecorator('department', {
                                    rules: [{ required: true, message: '身份证不能为空' }],
                                })(<Input />)}
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
                </Card>

            </Form>)
        }else{
        //添加按钮
        addArea=
            (<Card  className="family-card family-add-card">
                <i className="iconfont icon-create"   onClick={()=>{this.toggleAdd()}}></i>
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
})(addFamilyCard);
export default AddFamilyCard;