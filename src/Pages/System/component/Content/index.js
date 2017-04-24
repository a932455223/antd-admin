/**
 * Created by jufei on 2017/4/24.
 */
import React,{Component} from 'react';
import {Card,Table} from 'antd';
import Dock from 'react-dock';
//============================================================
import Filter from '../../../../components/CustomerFilter';
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
    console.log(this.props.dockConf.visible);
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
          <Filter />
          <Table
            {...this.props.tableConf}
            scroll={{y: 300}}
          />
        </Card>
        <Dock {...dockConfig} {...this.props.dockConf}>
          {this.props.dockConf.children}
        </Dock>
      </div>
    )
  }
}



