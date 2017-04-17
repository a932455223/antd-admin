import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {
  Tabs,
  Icon,
  Row,
  Col,
  Spin,
  Button,
  notification
} from 'antd';
const TabPane = Tabs.TabPane;

import styles from './indexStyle.scss';
// import { hideEditDock } from '../../../redux/actions/commonAction';

// import basicInfo  from './Pages/basicInfo';

const LoadSpin = () => {
  return(
    <div>
      <Spin />
    </div>
  )
};

// customer Slider component
class CustomerSlider extends Component {
  state = {
    visible: '',
    currentId: '',
    activeTabs: '',
    basicInfo: '',
    familyInfo: '',
    financeInfo: '',
    jobInfo: '',
    riskInfo: '',
  };

  componentWillMount(){
    // 异步加载 basicInfo
    require.ensure([],() => {
      let BasicInfo = require('../BasicInfo').default;

      setTimeout(() => {
        this.setState({
          basicInfo: BasicInfo
        })
      }, 100)
    }, 'BasicInfo');
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
  pageLoading = (key) => {
    // var t = /^[a-z]/
    // const upperKey = key.replace(/^[a-z]/, function(l){return l.toUpperCase()})
    // console.log(upperKey);

    // 异步加载 basicInfo
    require.ensure([],() => {
      let FamilyInfo = require('../FamilyInfo').default;
      let JobInfo = require('../JobInfo').default;
      let FinanceInfo = require('../FinanceInfo').default;
      let RiskInfo = require('../RiskInfo').default;

      setTimeout(() => {
        switch(key) {
          // 当被点击的 TabPane的 key值为 familyInfo, 加载对应的异步组件
          case 'familyInfo':
            this.setState({
              familyInfo: FamilyInfo
            })

          case 'jobInfo':
            this.setState({
              jobInfo: JobInfo
            })

          case 'RiskInfo':
            this.setState({
              riskInfo: RiskInfo
            })

          case 'financeInfo':
            this.setState({
              financeInfo: FinanceInfo
            })
        }
      }, 100)
    }, 'FamilyInfo');
  }

  // 切换面板
  tabChange = (e) => {
    this.setState({
      activeTabs: e,
      currentId: this.props.currentId
    })

    // 获取当前激活 TabPane的 key，对比是否为 basicInfo
    this.pageLoading(e);
  }

  // 渲染 Tabs
    renderTabs = () => {
      return (
        <Tabs className={styles.tabs}
              // tabBarExtraContent={operations}
              key={this.props.currentId}
              defaultActiveKey={this.props.currentId === this.state.currentId ? this.state.activeTabs : 'basicInfo'}
              // type="card"
              onChange={this.tabChange}
              >
          <TabPane tab="基本信息" key="basicInfo">
            {this.state.basicInfo &&
              <this.state.basicInfo {...this.props}/>
            }
          </TabPane>
          <TabPane tab="家庭信息" key="familyInfo">
            {this.state.familyInfo &&
              <this.state.familyInfo />
            }
          </TabPane>
          <TabPane tab="工作信息" key="jobInfo">
            {this.state.jobInfo &&
              <this.state.jobInfo />
            }
          </TabPane>
          <TabPane tab="金融业务信息" key="financeInfo">
            4
          </TabPane>
          <TabPane tab="风险测试" key="riskInfo">
            {this.state.riskInfo &&
              <this.state.riskInfo />
            }
          </TabPane>
        </Tabs>
      )
    }

  render() {
    const { visible, currentId } = this.props;

    return(
      <div>
        <div className={styles.header}>
          <span>{this.props.currentId}</span>

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
              <Icon   className={styles.icon}
                      onClick={this.openNotification}
                      type="close"/>
            </Col>
          </Row>
        </div>

        {this.renderTabs()}
      </div>
    )
  }
}

// const mapStateToProps = (store) => {
//   return {
//     editDock: store.common.editDock.data
//   }
// }

// export default connect(mapStateToProps)(CustomerSlider);
export default CustomerSlider;
