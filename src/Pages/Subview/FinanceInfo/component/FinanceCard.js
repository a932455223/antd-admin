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
export default class FinanceCard extends Component{
    
    constructor(props) {
        super(props);
    };
    componentWillMount(){
        
    }
    componentWillReceiveProps(){

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
        return (
            <Card
                className="my-card"
                //title={this.props.item.name.value}
               // title={this.findDropDownItem(this.props.item.financeCategory.value,'financeCategoryDropdown').name}
               title={'金融业务产品'}
                key={this.props.item.id.value}
                extra={
                    <div>
                        <span
                              onClick={()=>{this.props.toggleEdit(this.props.index)}}
                        >
                            <i className="iconfont icon-edit"></i>编辑
                        </span>

                        <span
                        >
                            <i className="iconfont icon-delete"></i>删除
                        </span>
                    </div>
                }
                >
                <Row>
                    <Col span={8}>
                        业务机构名称：
                    </Col>
                    <Col span={16}>
                        {this.props.item.org.value===1?'我行':'他行'}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        业务额：
                    </Col>
                    <Col span={16}>
                        {this.props.item.money.value}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        利益／收益：
                    </Col>
                    <Col span={16}>
                        {this.props.item.profit.value}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        购买日：
                    </Col>
                    <Col span={16}>
                        {this.props.item.buyDate.value}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        到期日／销毁日：
                    </Col>
                    <Col span={16}>
                        {this.props.item.expireDate.value}
                    </Col>
                </Row>
            </Card>

        )
    }
}