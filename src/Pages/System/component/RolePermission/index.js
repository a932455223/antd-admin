/**
 * Created by jufei on 2017/4/25.
 */
import React,{Component} from 'react';
import { Card ,Tree,Button,Icon,Select,message} from 'antd'
import ajax from '../../../../tools/POSTF'
import API from '../../../../../API/index'
import cloneDeep from 'lodash/cloneDeep'
const TreeNode = Tree.TreeNode;
const Option = Select.Option
import './rolePermission.less'
// let Permission = <h1 onClick={this.props.mode === 'edit' ? this.props.backRoleEdit : this.props.close}>角色权限分配</h1>


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

function deleteTreeNode(nodes,deleteIds){
  console.dir(nodes)
  console.dir(deleteIds)

  deleteIds.forEach(function(deleteId){
    let pathIds = deleteId.split('-')
    let len = pathIds.length
    let currentNodes = nodes

    for(let i=0;i<len;i++){
      // currentNodes = currentNodes.find(item => item.id == pathIds[i])
      // console.dir(currentNodes)
    }
  })
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
      let index = res.data.data.childs[0].childs.findIndex(item => item.id===3)
      res.data.data.childs[0].childs.splice(index,1)
      this.setState({leftPrivilege:res.data.data.childs,leftOriginPrivilege:res.data.data.childs})
    })
  }

  toRight = () =>{
    if(this.state.leftCheckedKeys.length === 0){
      message.info("没有选中任何节点")
    }else{
      let leftCheckedKeys = cloneDeep(this.state.leftCheckedKeys).sort((pre,next)=>pre.split('-').length - next.split('-').length)
      deleteTreeNode(this.state.leftPrivilege,leftCheckedKeys);
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

    const leftTree = this.state.leftPrivilege.length > 0 ? <Tree
      checkable
      defaultExpandAll={true}
      onExpand={this.onExpand}
      autoExpandParent={true}
      onCheck={this.onCheck} checkedKeys={this.state.leftCheckedKeys}
      onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}
    >
      {generateTree(this.state.leftPrivilege,'0',false)}
    </Tree>:null

    return (
      <div>
        <Card title="分配权限">
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
