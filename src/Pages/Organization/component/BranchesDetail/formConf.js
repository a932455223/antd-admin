/**
 * Created by jufei on 2017/4/22.
 */
import React from 'react';
import {Row,Col,Select} from 'antd';
import AreaSelect from '../../../../components/AreaSelect';



const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 12
  }
};


export const addDepartmentForForm = [
  {
    label: '机构名称',
    type: 'input',
    required: true,
    message: '请填写组织机构名称！',
    formItemLayout: formItemLayout,
    field: 'branchesName',
  },
  {
    label: '负责人',
    type: 'input',
    required: true,
    message: '请填写组织负责人！',
    formItemLayout: formItemLayout,
    field: 'leader',
  },
  {
    label: '组织类别',
    type: 'select',
    required: true,
    message: '请选择组织类别！',
    formItemLayout: formItemLayout,
    field: 'classes',
    options: [
      {
        value: "1",
        text: '总行'
      },
      {
        value: "2",
        text: '分行'
      },
    ]
  },
  {
    label: '所属组织',
    type: 'select',
    required: true,
    message: '请选择所属组织！',
    formItemLayout: formItemLayout,
    field: 'branches',
    options: [
      {
        value: "1",
        text: '湖光农商行'
      },
      {
        value: "2",
        text: '泽州农商行'
      },
    ]
  },
  {
    label: '组织地址',
    type: 'other',
    required: true,
    message: '组织地址！',
    formItemLayout: formItemLayout,
    field: 'address',
    render: (
      <AreaSelect/>
    )
  },
  {
    label: '详细地址',
    type: 'input',
    required: false,
    message: '请填写详细地址',
    formItemLayout: formItemLayout,
    field: 'fullAddress',
  },
  {
    label: '备注信息',
    type: 'textarea',
    required: false,
    message: '请填写备注',
    formItemLayout: formItemLayout,
    field: 'remark',
  },
];
