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
const FormItem = Form.Item;
const Option = Select.Option;
class familyForm extends Component{
    constructor(props) {
        super(props);
    };
    componentWillMount() {
        // console.log(this.props.item.phone.value);
        console.log(this.props.item)
    }
    componentWillReceiveProps(newProps){
        // console.log(this.props)
    }
    findDropDownItem(value,dropDownType){
        return this.props[dropDownType].filter((item)=>{
            let bool;
            Object.getOwnPropertyNames(item).
                forEach((val, idx, array)=> {
                    if(item[val]==value){
                        bool=true;
                    }
                });
            return bool;
        })[0];
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form  className="family-card family-card-modify">
                <Card
                    title={
                        <div className="my-card-title">
                            <FormItem>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '姓名不能为空' }],
                                })(<Input />)}
                            </FormItem>
                            <span
                                className="cancel-btn"
                                onClick={()=>{this.props.toggleEdit(this.props.index)}}
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
                {/*<FormItem>
                {getFieldDecorator('relation', {
                    rules: [{ required: true, message: 'relation is required!' }],
                })(<Input />)}
                </FormItem>*/}
                    {/*<Row>
                        <Col span={8}>
                        <span>关系：</span>
                        </Col>
                        <Col span={16}>
                            <Select 
                                defaultValue={this.props.item.relation.value.toString()}
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
                        <Input type="text" value={this.props.item.phone.value}  />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                        <span>身份证号：</span>
                        </Col>
                        <Col span={16}>
                        <Input type="text" value={this.props.item.certificate.value} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                        <span>工作属性：</span>
                        </Col>
                        <Col span={16}>
                            <Select 
                                defaultValue={this.props.item.jobCategory.value.toString()}
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
                    </Row>*/}
                </Card>

            </Form>
        )
    }
}
const FamilyForm = Form.create({
    onFieldsChange(props, changedFields) {
        console.log(props, changedFields)
        var aa = props.onChange(changedFields);
        console.log(aa);
    },
    mapPropsToFields(props) {
        console.log('map triggered.',props)
        return {
            name: {
                ...props.name
            },
            relation: {
                ...props.relation
            },
            certificate: {
                ...props.certificate
            },
            jobCategory: {
                ...props.jobCategory
            },
        };
    },
    onValuesChange(_, values) {
        console.log(_, values)
    },
})(familyForm);

export default FamilyForm;