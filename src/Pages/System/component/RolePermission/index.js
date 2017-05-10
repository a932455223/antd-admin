/**
 * Created by jufei on 2017/4/25.
 */
import React,{Component} from 'react';
import { Card ,Tree,Button,Icon,Select,message} from 'antd'
import ajax from '../../../../tools/POSTF'
import API from '../../../../../API/index'
import _ from 'lodash'

const TreeNode = Tree.TreeNode;
const Option = Select.Option
import './rolePermission.less'
// let Permission = <h1 onClick={this.props.mode === 'edit' ? this.props.backRoleEdit : this.props.close}>角色权限分配</h1>

function info(msg,color='red'){
  console.log('%c'+msg,'color:'+color)
}
const generateSelect = nodes => nodes.map((item)=>{
  return
  <Select defaultValue={item[0].id.toString()}>
    <Option key={item.id.toString()}>{item.name}</Option>
  </Select>
})
const generateTree = (nodes,parentId,showOptions) => nodes.map((item) =>{
  let pid = parentId==='0' ? item.id.toString() : parentId.toString()+'-'+item.id.toString()
  if(item.childs){
    return (
      <TreeNode key={pid} title={item.name}>
        {generateTree(item.childs,pid,showOptions)}
      </TreeNode>
    )
  }

  return <TreeNode key={pid} title={<span>{item.name} &nbsp;{showOptions ? generateSelect(item.options):'['+item.options[0].name+']'}</span>} />
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
  console.log(ids)
  console.dir(leftTree)
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
    rightOriginPrivilege:[]
  }

  componentWillMount(){
    this.getAllPrivilige()
  }

  getAllPrivilige = () => {
    ajax.Get(API.GET_ALL_RPIVILIGE).then((res) => {
      this.setState({leftPrivilege:res.data.data,leftOriginPrivilege:res.data.data})
    })
  }


  toRight = () =>{
    if(this.state.leftCheckedKeys.length === 0){
      message.info("没有选中任何节点")
    }else{
      let leftCheckedKeys = _.cloneDeep(this.state.leftCheckedKeys).sort((pre,next)=>pre.split('-').length - next.split('-').length)
      leftCheckedKeys = removeChildrenKeys(leftCheckedKeys)
      console.dir(leftCheckedKeys)
      let newLeftPrivilege = deleteTreeNode(_.cloneDeep(this.state.leftPrivilege),leftCheckedKeys)

      let newRightPrivilege = copyTreeNode(_.cloneDeep(this.state.leftOriginPrivilege),_.cloneDeep(this.state.rightPrivilege),leftCheckedKeys)

      this.setState({
        leftPrivilege:newLeftPrivilege,
        rightPrivilege:newRightPrivilege,
        leftCheckedKeys:[]
      })
    }
  }

  toLeft = () => {

  }
  onLeftCheck = (checkedKeys,e) => {
    this.setState({
      leftCheckedKeys:checkedKeys
    })
  }

  onRightCheck = (checkedKeys,e) => {
    console.dir(checkedKeys)
    this.setState({
      rightCheckedKeys:checkedKeys
    })
  }

  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  }


  render(){

    const leftTree = this.state.leftPrivilege.id !==undefined ? <Tree
      checkable
      defaultExpandAll={true}
      onExpand={this.onExpand}
      autoExpandParent={true}
      onCheck={this.onLeftCheck}
      checkedKeys={this.state.leftCheckedKeys}
    >
      {generateTree(this.state.leftPrivilege.childs,'0',false)}
    </Tree>:null

    const rightTree = this.state.rightPrivilege.id !== undefined ? <Tree
      key={Math.random().toString()}
      checkable
      defaultExpandAll={true}
      onExpand={this.onExpand}
      autoExpandParent={true}
      onCheck={this.onRightCheck} checkedKeys={this.state.rightCheckedKeys}
      onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}
    >
      {generateTree(this.state.rightPrivilege.childs,'0',false)}
    </Tree>:null

    const title =
                <div className="titlerow">
                  <p>分配权限</p>
                  <div className="btnbox">
                    <Button>重置</Button>
                    <Button>保存</Button>
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
