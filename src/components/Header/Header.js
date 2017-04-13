/**
 * 文件说明： Header
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React, {Component} from 'react';
import './scss/headerStyle.less'
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Menu, Icon, Layout} from 'antd';
const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;
class TopHeader extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  state = {
    current: 'mail'
  }

  handleClick = (e) => {
    this.setState({current: e.key});
  }

  render() {
    const pathname = window.location.pathname; // 获取当前路由参数
    const path = pathname.split('/')[1];
    return (
      <Header className="header">
        <div className="header-wrap">
          <div className="logo">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490261157755&di=3649d486b6244696b01d3c62a03f1949&imgtype=0&src=http%3A%2F%2Fis3.mzstatic.com%2Fimage%2Fthumb%2FPurple69%2Fv4%2F1b%2F90%2F15%2F1b901510-3952-a3fb-fd46-e8e7a454a7c2%2Fmzl.uunubwhw.png%2F0x0ss-85.jpg"/>
            精准营销系统
            <div className="version">v1.0</div>
          </div>
          <Menu className="menu" onClick={this.handleClick} selectedKeys={[path
              ? path
              : this.state.current]} mode="horizontal">
            <Menu.Item key="customer">
              <Link to='/customer/my'>
                <Icon type="user"/>客户管理
              </Link>
            </Menu.Item>
            <Menu.Item key="workplace">
              <Link to='/system/users'>
                工作台<Icon type="down"/>
              </Link>
            </Menu.Item>
            <Menu.Item key="more">
              <Link to='/system/users'>
                更多<Icon type="down"/>
              </Link>
            </Menu.Item>
            <Menu.Item key="sound">
              <Link to='/login'>
                <Icon type="logout"/>登出
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </Header>
    );
  }
}

export default TopHeader;
