/**
 * 文件说明： store
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

 import {
   createStore,
   applyMiddleware,
   combineReducers,
   compose
 } from 'redux';

 import thunk from 'redux-thunk';

 import reducers from '../reducers';

 const createStoreWithMiddleware = compose(
   applyMiddleware(thunk)
 )(createStore);

 export default function configStores(initialState) {
     let args = [reducers,initialState];
     if(process.env.NODE_ENV === 'development'){
         const persistState = require('redux-devtools').persistState;
         const DevTools = require('../../containers/DevTools').default;
         const enhancer = compose(
           DevTools.instrument(),
           persistState(
             window.location.href.match(
               /[?&]debug_session=([^&#]+)\b/
             )
           )
         );
         args.push(enhancer)
     }

     return createStoreWithMiddleware(...args);
 }
