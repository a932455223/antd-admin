/**
 * Created by jufei on 2017/4/28.
 */


import * as DD from "../actionTypes/dropdownActions";

let init = {
  // 性别
  gender: [],
  // 所属机构
  departments: [],
  // 任职状态
  jobStatus: [],
  // 职位
  jobCategory: [],
  // 上级
  leader: [],

  // 学历
  educationLevel: []
};



export default function dropdownReducer(state = init, action) {
  switch (action.type) {
    // 性别
    case DD.GENDER:
      return {
        ...state,
        gender: action.payload
      };
// 所属机构
    case DD.DEPARTMENTS:
      return {
        ...state,
        departments: action.payload
      };
    // 任职状态
    case DD.JOB_STATUS:
      return {
        ...state,
        jobStatus: action.payload
      };
    // 职位
    case DD.JOB_CATEGORY:
      return {
        ...state,
        jobCategory: action.payload
      };
    // 上级
    case DD.LEADER:
      return {
        ...state,
        LEADER: action.payload
      };

    case DD.EDUCATION_LEVEL:
      return {
        ...state,
        educationLevel: action.payload
      };

    default:
      return state;
  }
}
