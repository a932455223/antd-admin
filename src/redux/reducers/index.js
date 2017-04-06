/**
 * 文件说明： reducers
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */


import {combineReducers} from 'redux';



import layoutReducer from './layoutReducer.js';
import bookList from './bookListReducer.js';
// import menulist from './menulist.js';
import work from './workReducer.js';

const reducers = combineReducers({
  layout: layoutReducer,
  bookList: bookList,
  // menuList: menulist,
  work: work
});


export default reducers;
