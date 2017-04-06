/**
 * Created by Yeapoo on 2017/03/13.
 */
import * as actionTypes from '../../redux/actionTypes';
import axios from 'axios';

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
  return axios.get('/book/category')
    .then(json => dispatch(getBookCategorySuccess(json)))
    .catch(error => dispatch(getBookCategoryFailure(error)))
}
