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
export default class familyCard extends Component{
    render(){
        return (
            <div className="familyCard">
                familyCard 组件
            </div>
        )
    }
}