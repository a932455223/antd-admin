import React, { Component } from 'react';
import style from './indexStyle.scss';
import {
  Menu,
  Icon,
  Dropdown,
  Tag,
  Input
} from 'antd';
const Search       = Input.Search;
const CheckableTag = Tag.CheckableTag;
const tagsCategory = ['个人客户', '企业客户'];
const tagsLevel    = ['普通客户', '重点客户','未激活客户'];
const tagsInterest = ['保守型', '激进型','稳健型'];
const tagsJob      = ['农业', '金融业','服务业','零售业','建筑工程','设计'];
const tagsJob01    = ['农业12', '农业23','农业34'];
const tagsJob02    = ['农业11', '农业22','农业33','农业44','农业55'];

class Droplist extends React.Component {
  state = {
    selectedTags: [],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  handleClose = (removedTag) => {
    const selectedTags = this.state.selectedTags.filter(tag => tag !== removedTag);
    console.log(selectedTags);
    this.setState({ selectedTags });
  }

	render() {
		const { selectedTags } = this.state;
		return (
      <div className={style.droplist}>
      	<div className={style.filter}>
          <b>我的客户</b>
          <span>|</span>
          <a>高级筛选
      	    <Icon type="caret-down" className={style.icon}/>
            <div className={style.hide}>
              <h4 className={style.seconcoustomer}><span></span>客户类别</h4>
              {tagsCategory && tagsCategory.map(tag => (
               <CheckableTag className={style.tag}
                 key={tag}
                 checked={selectedTags.indexOf(tag) > -1}
                 onChange={checked => this.handleChange(tag, checked)}
               >
                 {tag}
               </CheckableTag>
              ))}
              <h4 className={style.seconcoustomer}><span></span>客户评级 </h4>
              {tagsLevel && tagsLevel.map(tag => (
               <CheckableTag className={style.tag}
                 key={tag}
                 checked={selectedTags.indexOf(tag) > -1}
                 onChange={checked => this.handleChange(tag, checked)}
               >
                 {tag}
               </CheckableTag>
              ))}
              <h4 className={style.seconcoustomer}><span></span>风险癖好 </h4>
              {tagsInterest && tagsInterest.map(tag => (
               <CheckableTag className={style.tag}
                 key={tag}
                 checked={selectedTags.indexOf(tag) > -1}
                 onChange={checked => this.handleChange(tag, checked)}
               >
                 {tag}
               </CheckableTag>
              ))}
              <h4 className={style.seconcoustomer}><span></span>工作属性 </h4>
              {tagsJob && tagsJob.map(tag => (
               <CheckableTag className={style.tag}
                 key={tag}
                 checked={selectedTags.indexOf(tag) > -1}
                 onChange={checked => this.handleChange(tag, checked)}
               >
                 {tag}
               </CheckableTag>
              ))}
              <h4 className={style.seconcoustomer}><span></span>工作属性 </h4>
              {tagsJob01 && tagsJob01.map(tag => (
               <CheckableTag className={style.tag}
                 key={tag}
                 checked={selectedTags.indexOf(tag) > -1}
                 onChange={checked => this.handleChange(tag, checked)}
               >
                 {tag}
               </CheckableTag>
              ))}
              <h4 className={style.seconcoustomer}><span></span>工作属性 </h4>
              {tagsJob02 && tagsJob02.map(tag => (
               <CheckableTag
                 className={style.tag}
                 key={tag}
                 checked={selectedTags.indexOf(tag) > -1}
                 onChange={checked => this.handleChange(tag, checked)}
               >
                 {tag}
               </CheckableTag>
              ))}
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
          <span>
            <span>客户类型：</span>
            {selectedTags && selectedTags.map(tag =>
              <Tag
                className={style.selecttag}
                key={tag}
                closable
                afterClose={() => this.handleClose(tag)}
              >
                {tag}
              </Tag>)
            }
          </span>
        </div>
      </div>
		)
	}

}







export default Droplist ;
