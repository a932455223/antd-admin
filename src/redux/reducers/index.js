/**
 * 文件说明： reducers
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */


import {combineReducers} from "redux";
import navPath from "./navPathReducer";
import auth from "./authReducer";
import common from "./commonReducer";
import customer from "./customerReducer";
import dropdown from './dropdownReducer';
import grids from './gridsReducer'

const reducers = combineReducers({
  navPath: navPath,
  auth: auth,
  common: common,
  customer: customer,
  dropdown: dropdown,
  grids:grids
});

export default reducers;
