/**
 * Created by jufei on 2017/4/27.
 */
import axios from 'axios';
import qs from 'query-string';


// export const POSTF = (url,data) => {
//   return  axios.post(url,qs.stringify(data,{ arrayFormat: 'brackets' }),{headers: {
//     'content-type': 'application/x-www-form-urlencoded'
//   }})
// };


 const Post = (url,data) => {
  return  axios.post(url,qs.stringify(data))
};

const Get = (url,data) => {
  return  axios.get(url,qs.stringify(data))
}

const Put = (url,data) => {
  return  axios.put(url,qs.stringify(data))
}

const Delete = (url,data) => {
  return  axios.delete(url,qs.stringify(data))
}

export default {
	Post,
	Get,
	Put,
	Delete
}
