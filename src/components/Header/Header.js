/**
 * 文件说明： Header
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React,{Component} from 'react';
import headerStyle from './scss/headerStyle.scss'
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {
  Menu,
  Icon
} from 'antd';
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

import { config } from '../../tools/config';


class Header extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  state = {
    current: 'mail',
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    const pathname = window.location.pathname; // 获取当前路由参数
    const path = pathname.split('/')[1];

    return (
      <div className={headerStyle.header}>
        <div>
          <Link to='/'>
            <img className={headerStyle.logo} src={config.logoSrc} />
          </Link>

          <input  className={headerStyle.search}
                  placeholder="请输入搜索内容"/>
        </div>

        <Menu className={headerStyle.menu}
              onClick={this.handleClick}
              selectedKeys={[path ? path : this.state.current]}
              mode="horizontal">
          <Menu.Item key="product">
            <Link to='/product/list'>
              <Icon type="book" />商品管理
            </Link>
          </Menu.Item>
          <Menu.Item key="branch">
            <Link to='/branch/staff'>
              <Icon type="video-camera" />组织机构管理
            </Link>
          </Menu.Item>
          <Menu.Item key="sound">
            <Link to='/login'>
              <Icon type="sound" />登出
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}



export default Header ;
