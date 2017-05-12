/**
 * 文件说明： Header
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React from "react";
import "./less/headerStyle.less";
import logo from "./images/logo.png";
import {Link} from "react-router";
import {Dropdown, Icon, Layout, Menu} from "antd";
import ajax from "../../tools/POSTF.js";
import API from "../../../API";
const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;
const addMenu = (
  <Menu className="addMenu">
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">
        <i className="iconfont icon-date c-pink"></i>新增客户
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">
        <i className="iconfont icon-call c-orange"></i>新增产品</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">
        <i className="iconfont icon-customer c-green"></i>新增任务</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">
        <i className="iconfont icon-bankcard c-blue"></i>新增银行卡</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">
        <i className="iconfont icon-local c-blue-grey"></i>新增地址</a>
    </Menu.Item>
  </Menu>
);
const msgMenu = (
  <Menu className="msgMenu">
    <Menu.Item key="0">
      <span className="msg-num">32</span>条客户信息被创建,
      <a href="javascript:void(0)">点击查看</a>
    </Menu.Item>
    <Menu.Item key="1">
      <span className="msg-num">2</span>条客户信息被创建,
      <a href="javascript:void(0)">点击查看</a>
    </Menu.Item>
    <Menu.Item key="2">
      <span className="msg-num">14</span>条客户信息被创建,
      <a href="javascript:void(0)">点击查看</a>
    </Menu.Item>
    <Menu.Item key="3">
      <span className="msg-num">3</span>条客户信息被创建,
      <a href="javascript:void(0)">点击查看</a>
    </Menu.Item>
    <Menu.Item key="4">
      <span className="msg-num">3</span>条客户信息被创建,
      <a href="javascript:void(0)">点击查看</a>
    </Menu.Item>
  </Menu>
);
const userMenu = (
  <Menu className="userMenu">

    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">
        账户管理
      </a>
    </Menu.Item>
    <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">
        个人信息
      </a>
    </Menu.Item>
    <Menu.Item key="2">
      <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">
        布局设置
      </a>
    </Menu.Item>
    <Menu.Item key="3">
      <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">
        使用指南
      </a>
    </Menu.Item>
    <Menu.Item key="4">
      <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">
        问题反馈
      </a>
    </Menu.Item>
    <Menu.Item key="5">
      <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">
        联系我们
      </a>
    </Menu.Item>

    <Menu.Item key="6">
      <Link to='/login'>
        <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">
          退出
        </a>
      </Link>
    </Menu.Item>
  </Menu>
);
const workMenu = (
  <Menu className="workMenu">

    <Menu.Item key="0">
      <Link to=''>
        目标管理
      </Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to=''>
        日程管理
      </Link>
    </Menu.Item>
  </Menu>
);

class TopHeader extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,

  };

  state = {
    current: 'mail',
    permissions: {}
  }

  componentWillMount() {
    ajax.Get(API.GET_PERMISSION)
      .then(res => {
        console.log('get permission ', res);
        this.setState({
          permissions: res.data.data
          // permissions: {
          //   'customerManage:base:view': true
          // }
        })
      })
  }

  handleClick = (e) => {
    this.setState({current: e.key});
  };

  render() {
    const pathname = window.location.pathname; // 获取当前路由参数
    const path = pathname.split('/')[1];
    const permissions = this.state.permissions;

    const moreMenu = (
      <Menu className="moreMenu">
        {
          permissions['financeManage:product:view'] && (
            <Menu.Item key="0">
              <Link to='/product/all'>
                金融产品管理
              </Link>
            </Menu.Item>
          )
        }
        {
          permissions['orgManage:org:view'] && (
            <Menu.Item key="1">
              <Link to='/organization/staff'>
                组织机构管理
              </Link>
            </Menu.Item>
          )
        }
        <Menu.Item key="2">
          <Link to='/system/users'>
            系统设置
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to='/customer/my'>
            应用展示设置
          </Link>
        </Menu.Item>
        <SubMenu mode="vertical" title="切换角色">
          <Menu.Item>
            <a target="_blank"  href="http://localhost:8888/system/users#">懂事长</a>
          </Menu.Item>
          <Menu.Item>
            <a target="_self" rel="noopener noreferrer" href="http://localhost:8888/system/users#">行长</a>
          </Menu.Item>
          <Menu.Item>
            <a target="_self" rel="noopener noreferrer" href="http://localhost:8888/system/users#">职员</a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );


    return (
      <Header className="header">
        <div className="header-wrap">
          <div className="logo">
            <img src={logo}/>
            精准营销系统
            <div className="version">v1.0</div>
          </div>
          <Menu className="menu" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            {
              permissions['customerManage:base:view'] && (
                <Menu.Item key="customer">
                  <Link to='/customer/my'>
                    <i className="iconfont icon-customer"></i>客户管理
                  </Link>
                </Menu.Item>
              )
            }
            <Menu.Item key="workplace">
              <Dropdown
                overlay={workMenu}
                placement="bottomCenter"
              >
                <a className="ant-dropdown-link" href="#">
                  工作台<Icon type="down"/>
                </a>
              </Dropdown>
            </Menu.Item>
            {
              1 && (
                <Menu.Item key="roles">
                  <Link to='/system/roles'>
                    用户权限<Icon type="down"/>
                  </Link>
                </Menu.Item>
              )
            }
            <Menu.Item key="more">

              <Dropdown
                overlay={moreMenu}
                placement="bottomCenter"
              >
                <a className="ant-dropdown-link" href="#">
                  更多<Icon type="down"/>
                </a>
              </Dropdown>

            </Menu.Item>
            {/*<Menu.Item key="sound">
             <Link to='/login'>
             <Icon type="logout" />登出
             </Link>
             </Menu.Item>*/}
          </Menu>
          <div className="right-menu">

            <Dropdown
              overlay={addMenu}
              placement="bottomRight"
            >
              <a className="ant-dropdown-link" href="#">
                <Icon type="plus-circle-o"/>
              </a>
            </Dropdown>
            <Dropdown overlay={msgMenu} trigger={['click']} placement="bottomCenter">
              <a
                className="ant-dropdown-link msgDropdown"
                href="#"
              >
                <i className="iconfont icon-msg">
                  <span>12</span>
                </i>
              </a>
            </Dropdown>
            <Dropdown
              overlay={userMenu}
              placement="bottomLeft"
            >
              <Link className="user-menu">
                金伟达<Icon type="down"/>
              </Link>
            </Dropdown>
          </div>
        </div>
      </Header>
    );
  }
}

export default TopHeader;
