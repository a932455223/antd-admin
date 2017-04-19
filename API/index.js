export default {
  // 客户列表
  GET_CUSTOMERS: '/api/customers',

  // 用户与权限 角色 列表
  GET_SYSTEM_ROLES_LIST: '/asd/system/roles/list',

  //===========dropDown option=====================
  GET_SYSTEM_SLIDER_BAR: '/asd/common/dropdown/list/system',
  GET_CUSTOMER_SLIDER_BAR: '/asd/common/dropdown/list/customer',
  GET_ORGANIZATION_SLIDER_BAR: '/asd/common/dropdown/list/organization',

  GET_CUSTOMER_BASE: id =>  `/asd/customer/${id}/base`,
  
  //=======================================
}
