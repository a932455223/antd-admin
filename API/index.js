export default {
  // 获取权限
  POST_PRIVILEGE_COMMON: '/api/privilege/common',

  //个人客户：
  //户家庭信息：查看、增加、删除、修改
  GET_CUSTOMERS_FAMILY:customerId =>`/api/customer/individual/${customerId}/families`,
  POST_CUSTOMERS_FAMILY:customerId => `/api/customer/individual/${customerId}/family`,
  DELETE_CUSTOMERS_FAMILY:familyId=>`/api/customer/individual/family/${familyId}`,
  PUT_CUSTOMERS_FAMILY:familyId => `/api/customer/individual/family/${familyId}`,
  //工作信息：查看、修改
  GET_JOBINFO_BASE:customerId=>`/api/customer/individual/${customerId}/job`,
  PUT_JOBINFO_BASE:customerId=>`/api/customer/individual/${customerId}/job`,
  //风险测试：
  GET_RISKQUESTIONS:`/api/riskQuestions`,//请求问卷
  GET_CALCULATESCORE:`/api/calculateScore`,//计算分数
  //企业客户：
  //关键人信息查看、增加、删除、修改
  GET_CUSTOMETS_KEYPERSONS:customerId=>`/api/customer/enterprise/${customerId}/keyPersons`,
  POST_CUSTOMERS_KEYPERSONS:customerId=>`/api/customer/enterprise/${customerId}/keyPerson`,
  DELETE_CUSTOMERS_KEYPERSONS:keypersonId=>`/api/customer/enterprise/keyPerson/${keypersonId}`,
  PUT_CUSTOMERS_KEYPERSONS:keypersonId=>`/api/customer/enterprise/keyPerson/${keypersonId}`,
  //个人客户金融业务信息、企业用户线下业务：
  // 查看、增加、删除、修改
  GET_CUSTOMER_FINANCES:customerId=>`/api/customer/${customerId}/finances`,
  POST_CUSTOMER_FINANCES:customerId=>`/api/customer/${customerId}/finance`,
  DELETE_CUSTOMERS_FINANCES:financesId=>`/api/customer/finance/${financesId}`,
  PUT_CUSTOMERS_FINANCES:financesId=>`/api/customer/finance/${financesId}`,
  //获取金融业务信息产品下拉：
  GET_CUSTOMER_FINANCE_CATEGORY:'/api/customer/finance/category',
  
  //enterprise:
  GET_CUSTOMER_ENTERPRISE_BASE: customerId => `/api/customer/enterprise/${customerId}/base`,
  PUT_CUSTOMER_ENTERPRISE_BASE: id =>  `/api/customer/enterprise/${id}/base`,
  POST_CUSTOMER_ENTERPRISE_BASE: '/api/customer/enterprise/base',
  //*===============================GET=======================================*
  // 客户列表
  GET_CUSTOMERS: '/api/customers',
  // customer/individual/:customerId/families
  // 用户与权限 角色 列表
  GET_SYSTEM_ROLES_LIST: '/asd/system/roles/list',

  GET_DEPARTMENT_HIERARCHY: '/api/department/hierarchy',

  GET_CUSTOMER_ADD_DEPARTMENT_HIERARCHY: '/api/customer/add/departments/hierarchy',

  POST_CUSTOMER_PRIVILEGE: '/api/privilege/customer',
  //===========dropDown option========================================
  GET_SYSTEM_SLIDER_BAR: '/asd/common/dropdown/list/system',
  GET_CUSTOMER_SLIDER_BAR: '/asd/common/dropdown/list/customer',
  GET_ORGANIZATION_SLIDER_BAR: '/asd/common/dropdown/list/organization',
  GET_PRODUCT_SLIDER_BAR: '/asd/common/dropdown/list/product',

  GET_RELATION_SLIDER_BAR: '/asd/common/dropdown/list/relation',
  GET_JOBCATEGORY_SLIDER_BAR: '/asd/common/dropdown/list/jobCategory',
  //==================================================================

  // 新增客户
  POST_CUSTOMER_INDIVIDUAL_BASE: '/api/customer/individual/base',
  PUT_CUSTOMER_INDIVIDUAL_BASE_TAB1: id => `/api/customer/individual/${id}/base/tab1`,
  PUT_CUSTOMER_INDIVIDUAL_BASE_TAB2: id => `/api/customer/individual/${id}/base/tab2`,

  GET_DEPARTMENT_AREAS: id => `/api/department/${id}/areas`,
  GET_CUSTOMER_DEPARTMENT: '/api/customer/add/departments/noHierarchy',
  GET_DEPARTMENT_STAFFS: id => `/api/department/${id}/staffs`,

  GET_CUSTOMER_BASE: id =>  `/api/customer/individual/${id}/base`, // 客户基本信息
  // GET_JOBINFO_BASE: id =>  `/asd/jobinfo/${id}/base`, // 客户工作信息
  // GET_CUSTOMER_BASE: id => `/asd/customer/${id}/base`,
  // GET_JOBINFO_BASE: id => `/asd/jobinfo/${id}/base`,

  GET_COMPANY_BASE: id => `/asd/company/${id}/base`,
  GET_FINANCE_BASE: id => `/asd/finance/${id}/base`,


  GET_STAFF_BASE: id => `/api/staff/${id}/baseInfo`,

  GET_DEPARTMENT_BASE: id => `/asd/department/${id}/base`,

  GET_AREA_SELECT: id => `/api/common/region/parent/${id}`,

  //=======================================

  //==================================================================


  // 组织机构详情列表
  GET_DEPARTMENTS: '/api/departments',


  // 组织机构员工列表
  GET_STAFFS: '/api/staffs',

  // 用户权限管理 用户列表
  GET_USERS: '/asd/system/users',

  // 产品类别 层级
  GET_PRODUCT_HIERARCHY: '/asd/product/hierarchy',

  // 所有产品
  GET_ALL_PRODUCT: '/asd/product/list',

  // 产品分类列表
  GET_PRODUCT_CLASSIFY_LIST: '/asd/product/classify/list',

  // 新增员工
  POST_ADD_STAFF: '/api/staff',

  //修改员工基本信息
  PUT_STAFF_BASIC: id => `/api/staff/${id}/basic`,

  //修改员工工作信息
  PUT_STAFF_JOB: id => `/api/staff/${id}/job`,

  //修改员工教育信息
  PUT_STAFF_EDUCATION: id => `/api/staff/${id}/education`,

  //获取多个组织机构的直属员工
  GET_DEPARTMENTS_STAFFS:'/api/department/staffs',

  //网格列表
  POST_GRIDS_AREAS: '/api/areas',

  //网格列表id
  GET_GRIDS_ID : id => `/api/area/${id}`,

  //新增网格
 POST_API_AREA : "/api/area",

 //编辑网格
 PUT_API_AREA : id => `/api/area/${id}`,

 //获取网格所属机构dropdown
 GET_AREAS_ADD_DEPARTMENTS : '/api/areas/add/departments',


  // 下拉菜单信息
  GET_COMMON_DROPDOWN: key => `/api/common/dropdown/${key}`,
  // 关系下拉菜单
  // GET_DROPDOWN_RELATION:'/asd/common/dropdown/list/relation',
  //工作属性下拉菜单

  // GET_DROPDOWN_JOB:'/asd/common/dropdown/list/jobCategory'

  //======================================登录相关==================================
    //获取验证码图片
    GET_CAPTCHA:'/api/captcha',
    //登陆
    POST_LOGIN:'/api/login',
  // GET_DROPDOWN_JOB:'/asd/common/dropdown/list/jobCategory',

  // 添加组织机构
  POST_DEPARTMENT: '/api/department',

  //新建组织机构  获取组织类别下拉菜单
  GET_ADD_DEPARTMENT_CATEGORIES: '/api/department/add/dropdown/categories',


  //新建组织机构  获取所属组织下拉菜单
  GET_ADD_DEPARTMENT_PARENT: '/api/department/add/dropdown/parent',

  // 新增员工 所属组织机构下拉菜单
  GET_STAFF_ADD_DEPARTMENT: '/api/staff/add/departments',

  // 组织机构详情
  GET_DEPARTMENT_DETAIL: id => `/api/department/${id}`,

  // 修改员工信息
  PUT_STAFF: id => `/api/staff/${id}`,

  // 组织机构修改
  PUT_DEPARTMENT: id => `/api/department/${id}`,

  // 直属上级下拉
  GET_STAFF_LEADERS: '/api/staff/leaders',

  //新增员工角色下拉
  GET_STAFF_ADD_ROLES : '/api/staff/add/roles',

  // 员工业务信息
  GET_STAFF_BUSSINESS_INFO: id => `/api/staff/${id}/businessInfo`,

  //分配时全部的权限数据
  GET_ALL_RPIVILIGE:'/api/role/tree'
}
