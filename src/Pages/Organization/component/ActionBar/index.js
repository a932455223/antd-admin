/**
 * 文件说明： 组织机构管理/组件/ 操作栏
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React,{Component} from 'react';
import {Card,Row,Col,Button,Input} from 'antd';
//====================================================
import './less/actionBarStyle.less';

export default class ActionBar extends Component{


  render(){
    console.log(this.props);
    return (
      <div className="organizationActionBar">
        <Card>
          <Row>
            <Col span="2" style={{textAlign: 'center'}}>
              {this.props.parent === 'staff' ? '员工列表' : '组织列表'}
            </Col>
            <Col span="2">
              <Button>筛选</Button>
            </Col>
            <Col span="7">
              <Input placeholder="搜索"/>
            </Col>
            <Col span="9">
            </Col>
            <Col span="2">
              <Button onClick={this.props.newClick}>新建</Button>
            </Col>
            <Col span="2">
              <Button>导入</Button>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}
