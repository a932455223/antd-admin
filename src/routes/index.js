/**
 * 文件说明： router
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */
import React from 'react';
import {Router, Route, IndexRoute,IndexRedirect} from 'react-router';
import {Provider} from 'react-redux';
import App from '../views/App/index';
import configStores from '../redux/store';

const store = configStores();
console.log(store.getState());

const validate = function(next, replace, callback){
    console.dir(next);
    callback();
}

const route = (
    <Route path='/'>
        <IndexRedirect to='customer/my'/>
        <Route path='customer' onEnter={validate} component={App} >
            <Route path='my' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/Customer/MyCustomer').default)
                 },'MyCustomer')
            }}/>
            <Route path='focused' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/Customer/Focused').default)
                 },'Focused')
            }}/>
            <Route path='undistributed' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/Customer/Undistributed').default)
                 },'Undistributed')
            }}/>
            <Route path='subordinate' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/Customer/Subordinate').default)
                 },'Subordinate')
            }}/>
            <Route path='participation' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/Customer/Participation').default)
                 },'participation')
            }}/>
            <Route path='recentlyDistributed' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/Customer/RecentlyDistributed').default)
                 },'RecentlyDistributed')
            }}/>
            <Route path='all' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/Customer/All').default)
                 },'All')
            }}/>
            </Route>

        <Route path='system' onEnter={validate} component={App}>
            <Route path='users' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/System/Users').default)
                 },'users')
            }}/>
            <Route path='roles' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/System/Roles').default)
                 },'roles')
            }}/>
        </Route>
        <Route path='login' getComponent={(location, cb)=>{
            require.ensure([],() => {
                  cb(null,require('../views/Login/login').default)
             },'login')
        }}/>

    </Route>
)

export default route;
