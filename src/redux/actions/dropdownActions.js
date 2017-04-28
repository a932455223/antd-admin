/**
 * Created by jufei on 2017/4/28.
 */


import ajax from "../../tools/POSTF.js";
import API from "../../../API";
import * as DD from "../actionTypes/dropdownActions";


export function getDropdown(key,type) {
  return (dispatch) => {
    ajax.Get(API.GET_COMMON_DROPDOWN(key))
      .then(res => {
        dispatch({
          type: type,
          payload: res.data.data
        })
      })
  }
}
