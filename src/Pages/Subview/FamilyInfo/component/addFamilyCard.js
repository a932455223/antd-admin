import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Icon,
  Input,
  Form,
  Select
} from 'antd';
import styles from './../indexStyle.less';
import { connect } from 'react-redux';
import api from './../../../../../API';
import ajax from '../../../../tools/POSTF.js';
const FormItem = Form.Item;
const Option = Select.Option;

export default class AddFamilyCard extends Component{
    state = {
        isAdd:false
    }
    
    constructor(props) {
        super(props);
    };
    //添加状态切换
    toggleAdd = () => {
        this.setState({
        isAdd:!this.state.isAdd
        });
    }
    componentWillMount(){
            
            // console.log(this.props.item.certificate)
            // console.log(this.props.item.id)
            // console.log(this.props.item.name)
            // console.log(this.props.item.relation)
    }
    render(){
        let addArea;
        if(this.state.isAdd){
        addArea=
            (<Card
                className="family-card family-card-modify"
                title={
                    <div className="my-card-title">
                    <Input
                        prefix={<i className="iconfont icon-customer1"></i>}
                        type="text"
                        placeholder='请输入姓名'
                    />
                    <span
                        className="cancel-btn"
                         onClick={()=>{this.toggleAdd()}}
                    >
                        取消
                    </span>
                    <span
                        className="save-btn"
                    >
                        保存
                    </span>
                    </div>
                }
                >
                    <Row>
                        <Col span={8}>
                        <span>关系：</span>
                        </Col>
                        <Col span={16}>
                            <Select 
                                defaultValue="请选择关系"
                            >
                                {
                                    this.props.familyRelation.map((rel) => {
                                        return (
                                            <Option 
                                                value={rel.id.toString()}
                                                key={rel.id.toString()}
                                            >
                                                {rel.name}
                                            </Option >
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                        <span>联系方式：</span>
                        </Col>
                        <Col span={16}>
                        <Input type="text" 
                            placeholder='请输入联系方式' 
                        />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                        <span>身份证号：</span>
                        </Col>
                        <Col span={16}>
                        <Input type="text" 
                            placeholder='请输入身份证号'
                        />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                        <span>工作属性：</span>
                        </Col>
                        <Col span={16}>
                             <Select 
                                defaultValue="请选择工作属性"
                             >
                                {
                                    this.props.commonJobCategory.map((job) => {
                                        return (
                                            <Option 
                                                value={job.id.toString()}
                                                key={job.id.toString()}
                                            >
                                                {job.name}
                                            </Option >
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
            </Card>)

        }else{
        //添加按钮
        addArea=
            (<Card  className="family-card family-add-card">
                <i className="iconfont icon-create"   onClick={()=>{this.toggleAdd()}}></i>
                <p>新建家庭关系</p>
            </Card>)
        }
        return (
            addArea
        )
    }
}