import React,{Component} from 'react'
import {Card,Button,Form,Select,Icon,Row,Col,DatePicker,InputNumber,Input} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;
class AddMaintainRecordForm extends Component {
  state = {
    formVisible: false
  }

  // 下拉框选择发生变化时
  selectChange = (value) => {
    // console.log(value);
  }

  // 日期修改时，打印日期
  dateChange = (date, dateString) => {
    // console.log(date, dateString);
  };

  // 修改输入的次数
  inputChange = (e) => {
    // const { getFieldsValue } = this.props.form;
    // console.log(getFieldsValue())
  };

  // add new maintain record
  addNewMaintainRecord = () => {
    this.setState({
      formVisible: true
    })
  }

  // publish maintain record
  publishMaintainRecord = () => {
    this.setState({
      formVisible: false
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Card id="maintainRecord"  title={<span onClick={this.addNewMaintainRecord}>
                      <Icon type="plus-circle-o" />新增维护记录
                    </span>}
            className="addrecord"
      >
        {this.state.formVisible &&
          <Form>
            <Row>
              <Col span={12}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 13}}
                          label="维护切入点">
                  {getFieldDecorator('maintainPointCut', {
                    rules: [{
                      required: true,
                      // message: 'Please select the movie type!'
                    }],
                    onChange: this.selectChange
                  })(
                    <Select
                      placeholder="请选择切入类型"
                      getPopupContainer={() => document.getElementById('maintainRecord')}
                    >
                      <Option value="deadline">产品到期提醒</Option>
                      <Option value="upgrade">产品升级</Option>
                      <Option value="activate">产品激活</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>

              <Col span={12}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 16}}
                          label="维护方式">
                  {getFieldDecorator('maintainMethod', {
                    rules: [{
                      required: true,
                      message: '请选择维护方式!'
                    }],
                    onChange: this.selectChange
                  })(
                    <Select
                      placeholder="请选择维护方式"
                      getPopupContainer={() => document.getElementById('maintainRecord')}
                    >
                      <Option value="mobile">手机</Option>
                      <Option value="wechat">微信</Option>
                      <Option value="message">短信</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>

              <Col span={12}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 16}}
                          label="维护日期">
                  {getFieldDecorator('maintainDate', {
                    onChange: this.dateChange
                  })(
                    <DatePicker
                      onChange={this.onChange}
                      getCalendarContainer={() => document.getElementById('editMyBase')}
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={12}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 16}}
                          label="维护次数">
                  {getFieldDecorator('maintainTimes', {
                    initialValue: 1,
                    onChange: this.inputChange
                  })(
                    <InputNumber min={1} max={10} />
                  )}
                </FormItem>
              </Col>

              <Col span={24}>
                <FormItem labelCol={{span: 4}}
                          wrapperCol={{span: 20}}
                          label="维护成效">
                  {getFieldDecorator('maintainEffect', {
                    onChange: this.inputChange
                  })(
                    <Input  type="textarea"
                            placeholder="介绍理财产品，制定理财计划书，客户下单"
                            rows={4} />
                  )}
                </FormItem>
              </Col>

              <Col span={24} className="buttons">
                <Col span={4}>
                </Col>
                <Button
                  type="primary"
                  className="submit"
                  onClick={this.publishMaintainRecord}
                >发布</Button>
                <Button className="cancle">取消</Button>
              </Col>
            </Row>
          </Form>
        }
      </Card>
    )
  }
}

const AddMaintainRecord = Form.create()(AddMaintainRecordForm);

export default AddMaintainRecord;
