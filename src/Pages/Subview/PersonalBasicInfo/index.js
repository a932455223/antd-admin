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
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

import styles from './indexStyle.scss';

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
      <div className={styles.record}>
        <Timeline className={styles.timeRecord}>
          <Timeline.Item >
            <div className={styles.timeline}>
              <div>
                <p>2015-09-01</p>
                <p>14:02:20</p>
              </div>

              <div className={styles.recordContent}>
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

                <section className={styles.recordDetails}>
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

export default class BasicInfo extends Component {
  state = {
    modalVisible: false,
    currentId: this.props.currentId ,
    eachCustomerData: ''
  }

  // componentWillMount() {
  //   axios.get('http://115.159.58.21:8099/crm/api/customer/' + this.state.currentId + '/base')
  //   .then((response) => {
  //       console.log(response);
  //       // this.setState({
  //       //   eachCustomerData: response
  //       // })
  //   })
  // }

  // render Brief info
  renderBriefInfo = () => (
    <Row>
      <Col span={8}>
        <span>所属机构：</span>
        <span>慈溪支行</span>
      </Col>
      <Col span={8}>
        <span>客户经理：</span>
        <span>张建超</span>
      </Col>
      <Col span={8}>
        <span>所属网络：</span>
        <span>B291</span>
      </Col>
    </Row>
  )

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

  // render basic info lists
  renderBasicInfoLists = () => {
    <Row>
      <Col span={24}>
        <Col span={3}>
          <span>账户：</span>
        </Col>
        <Col span={9}>
          <Input defaultValue='1235'/>
        </Col>
      </Col>

      <Col span={12}>
        <Col span={6}>
          <span>手机号：</span>
        </Col>
        <Col span={18}>
          <span>13949888182</span>
        </Col>
      </Col>

      <Col span={12}>
        <Col span={6}>
          <span>微信号：</span>
        </Col>
        <Col span={18}>
          <span>19929923</span>
        </Col>
      </Col>

      <Col span={12}>
        <Col span={6}>
          <span>身份证号：</span>
        </Col>
        <Col span={18}>
          <span>310283828123</span>
        </Col>
      </Col>

      <Col span={12}>
        <Col span={6}>
          <span>生日：</span>
        </Col>
        <Col span={18}>
          <span>1998-01-12</span>
        </Col>
      </Col>

      <Col span={24}>
        <Col span={3}>
          <span>参与者：</span>
        </Col>
        <Col span={9}>
          <Tag closable color="#108ee9">张建超</Tag>
          <Tag closable color="#108ee9">张建超</Tag>
          <span className={styles.addCrewButton}
                onClick={this.modalShow}>
            <Icon type="plus-circle-o" />添加人员
          </span>
        </Col>
      </Col>

      <Col span={24} style={{backgroundColor: '#fafafa', padding: '10px 0'}}>
        <Col span={3}>
        </Col>
        <Button type="primary">保存</Button>
        <Button>取消</Button>
      </Col>
    </Row>
  }

  componentWillMount() {
    console.log('personalBasicInfo: will mount ');
  }

  componentWillReceiveProps(next) {
    // console.log(this.props);
    // console.log(next);
  }

  render() {
    const modal = {
      visible: this.state.modalVisible,
      show: this.modalShow,
      hide: this.modalHide
    };

    return(
      <div style={{textAlign: 'left'}}>
        <div className={styles.detailInfo}>
          {this.renderBriefInfo()}
          <AddCrewModal {...modal}/>
        </div>

        <div className={styles.detailInfo}>
          {this.renderBasicInfoLists()}
        </div>

        <div className={styles.detailInfo}>
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
