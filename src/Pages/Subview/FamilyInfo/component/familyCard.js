import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Icon,
  Input,
  Form,
  Select,
  Popconfirm
} from 'antd';
import { connect } from 'react-redux';
import api from './../../../../../API';
import ajax from '../../../../tools/POSTF.js';
const FormItem = Form.Item;
const Option = Select.Option;
export default class familyCard extends Component{
    
    constructor(props) {
        super(props);
    };
    componentWillMount(){
        
    }
    componentWillReceiveProps(){
        // console.log(
    //    this.findDropDownItem(61,'commonJobCategory'));
    //    console.log(this.props.commonJobCategory);
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
    confirm=()=>{
        this.props.deleteFamilyValue(this.props.item.id.value);
    }
    render(){
        return (
            <Card
                className="my-card"
                title={this.props.item.name.value}
                key={this.props.item.id.value}
                extra={
                    <div>
                        <span
                            onClick={()=>{this.props.toggleEdit(this.props.index)}}
                        >
                            <i className="iconfont icon-edit"></i>编辑
                        </span>

                       
                        <Popconfirm placement="bottomRight" title={'是否删除？'} onConfirm={this.confirm} okText="删除" cancelText="取消">
                            <i className="iconfont icon-delete"></i>删除
                        </Popconfirm>


                    </div>
                }
                >
                <Row>
                    <Col span={8}>
                        关系：
                    </Col>
                    <Col span={16}>
                        {this.findDropDownItem(this.props.item.relation.value,'familyRelation').name}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        联系方式：
                    </Col>
                    <Col span={16}>
                        {this.props.item.phone.value}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        身份证号：
                    </Col>
                    <Col span={16}>
                        {this.props.item.certificate.value}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        工作属性：
                    </Col>
                    <Col span={16}>
                        {this.props.item.jobCategory.value===""?"":this.findDropDownItem(this.props.item.jobCategory.value,'commonJobCategory').name}
                    </Col>
                </Row>
            </Card>

        )
    }
}