export default {

/*===============================GET=======================================*/
  // 客户列表
  GET_CUSTOMERS: '/asd/customers',
  //客户家庭信息
  GET_CUSTOMERS_FAMILY:function(id){
    return "/asd/customer/"+id+"/family";
  },
  // 用户与权限 角色 列表
  GET_SYSTEM_ROLES_LIST: '/asd/system/roles/list',

  GET_DEPARTMENT_HIERARCHY: '/api/department/hierarchy',

  POST_CUSTOMER_PRIVILEGE:'/asd/privilege/customer',
  //===========dropDown option========================================
  GET_SYSTEM_SLIDER_BAR: '/asd/common/dropdown/list/system',
  GET_CUSTOMER_SLIDER_BAR: '/asd/common/dropdown/list/customer',
  GET_ORGANIZATION_SLIDER_BAR: '/asd/common/dropdown/list/organization',
  GET_PRODUCT_SLIDER_BAR: '/asd/common/dropdown/list/product',

  GET_RELATION_SLIDER_BAR: '/asd/common/dropdown/list/relation',
  GET_JOBCATEGORY_SLIDER_BAR: '/asd/common/dropdown/list/jobCategory',
    //==================================================================




  GET_CUSTOMER_BASE: id =>  `/asd/customer/${id}/base`,
  GET_JOBINFO_BASE: id =>  `/asd/jobinfo/${id}/base`,

  GET_COMPANY_BASE: id => `/asd/company/${id}/base`,
  GET_FINANCE_BASE: id => `/asd/finance/${id}/base`,


  GET_STAFF_BASE: id => `/asd/staff/${id}/base`,

  GET_DEPARTMENT_BASE: id => `/asd/department/${id}/base`,

  GET_AREA_SELECT: id => `/api/common/region/parent/${id}`,

  //=======================================

  //==================================================================


  // 组织机构详情列表
  GET_DEPARTMENTS: '/asd/departments',


  // 组织机构员工列表
  GET_STAFFS: '/asd/staffs',

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

  //网格列表
  POST_GRIDS_AREAS : '/api/areas',



  // 下拉菜单信息
  GET_DROPDOWN: key => `/api/common/dropdown/${key}`,
  // 关系下拉菜单
  GET_DROPDOWN_RELATION:'/asd/common/dropdown/list/relation',
  //工作属性下拉菜单
  GET_DROPDOWN_JOB:'/asd/common/dropdown/list/jobCategory'
}

