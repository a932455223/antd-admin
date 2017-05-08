import { combineReducers } from 'redux';
import * as actionTypes from '../actionTypes/customer';

const initialState = {
  step: 1,
  mode: 'create',
  name: '',
  id: -1,
  category: '个人客户',
  beEditedArray: []
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
        category: action.category,
        beEditedArray: []
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

    case actionTypes.EDIT_CUSTOMER_NAME:
      if(!state.beEditedArray.includes(action.payload)) {
        state.beEditedArray.push(action.payload);
      }

      return {
        ...state,
        name: action.name,
        beEditedArray: state.beEditedArray
      }

    case actionTypes.CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        mode: 'edit',
        id: action.id
      }

    case actionTypes.EDIT_CUSTOMER_SUCCESS:
      return {
        ...state,
        mode: 'edit'
      }

    case actionTypes.INCREASE_BE_EDITED_ARRAY:
      if(!state.beEditedArray.includes(action.payload)) {
        state.beEditedArray.push(action.payload)
      }

      return {
        ...state,
        beEditedArray: state.beEditedArray
      }

    case actionTypes.DECREASE_BE_EDITED_ARRAY:
      let position = state.beEditedArray.indexOf(action.payload);
      state.beEditedArray.splice(position, 1);
      return {
        ...state,
        beEditedArray: state.beEditedArray
      }

    case actionTypes.RESET_BE_EDITED_ARRAY:
      return {
        ...state,
        beEditedArray: []
      }

    case actionTypes.RESET_CUSTOMER_INFO:
      return {
        ...state,
        step: 1,
        mode: 'create',
        name: '',
        id: -1,
        category: '个人客户',
        beEditedNumber: 0
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
    case actionTypes.RESET_CUSTOMER_INFO:
      return {
        ...state,
        ...customerOperation(state[0], action)
      }

    case actionTypes.EDIT_CUSTOMER_NAME:
    case actionTypes.CREATE_CUSTOMER_SUCCESS:
    case actionTypes.INCREASE_BE_EDITED_ARRAY:
    case actionTypes.DECREASE_BE_EDITED_ARRAY:
    case actionTypes.RESET_BE_EDITED_ARRAY:
    case actionTypes.EDIT_CUSTOMER_SUCCESS:
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
