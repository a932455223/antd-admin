/**
 * Created by Yeapoo on 2017/03/13.
 */
import * as actionTypes from '../../redux/actionTypes/book';
import axios from 'axios';

// 获取 Book Menu List
const getBookCategoryRequest = () => (
  {
    type: actionTypes.GET_BOOK_CATEGORY_PENDING
  }
);

const getBookCategorySuccess = json => (
  {
    type: actionTypes.GET_BOOK_CATEGORY_SUCCESS,
    json: json.data
  }
);

const getBookCategoryFailure = error => (
  {
    type: actionTypes.GET_BOOK_CATEGORY_FAILURE,
    error
  }
);

export const getBookCategory = () => dispatch => {
  dispatch(getBookCategoryRequest());
  return axios.get('/api/book/category')
    .then(json => dispatch(getBookCategorySuccess(json)))
    .catch(error => dispatch(getBookCategoryFailure(error)))
}

// 点击 tag，获取对应 tag的数据
const searchBookByTagsRequest = () => (
  {
    type: actionTypes.SEARCH_BOOK_BY_TAGS_PENDING
  }
)

const searchBookByTagsSuccess = json => (
  {
    type: actionTypes.SEARCH_BOOK_BY_TAGS_SUCCESS,
    json: json.data
  }
)

const searchBookByTagsFailure = error => (
  {
    type: actionTypes.SEARCH_BOOK_BY_TAGS_FAILURE,
    error
  }
)

export const searchBookByTags = tags => dispatch => {
  dispatch(searchBookByTagsRequest());
  return axios.get(`/douban/v2/book/search?tag=${tags}`)
    .then(json => dispatch(searchBookByTagsSuccess(json)))
    .catch(error => dispatch(searchBookByTagsFailure(error)))
}
