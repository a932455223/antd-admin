/**
 * Created by jufei on 2017/4/20.
 */
import React from 'react';
import {TreeSelect} from 'antd';


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
    span: 10
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
    defaultValue: 'asd'
  },
  {
    label: '身份证号',
    type: 'input',
    required: false,
    message: '请填写身份证！',
    formItemLayout: formItemLayoutS,
    field: 'certificate'
  },
  {
    label: '性别',
    type: 'select',
    required: false,
    message: '请选择性别！',
    formItemLayout: formItemLayoutS,
    field: 'sex',
    options: [
      {
        value: "1",
        text: '男'
      },
      {
        value: "0",
        text: '女'
      }
    ]
  },
  {
    label: '出生日期',
    type: 'datePicker',
    required: false,
    message: '请选择出生日期！',
    formItemLayout: formItemLayoutS,
    field: 'birthday'
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
    label: '添加为用户',
    type: 'select',
    required: true,
    message: '请选择是否添加用户！',
    formItemLayout: formItemLayout,
    field: 'add_user',
    options: [
      {
        value: "1",
        text: '是'
      },
      {
        value: "0",
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
    field: 'diploma',
    options: [
      {
        value: "1",
        text: '本科'
      },
      {
        value: "2",
        text: '研究生'
      },
      {
        value: "3",
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
    type: 'input',
    required: false,
    message: '请填写毕业时间！',
    formItemLayout: formItemLayout,
    field: 'graduation_time'
  },
];


const treeData = [{
  label: '山西湖光总行',
  value: '0-0',
  key: '0-0',
  children: [{
    label: 'Child Node1',
    value: '0-0-0',
    key: '0-0-0',
  }],
}, {
  label: 'Node2',
  value: '0-1',
  key: '0-1',
  children: [{
    label: 'Child Node3',
    value: '0-1-0',
    key: '0-1-0',
  }, {
    label: 'Child Node4',
    value: '0-1-1',
    key: '0-1-1',
  }, {
    label: 'Child Node5',
    value: '0-1-2',
    key: '0-1-2',
    children: [{
      label: 'Child Node1',
      value: '0-0-0-1',
      key: '0-0-0-3',
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
    field: 'jobID'
  },
  {
    label: '目前职位',
    type: 'select',
    required: true,
    message: '请选择职位！',
    formItemLayout: formItemLayout,
    field: 'post',
    options: [{
      value: "1",
      text: '董事长'
    }, {
      value: "2",
      text: '职员'
    }, {
      value: "3",
      text: '行长'
    }, {
      value: "4",
      text: '分行长'
    }]
  },
  {
    label: '任职状态',
    type: 'select',
    required: false,
    message: '请选择任职状态！',
    formItemLayout: formItemLayout,
    field: 'state',
    options: [
      {
        value: "1",
        text: '在职'
      },
      {
        value: "0",
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
    field: 'branches',
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
    require: false,
    message: '请选择入职时间',
    formItemLayout: formItemLayout,
    field: 'entry_time',
  }
];


