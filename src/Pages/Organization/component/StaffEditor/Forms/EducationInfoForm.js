import React,{Component} from 'react'
import {Button, Card, Col, DatePicker, Form, Input, Row, Select} from "antd";
import {connect} from "react-redux";
const FormItem = Form.Item;
const Option = Select.Option;

class EducationInfoForm extends Component{
  render(){
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };

    let baseInfo = {
      educationLevel:'',
      major:''
    }
    return (
      <Card title={<h3>教育经历</h3>}>
        <Row>
          <Col span={12}>
            <FormItem
              label={<span>学历</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('educationLevel', {
                rules: [{required: false, message: '学历!'}],
                initialValue: baseInfo.educationLevel && baseInfo.educationLevel.id
              })(
                <Select
                  getPopupContainer={ () => document.getElementById('staffEditor')}
                  onChange={() => {
                    this.setState({
                      changed: true
                    })
                  }}
                >
                  {
                    this.props.dropdown.educationLevel.map(item => {
                      return <Option value={item.id} key={item.id}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={<span>专业</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('major', {
                rules: [{required: false, message: '专业!'}],
                initialValue: baseInfo.major
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              label={<span>毕业院校</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('school', {
                rules: [{required: false, message: '毕业院校!'}],
                initialValue: baseInfo.school
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={<span>毕业时间</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('graduationTime', {
                rules: [{required: false, message: '毕业时间!'}],
                initialValue: baseInfo.graduationTime && moment(baseInfo.graduationTime)
              })(
                <DatePicker onChange={() => {
                  this.setState({
                    changed: true
                  })
                }}/>
              )}
            </FormItem>
          </Col>
        </Row>
      </Card>
    )
  }
}

function mapStateToProps(store) {
  return {
    dropdown: store.dropdown
  }
}

export default connect(mapStateToProps)(Form.create()(EducationInfoForm));
