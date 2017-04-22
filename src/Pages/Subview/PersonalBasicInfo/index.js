import React, { Component } from 'react';
import {
  Card,
  Tabs,
  Row,
  Col,
  Icon,
  Form,
  InputNumber,
  Input,
  Button,
  Tag,
  Select,
  DatePicker,
  Timeline,
  Modal
 } from 'antd';
import axios from 'axios';
import API from '../../../../API';
import { connect } from 'react-redux';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
import './indexStyle.less';
function info(msg){
    console.log('%c'+msg,'color:red')
}

// 新增维护记录
class AddNewRecordForm extends Component {
  // 下拉框选择发生变化时
  selectChange = (value) => {
    // console.log(value);
  }

  // 日期修改时，打印日期
  dateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  // 修改输入的次数
  inputChange = (e) => {
    // const { getFieldValue } = this.props.form;
    // console.log(getFieldValue('name'))
    // console.log(e.target);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 3},
      wrapperCol: {span: 9}
    };

    return (
      <Card  title={<span>
                      <Icon type="plus-circle-o" />新增维护记录
                    </span>}>
        <Form>
          <Row>
            <Col span={12}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        label="维护切入点">
                {getFieldDecorator('maintainPointCut', {
                  rules: [{
                    required: true,
                    // message: 'Please select the movie type!'
                  }],
                  onChange: this.selectChange
                })(
                  <Select placeholder="请选择切入类型">
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
                  <Select placeholder="请选择维护方式">
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
                  <DatePicker onChange={this.onChange} />
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

            <Col span={24}>
              <Col span={4}>
              </Col>
              <Button type="primary">发布</Button>
              <Button>取消</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
}
const AddNewRecord = Form.create()(AddNewRecordForm);

// 维护记录
class MaintainRecord extends Component {
  render() {
    return(
      <div className="">
        <Timeline className="">
          <Timeline.Item >
            <div className="">
              <div>
                <p>2015-09-01</p>
                <p>14:02:20</p>
              </div>

              <div className="">
                <header>
                  <span>张益达</span>
                  <span>
                    <span><Icon type="edit" />编辑</span>
                    <span><Icon type="delete" />删除</span>
                  </span>
                </header>

                <section>
                  <span>【电话】</span>进行了
                  <span>1</span>次
                  <span>【产品到期提醒】</span>维护
                </section>

                <section className="">
                  <Input  type='textarea'
                          rows={4}
                          value='介绍理财产品，制定理财计划书，客户下单'/>
                  <footer>
                    <span>取消</span>
                    <span>保存修改</span>
                  </footer>
                </section>
              </div>
            </div>
          </Timeline.Item>
          <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
          <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
          <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        </Timeline>

        <Button>加载更多<Icon type="down" /></Button>
      </div>
    )
  }
}

// 添加人员弹窗
class AddCrewModal extends Component {
  state = {
    confirmLoading: false,
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });

    setTimeout(() => {
      this.props.hide();
      this.setState({
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    this.props.hide();
  };

  render() {
    const { visible } = this.props;
    return(
      <Modal  title="选择人员"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={this.state.confirmLoading}
              onCancel={this.handleCancel}>

        <Tabs type='card'>
          <TabPane tab="职位" key="crewPosition">
          </TabPane>
          <TabPane tab="群组" key="crewGroup">
          </TabPane>
        </Tabs>
      </Modal>
    )
  }
}



//个人信息表单................
let uuid = 0;
class BasicInfoEdit extends Component{
  constructor(props) {
    super(props);
    this.inputChange = this.inputChange.bind(this);
  }
  inputChange(){
    this.props.inputChange()
  }
  onHandleSubmit(){
    const {getFieldsValue} = this.props.form;
    getFieldsValue();
    // this.setState({
    //   mode:"edit"
    // })
  }
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  render() {
    const {eachCustomerInfo, edited,currentId} = this.props;
    console.log(eachCustomerInfo);
    const { getFieldDecorator,getFieldValue} = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    console.log(keys);
    const formItems = keys.map((k, index) => {
      return (
        <div>
        <Row>
          <Col span={12}>
            <FormItem
              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
              label={index === 1 ? '账户：' : ''}
              required={false}
              key={k}
              labelCol={{span: 3}}
              wrapperCol={{span: 9}}
            >
              {getFieldDecorator(`names-${k}`, {
                validateTrigger: ['onChange', 'onBlur'],
                initialValue: eachCustomerInfo.manager,
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's name or delete this field.",
                }],
              })(
                <Input placeholder="passenger name"  />
              )}

            </FormItem>
          </Col>
          <Col span={12}>
              <FormItem>
                {getFieldDecorator('info', {
                  initialValue: eachCustomerInfo.wechat,
                  onChange: this.inputChange
                })(
                  <Input />
                )}
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={keys.length === 1}
                  onClick={() => this.remove(k)}
                />
              </FormItem>
          </Col>
        </Row>
        </div>
      )
    });

    return (
        <Form className="basicinfolist">
          <Row className={currentId === -1 ? "briefinfocreate" : "briefinfoedit"} >
            <Col span={8}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 14}}
                        label="所属机构： ">
                {getFieldDecorator('department', {
                  rules: [{
                    required: true,
                    message: '请选择所属机构!'
                  }],
                  initialValue: eachCustomerInfo.department,
                  onChange: this.inputChange
                })(
                    <Select
                      showSearch
                      placeholder="选择机构"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      <Option value="jack">支行1</Option>
                      <Option value="lucy">支行2</Option>
                      <Option value="tom">支行3</Option>
                    </Select>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 14}}
                        label="客户经理： ">
                {getFieldDecorator('manager', {
                  initialValue: eachCustomerInfo.manager,
                  onChange: this.inputChange
                })(
                  <Select
                    showSearch
                    placeholder="选择机构"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="jack">支行1</Option>
                    <Option value="lucy">支行2</Option>
                    <Option value="tom">支行3</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 14}}
                        label="所属网格： ">
                {getFieldDecorator('grid', {
                  initialValue: eachCustomerInfo.grid,
                  onChange: this.inputChange
                })(
                  <Select
                    showSearch
                    placeholder="选择机构"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="jack">支行1</Option>
                    <Option value="lucy">支行2</Option>
                    <Option value="tom">支行3</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>

          <div className="personinfo">
            {formItems}
            <Row>
              <Col span={12} className={currentId === -1 ? "phonecreate" : "phoneedit"}>
                <FormItem labelCol={{span: 6}}
                          wrapperCol={{span: 18}}
                          label="手机号：">
                  {getFieldDecorator('phone', {
                    initialValue: eachCustomerInfo.wechat,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "wechatcreate" : "wechatedit"}>
                <FormItem labelCol={{span: 6}}
                          wrapperCol={{span: 18}}
                          label="微信号：">
                  {getFieldDecorator('wechat', {
                    initialValue: eachCustomerInfo.wechat,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12} className={currentId === -1 ? "idcreate" : "idedit"}>
                <FormItem labelCol={{span: 6}}
                          wrapperCol={{span: 18}}
                          label="身份证号：">
                  {getFieldDecorator('certificate', {
                    initialValue: eachCustomerInfo.certificate,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>

              <Col span={12} className={currentId === -1 ? "birthcreate" : "birthedit"}>
                <FormItem labelCol={{span: 6}}
                          wrapperCol={{span: 18}}
                          label="生日：">
                  {getFieldDecorator('birth', {
                    initialValue: eachCustomerInfo.birth,
                    onChange: this.inputChange
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Col span={3}>
                  <span>参与者：</span>
                </Col>
                <Col span={21}>
                  <span className="addCrewButton"
                        onClick={this.props.show}>
                    <Icon type="plus-circle-o" />添加人员
                  </span>
                </Col>
              </Col>
            </Row>
          </div>
          <Row>
            <Col span={24} style={{backgroundColor: '#fafafa', padding: '10px 0'}}>
              <Col span={3}>
              </Col>
              <Button type="primary" onClick={this.onHandleSubmit.bind(this)}>保存</Button>
            </Col>
          </Row>
        </Form>
        )
  }
}
const BasicInfoListsEdit = Form.create()(BasicInfoEdit);



class BasicInfo extends Component {
  state = {
    modalVisible: false,
    edited:false,
    eachCustomerInfo: ''
  }
  componentWillMount(){
      this.getBaseInfo(this.props.currentCustomerInfo.id)
  }

  componentWillReceiveProps(next){
      this.getBaseInfo(next.currentCustomerInfo.id);
  }


  getBaseInfo = (id) => {
      axios.get(API.GET_CUSTOMER_BASE(id))
      .then((res) => {
          this.setState({
              ...this.state,
            eachCustomerInfo: res.data.data
          })
      })
  }

  // modal Show
  modalShow = () => {
    this.setState({
      modalVisible: true
    })
  }

  // modal hide
  modalHide = () => {
    this.setState({
      modalVisible: false
    })
  }

  // handleChange(){
  //   this.setState({
  //     edited:true
  //   })
  // }



  render() {
    const modal = {
      visible: this.state.modalVisible,
      hide: this.modalHide
    };
    const {step, mode, currentId} = this.props;
    const {eachCustomerInfo,edited} = this.state;
    return(
      <div style={{textAlign: 'left'}}>

        <AddCrewModal {...modal}/>

        <div className="">

          { mode !== "view" && <BasicInfoListsEdit
                                  currentId={this.props.currentId}
                                  eachCustomerInfo={this.state.eachCustomerInfo}
                                  />}

          { mode === "view" && <BasicInfoListsRead />}
        </div>

        <div className="">
          <Tabs type='card'>
            <TabPane tab="维护记录" key="basicInfo">
              <AddNewRecord />
              <MaintainRecord />
            </TabPane>
            <TabPane tab="操作记录" key="familyInfo">
              2
            </TabPane>
            <TabPane tab="修改记录" key="jobInfo">
              3
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (store) => {
  console.log(store)
  return {
    currentCustomerInfo: store.customer.currentCustomerInfo
  }
}
export default connect(mapStateToProps)(BasicInfo);
