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

  GET_DEPARTMENT_HIERARCHY: '/asd/department/hierarchy',

  POST_CUSTOMER_PRIVILEGE:'/asd/privilege/customer',
  //===========dropDown option========================================
  GET_SYSTEM_SLIDER_BAR: '/asd/common/dropdown/list/system',
  GET_CUSTOMER_SLIDER_BAR: '/asd/common/dropdown/list/customer',
  GET_ORGANIZATION_SLIDER_BAR: '/asd/common/dropdown/list/organization',
  GET_RELATION_SLIDER_BAR: '/asd/common/dropdown/list/relation',
  GET_JOBCATEGORY_SLIDER_BAR: '/asd/common/dropdown/list/jobCategory',
    //==================================================================

}
