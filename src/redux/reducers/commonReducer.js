import { combineReducers } from 'redux';
import * as actionTypes from '../actionTypes/index';

const initialState = {
  data: {
    visible: false,
    currentId: ''
  }
}
// show Dock and Hide Dock
const editDock = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SHOW_EDIT_DOCK:
      return {
        ...state,
        data: action.payload
      }

    case actionTypes.HIDE_EDIT_DOCK:
      return {
        ...state,
        data: action.payload
      }

    default:
      return state;
  }
}

const common = combineReducers({
  editDock
})

export default common;
