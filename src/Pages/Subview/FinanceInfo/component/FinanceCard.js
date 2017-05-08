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
import moment from 'moment';
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
        console.log(value);
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
    render(){
        return (
            <Card
                className="my-card"
                //title={this.props.item.name.value}
                title={this.findDropDownItem(this.props.item.financeCategory.value,'financeCategoryDropdown').name}
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
                        {this.props.item.org.value==='1'?'我行':'他行'}
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
                        
                        {
                            this.props.item.buyDate.value===undefined?'':this.props.item.buyDate.value.format('YYYY/MM/DD')
                        }
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        到期日／销毁日：
                    </Col>
                    <Col span={16}>
                        {
                             this.props.item.expireDate.value===undefined?'':this.props.item.buyDate.value.format('YYYY/MM/DD')
                        }
                    </Col>
                </Row>
            </Card>

        )
    }
}