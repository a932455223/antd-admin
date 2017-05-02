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
const FormItem = Form.Item;
const Option = Select.Option;
export default class AddFamilyCard extends Component{
    componentWillMount(){

            // console.log(this.props.item.certificate)
            // console.log(this.props.item.id)
            // console.log(this.props.item.name)
            // console.log(this.props.item.relation)
    }
    render(){
        return (
            <div className="addfamilyCard">

            {/*{this.props.item.certificate}
            {this.props.item.id}
            {this.props.item.name}
            {this.props.item.relation}*/}
                addfamilyCard 组件
            </div>
        )
    }
}