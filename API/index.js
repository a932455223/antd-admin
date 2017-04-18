export default {
  // 客户列表
  CUSTOMERS: '/api/customers',

  SYSTEM_ROLES_LIST: '/asd/system/roles/list'
}


import API from '~/API';
axios.get(API.CUSTOMERS);
