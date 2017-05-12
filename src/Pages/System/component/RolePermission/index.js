/**
 * Created by jufei on 2017/4/25.
 */
import React,{Component} from 'react';
import { Card ,Tree,Button,Icon,Select,message,Modal} from 'antd'
import ajax from '../../../../tools/POSTF'
import API from '../../../../../API/index'
import _ from 'lodash'
import $ from 'jquery'
const TreeNode = Tree.TreeNode;
const Option = Select.Option
import './rolePermission.less'
// let Permission = <h1 onClick={this.props.mode === 'edit' ? this.props.backRoleEdit : this.props.close}>角色权限分配</h1>



let rightSelectValues = {};

function info(msg,color='red'){
  console.log('%c'+msg,'color:'+color)
}


// const generateSelect = (options,pid) => {
//   return <Select  value={options[0].level.toString()} onChange={(e)=>{info(e)}}>
//           {options.map((item,index) => <Option key={item.level.toString()}>{item.name}</Option>)}
//          </Select>
// }

const generateSelect = (options,pid) => {
  console.log(rightSelectValues)
  if(options === null){
    return ''
  }
  let selected;
  if(options) {
    selected = options.find(item => item.checked)
  }
  let selectValue = selected && selected.level.toString()
  let changedKeys = Object.keys(rightSelectValues)
  if(changedKeys.length > 0){
    selectValue = rightSelectValues[pid] || selectValue
  }
  return <select defaultValue={selectValue} name={pid}>
    {options.map((item,index) => <option key={item.level.toString()} value={item.level.toString()}>{item.name}</option>)}
  </select>
}

const generateTree = (nodes,parentId,showOptions) => nodes.map((item) =>{
  let pid = parentId==='0' ? item.id.toString() : parentId.toString()+'-'+item.id.toString()

  if(item.childs.length > 0){
    return (
      <TreeNode key={pid} title={item.name}>
        {generateTree(item.childs,pid,showOptions)}
      </TreeNode>
    )
  }

  let title = item.options === null ? '':'['+item.options[0].name+']'
  return <TreeNode key={pid} title={<span>{item.name} &nbsp;{showOptions ? generateSelect(item.options,pid):title}</span>} />
  // console.log(item)
  // return <TreeNode key={pid} title={<span>{<Select><Option key="1">111</Option></Select>}</span>} />

})

function copySigleTreeNode(treeNode){
  var node = {};
  for(let key in treeNode){
    if(key !=='childs' && key !=='options'){
      node[key] = treeNode[key]
    }

    if(key === 'options'){
      node['options'] = _.cloneDeep(treeNode.options)
    }
  }

  node.childs = []
  return node
}

function copyTreeNode(leftTree, rightTree, ids) {
  if (rightTree.childs === undefined) {
    rightTree = {
      id: 0,
      childs: []
    }
  }

  ids.forEach(function(item) {
    let pathIds = item.split('-')
    let len = pathIds.length
    let currentRightNode = rightTree
    let rightParentNode = rightTree
    let currentLeftNode = leftTree

    for (let j = 0; j < len; j++) {
      let id = pathIds[j]
      let hasNode = currentRightNode.childs.find(item => item.id == id)
      currentLeftNode = currentLeftNode.childs.find(item => item.id == id)
      if (!hasNode) {
        let newChild
        if(j === len - 1){
          newChild = _.cloneDeep(currentLeftNode)
        }else{
          newChild = copySigleTreeNode(currentLeftNode)
        }
        currentRightNode.childs.push(newChild)
        currentRightNode = newChild
      } else {
        if(j == len -1){
            hasNode.childs =  _.cloneDeep(currentLeftNode.childs)
        }else{
          currentRightNode = hasNode
        }
      }
    }
  })

  return rightTree
}

function removeChildrenKeys(ids){
  let result= _.cloneDeep(ids)
  let deleteIndexs = []
  let deleteKeys = []

  for(let j=0;j<result.length;j++){
    let currentKey = result[j]
    for(let i=1;i<result.length;i++){
      if(result[i].startsWith(currentKey+'-')){//判定为子元素
        info('remove key is :'+result[i]+',currentKey is '+currentKey)
        // result.splice(i,1)
        deleteIndexs.push(i)
        deleteKeys.push(result[i])
      }
    }
  }
    let uniqDeletekey = _.uniq(deleteKeys)
  _.remove(result,key => uniqDeletekey.indexOf(key) > -1)
  return result
}

function deleteTreeNode(node,deleteIds){
  deleteIds.forEach(function(deleteId){
    let pathIds = deleteId.split('-')
    let len = pathIds.length
    let currentNode = node
    let parentNode = node

    for(let i=0;i<len;i++){
      currentNode = currentNode.childs.find(item => item.id == pathIds[i])

      if(currentNode === undefined){//最后
        info('break:'+deleteId)
        break;
      }

      if(i===len-1){
        info('remove:'+deleteId)
        _.remove(parentNode.childs,item => item.id === currentNode.id)
      }
      parentNode = currentNode
    }
  })
  return node
}


export default class  RolePermission extends Component{
  state = {
    leftCheckedKeys: [],
    rightCheckedKeys: [],
    selectedKeys: [],
    leftPrivilege:[],
    rightPrivilege:{},
    leftOriginPrivilege:[],
    rightOriginPrivilege:[],
    leftKey:0,
    rightKey:0
  }

  componentWillUpdate(){
    info('component did update.')
    $('.transfer-right').find('select').each(function(){
      let name = $(this).attr('name')
      let value = $(this).val()
      console.log(name)
      console.log(value)
    })
  }
  getRightSelectValues(){
    let obj = {}
    $('.transfer-right').find('select').each(function () {
      let name = $(this).attr('name')
      let value = $(this).val()
      obj[name] = value
    })

    return obj
  }

  componentDidMount(){
    let self = this
    rightSelectValues = {}
    $('.transfer-right').on('change',function(){
      rightSelectValues = self.getRightSelectValues()
      console.log(rightSelectValues)
    })

    //初次
    rightSelectValues = self.getRightSelectValues()
  }

  componentWillMount(){
    info('will mount.')
    console.log(this.props.id)
    if(this.props.mode === 'edit'){
      // this.getRoleTrees(this.props.id)
      let getAllPrivilige = ajax.Get(API.GET_ALL_RPIVILIGE)
      let getRoleTrees = ajax.Get(API.GET_ROLE_TREE(this.props.id))

      ajax.all([getAllPrivilige,getRoleTrees]).then((res)=>{
        this.setState({
          leftOriginPrivilege:_.cloneDeep(res[0].data.data),
          rightOriginPrivilege:_.cloneDeep(res[0].data.data),
          leftPrivilege:_.cloneDeep(res[1].data.data.leftTree),
          rightPrivilege:_.cloneDeep(res[1].data.data.rightTree)
        })
      })
    }else if(this.props.mode === 'create'){
      this.getAllPrivilige()
    }
  }

  getAllPrivilige = () => {
    ajax.Get(API.GET_ALL_RPIVILIGE).then((res) => {
      this.setState({
        leftPrivilege:res.data.data,
        leftOriginPrivilege:_.cloneDeep(res.data.data),
        rightOriginPrivilege:_.cloneDeep(res.data.data)
      })
    })
  }

  getRoleTrees = (id) =>{
    ajax.Get(API.GET_ROLE_TREE(id)).then((res)=>{
      console.dir(res)
      this.setState({
        leftPrivilege:res.data.data.leftTree,
        rightPrivilege:res.data.data.rightTree,
        leftOriginPrivilege:_.cloneDeep(res.data.data.leftTree),
        rightOriginPrivilege:_.cloneDeep(res.data.data.rightTree)
      })
    })
  }

  toRight = () =>{
    if(this.state.leftCheckedKeys.length === 0){
      message.info("没有选中任何节点")
    }else{
      let leftCheckedKeys = _.cloneDeep(this.state.leftCheckedKeys).sort((pre,next)=>pre.split('-').length - next.split('-').length)
      leftCheckedKeys = removeChildrenKeys(leftCheckedKeys)
      let newLeftPrivilege = deleteTreeNode(_.cloneDeep(this.state.leftPrivilege),leftCheckedKeys)
      let newRightPrivilege = copyTreeNode(_.cloneDeep(this.state.leftOriginPrivilege),_.cloneDeep(this.state.rightPrivilege),leftCheckedKeys)
      this.setState({
        leftPrivilege:newLeftPrivilege,
        rightPrivilege:newRightPrivilege,
        leftCheckedKeys:[],
        leftKey:(this.state.leftKey + 1),
        rightKey:(this.state.rightKey + 1)
      })
    }
  }

  toLeft = () => {
      if(this.state.rightCheckedKeys.length === 0){
        message.info("没有选中任何节点")
      }else{
        let rightCheckedKeys = _.cloneDeep(this.state.rightCheckedKeys).sort((pre,next)=>pre.split('-').length - next.split('-').length)
        rightCheckedKeys = removeChildrenKeys(rightCheckedKeys)
        let newRightPrivilege = deleteTreeNode(_.cloneDeep(this.state.rightPrivilege),rightCheckedKeys)
        let newLeftPrivilege = copyTreeNode(_.cloneDeep(this.state.rightOriginPrivilege),_.cloneDeep(this.state.leftPrivilege),rightCheckedKeys)
        this.setState({
          leftPrivilege:newLeftPrivilege,
          rightPrivilege:newRightPrivilege,
          rightCheckedKeys:[],
          leftKey:(this.state.leftKey + 1),
          rightKey:(this.state.rightKey + 1)
        })
      }
  }
  onLeftCheck = (checkedKeys,e) => {
    this.setState({
      leftCheckedKeys:checkedKeys
    })
  }
  onRightCheck = (checkedKeys,e) => {
    this.setState({
      rightCheckedKeys:checkedKeys
    })
  }

  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  }

  resetForm = (e) =>{

  }




  handleSubmit = (e) =>{
    let data = {}
    let permissions = []

    $('.transfer-right').find('select').each(function(){
      let name = $(this).attr('name')
      let value = $(this).val()
      let ids = name.split('-')
      let id = ids[ids.length - 1]
      permissions.push({id:parseInt(id),level:parseInt(value)})
    })

    data.permissions = permissions;
    if(this.props.mode === 'edit'){
      ajax.PutJson(API.PUT_ROLE_TREE(this.props.id),data).then(function(res){
        if(res.data.code === 200){
          message.success('角色编辑成功')
        }else{
          Modal.error({
            title:'操作失败',
            content:res.data.message
          })
        }
      })
    }else if(this.props.mode === 'create'){
      data.roleName = this.props.roleName

      ajax.PostJson(API.POST_ROLE,data).then(function(res){
        if(res.data.code === 200){
          message.success('角色创建成功')
        }else{
          Modal.error({
            title:'操作失败',
            content:res.data.message
          })
        }
      })
    }

  }
  render(){
    const leftTree = this.state.leftPrivilege.id !==undefined ? <Tree
      key={this.state.leftKey.toString()}
      checkable
      autoExpandParent={true}
      onCheck={this.onLeftCheck}
      checkedKeys={this.state.leftCheckedKeys}
    >
      {generateTree(this.state.leftPrivilege.childs,'0',false)}
    </Tree>:null

    const rightTree = this.state.rightPrivilege.id !== undefined ? <Tree
      key={this.state.rightKey.toString()}
      checkable
      defaultExpandAll={true}
      autoExpandParent={true}
      onCheck={this.onRightCheck} checkedKeys={this.state.rightCheckedKeys}
    >
      {generateTree(this.state.rightPrivilege.childs,'0',true)}
    </Tree>:null

    const title =
                <div className="titlerow">
                  <p>分配权限</p>
                  <div className="btnbox">
                    <Button onClick={this.resetForm}>重置</Button>
                    <Button onClick={this.handleSubmit}>保存</Button>
                    <Icon
                        className="close"
                        type="close"
                        style={{cursor:"pointer"}}
                        onClick={this.props.close}
                    />
                  </div>
                </div>
    return (
      <div>
        <Card title={title}>
          <div className="my-transfer">
            <div className="transfer-left">
              {leftTree}
            </div>
            <div className="transfer-center">
              <Button onClick={this.toRight}> <Icon type="double-right" /> </Button>

              <Button onClick={this.toLeft}> <Icon type="double-left" /> </Button>
            </div>
            <div className="transfer-right">
              {rightTree}
            </div>
          </div>
        </Card>
      </div>
    )
  }
}
