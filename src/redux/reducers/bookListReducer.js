/**
 * 文件说明： bookList reducer
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */
import * as actionTypes from '../actionTypes/book';

const initialState = {
  data: null
}

export const booksCategory = (state = initialState,action) => {
  switch (action.type) {
    case actionTypes.GET_BOOK_CATEGORY_PENDING:
      return {
        ...state
      }

    case actionTypes.GET_BOOK_CATEGORY_SUCCESS:
      return {
        ...state,
        data: action.json
      }

    case actionTypes.getBookCategoryFailure:
      return {
        ...state,
        error: action.error
      }

    default:
      return state;
  }
}

export const booksList = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.SEARCH_BOOK_BY_TAGS_PENDING:
      return {
        ...state
      }

    case actionTypes.SEARCH_BOOK_BY_TAGS_SUCCESS:
      return {
        ...state,
        data: action.json
      }

    case actionTypes.SEARCH_BOOK_BY_TAGS_FAILURE:
      return {
        ...state,
        error: action.error
      }

    default:
      return state;
  }
}
