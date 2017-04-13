import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Tabs,
  Icon,
  Row,
  Col,
  Spin
} from 'antd';
const TabPane = Tabs.TabPane;

import styles from './myCustomerDockStyle.scss';
import { hideEditDock } from '../../../redux/actions/commonAction';

// import basicInfo  from './Pages/basicInfo';

const LoadSpin = () => {
  const basicData = 123;
  return(
    <div {...basicData}>
      <Spin />
    </div>
  )
}

// EDIT DOCK组件
class MyCustomerDock extends Component {
  state = {
    visible: '',
    currentId: '',
    activeTabs: '',
    basicInfo: LoadSpin,
    familyInfo: LoadSpin,
    jobInfo: LoadSpin,
    riskInfo: LoadSpin,
  };

  componentWillMount(){
    // 异步加载 basicInfo
    require.ensure([],() => {
      let basicInfo = require('./Pages/basicInfo').default;

      setTimeout(() => {
        this.setState({
          basicInfo: basicInfo
        })
      }, 300)
    }, 'basicInfo');
  };

  // 点击遮罩层，隐藏 Dock
  visibleChange = () => {
    const { dispatch } = this.props;
    dispatch(hideEditDock(false));
  }

  // 获取当前激活 TabPane的 key，根据 key加载不同的 page view
  pageLoading = (key) => {
    // 异步加载 basicInfo
    require.ensure([],() => {
      let infoComponent = require(`./Pages/${key}`).default;

      setTimeout(() => {
        switch(key) {
          // 当被点击的 TabPane的 key值为 familyInfo, 加载对应的异步组件
          case 'familyInfo':
            this.setState({
              familyInfo: infoComponent
            })

          case 'jobInfo':
            this.setState({
              jobInfo: infoComponent
            })

          case 'riskInfo':
            this.setState({
              riskInfo: infoComponent
            })
        }
      }, 300)
    }, 'FamilyInfo');
  }

  // 切换面板
  tabChange = (e) => {
    const { editDock } = this.props;
    this.setState({
      activeTabs: e,
      currentId: editDock.currentId
    })

    // 获取当前激活 TabPane的 key，对比是否为 basicInfo
    this.pageLoading(e);
  }

  // 渲染 Tabs
  renderTabs = () => {
    const { editDock } = this.props;
    const basicInfo = {...editDock};

    return (
      <Tabs className={styles.tabs}
            // tabBarExtraContent={operations}
            key={editDock.currentId}
            defaultActiveKey={editDock.currentId === this.state.currentId ? this.state.activeTabs : 'basicInfo'}
            // type="card"
            onChange={this.tabChange}
            >
        <TabPane tab="基本信息" key="basicInfo">
          {this.state.basicInfo &&
            <this.state.basicInfo {...basicInfo}/>
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
        <TabPane tab="金融业务信息" key="businessinfo">
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
    const { editDock } = this.props;
    // console.log(editDock);

    return (
      <div>
        <div className={styles.header}>
          <span>{editDock.currentId}</span>

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

        {/*
          <p>
            {editDock && editDock.currentId !== ''
              ?
              editDock.currentId
              :
              ''
            }
          </p>
        */}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    editDock: store.common.editDock.data
  }
}

export default connect(mapStateToProps)(MyCustomerDock);
