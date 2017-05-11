/**
 * Created by jufei on 2017/4/24.
 */
import React,{Component} from 'react';
import {Card,Table} from 'antd';
import Dock from 'react-dock';
//============================================================
import Filter from '../CustomerFilter';
//===========================================================
import './less/content.less';

export default class Content extends Component{
  state = {
    // department: {},
    dock: {
      visible: false,
      children: null
    }
  };



  initTableScroll(){
    let card = document.getElementById('wrapper');
    let tableScroll = document.getElementsByClassName('ant-table-body')[0];

    tableScroll.style['max-height'] = card.offsetHeight - 91 -48-43 -32+ 'px';
    tableScroll.style['height'] = card.offsetHeight - 91 -48-43 -32+ 'px';
    tableScroll.style['overflow-y'] = 'auto';

  }

  componentDidMount(){
    this.initTableScroll();
    addEventListener('resize',this.initTableScroll)
  }

  componentDidUpdate(){
    this.initTableScroll();
  }

  componentWillUnmount(){
    removeEventListener('resize',this.initTableScroll)
  }

  render(){
    const dockConfig = {
      position: 'right',
      isVisible: this.props.dockConf.visible,
      dimMode: 'none',
      defaultSize: .5,
      zIndex: 100
    };

    return (
      <div className="system-content">
        <Card id="wrapper">
          <Filter {...this.props.actionBarConf}/>
          <Table
            {...this.props.tableConf}
            rowKey={record => record.id}
            scroll={{y: 300}}
            pagination={this.props.tableConf.pagination}
            onChange={this.props.tableConf.onChange}
          />
        </Card>
        <Dock {...dockConfig} {...this.props.dockConf}>
          <div className="dock-container">
            {this.props.dockConf.children}
          </div>
        </Dock>
      </div>
    )
  }
}



