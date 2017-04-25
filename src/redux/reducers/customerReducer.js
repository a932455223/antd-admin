import { combineReducers } from 'redux';
import * as actionTypes from '../actionTypes/customer';

const initialState = {
  step: 1,
  mode: 'create',
  name: '',
  id: -1,
  category: '个人客户',
  beEdited: false
};

const customerOperation = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SAVE_CURRENT_CUSTOMER_INFO:
      return {
        ...state,
        step: 2,
        mode: action.mode,
        id: action.id,
        name: action.name,
        category: action.category
      }

    case actionTypes.CREATE_CUSTOMER:
      return {
        ...state
      }

    case actionTypes.FILL_CUSTOMER_INFO:
      return {
        ...state,
        step: 2,
        name: action.name,
        category: action.category
      }

    case actionTypes.CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        mode: 'edit',
        id: action.id
      }

    case actionTypes.CUSTOMER_INFO_BE_EDITED:
      return {
        ...state,
        beEdited: true
      }

    case actionTypes.RESET_CUSTOMER_INFO:
      return {
        ...state,
        step: 1,
        mode: 'create',
        name: '',
        id: -1,
        category: '个人客户',
        beEdited: false
      }

    default:
      return state;
  }
}

const currentCustomerInfo = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SAVE_CURRENT_CUSTOMER_INFO:
    case actionTypes.CREATE_CUSTOMER:
    case actionTypes.FILL_CUSTOMER_INFO:
    case actionTypes.CREATE_CUSTOMER_SUCCESS:
    case actionTypes.RESET_CUSTOMER_INFO:
      return {
        ...state,
        ...customerOperation(state[0], action)
      }

    case actionTypes.CUSTOMER_INFO_BE_EDITED:
      return {
        ...state,
        ...customerOperation(state, action)
      }
    default:
      return state
  }
}

const customer = combineReducers({
  currentCustomerInfo
})

export default customer;
