/**
 * Created by jufei on 2017/4/18.
 */
import React,{Component} from 'react';
import {Card,Row,Col,Button,Input} from 'antd';
//====================================================
import './less/actionBarStyle.less';

export default class ActionBar extends Component{


  render(){
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
              <Button>新建</Button>
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
