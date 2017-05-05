import React,{Component} from 'react'
import {Button, Card, Col, DatePicker, Form, Input, Row, Select} from "antd";
import {connect} from "react-redux";
import API from "../../../../../../API";
import ajax from '../../../../../tools/POSTF'
const FormItem = Form.Item;
const Option = Select.Option;

class JobInfoForm extends Component{
  state = {
    changed : false
  }

  componentWillReceiveProps(nextProps) {
    console.dir(nextProps.parentDepartmentDropDown)
  }
  onHandleSubmit = () =>{
    const id = this.props.id;
    const { getFieldsValue} = this.props.form;
    const FieldsValue = getFieldsValue();
    FieldsValue.inductionTime = FieldsValue.inductionTime && FieldsValue.inductionTime.format('YYYY-MM-DD')

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
    const {jobInfo} = this.props;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };

    let baseInfo = {
      departments:'',
      inductionTime:''
    }
    return (
      <Card title={<h3>工作信息</h3>}
      className="jobinfoform">
        <Row>
          <Col span={12}>
            <FormItem
              label={<span>所属机构</span>}
              {...formItemLayout}
              className="departments"
            >
              {getFieldDecorator('departments', {
                rules: [{required: true, message: '所属机构!'}],
                onChange:this.inputChange,
              })(
                <Select
                  mode="multiple"
                  getPopupContainer={ () => document.getElementById('staffEditor')}
                >
                  {
                    this.props.parentDepartmentDropDown.map((item) => {
                      return <Option value={item.id.toString()} key={item.id.toString()}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={<span>入职时间</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('inductionTime', {
                rules: [{required: true, message: '入职时间!'}],
                onChange:this.inputChange,
              })(
                <DatePicker
                getCalendarContainer={ () => document.getElementById('staffEditor')}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              label={<span>工号</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('jobNumber', {
                rules: [{required: true, message: '工号!'}],
                onChange:this.inputChange,
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={<span>任职状态</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('jobStatus', {
                rules: [{required: false, message: '任职状态!'}],
                onChange:this.inputChange,
              })(
                <Select
                  getPopupContainer={ () => document.getElementById('staffEditor')}
                >
                  {
                    this.props.dropdown.jobStatus.map(item => {
                      return <Option id={item.id} key={item.id}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              label={<span>职位</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('jobCategory', {
                rules: [{required: true, message: '职位!'}],
                onChange:this.inputChange,
              })(
                <Select
                  getPopupContainer={ () => document.getElementById('staffEditor')}
                >
                  {
                    this.props.dropdown.jobCategory.map(item => {
                      return <Option  key={item.id.toString()}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={<span>直属上级</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('leader', {
                rules: [{required: false, message: '直属上级!'}],
                onChange:this.inputChange,
              })(
                <Select
                  getPopupContainer={ () => document.getElementById('staffEditor')}
                >
                  {
                    // this.props.leadersDropdown.map(item => {
                    //   return <Option value={item.id.toString()} key={item.id}>{item.name}</Option>
                    // })
                  }
                </Select>
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
  const {jobInfo} = props;
  return {
    departments:{
      ...jobInfo.departments
    },
    inductionTime:{
      ...jobInfo.inductionTime
    },
    jobNumber:{
     ...jobInfo.jobNumber
    },
    jobStatus:{
      ...jobInfo.jobStatus
    },
    jobCategory:{
      ...jobInfo.jobCategory
    },
    leader:{
      ...jobInfo.leader
    },
    asd:{
      ...jobInfo.asd
    }
  }
}

function onFieldsChange(props,changedFields){
  props.onChange(changedFields)
}
export default connect(mapStateToProps)(Form.create({
  onFieldsChange,
  mapPropsToFields
})(JobInfoForm));
