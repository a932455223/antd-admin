// import api from 'axios'
import ajax from '../../tools/POSTF.js';
import apiRoute from './../../../API';

export const FETCH_PROFILE_PENDING = 'FETCH_PROFILE_PENDING';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function fetchProfile() {
    let uid = window.localStorage.getItem('uid');

    if (uid === undefined) {
        return {type: 'UID_NOT_FOUND'};
    }

    return {
        type: 'FETCH_PROFILE',
        payload: {
          promise: api.get('/my')
        }
    }
}

// export function login(user, password) {
//   return {
//       type: 'LOGIN',
//       payload: {
//         promise: api.put('/login', {
//           data: {
//             user: user,
//             password: password
//           }
//         })
//       }
//   }
// }
export function login(values){
  return (dispatch)=>{
    dispatch({type:LOGIN_PENDING});
    return ajax.Post(apiRoute.POST_LOGIN,values)
      .then(res=>{
        console.log(res);
        dispatch({type:LOGIN_SUCCESS,payload:{data:{uid:values.phone,name:'ljw'}}})
      })
  }
}

// export function logout() {

//     return {
//         type: 'LOGOUT',
//         payload: {
//           promise: api.get('/logout')
//         }
//     }
// }
export function logout(){
  return(dispatch)=>{
      return ajax.Get(apiRoute.GET_LOGOUT)
        .then(res=>{
            console.log(res+"louout");
            dispatch({type:LOGOUT_SUCCESS});
        })
  }
}