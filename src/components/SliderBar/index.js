import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router";
import {Layout, Menu} from "antd";
import axios from "axios";
//================================================================
import updateNavPath from "../../redux/actions/navPathAction";
//-===============================================================
import API from "../../../API";
import "./less/sliderBarStyle.less";

const {SubMenu} = Menu;
const {Sider} = Layout;

function info(msg, color = 'red') {
  console.log("%c" + msg, 'color:' + color);
}

const urls = {
  customer: API.GET_CUSTOMER_SLIDER_BAR,
  system: API.GET_SYSTEM_SLIDER_BAR,
  organization: API.GET_ORGANIZATION_SLIDER_BAR,
  product: API.GET_PRODUCT_SLIDER_BAR
};


function findItem(arr, currentPath) {
  for (let item of arr) {
    for (let submenu of item.children) {
      if (submenu.url === currentPath) {
        return [item, submenu];
      }
    }
  }
}

class SliderBar extends Component {
  static __ANT_LAYOUT_SIDER = true
  state = {
    currentMenu: '',
    menus: {},
    selectKeys: ['-1'],
    openKeys: ['-1']
  }

  componentWillReceiveProps(pre, next) {

  }

  udpateMenu = () => {
    let path = window.location.pathname;
    let pathname = path.split('/')[1];
    const {updateNavPath} = this.props;
    if (!this.state.menus[pathname]) {
      axios.get(urls[pathname]).then((response) => {
        let navPath = findItem(response.data, path);
        let newState = {
          ...this.state,
          currentMenu: pathname,
          selectKeys: [navPath[1].id.toString()],
          openKeys: [navPath[0].id.toString()],
          menus: {
            ...this.state.menus,
            [pathname]: response.data
          },
        };
        this.setState(newState);
        updateNavPath([navPath[0].name, navPath[1].name])
      })
    }
    else {
      let navPath = findItem(this.state.menus[pathname], path);
      this.setState({
        ...this.state,
        currentMenu: pathname,
        selectKeys: [navPath[1].id.toString()],
        openKeys: [navPath[0].id.toString()]
      })
      updateNavPath([navPath[0].name, navPath[1].name])
    }

  }

  componentWillMount() {
    this.udpateMenu();
  }

  componentDidMount() {
    this.context.router.listen(this.routerHasChange)
  }

  routerHasChange = () => {
    this.udpateMenu();
  };


  render() {
    const items = this.state.menus[this.state.currentMenu] || [];
    return (
      <Sider width={200} style={{background: '#fff'}}>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={this.state.openKeys}
          selectedKeys={this.state.selectKeys}
          style={{height: '100%'}}
          key={this.state.openKeys[0]}
          className="mySiderMenu"
        >
          {items.map((item) => {
            return (<SubMenu key={item.id.toString()} title={<span>{item.name}</span>}>
              {item.children.map((subItem) => (
                <Menu.Item key={subItem.id}><Link to={subItem.url}>{subItem.name}</Link></Menu.Item>))}
            </SubMenu>)
          })}
        </Menu>
      </Sider>
    )
  }
}


SliderBar.contextTypes = {
  router: React.PropTypes.object
};

function mapStateToProp(store) {
  return {
    layout: store.layout
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateNavPath: bindActionCreators(updateNavPath, dispatch)
  }
}
export default connect(mapStateToProp, mapDispatchToProps)(SliderBar);
