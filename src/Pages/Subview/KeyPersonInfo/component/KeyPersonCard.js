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
import { connect } from 'react-redux';
import api from './../../../../../API';
import ajax from '../../../../tools/POSTF.js';
const FormItem = Form.Item;
const Option = Select.Option;
export default class KeyPersonCard extends Component{
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
    render(){
        return (
            <Card
                className="keyperson-card"
                title={this.props.item.name.value}
                key={this.props.item.id.value}
                extra={
                    <div>
                        <a href="javascript:void(0);" 
                            onClick={()=>{this.props.toggleEdit(this.props.index)}}
                        >
                            <i className="iconfont icon-edit"></i>编辑
                        </a>

                        <a href="javascript:void(0);" 
                            onClick={()=>{this.props.deleteKeyPersonValue(this.props.item.id.value)}}
                        >
                            <i className="iconfont icon-delete"></i>删除
                        </a>
                    </div>
                }
                >
                <Row>
                    <Col span={8}>
                        所属部门：
                    </Col>
                    <Col span={16}>
                        {this.props.item.department.value}
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
            </Card>

        )
    }
}