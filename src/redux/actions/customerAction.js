import * as actionTypes from '../actionTypes/customer';

// 保存当前的 customer info
export const saveCurrentCustomerInfo = (info, mode) => (
  {
    type: actionTypes.SAVE_CURRENT_CUSTOMER_INFO,
    payload: {
      step: 2,
      mode: mode,
      id: info.id,
      name: info.name,
      category: info.category,
      beEdited: false
    }
  }
)

// step by step
export const createCustomer = () => (
  {
    type: actionTypes.CREATE_CUSTOMER,
    payload: {
      step: 1,
      mode: 'create',
      name: '',
      id: -1,
      category: '个人客户',
      beEdited: false
    }
  }
)

// 新建用户填写 info
export const fillCustomerInfo = (category, name) => (
  {
    type: actionTypes.CREATE_CUSTOMER,
    payload: {
      step: 2,
      mode: 'create',
      name: name,
      id: -1,
      category: category,
      beEdited: false
    }
  }
)

// create customer success
// export const createCustomerSuccess = ()
