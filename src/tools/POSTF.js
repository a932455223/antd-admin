/**
 * Created by jufei on 2017/4/27.
 */
import axios from 'axios';
// import qs from 'query-string';
import qs from 'qs';
import $ from 'jquery'


// export const POSTF = (url,data) => {
//   return  axios.post(url,qs.stringify(data,{ arrayFormat: 'brackets' }),{headers: {
//     'content-type': 'application/x-www-form-urlencoded'
//   }})
// };


 const Post = (url,data) => {
  return  axios.post(url,qs.stringify(data,{
    arrayFormat: 'brackets'
  }))
};


// const PostJson = (url,data) => {
//   return   $.ajax({
//     url: url,
//     type: 'POST',
//     data: JSON.stringify(data),
//     dataType: "json",
//     contentType: "application/json"
//   })
// };
const PostJson = (url,data) => {
  return axios.post(url,data)
};

// const PutJson = (url,data) => {
//   return   $.ajax({
//     url: url,
//     type: 'PUT',
//     data: JSON.stringify(data),
//     dataType: "json",
//     contentType: "application/json"
//   })
// }
const PutJson = (url,data) => {
  return axios.put(url,data)
};

const Get = (url,data) => {
  return  axios.get(url,{
    params: data
  })
}

const Put = (url,data) => {
  return  axios.put(url,qs.stringify(data,{
    arrayFormat: 'brackets'
  }))
}

const Delete = (url,data) => {
  return  axios.delete(url,qs.stringify(data,{
    arrayFormat: 'brackets'
  }))
}

export default {
	Post,
	Get,
	Put,
	Delete,
  PostJson,
  PutJson,
  all:axios.all
}
