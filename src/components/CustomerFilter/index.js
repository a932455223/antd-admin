import React, { Component } from 'react';
import style from './indexStyle.scss';
import {
  Icon,
  Tag,
  Input
} from 'antd';
import update from 'immutability-helper';

import ajax from '../../tools/POSTF';
import axios from 'axios';
import API from '../../../API';

const Search       = Input.Search;
const CheckableTag = Tag.CheckableTag;
const filterNames = {customerType: '客户类型', customerLevel: '客户级别', riskLevel: '风险类型'}


class CustomerFilter extends Component {
  state = {
    filters: [],
    selectedTags: {
      customerType: [],
      customerLevel: [],
      riskLevel: []
    },
    params: {
      customerType: [],
      customerLevel: [],
      riskLevel: []
    },
    searchContent: ''
  };

  componentWillMount() {
    // 获取筛选条件的选项
    ajax.all([
      ajax.Post(API.GET_COMMON_DROPDOWN('customerType')),
      ajax.Post(API.GET_COMMON_DROPDOWN('customerLevel')),
      ajax.Post(API.GET_COMMON_DROPDOWN('riskLevel')),
    ]).then((res)=>{
      let newState = update(this.state, {
        filters: {
          $push: [
            {
              name: res[0].data.data[0].type,
              content: res[0].data.data.map(item => ({
                text: item.name,
                id: item.id
              }))
            },
            {
              name: res[1].data.data[0].type,
              content: res[1].data.data.map(item => ({
                text: item.name,
                id: item.id
              }))
            },
            {
              name: res[2].data.data[0].type,
              content: res[2].data.data.map(item => ({
                text: item.name,
                id: item.id
              }))
            }
          ]
        }
      });
      this.setState(newState);
    })
  }

  handleChange(filterName,tag, checked) {
    let filters = this.state.selectedTags[filterName];
    let newState = {};
    if(checked){
        newState = update(this.state,{
          selectedTags: {[filterName]:{$push:[tag]}},
          params:{[filterName]:{$push:[tag.id]}}
        })
    }else{
        let index = filters.findIndex(item => item.id === tag.id)
        newState = update(this.state,{
          selectedTags:{[filterName]:{$splice:[[index,1]]}},
          params:{[filterName]:{$splice:[[index,1]]}}
        })
    }

    this.setState(newState);
    this.props.onChange(newState.params); // 触发筛选
  }

  handleClose = (filterName,removedTag) => {
    let index = this.state.selectedTags[filterName].findIndex(item =>item.id===removedTag.id)
    let newState = update(this.state,{
      selectedTags:{[filterName]: {$splice:[[index,1]]}},
      params:{[filterName]: {$splice:[[index,1]]}}
    })
    this.setState(newState)
    this.props.onChange(newState.params, newState.searchContent)
  }

  searchCustomer = (value) => {
    let newState = update(this.state,{
      searchContent: {$set: value}
    })
    this.setState(newState)
    this.props.onChange(newState.params, newState.searchContent)
  }

	render() {
    const pathname = window.location.pathname; // 获取当前路由参数
    const path = pathname.split('/')[2];

		const { selectedTags, filters, params } = this.state;

		return (
      <div className={style.droplist} id="customerFilter">
      	<div className={style.filter}>
          {path && path === 'my' &&
            <b>我的客户</b>
          }
          {path && path === 'focused' &&
            <b>我关注的客户</b>
          }
          {path && path === 'undistributed' &&
            <b>公海客户</b>
          }
          {path && path === 'subordinate' &&
            <b>我下属的客户</b>
          }
          {path && path === 'participation' &&
            <b>我参与的客户</b>
          }
          {path && path === 'recentlyDistributed' &&
            <b>新分配给我的客户</b>
          }
          {path && path === 'all' &&
            <b>我的全部客户</b>
          }
          <span>|</span>
          <a>高级筛选
      	    <Icon type="caret-down" className={style.icon}/>
            <div className={style.hide}>
                {
                    this.state.filters.map((filter) =>{
                        return (
                            <div key={filter.name}>
                            <h4 className={style.seconcoustomer}><span></span>{filterNames[filter.name]}</h4>
                        {filter.content &&
                            filter.content.map(tag => (
                                <CheckableTag className={style.tag}
                                              key={filter.name.toString() + tag.id}
                                              checked={selectedTags[filter.name].map(item => item.id).indexOf(tag.id) > -1}
                                              onChange={checked => this.handleChange(filter.name,tag,checked)}>
                                        {tag.text}
                                </CheckableTag>
                            ))
                        }
                            </div>
                        )
                    })
                }

            </div>
      	  </a>
      		<Search
            className={style.search}
      	    placeholder="请输入客户名称，手机号"
      	    style={{ width: 200 }}
      	    onSearch={this.searchCustomer}
      		/>
      	</div>

        <div className={style.select}>
              {Object.keys(selectedTags).map((filterName) => {
                  return (
                  <span key={filterName}>
                      {selectedTags[filterName].length >= 1 &&  <span>{filterNames[filterName]}：</span>}
                      {selectedTags[filterName].map(tag => (
                          <Tag
                              className={style.selecttag}
                              key={filterName+tag.id}
                              closable
                              afterClose={() => this.handleClose(filterName,tag)}
                          >
                              {tag.text}
                          </Tag>
                      ))}


                  </span>
                  )
              })
              }

        </div>
      </div>
		)
	}

}

export default CustomerFilter ;
