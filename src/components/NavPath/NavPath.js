import React,{Component,PropTypes} from 'react'
import {Breadcrumb} from 'antd'
import { connect } from 'react-redux'
const NavPath = ({items}) => (
    <Breadcrumb style={{ margin: '12px 0' }}>
      {items.map((item,index)=>(<Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>))}
    </Breadcrumb>
)

NavPath.prorpTypes = {
    navPath:PropTypes.array.isRequired
}

function mapStateToProp(store){
    return {
        items:store.navPath
    }
}
export default connect(mapStateToProp)(NavPath)
