/**
 * 文件说明： router
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */
import React from 'react';
import {Router, Route, IndexRoute,IndexRedirect} from 'react-router';
import {Provider} from 'react-redux';
import App from '../views/App/index'



const route = (
    <Route path='/'>
        <IndexRedirect to='product/list'/>
        <Route path='product' component={App} >
            <Route path='list' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/Product/index').default)
                 },'productIndex')
            }}/>
            <Route path='recycle' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/Product/recycle').default)
                 },'productCreate')
            }}/>
            <Route path='tags' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/Product/tags').default)
                 },'productTags')
            }}/>
            <Route path='brand' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/Product/brand').default)
                 },'productBrand')
            }}/>
            <Route path='provider' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/Product/provider').default)
                 },'productProvider')
            }}/>
        </Route>

        <Route path='branch' component={App}>
            <Route path='staff' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/Branch/staff').default)
                 },'branchStaff')
            }}/>
            <Route path='organization' getComponent={(location, cb)=>{
                require.ensure([],() => {
                      cb(null,require('../views/Branch/organization').default)
                 },'branchOrganization')
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
