/**
 * 文件说明： router
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */
import React from "react";
import {IndexRedirect, Route} from "react-router";
import App from "../Pages/App";
import configStores from "../redux/store";

const store = configStores();

const validate = function (next, replace, callback) {
  callback();
}
const route = (
  <Route path='/'>
    <IndexRedirect to='welcome'/>
    <Route path='customer' onEnter={validate} component={App}>
      <Route path='my' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/Customer/MyCustomer').default)
        }, 'MyCustomer')
      }}/>
      <Route path='focused' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/Customer/Focused').default)
        }, 'Focused')
      }}/>
      <Route path='undistributed' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/Customer/Undistributed').default)
        }, 'Undistributed')
      }}/>
      <Route path='subordinate' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/Customer/Subordinate').default)
        }, 'Subordinate')
      }}/>
      <Route path='participation' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/Customer/Participation').default)
        }, 'participation')
      }}/>
      <Route path='recentlyDistributed' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/Customer/RecentlyDistributed').default)
        }, 'RecentlyDistributed')
      }}/>
      <Route path='all' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/Customer/All').default)
        }, 'All')
      }}/>
      <Route path='grids' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/Grids/List').default)
        }, 'gridsList')
      }}/>
    </Route>

     <Route path='grids' onEnter={validate} component={App}>
         <Route path='list' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/Grids/List').default)
        }, 'gridsList')
      }}/>
    </Route>

    <Route path='system' onEnter={validate} component={App}>
      <Route path='users' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/System/Users/').default)
        }, 'users')
      }}/>
      <Route path='roles' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/System/Roles/').default)
        }, 'roles')
      }}/>
    </Route>
    <Route path='organization' onEnter={validate} component={App}>
      <Route path='staff' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/Organization/Staff').default)
        }, 'staff')
      }}/>
      <Route path='branches' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/Organization/Branches').default)
        }, 'branches')
      }}/>
    </Route>
    <Route path='product' onEnter={validate} component={App}>
      <Route path='all' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/Product/AllProduct').default)
        }, 'allProduct')
      }}/>
      <Route path='classify' getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('../Pages/Product/Classify').default)
        }, 'classify')
      }}/>
    </Route>
    <Route path="demos/form1" getComponent={(location,cb)=>{
      require.ensure([],()=>{
        cb(null,require('../Pages/Demos/Form/Form1').default)
      })
    }}>
    </Route>
    <Route path="demos/form2" getComponent={(location,cb)=>{
      require.ensure([],()=>{
        cb(null,require('../Pages/Demos/Form/Form2').default)
      })
    }}>
    </Route>
    <Route path='login' getComponent={(location, cb) => {
    require.ensure([], () => {
      cb(null, require('../Pages/Login/login').default)
    }, 'login')
  }}/>
    <Route path='welcome' getComponent={(location, cb) => {
      require.ensure([], () => {
        cb(null, require('../Pages/Welcome').default)
      }, 'Welcome')
    }}/>
  </Route>
);

export default route;
