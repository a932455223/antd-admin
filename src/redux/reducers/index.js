/**
 * 文件说明： reducers
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */


import { combineReducers } from 'redux';
import navPath from './navPathReducer';
import auth from './authReducer';
import * as commonReducer from './commonReducer';
import * as customerReducer from './customerReducer';

// 公共的 common reducers
const common = combineReducers({
  ...commonReducer
})

const customer = combineReducers({
  ...customerReducer
})



const reducers = combineReducers({
    navPath: navPath,
    auth: auth,
    common: common,
    customer: customer
});

export default reducers;
