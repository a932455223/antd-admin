import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Tabs,
  Icon,
  Row,
  Col,
  Spin,
  Button,
  notification,
  Form,
  Select,
  Input
} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

import styles from './indexStyle.scss';
import { fillCustomerInfo } from '../../../redux/actions/customerAction';

class NewCustomer extends Component {
  // 下拉框选择发生变化时
  selectChange = (value) => {
    // console.log(value);
  }

  inputChange = (e) => {
    // const { getFieldValue } = this.props.form;
    // console.log(getFieldValue('name'))
    // console.log(e.target);
  };

  // submit client
  submitClient = () => {
    // console.log({...this.props});
    const { dispatch } = this.props;
    const { getFieldsValue } = this.props.form;
    const customer = getFieldsValue();
    // 判断 customerName是否为空，若不为空，则跳转到 create状态下的 basicInfo页面
    if(customer.name !== '') {
      dispatch(fillCustomerInfo(customer.category, customer.name))
    }
  }

  // 绑定键盘事件，点击 enter，提交 customer.name customer.category
  createCustomer = (e) => {
    if(e.keyCode === 13) {
      this.submitClient()
    }
  }

  // 点击确认不保存按钮后，关闭 Dock弹窗
  openNotification = () => {
    this.props.closeDock();
  }

  // 点击确认按钮，跳转到新建客户页面

  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 3},
      wrapperCol: {span: 9}
    };

    return (
      <div>
        <p style={{textAlign: 'right', padding: 10}}>
          <Icon
            style={{fontSize: 22, cursor: 'pointer'}}
            onClick={this.openNotification}
            type="close"
          />
        </p>

        <Form>
          <Row>
            <Col span={24}>
              <FormItem wrapperCol={{span: 8}}>
                {getFieldDecorator('category', {
                  initialValue: '个人客户',
                  rules: [{
                    type: 'string',
                    required: true,
                    // message: 'Please select the movie type!'
                  }],
                  onChange: this.selectChange
                })(
                  <Select placeholder="请选择客户类别">
                    <Option value="个人客户">个人客户</Option>
                    <Option value="企业客户">企业客户</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={16}>
              <FormItem wrapperCol={{span: 24}}>
                {getFieldDecorator('name', {
                  initialValue: '',
                  rules: [{
                    type: 'string',
                    required: true,
                    // message: 'Please select the movie type!'
                  }],
                  onChange: this.inputChange
                })(
                  <Input onKeyDown={this.createCustomer}/>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem>
                <Button type="primary" onClick={this.submitClient}>确认新建</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
const AddNewCustomer = Form.create()(NewCustomer);

// customer Slider component
class CustomerSlider extends Component {
  state = {
    visible: '',
    currentId: '',
    activePersonalTabs: '',
    activeEnterpriseTabs: '',

    personalClient: {
      personalBasicInfo: '',
      familyInfo: '',
      financeInfo: '',
      jobInfo: '',
      riskInfo: '',
    },

    enterpriseClient: {
      enterpriseBasicInfo: '',
      keyPersonInfo: '',
      offlineInfo: '',
    }
  };

  componentWillMount(){
    /*
    * 首次加载，一次性将组件全部加载
    * 异步加载 BasicInfo, FamilyInfo, JobInfo, FinanceInfo, RiskInfo
    */
    console.log('%c/ CustomerSlider /_____will mount', 'color: red');

    require.ensure([],() => {
      let PersonalBasicInfo = require('../PersonalBasicInfo').default;
      let FamilyInfo = require('../FamilyInfo').default;
      let JobInfo = require('../JobInfo').default;
      let FinanceInfo = require('../FinanceInfo').default;
      let RiskInfo = require('../RiskInfo').default;

      let EnterpriseBasicInfo = require('../EnterpriseBasicInfo').default;
      let KeyPersonInfo = require('../KeyPersonInfo').default;
      let OfflineInfo = require('../OfflineInfo').default;

      setTimeout(() => {
        this.setState({
          personalClient: {
            personalBasicInfo: PersonalBasicInfo,
            familyInfo: FamilyInfo,
            jobInfo: JobInfo,
            riskInfo: RiskInfo,
            financeInfo: FinanceInfo
          },

          enterpriseClient: {
            enterpriseBasicInfo: EnterpriseBasicInfo,
            keyPersonInfo: KeyPersonInfo,
            offlineInfo: OfflineInfo,
          }
        })
      }, 100)
    }, 'InfoTabs');
  };

  // show and hide notification
  openNotification = () => {
    if(this.state.fields && this.state.fields.notificate) {
      // 每次显示，生成不同的key，重新渲染页面
      const key = `open${Date.now()}`;

      // 点击放弃编辑按钮，关闭Dock
      const btnClick = () => {
        notification.close(key);
        // 点击确认不保存按钮后，关闭 Dock弹窗
        this.props.closeDock();

        // 关闭在点击 Dock后，重置 notificate: false
        this.setState({
          fields: {
            username: {
              value: 'ABC'
            },
            age: {
              value: 12
            },
            notificate: false
          },
        })
      };

      // 放弃编辑按钮
      const btn = (
        <Button type="primary" size="small" onClick={btnClick}>
          放弃编辑
        </Button>
      );

      // 提示主体内容
      notification.open({
        message: '您已编辑了该页面，请点击保存',
        description: '该页面的数据发生了变化，请点击保存按钮，保存修改，若不想保存，请点击放弃',
        btn,
        key,
        // onClose,
        placement: 'topRight'
        // bottom: 50
      });
    } else {
      // 点击确认不保存按钮后，关闭 Dock弹窗
      this.props.closeDock();
    }
  }

  // 个人用户 Tabs切换事件
  personalTabChange = (e) => {
    this.setState({
      activePersonalTabs: e
    })
  };

  // 企业用户 Tabs切换事件
  enterpriseTabChange = (e) => {
    this.setState({
      activeEnterpriseTabs: e
    })
  };

  // 个人用户的 Tabs
  personalUserTabs = () => {
    const { mode, id } = this.props.currentCustomerInfo;
    const { personalClient } = this.state;

    const tabsProps = {
      className: styles.tabs,
      activeKey: this.state.activePersonalTabs,
      onChange: this.personalTabChange
    }

    return (
      <Tabs {...tabsProps} >
        <TabPane
          tab="基本信息"
          key="personalBasicInfo"
        >
          {personalClient && personalClient.personalBasicInfo &&
            <personalClient.personalBasicInfo />
          }
        </TabPane>
        <TabPane
          tab="家庭信息"
          key="familyInfo"
          disabled={mode === 'create' ? true : false}
        >
          {personalClient && personalClient.familyInfo &&
            <personalClient.familyInfo />
          }
        </TabPane>
        <TabPane
          tab="工作信息"
          key="jobInfo"
          disabled={mode === 'create' ? true : false}
        >
          {personalClient && personalClient.jobInfo &&
            <personalClient.jobInfo />
          }
        </TabPane>
        <TabPane
          tab="金融业务信息"
          key="financeInfo"
          disabled={mode === 'create' ? true : false}
        >
          {personalClient && personalClient.financeInfo &&
            <personalClient.financeInfo />
          }
        </TabPane>
        <TabPane
          tab="风险测试"
          key="riskInfo"
          disabled={mode === 'create' ? true : false}
        >
          {personalClient && personalClient.riskInfo &&
            <personalClient.riskInfo />
          }
        </TabPane>
      </Tabs>
    )
  }

  // 企业用户的 tabs
  enterpriseUserTabs = () => {
    const { mode, id } = this.props.currentCustomerInfo;
    const { enterpriseClient } = this.state;

    // tabs props
    const tabsProps = {
      className: styles.tabs,
      activeKey: this.state.activeEnterpriseTabs,
      onChange: this.enterpriseTabChange,
    }

    return(
      <Tabs {...tabsProps} >
        <TabPane tab="基本信息" key="enterpriseBasicInfo">
          {enterpriseClient.enterpriseBasicInfo &&
            <enterpriseClient.enterpriseBasicInfo />
          }
        </TabPane>
        <TabPane
          tab="关键人信息"
          key="keyPersonInfo"
          disabled={mode === 'create' ? true : false}
        >
          {enterpriseClient.keyPersonInfo &&
            <enterpriseClient.keyPersonInfo />
          }
        </TabPane>
        <TabPane
          tab="线下业务"
          key="offlineInfo"
          disabled={mode === 'create' ? true : false}
        >
          {enterpriseClient.offlineInfo &&
            <enterpriseClient.offlineInfo />
          }
        </TabPane>
      </Tabs>
    )
  }

  // view or edit customer
  vieweOrEditCustomer = () => {
    const { visible, currentCustomerInfo } = this.props;

    return(
      <div>
        <div className={styles.header}>
          <span>{currentCustomerInfo.name}</span>
          <span>{currentCustomerInfo.id}</span>

          <Row className={styles.options}>
            <Col span={6}>
              <Icon type="star-o" />
              <span className="nav-text">关注</span>
            </Col>
            <Col span={6}>
              <Icon type="bell" />
              <span className="nav-text">提醒</span>
            </Col>
            <Col span={6}>
              <Icon type="ellipsis" />
              <span className="nav-text">更多</span>
            </Col>
            <Col span={6}>
              <Icon
                className={styles.icon}
                onClick={this.openNotification}
                type="close"
              />
            </Col>
          </Row>
        </div>

        {currentCustomerInfo.category && currentCustomerInfo.category == '个人客户'
          ?
          this.personalUserTabs()
          :
          this.enterpriseUserTabs()
        }
      </div>
    )
  }

  componentWillReceiveProps(next) {
    console.log('%c/ CustomerSlider /_____Receive Props', 'color: red');
    const { id, mode } = this.props.currentCustomerInfo;
    const { currentId, activePersonalTabs, activeEnterpriseTabs } = this.state;

    // 判断 currentId不等于新的 id，mode状态为 create，或者 activePersonalTabs／activeEnterpriseTabs 为空
    const resstPersonalTabs   = id !== currentId || mode === 'create' || activePersonalTabs === '';
    const resstEnterpriseTabs = id !== currentId || mode === 'create' || activeEnterpriseTabs === '';

    // 判断当前的 id与 nextProps中的 id是否相等，若不相等，则重置 state
    if(id !== next.currentCustomerInfo.id) {
      this.setState({
        currentId: id ? id : '',
        activePersonalTabs: resstPersonalTabs ? 'personalBasicInfo' : activePersonalTabs,
        activeEnterpriseTabs: resstEnterpriseTabs  ? 'enterpriseBasicInfo' : activeEnterpriseTabs
      })
    }
  }

  render() {
    const { step, mode } = this.props.currentCustomerInfo;

    return(
      <div>
        {step === 1 && mode === 'create' &&
          <AddNewCustomer {...this.props}/>
        }

        {step === 2 &&
          this.vieweOrEditCustomer()
        }
      </div>
    )
  }
}

// export default CustomerSlider;
const mapStateToProps = (store) => {
  return {
    currentCustomerInfo: store.customer.currentCustomerInfo
  }
}

export default connect(mapStateToProps)(CustomerSlider);
