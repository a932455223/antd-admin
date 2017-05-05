import React,{Component} from 'react'
import {Button, Card, Col, DatePicker, Form, Input, Row, Select} from "antd";
import {connect} from "react-redux";
import API from "../../../../../../API";
import ajax from '../../../../../tools/POSTF'
const FormItem = Form.Item;
const Option = Select.Option;

class EducationInfoForm extends Component{
  state = {
    changed : false
  }
  onHandleSubmit = () => {
    const id = this.props.id;
    const { getFieldsValue} = this.props.form;
    const FieldsValue = getFieldsValue();
    FieldsValue.graduationTime = FieldsValue.graduationTime && FieldsValue.graduationTime.format('YYYY-MM-DD')
    ajax.Put(API.PUT_STAFF(id),FieldsValue)
    .then(() => {
      this.props.getStaffs()
    })
  }
  inputChange=()=>{
    this.setState({
      changed:true
    })
  }
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
                onChange:this.inputChange,
              })(
                <Select
                  getPopupContainer={ () => document.getElementById('staffEditor')}
                >
                  {
                    this.props.dropdown.educationLevel.map(item => {
                      return <Option value={item.id.toString()} key={item.id.toString()}>{item.name}</Option>
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
                onChange:this.inputChange,
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
                onChange:this.inputChange,
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
                onChange:this.inputChange,
              })(
                <DatePicker
                  getCalendarContainer={ () => document.getElementById('staffEditor')}
                 />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className="buttonrow">
            <Col span="3"></Col>
            <Col span="20">
              <Button
                className={this.state.changed ? "ablesavebtn" : "disablesavebtn"}
                disabled={this.state.changed ? false : true}
                htmlType="submit"
                onClick={this.onHandleSubmit}
              >保存</Button>
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

function mapPropsToFields(props){
  const {educationInfo} = props;
  console.dir(educationInfo)
  return {
    educationLevel:{
      ...educationInfo.educationLevel
    },
    major:{
      ...educationInfo.major
    },
    school:{
      ...educationInfo.school
    },
    graduationTime:{
      ...educationInfo.graduationTime
    }
  }
}

function onFieldsChange(props,changedFields){
  props.onChange(changedFields)
}

export default connect(mapStateToProps)(Form.create({onFieldsChange,mapPropsToFields})(EducationInfoForm));
