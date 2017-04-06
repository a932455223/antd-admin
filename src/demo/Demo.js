/**
 * Created by jufei on 2017/3/27.
 */
import React,{Component} from 'react';
import { Layout } from 'antd';

import { Menu, Icon } from 'antd';



import './less/demo.less'
const { Header, Footer, Sider, Content } = Layout;

const SubMenu = Menu.SubMenu;





export default class Demo extends Component{
  render(){
   return (
     <div className="container">
       <Layout>
         <Sider>
           <h3>welcome</h3>
           <Menu
             mode="inline"
             openKeys={'sub4'}
           >
             <SubMenu key="sub4" title={null}>
               <Menu.Item key="9"><Icon type="mail"/>Option 9</Menu.Item>
               <Menu.Item key="10"><Icon type="plus"/>Option 10</Menu.Item>
               <Menu.Item key="11"><Icon type="delete" />Option 11</Menu.Item>
               <Menu.Item key="12"><Icon type="code-o" />Option 12</Menu.Item>
             </SubMenu>
           </Menu>
         </Sider>
         <Layout>
           <Header>Header</Header>
           <Content>Content</Content>
           <Footer>Footer</Footer>
         </Layout>
       </Layout>
     </div>
   )
  }
}




