/**
 * 文件说明： router
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */
import React from 'react';
import {Router, Route, IndexRoute,IndexRedirect} from 'react-router';
import {Provider} from 'react-redux';
import App from '../Pages/App';
import configStores from '../redux/store';

const store = configStores();

const validate = function(next, replace, callback){
    callback();
}

const route = (
    <Route path='/'>
        <IndexRedirect to='customer/my'/>
        <Route path='customer' onEnter={validate} component={App} >
            <Route path='my' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../Pages/Customer/MyCustomer').default)
                 },'MyCustomer')
            }}/>
            <Route path='focused' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../Pages/Customer/Focused').default)
                 },'Focused')
            }}/>
            <Route path='undistributed' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../Pages/Customer/Undistributed').default)
                 },'Undistributed')
            }}/>
            <Route path='subordinate' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../Pages/Customer/Subordinate').default)
                 },'Subordinate')
            }}/>
            <Route path='participation' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../Pages/Customer/Participation').default)
                 },'participation')
            }}/>
            <Route path='recentlyDistributed' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../Pages/Customer/RecentlyDistributed').default)
                 },'RecentlyDistributed')
            }}/>
            <Route path='all' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../Pages/Customer/All').default)
                 },'All')
            }}/>
            </Route>

        <Route path='system' onEnter={validate} component={App}>
            <Route path='users' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../Pages/System/Users').default)
                 },'users')
            }}/>
            <Route path='roles' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../Pages/System/Roles').default)
                 },'roles')
            }}/>
        </Route>
        <Route path='login' getComponent={(location, cb)=>{
            require.ensure([],() => {
                  cb(null,require('../Pages/Login/login').default)
             },'login')
        }}/>

    </Route>
)

const routeOne = (
    <Route path='/'>
        <IndexRedirect to='customer/my'/>
        <Route path='customer' onEnter={validate} component={App} >
            <Route path='my' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../Pages/Customer/MyCustomer').default)
                 },'MyCustomer')
            }}/>

        </Route>
        <Route path='login' getComponent={(location, cb)=>{
            require.ensure([],() => {
                  cb(null,require('../Pages/Login/login').default)
             },'login')
        }}/>
    </Route>
)

export default route;
