/**
 * Created by jufei on 2017/4/20.
 */


import React,{Component} from 'react';
import {Button, Card, Col, DatePicker, Form, Icon, Input, Row, Select, TreeSelect, Upload} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

export default class FormCreator extends Component{
  render(){
    const {getFieldDecorator} = this.props;
    return (
      <div>
        {
          this.props.items.map( (item,index) => {
            switch (item.type){

              case 'input':
                return (
                  <FormItem
                    label={<span>{item.label}</span>}
                    {...item.formItemLayout}
                    key={item.field}
                  >
                    {getFieldDecorator(item.field, {
                      rules: [{required: item.required, message: item.message}],
                      initialValue: item.initialValue
                    })(
                      <Input />
                    )}
                  </FormItem>
                );


              case 'select':
                return (
                  <FormItem
                    label={<span>{item.label}</span>}
                    {...item.formItemLayout}
                    key={item.field}
                  >
                    {getFieldDecorator(item.field, {
                      rules: [{required: item.required, message: item.message}],
                      initialValue: item.initialValue
                    })(
                      <Select>
                        {item.options.map( (option,index) => {
                          return <Option value={option.value} key={item.field + index}>{option.text}</Option>
                        })}
                      </Select>
                    )}
                  </FormItem>
                );

              case 'datePicker':
                return (
                  <FormItem
                    label={<span>{item.label}</span>}
                    {...item.formItemLayout}
                    key={item.field}
                  >
                    {getFieldDecorator(item.field, {
                      rules: [{required: item.required, message: item.message}],
                      initialValue: item.initialValue
                    })(
                     <DatePicker/>
                    )}
                  </FormItem>
                );


              case 'other':
                return (
                  <FormItem
                    label={<span>{item.label}</span>}
                    {...item.formItemLayout}
                    key={item.field}
                  >
                    {getFieldDecorator(item.field, {
                      rules: [{required: item.required, message: item.message}],
                      initialValue: item.initialValue
                    })(
                      item.render
                    )}
                  </FormItem>
                );
              default:
                return null;
            }
          })
        }
      </div>
    )
  }
}
