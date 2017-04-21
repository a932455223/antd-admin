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

// import personalBasicInfo  from './Pages/personalBasicInfo';

const LoadSpin = () => {
  return(
    <div>
      <Spin />
    </div>
  )
};

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
    activeTabs: '',

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
    this.setState({
    })
    /*
    * 首次加载，一次性将组件全部加载
    * 异步加载 BasicInfo, FamilyInfo, JobInfo, FinanceInfo, RiskInfo
    */
    console.log('CustomerSlider: will mount ');

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

  // 获取当前激活 TabPane的 key，根据 key加载不同的 page view
  // pageLoading = (key) => {
    // var t = /^[a-z]/
    // const upperKey = key.replace(/^[a-z]/, function(l){return l.toUpperCase()})
    // console.log(upperKey);

    // 异步加载 personalBasicInfo
    // require.ensure([],() => {
    //   let FamilyInfo = require('../FamilyInfo').default;
    //   let JobInfo = require('../JobInfo').default;
    //   let FinanceInfo = require('../FinanceInfo').default;
    //   let RiskInfo = require('../RiskInfo').default;
    //
    //   setTimeout(() => {
    //     this.setState({
    //       familyInfo: FamilyInfo,
    //       jobInfo: JobInfo,
    //       riskInfo: RiskInfo,
    //       financeInfo: FinanceInfo
    //     })
    //     switch(key) {
    //       // 当被点击的 TabPane的 key值为 familyInfo, 加载对应的异步组件
    //       case 'familyInfo':
    //         this.setState({
    //           familyInfo: FamilyInfo
    //         })
    //
    //       case 'jobInfo':
    //         this.setState({
    //           jobInfo: JobInfo
    //         })
    //
    //       case 'RiskInfo':
    //         this.setState({
    //           riskInfo: RiskInfo
    //         })
    //
    //       case 'financeInfo':
    //         this.setState({
    //           financeInfo: FinanceInfo
    //         })
    //     }
    //   }, 1000)
    // }, 'FamilyInfo');
  // }

  // 切换面板
  tabChange = (e) => {
    console.log(e);
    this.setState({
      activeTabs: e
    })

    // if(id !== this.state.currentId || mode === 'create'){}
  };

  // 个人用户的 Tabs
  personalUserTabs = () => {
    const { mode, id } = this.props.currentCustomer;
    const { personalClient } = this.state;
    console.log(id, this.state.currentId);
    // if(this.state.activeTabs === '') {
    //   this.setState({
    //     activeTabs: 'personalBasicInfo'
    //   })
    // }

    const tabsProps = {
      className: styles.tabs,
      // tabBarExtraContent: operations,
      // 判断当前点击的用户的 ID与之前存储的 id是否相同，若相同，则不重新渲染 tabs
      activeKey: this.state.activeTabs,
      // type: "card",
      onChange: this.tabChange
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
    const { mode, id } = this.props.currentCustomer;
    const { enterpriseClient } = this.state;

    // tabs props
    const tabsProps = {
      className: styles.tabs,
      // tabBarExtraContent: operations,
      // key: id,
      // 判断当前点击的用户的 ID与之前存储的 id是否相同，若相同，则不重新渲染 tabs
      defaultActiveKey:
        id === this.state.currentId
        ?
        this.state.activeTabs
        :
        'enterpriseBasicInfo',
      onChange: this.tabChange,
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

  // edit customer
  editCustomer = () => {
    const { visible, currentCustomer } = this.props;

    return(
      <div>
        <div className={styles.header}>
          <span>{currentCustomer.name}</span>
          <span>{currentCustomer.id}</span>

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

        {currentCustomer.category && currentCustomer.category == '个人客户'
          ?
          this.personalUserTabs()
          :
          this.enterpriseUserTabs()
        }
      </div>
    )
  }

  // componentWillMount() {
  //   console.log(' will mount ')
  // }

  componentWillReceiveProps(next) {
    console.log('Receive Props');
    // if(this.props.currentCustomer.id !== next.currentCustomer.id) {
      this.setState({
        currentId: this.props.currentCustomer.id ? this.props.currentCustomer.id : '',
        activeTabs: (this.props.currentCustomer.id !== this.state.currentId || this.props.currentCustomer.mode === 'create' || this.state.activeTabs === '')  ? 'personalBasicInfo' : this.state.activeTabs
      })


    // console.log(this.props.currentCustomer.id);
    // console.log(next.currentCustomer.id);
    // console.log('compare:'+ (this.props.currentCustomer.id === next.currentCustomer.id))
  }

  // componentWillReceiveProps() {
  //   console.log(' Receive Prop ')
  // }

  render() {
    const { step, mode } = this.props.currentCustomer;
    // console.log(this.props.currentCustomer);
    // console.log();
    // console.log(this.state.activeTabs);
    // console.log(this.props.currentCustomer.id)
    return(
      <div>
        {step === 1 && mode === 'create' &&
          <AddNewCustomer {...this.props}/>
        }

        {step === 2 &&
          this.editCustomer()
        }
      </div>
    )
  }
}

// export default CustomerSlider;
const mapStateToProps = (store) => {
  return {
    currentCustomer: store.customer.currentCustomerInfo
  }
}

export default connect(mapStateToProps)(CustomerSlider);
