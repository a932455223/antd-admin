1.用户姓名是baseInfo接口里的


2.
CustomerSlider
1> 新建流程
  1.点击tablepage中的新建按钮，传参 docker visible =true,CustomerSlider mode='create'
  2.CustomerSlider接受 mode='create',出现 客户类型选择框和客户名称填写框。
  3.显示baseInfo,传参baseInfo mode='create'
  4.baseInfo 接受 mode='create',reset State，render
  5.baseInfo 接受一个函数参数，用于创建成功回传customerId
2> 编辑流程
  1.点击tablepage 中的Row,穿参 docker visible = true,CustomerSlider mode='edite',customerId = 1,customerType='personal'
  2. CustomerSlider接受 mode='edit',customerId,customerType,customerId
  3.如果是customerType = 'personal'，传参(mode='edit',customerId=1)给 对应的组件(baseInfo,familyInfo)
 3> baseInfo 根据 mode='edit'，customerId=1去请求接口 GET_CUSTOMER_BASEINFO



 1.willReceiveProps
 2.样式问题
 3.immutable问题
 4.组件私有state init 问题
 5.删选数据




```javascript
customer: {
    refresh: false, // dataSource refresh
    table: {
      visible: false // dock visible
    },
    rightSlider: {
        step: 2,
        mode: 'view', // create, view, edit
        category: '个人客户',
        currentId: 1,
        currentName: 'xxx',
        beEdited: false, // close edit notification
    }
},
message:{

}
```

TablePage.js
```js
import CustomerSlider from 'CustomerSlider'

class TablePage{
    <Docker isVisible={this.props.dockerVisible}>
        <this.state.CustomerSlider />
    </Docker>
}
mapStateToProps(store){
    return {dockerVisible:store.rightSlider.dockerVisible}
}

export connect(mapStateToProps)(TablePage)
```



MyCustomer
```js
import TablePage from 'TablePage'
<TablePage columns dataSource/>
```
CustomerSlider
```js
class CustomerSlider{

}

mapStateToProps(store){
    return {dockerVisible:store.rightSlider.dockerVisible}
}
connect()
```


日期：4-21

2.customerSlider 里的ensure加载 为什么要setTimeout.

3.取消按钮

4.列表页面，关注按钮样式 @魏鸣

5.organization/staff 右侧滑栏第一次点击样式不正确的问题。

6.琚斐组织管理假数据的问题。

7.卸载组件之后的state状态

8.dropdown的权限问题



