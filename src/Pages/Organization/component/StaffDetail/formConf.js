/**
 * 文件说明： 组织机构管理/ 员工新建组件 form生成器配置文件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */
import React from 'react';
import {TreeSelect,Radio} from 'antd';
const RadioGroup = Radio.Group;

const formItemLayoutS = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 10
  }
};


const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 12
  }
};

// 基础信息
export const baseDataForForm = [
  {
    label: '姓名',
    type: 'input',
    required: true,
    message: '请填写姓名！',
    formItemLayout: formItemLayoutS,
    field: 'name',
  },
  {
    label: '身份证号',
    type: 'input',
    required: true,
    message: '请填写身份证！',
    formItemLayout: formItemLayoutS,
    field: 'certificate'
  },
  {
    label: '性别',
    type: 'other',
    required: false,
    message: '请选择性别！',
    formItemLayout: formItemLayoutS,
    field: 'gender',
    render: (
      <RadioGroup >
        <Radio value={1}>男</Radio>
        <Radio value={0}>女</Radio>
      </RadioGroup>
    )
  },
  {
    label: '出生日期',
    type: 'datePicker',
    required: false,
    message: '请选择出生日期！',
    formItemLayout: formItemLayoutS,
    field: 'birth'
  },
];


// 联系方式
export const connectDataForForm = [
  {
    label: '手机',
    type: 'input',
    required: true,
    message: '请填写手机号码！',
    formItemLayout: formItemLayout,
    field: 'phone'
  },
  {
    label: '微信号',
    type: 'input',
    required: false,
    message: '请填写微信号！',
    formItemLayout: formItemLayout,
    field: 'wechat'
  },
  {
    label: '邮箱',
    type: 'input',
    required: false,
    message: '请填写邮箱！',
    formItemLayout: formItemLayout,
    field: 'email'
  },
  {
    label: '家庭地址',
    type: 'input',
    required: false,
    message: '请填写家庭地址！',
    formItemLayout: formItemLayout,
    field: 'address'
  },
  {
    label: '添加用户',
    type: 'select',
    required: true,
    message: '请选择是否添加用户！',
    formItemLayout: formItemLayout,
    field: 'isUser',
    options: [
      {
        value: true,
        text: '是'
      },
      {
        value: false,
        text: '否'
      }
    ]
  }
];


export const eductionDataForForm = [
  {
    label: '学历',
    type: 'select',
    required: false,
    message: '请选择学历！',
    formItemLayout: formItemLayout,
    field: 'educationLevel',
    options: [
      {
        value: 1,
        text: '本科'
      },
      {
        value: 2,
        text: '研究生'
      },
      {
        value: 3,
        text: '博士'
      }
    ]
  },
  {
    label: '毕业院校',
    type: 'input',
    required: false,
    message: '请填写毕业院校！',
    formItemLayout: formItemLayout,
    field: 'school'
  },
  {
    label: '专业',
    type: 'input',
    required: false,
    message: '请填写专业！',
    formItemLayout: formItemLayout,
    field: 'major'
  },
  {
    label: '毕业时间',
    type: 'datePicker',
    required: false,
    message: '请填写毕业时间！',
    formItemLayout: formItemLayout,
    field: 'graduationTime'
  },
];


const treeData = [{
  label: '山西湖光总行',
  value: 1,
  key: '1',
  children: [{
    label: 'Child Node1',
    value: 2,
    key: '2',
  }],
}, {
  label: 'Node2',
  value: 3,
  key: '3',
  children: [{
    label: 'Child Node3',
    value: 4,
    key: '4',
  }, {
    label: 'Child Node4',
    value: 5,
    key: '5',
  }, {
    label: 'Child Node5',
    value: 6,
    key: '6',
    children: [{
      label: 'Child Node1',
      value: 7,
      key: '7',
    }],
  }],
}];

export const wordDataForForm = [
  {
    label: '工号',
    type: 'input',
    required: true,
    message: '请输入工号！',
    formItemLayout: formItemLayout,
    field: 'code'
  },
  {
    label: '目前职位',
    type: 'select',
    required: true,
    message: '请选择职位！',
    formItemLayout: formItemLayout,
    field: 'position',
    options: [{
      value: 1,
      text: '董事长'
    }, {
      value: 2,
      text: '职员'
    }, {
      value: 3,
      text: '行长'
    }, {
      value: 4,
      text: '分行长'
    }]
  },
  {
    label: '任职状态',
    type: 'select',
    required: false,
    message: '请选择任职状态！',
    formItemLayout: formItemLayout,
    field: 'jobStatus',
    options: [
      {
        value: 1,
        text: '在职'
      },
      {
        value: 0,
        text: '离职'
      }
    ]
  },
  {
    label: '所属机构',
    type: 'other',
    required: true,
    message: '请选择所属机构！',
    formItemLayout: formItemLayout,
    field: 'departments',
    render: (
      <TreeSelect
        getPopupContainer = { () => document.getElementById('staffDetail')}
        treeData={treeData}
        multiple={true}
      />
    )
  },
  {
    label: '入职时间',
    type: 'datePicker',
    required: true,
    message: '请选择入职时间',
    formItemLayout: formItemLayout,
    field: 'inductionTime',
  }
];


