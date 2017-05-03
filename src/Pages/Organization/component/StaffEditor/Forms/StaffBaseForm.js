import React,{Component} from 'react'
import {Button, Card, Col, DatePicker, Form, Input, Row, Select} from "antd";
import {connect} from "react-redux";

const FormItem = Form.Item;
const Option = Select.Option;

class StaffBaseForm extends Component{

  state = {
    changed:false
  }

  componentWillReceiveProps(){
    console.log('StaffBaseForm will receive props.')
  }

  render(){
    let {baseInfo} = this.props;
    baseInfo = {
      name:'',
      certificateNo:'',
      address:'',
      wechat:''
    }

    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };

    const {getFieldDecorator} = this.props.form;
    const Gender = getFieldDecorator('gender', {
      rules: [{required: false, message: '请选择性别!'}],
      initialValue: baseInfo.gender && baseInfo.gender.id
    })(
      <Select
        placeholder="请选择性别"
        getPopupContainer={ () => document.getElementById('staffEditor')}
      >
        {
          this.props.dropdown.gender.map(item => {
            return <Option value={item.id.toString()} key={item.id}>{item.name}</Option>
          })
        }
      </Select>
  :
    null
  );

    return (
      <Card
        title={(
          <Row>
            <Col span="18">
              <h3>个人档案</h3>
            </Col>
            <Col span="3">
              <Button
                className="cancel"
                disabled={this.state.changed ? false : true}
              >取消</Button>
            </Col>
            <Col span="3">
              <Button
                className="save"
                disabled={this.state.changed ? false : true}
                htmlType="submit"
              >保存</Button>
            </Col>
          </Row>
        )}
      >
        <Form>
        <Row>
          <Col span={12}>
            <FormItem
              label={<span>姓名</span>}
              {...formItemLayout}

            >
              {getFieldDecorator('name', {
                rules: [{required: false, message: '请填写员工名称!'}],
                initialValue: baseInfo.name
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={<span>性别</span>}
              {...formItemLayout}
            >
              {Gender}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              label={<span>证件号码</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('certificateNo', {
                rules: [{required: false, message: '请填写证件号码!'}],
                initialValue: baseInfo.certificateNo
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={<span>邮箱</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('email', {
                rules: [{required: false, message: '请输入邮箱!'}],
                initialValue: baseInfo.email
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              label={<span>出生日期</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('birth', {
                rules: [{required: false, message: '请选择出生日期!'}],
                initialValue: baseInfo.birth && moment(baseInfo.birth)
              })(
                <DatePicker
                  getCalendarContainer={ () => document.getElementById('staffEditor')}
                  onChange={() => {
                    this.setState({
                      changed: true
                    })
                  }}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={<span>手机</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('phone', {
                rules: [{required: false, message: '请填写手机号码!'}],
                initialValue: baseInfo.phone
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              label={<span>微信号</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('wechat', {
                rules: [{required: false, message: '请输入微信号!'}],
                initialValue: baseInfo.wechat
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={<span>家庭住址</span>}
              {...formItemLayout}
            >
              {getFieldDecorator('address', {
                rules: [{required: false, message: '请填写家庭住址!'}],
                initialValue: baseInfo.address
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
        </Form>
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
  const {baseInfo} = props;
  return {
    name:{
      ...baseInfo.name
    },
    certificateNo:{
      ...baseInfo.certificateNo
    },
    email:{
      ...baseInfo.email
    },
    birth:{
      ...baseInfo.birth
    },
    phone:{
      ...baseInfo.phone
    },
    wechat:{
      ...baseInfo.wechat
    },
    address:{
      ...baseInfo.address
    }

  }
}

function onFieldsChange(props,changedFields){
  props.onChange(changedFields)
}
export default connect(mapStateToProps)(Form.create({
  onFieldsChange,
  mapPropsToFields
})(StaffBaseForm));
