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

    default:
      return state;
  }
}

export const currentCustomerInfo = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SAVE_CURRENT_CUSTOMER_INFO:
    case actionTypes.CREATE_CUSTOMER:
    case actionTypes.FILL_CUSTOMER_INFO:
      return {
        ...state,
        ...customerOperation(state['rightSlider'], action)
      }
    default:
      return state
  }
}

// export const currentCustomerInfo = (state = initialState, action) => {
//   switch(action.type) {
//     case actionTypes.SAVE_CURRENT_CUSTOMER_INFO:
//       return {
//         ...state,
//         ...action.payload
//       }
//
//     case actionTypes.CREATE_CUSTOMER:
//       return {
//         ...state,
//         ...action.payload
//       }
//
//     case actionTypes.FILL_CUSTOMER_INFO:
//       return {
//         ...state,
//         ...action.payload
//       }
//
//     default:
//       return state;
//   }
// }
