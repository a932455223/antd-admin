import React,{ Component } from 'react';
import './less/sliderBarStyle.less'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { Menu,Layout,Icon } from 'antd';
import axios from 'axios';
import updateNavPath from '../../redux/actions/navPathAction'
const { SubMenu } =  Menu;
const { Sider } = Layout;

function info(msg,color='red'){
    console.log("%c"+msg,'color:'+color);
}

const urls = {
    customer:'/menus/customer',
    system:'/menus/system'
}


function findItem(arr,currentPath){
    for(let item of arr){
        for(let submenu of item.children){
            if(submenu.url === currentPath){
                return [item,submenu];
            }
        }
    }
}

class SliderBar extends Component{
    static __ANT_LAYOUT_SIDER = true
    state = {
        currentMenu:'',
        menus:{},
        selectKeys:['-1']
    }
    componentWillReceiveProps(pre,next){

    }
    udpateMenu = ()=>{
        let path = window.location.pathname;
        let pathname = path.split('/')[1];
        const {updateNavPath}= this.props;
        if(!this.state.menus[pathname]){
            axios.get(urls[pathname]).then((response)=>{
                let navPath = findItem(response.data,path);
                let newState = {
                    ...this.state,
                    currentMenu:pathname,
                    selectKeys:[navPath[1].id.toString()],
                    menus:{
                        ...this.state.menus,
                        [pathname]:response.data
                    },
                }
                this.setState(newState)
                updateNavPath([navPath[0].name,navPath[1].name])
            })
        }
        else{
            let navPath = findItem(this.state.menus[pathname],path);
            this.setState({
                ...this.state,
                currentMenu:pathname,
                selectKeys:[navPath[1].id.toString()]
            })
            updateNavPath([navPath[0].name,navPath[1].name])
        }

    }
    componentWillMount(){
        this.udpateMenu();
    }

    componentDidMount(){
        this.context.router.listen(this.routerHasChange)
    }

    routerHasChange = () => {
        this.udpateMenu();
    }


    render(){
        const  items  = this.state.menus[this.state.currentMenu]||[];
        const openKeys = items.length > 0 ? [items[0].id.toString()]:['-1'];
        return (
            <Sider  width={200} style={{ background: '#fff' }}>
                <Menu
                  theme="dark"
                  mode="inline"
                  defaultOpenKeys={openKeys}
                  selectedKeys={this.state.selectKeys}
                  style={{ height: '100%' }}
                  key={openKeys[0]}
                  className="mySiderMenu"
                >
                 {items.map((item) => {
                     return (<SubMenu  key={item.id.toString()} title={<span>{item.name}</span>}>
                        {item.children.map((subItem)=>(<Menu.Item key={subItem.id}><Link to={subItem.url}>{subItem.name}</Link></Menu.Item>))}
                     </SubMenu>)
                 })}
                </Menu>
              </Sider>
        )
    }
}


SliderBar.contextTypes = {
  router: React.PropTypes.object
}

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
export default connect(mapStateToProp,mapDispatchToProps)(SliderBar);
