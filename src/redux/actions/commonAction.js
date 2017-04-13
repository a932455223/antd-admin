import * as actionTypes from '../actionTypes/index';

// 点击 table row, 弹出 Dock
export const showEditDock = (visible, currentId) => (
  {
    type: actionTypes.SHOW_EDIT_DOCK,
    payload: {
      visible: visible,
      currentId: currentId
    }
  }
)

// 点击 table row，隐藏 Dock
export const hideEditDock = (visible) => (
  {
    type: actionTypes.HIDE_EDIT_DOCK,
    payload: {
      visible: visible,
      currentId: ''
    }
  }
)
