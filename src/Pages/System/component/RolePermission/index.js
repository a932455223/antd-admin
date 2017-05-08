/**
 * Created by jufei on 2017/4/25.
 */
import React,{Component} from 'react';
import { Card ,Tree,Button,Icon,Select} from 'antd'
import ajax from '../../../../tools/POSTF'
import API from '../../../../../API/index'
const TreeNode = Tree.TreeNode;
const Option = Select.Option
import './rolePermission.less'
// let Permission = <h1 onClick={this.props.mode === 'edit' ? this.props.backRoleEdit : this.props.close}>角色权限分配</h1>

const x = 3;
const y = 2;
const z = 1;
const gData = [];
const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const generateSelect = nodes => nodes.map((item)=>{
  return
  <Select defaultValue={item[0].id.toString()}>
    <Option key={item.id.toString()}>{item.name}</Option>
  </Select>
})
const generateTree = (nodes,showOptions) => nodes.map((item) =>{
  if(item.childs){
    return (
      <TreeNode key={item.id.toString()} title={item.name}>
        {generateTree(item.childs,showOptions)}
      </TreeNode>
    )
  }

  return <TreeNode key={item.id.toString()} title={<span>{item.name} &nbsp;{showOptions ? generateSelect(item.options):'['+item.options[0].name+']'}</span>} />
})
export default class  RolePermission extends Component{
  state = {
    checkedKeys: [],
    selectedKeys: [],
    privilege:[]
  }

  componentWillMount(){
    this.getAllPrivilige()
  }

  getAllPrivilige = () => {
    ajax.Get(API.GET_ALL_RPIVILIGE).then((res)=>{
      this.setState({privilege:res.data.data})
    })
  }

  onCheck = (checkedKeys,e) => {
    console.dir(e)
    this.setState({
      checkedKeys:checkedKeys
    })

    console.dir(checkedKeys)
  }
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }


  render(){

    const leftTree = this.state.privilege.length > 0 ? <Tree
      checkable
      defaultExpandAll={true}
      onExpand={this.onExpand}
      autoExpandParent={true}
      onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
      onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}
    >
      {generateTree(this.state.privilege,false)}
    </Tree>:null

    return (
      <div>
        <Card title="分配权限">
          <div className="my-transfer">
            <div className="transfer-left">
              {leftTree}
            </div>
            <div className="transfer-center">
              <Button> <Icon type="double-right" /> </Button>

              <Button> <Icon type="double-left" /> </Button>
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
