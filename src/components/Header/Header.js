import React,{Component} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import headerStyle from './scss/headerStyle.scss'
const { Header, Content, Footer } = Layout

let menus = [{
    text:'商品管理',
    url:'/product/list'
},
{
    text:'组织机构管理',
    url:'/branch/staff'
},{
    text:'登出',
    url:'/login'
}]
export default class TopNav extends Component{
    render(){
        return (
            <Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
                className={headerStyle.header}
              >
              {menus.map((item,index)=>(<Menu.Item key={index}>{item.text}</Menu.Item>))}
              </Menu>
            </Header>
        )
    }
}
