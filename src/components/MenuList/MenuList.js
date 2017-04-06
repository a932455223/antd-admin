/**
 * Created by jufei on 2017/3/21.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Menu,
  Icon
} from 'antd';
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

import { getBookCategory } from '../../redux/actions/bookListAction';


class Sider extends React.Component {
  constructor(props) {
    super(props);
  }

  // handleClick = (e) => {
  //   switch (e.key) {
  //     case 'book':
  //       this.context.router.push('/book');
  //       break;
  //   }
  // };

  render() {
    const { data } = this.props;

    return (
      <Menu onClick={this.handleClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['book']}
            mode="inline">
        {data && data.map(e =>
          <Menu.Item onClick={this.handleClick} key={e.id}>
            {(e.tag).toUpperCase()}
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

Sider.contextTypes = {
  router: React.PropTypes.object.isRequired
};


export default Sider;
