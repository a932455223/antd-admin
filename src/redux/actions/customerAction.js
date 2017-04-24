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

// create customer success
export const createCustomerSuccess = (id) => (
  {
    type: actionTypes.CREATE_CUSTOMER_SUCCESS,
    id
  }
)

// customer info be edited
export const customerInfoBeEdit = () => (
  {
    type: actionTypes.CUSTOMER_INFO_BE_EDITED
  }
)

// cancle be edit customer info
export const cancleBeEditedCustomerInfo = () => (
  {
    type: actionTypes.CANCLE_BE_EDITED_CUSTOMER_INFO
  }
)
