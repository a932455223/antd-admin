/**
 * Created by jufei on 2017/4/27.
 */
import axios from 'axios';
import qs from 'qs';


export const POSTF = (url,data) => {
  return  axios.post(url,qs.stringify(data,{ arrayFormat: 'brackets' }),{headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }})
};
