import * as actionTypes from '../actionTypes/customer';

// 保存当前的 customer info
export const saveCurrentCustomerInfo = (info, mode) => (
  {
    type: actionTypes.SAVE_CURRENT_CUSTOMER_INFO,
    mode: mode,
    id: info.id,
    name: info.name,
    category: info.category
  }
)

// step by step
export const createCustomer = () => (
  {
    type: actionTypes.CREATE_CUSTOMER
  }
)

// 新建用户填写 info
export const fillCustomerInfo = (category, name) => (
  {
    type: actionTypes.FILL_CUSTOMER_INFO,
    name: name,
    category: category
  }
)

// 编辑用户姓名
export const editCustomerName = (name) => (
  {
    type: actionTypes.EDIT_CUSTOMER_NAME,
    name: name
  }
)

// create customer success
export const createCustomerSuccess = (id) => (
  {
    type: actionTypes.CREATE_CUSTOMER_SUCCESS,
    id
  }
)

// edit customer success
export const editCustomerSuccess = () => (
  {
    type: actionTypes.EDIT_CUSTOMER_SUCCESS,
  }
)

// customer info be edited
export const increaseBeEditArray = (item) => (
  {
    type: actionTypes.INCREASE_BE_EDITED_ARRAY,
    payload: item
  }
)

// customer info be edited
export const decreaseBeEditArray = (item) => (
  {
    type: actionTypes.DECREASE_BE_EDITED_ARRAY,
    payload: item
  }
)

// customer info be edited
export const resetBeEditArray = () => (
  {
    type: actionTypes.RESET_BE_EDITED_ARRAY
  }
)

// reset Customer Info
export const resetCustomerInfo = () => (
  {
    type: actionTypes.RESET_CUSTOMER_INFO
  }
)
