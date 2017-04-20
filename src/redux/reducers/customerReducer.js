import * as actionTypes from '../actionTypes/customer';

const initialState = {};

export const currentCustomerInfo = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SAVE_CURRENT_CUSTOMER_INFO:
      return {
        ...state,
        ...action.payload
      }

    case actionTypes.CREATE_CUSTOMER:
      return {
        ...state,
        ...action.payload
      }

    case actionTypes.FILL_CUSTOMER_INFO:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state;
  }
}
