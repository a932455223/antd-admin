import React, { Component } from 'react';
import style from './indexStyle.scss';
import {
  Icon,
  Tag,
  Input
} from 'antd';
import update from 'immutability-helper';
const Search       = Input.Search;
const CheckableTag = Tag.CheckableTag;
const filterNames = {category:'客户类别',level:'客户评级',risk:'风险偏好',job:'工作类型'}


class CustomerFilter extends Component {
  state = {
      filters:[
          {name:'category',content:[{text:'企业客户',id:1},{text:'私人客户',id:2}]},
          {name:'level',content:[{text:'普通客户',id:1},{text:'VIP1',id:2},{text:'VIP2',id:3}]},
          {name:'risk',content:[{text:'保守型',id:1},{text:'稳健型',id:2}]},
          {name:'job',content:[{text:'务农',id:1},{text:'工人',id:2},{text:'职员',id:3}]}
      ],
    selectedTags: {
        category:[],
        level:[],
        risk:[],
        job:[]
    }

  };

  handleChange(filterName,tag, checked) {
    let filters = this.state.selectedTags[filterName];
    let newState = {};
    if(checked){
        newState = update(this.state,{selectedTags:{[filterName]:{$push:[tag]}}})
    }else{
        let index = filters.findIndex(item => item.id === tag.id)
        newState = update(this.state,{selectedTags:{[filterName]:{$splice:[[index,1]]}}})
    }
    this.setState(newState);
      this.props.onChange(this.state.selectedTags);
  }

  handleClose = (filterName,removedTag) => {
      let index = this.state.selectedTags[filterName].findIndex(item =>item.id===removedTag.id)
      let newState = update(this.state,{selectedTags:{[filterName]:{$splice:[[index,1]]}}})
    this.setState(newState)
      this.props.onChange(this.state.selectedTags)
  }

	render() {
    const pathname = window.location.pathname; // 获取当前路由参数
    const path = pathname.split('/')[2];

		const { selectedTags } = this.state;
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
                        {
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
      	    onSearch={value => console.log(value)}
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
