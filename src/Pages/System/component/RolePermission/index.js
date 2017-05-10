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

function deleteTreeNode(node,deleteIds){
  console.dir(node)
  console.dir(deleteIds)

  deleteIds.forEach(function(deleteId){
    let pathIds = deleteId.split('-')
    let len = pathIds.length
    let currentNode = node
    let parentNode = node

    for(let i=0;i<len;i++){
      console.dir(currentNode)
      currentNode = currentNode.childs.find(item => item.id == pathIds[i])

      if(currentNode === undefined){//最后
        info('break:'+deleteId)
        break;
      }

      if(i===len-1){
        info('remove:'+deleteId)
        console.dir(parentNode,currentNode)
        _.remove(parentNode.childs,item => item.id === currentNode.id)
      }
      parentNode = currentNode
      // console.dir(currentNodes)
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
    rightPrivilege:[],
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
      let newLeftPrivilege = deleteTreeNode(_.cloneDeep(this.state.leftPrivilege),leftCheckedKeys);
      this.setState({
        leftPrivilege:newLeftPrivilege,
        leftCheckedKeys:[]
      })
    }
  }

  toLeft = () => {

  }
  onCheck = (checkedKeys,e) => {
    this.setState({
      leftCheckedKeys:checkedKeys
    })
  }
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }


  render(){

    const leftTree = this.state.leftPrivilege.id !==undefined ? <Tree
      checkable
      defaultExpandAll={true}
      onExpand={this.onExpand}
      autoExpandParent={true}
      onCheck={this.onCheck} checkedKeys={this.state.leftCheckedKeys}
      onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}
    >
      {generateTree(this.state.leftPrivilege.childs,'0',false)}
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
              <Tree
                defaultExpandAll={true}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
              >
                <TreeNode title="客户管理" key="1">
                  <TreeNode title="客户资料库" key="10" >
                    <TreeNode title="网格管理" key="100"  />
                    <TreeNode title="leaf" key="101" />
                  </TreeNode>
                  <TreeNode title="金融产品管理" key="11">
                    <TreeNode title={<span>产品库 &nbsp;&nbsp;<select><option value="1">总行</option><option value="2">分行</option><option value="3">支行</option><option value="3">分理处</option><option value="4">自己</option></select></span>} key="110" />
                    <TreeNode title="删除产品" key="111" />
                  </TreeNode>
                </TreeNode>
              </Tree>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}
