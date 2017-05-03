import React,{Component} from 'react'
import {Button, Card, Col, DatePicker, Form, Input, Row, Select} from "antd";
import {connect} from "react-redux";
const FormItem = Form.Item;
const Option = Select.Option;

class JobInfoForm extends Component{
  state = {

  }

  componentWillReceiveProps(nextProps) {
    console.dir(nextProps.parentDepartmentDropDown)
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    const {jobInfo} = this.props;
    // const {departments} = this.props.dropdown

    console.log('%clen:'+this.props.parentDepartmentDropDown.length,'color:red')
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
      <Card title={<h3>工作信息</h3>}>
        <Row>
          <Col span={12}>
            <FormItem
              label={<span>所属机构</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('departments', {
                rules: [{required: false, message: '所属机构!'}],
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
                rules: [{required: false, message: '入职时间!'}],
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
                rules: [{required: false, message: '工号!'}],
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
                rules: [{required: false, message: '职位!'}],
              })(
                <Select
                  getPopupContainer={ () => document.getElementById('staffEditor')}
                >
                  {
                    this.props.dropdown.jobCategory.map(item => {
                      return <Option value={item.id} key={item.id}>{item.name}</Option>
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
                rules: [{required: false, message: '所属机构!'}],
              })(
                <Select
                  getPopupContainer={ () => document.getElementById('staffEditor')}
                >
                  {
                    // this.state.leadersDropdown.map(item => {
                    //   return <Option value={item.id.toString()} key={item.id}>{item.name}</Option>
                    // })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem
            label={<span>调岗记录</span>}
            labelCol={{span: 3}}
            wrapperCol={{span: 7}}
          >
            {getFieldDecorator('asd', {
              rules: [{required: false, message: '调岗记录!'}],
            })(
              <Input/>
            )}
          </FormItem>
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
export default connect(mapStateToProps)(Form.create(onFieldsChange,mapPropsToFields)(JobInfoForm));
