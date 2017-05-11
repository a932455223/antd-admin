import React,{Component} from 'react';
import update from "immutability-helper";
import {
  Card,
  Button,
  Form,
  Select,
  Icon,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Input,
  message
} from 'antd';
import moment from 'moment';
import ajax from '../../../../../tools/POSTF';
import API from "../../../../../../API";

const dateFormat = 'YYYY-MM-DD HH:mm:ss'; // 日期格式

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const FormItem = Form.Item;
const Option = Select.Option;
class AddMaintainRecordForm extends Component {
  state = {
    formVisible: false,
    maintenanceAspectOptions: [],
    maintenanceMethodOptions: []
  }

  componentWillMount() {
    ajax.all([
      ajax.Get(API.GET_COMMON_DROPDOWN('maintenanceAspect')),
      ajax.Get(API.GET_COMMON_DROPDOWN('maintenanceMethod'))
    ]).then((res)=>{
      let newState = update(this.state, {
        maintenanceAspectOptions: {$set: res[0].data.data},
        maintenanceMethodOptions: {$set: res[1].data.data},
      });
      this.setState(newState);
    })
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
    if(this.state.formVisible) {
      this.setState({
        formVisible: false
      })
    } else {
      this.setState({
        formVisible: true
      })
    }
  }

  // publish maintain record
  publishMaintainRecord = (record) => {
    const { id } = this.props.eachCustomerInfo;
    const { validateFields, getFieldsError, setFieldsValue } = this.props.form;
    validateFields();
    if(hasErrors(getFieldsError())) {
      message.error('表单填写有误，请仔细检查表单');
    } else {
      let recordData = {
        aspect: record.maintainAspect - 0,
        method: record.maintainMethod - 0,
        maintenanceTime: record.maintainTime != null ? moment(record.maintainTime).format(dateFormat) : '',
        maintenanceCount: record.maintainCount - 0,
        content: record.maintainContent != undefined ? record.maintainContent : ''
      }

      ajax.Post(API.POST_CUSTOMER_MAINTENANCE_COUNT(id), recordData)
          .then(res => {
            if(res.data.code === 200) {
              message.success('维护记录添加成功');
              
              setFieldsValue({
                maintainAspect: undefined,
                maintainMethod: undefined,
                maintainTime: undefined,
                maintainCount: undefined,
                maintainContent: undefined
              })
            } else {
              message.error(res.data.message)
            }
          })
    }
  }

  // 取消所填的维护记录
  resetMaintainRecord = () => {
    const { setFieldsValue } = this.props.form;

    setFieldsValue({
      maintainAspect: undefined,
      maintainMethod: undefined,
      maintainTime: undefined,
      maintainCount: undefined,
      maintainContent: undefined
    })
  }

  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const {
      maintenanceAspectOptions,
      maintenanceMethodOptions
    } = this.state;

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
                  {getFieldDecorator('maintainAspect', {
                    rules: [{
                      required: true,
                      message: '请选择维护切入点!'
                    }],
                    onChange: this.selectChange
                  })(
                    <Select
                      // showSearch
                      // optionFilterProp="children"
                      placeholder="请选择切入类型"
                      // filterOption={(input, option) => option.props.children.toLowerCase().includes(input.toLowerCase())}
                      getPopupContainer={() => document.getElementById('maintainRecord')}
                    >
                      {maintenanceAspectOptions && maintenanceAspectOptions.map(maintenanceAspectItem =>
                        <Option key={maintenanceAspectItem.id} value={maintenanceAspectItem.id + ''}>{maintenanceAspectItem.name}</Option>
                      )}
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
                      // showSearch
                      optionFilterProp="children"
                      placeholder="请选择维护方式"
                      // filterOption={(input, option) => option.props.children.toLowerCase().includes(input.toLowerCase())}
                      getPopupContainer={() => document.getElementById('maintainRecord')}
                    >
                      {maintenanceMethodOptions && maintenanceMethodOptions.map(maintenanceMethodItem =>
                        <Option key={maintenanceMethodItem.id} value={maintenanceMethodItem.id + ''}>{maintenanceMethodItem.name}</Option>
                      )}
                    </Select>
                  )}
                </FormItem>
              </Col>

              <Col span={12}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 16}}
                          label="维护日期">
                  {getFieldDecorator('maintainTime', {
                    rules: [{
                      required: true,
                      message: '请选择维护时间!'
                    }],
                    onChange: this.dateChange
                  })(
                    <DatePicker
                      onChange={this.onChange}
                      getCalendarContainer={() => document.getElementById('maintainRecord')}
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={12}>
                <FormItem labelCol={{span: 8}}
                          wrapperCol={{span: 16}}
                          label="维护次数">
                  {getFieldDecorator('maintainCount', {
                    rules: [{
                      required: true,
                      message: '请输入维护次数!'
                    },{
                      pattern: /^\d+$/,
                      message: '请输入数字'
                    }],
                    // initialValue: 1,
                    onChange: this.inputChange
                  })(
                    <InputNumber
                      placeholder="维护次数"
                      min={1}
                      max={100}
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={24}>
                <FormItem labelCol={{span: 4}}
                          wrapperCol={{span: 20}}
                          label="维护成效">
                  {getFieldDecorator('maintainContent', {
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
                  onClick={this.publishMaintainRecord.bind(this, getFieldsValue())}
                >发布</Button>
                <Button
                  className="cancle"
                  onClick={this.resetMaintainRecord}
                >取消</Button>
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
