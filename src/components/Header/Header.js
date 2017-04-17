/**
 * 文件说明： Header
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React, { Component } from 'react';
import './less/headerStyle.less'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Dropdown, Menu, Icon, Layout } from 'antd';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;
const addMenu = (
  <Menu className="addMenu">
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        <i className="iconfont icon-date c-pink"></i>新增客户
    </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        <i className="iconfont icon-call c-orange"></i>新增产品</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        <i className="iconfont icon-customer c-green"></i>新增任务</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        <i className="iconfont icon-bankcard c-blue"></i>新增银行卡</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        <i className="iconfont icon-local c-blue-grey"></i>新增地址</a>
    </Menu.Item>
  </Menu>
);
const msgMenu = (
  <Menu className="msgMenu">
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3d menu item</Menu.Item>
  </Menu>
);
class TopHeader extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  state = {
    current: 'mail'
  }

  handleClick = (e) => {
    this.setState({ current: e.key });
  }

  render() {
    const pathname = window.location.pathname; // 获取当前路由参数
    const path = pathname.split('/')[1];
    return (
      <Header className="header">
        <div className="header-wrap">
          <div className="logo">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490261157755&di=3649d486b6244696b01d3c62a03f1949&imgtype=0&src=http%3A%2F%2Fis3.mzstatic.com%2Fimage%2Fthumb%2FPurple69%2Fv4%2F1b%2F90%2F15%2F1b901510-3952-a3fb-fd46-e8e7a454a7c2%2Fmzl.uunubwhw.png%2F0x0ss-85.jpg" />
            精准营销系统
            <div className="version">v1.0</div>
          </div>
          <Menu className="menu" onClick={this.handleClick} selectedKeys={[path
            ? path
            : this.state.current]} mode="horizontal">
            <Menu.Item key="customer">
              <Link to='/customer/my'>
                <i className="iconfont icon-customer"></i>客户管理
              </Link>
            </Menu.Item>
            <Menu.Item key="workplace">
              <Link to='/system/users'>
                工作台<Icon type="down" />
              </Link>
            </Menu.Item>
            <Menu.Item key="more">
              <Link to='/system/users'>
                更多<Icon type="down" />
              </Link>
            </Menu.Item>
            <Menu.Item key="sound">
              <Link to='/login'>
                <Icon type="logout" />登出
              </Link>
            </Menu.Item>
          </Menu>
          <div className="right-menu">

            <Dropdown overlay={addMenu} placement="bottomRight">
              <a className="ant-dropdown-link" href="#">
                <Icon type="plus-circle-o" />
              </a>
            </Dropdown>
            <Dropdown overlay={msgMenu} trigger={['click']} placement="bottomCenter" >
              <a className="ant-dropdown-link msgDropdown" href="#">
                <i className="iconfont icon-msg">
                  <span>12</span>
                </i>
              </a>
            </Dropdown>
            <Link className="user-menu">
              金伟达<Icon type="down" />
            </Link>
          </div>
        </div>
      </Header>
    );
  }
}

export default TopHeader;
