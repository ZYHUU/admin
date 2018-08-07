import  axios from 'axios' 
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
// axios拦截器
axios.interceptors.request.use(function (config) {
    // 将token给到一个前后台约定好的key中，作为请求发送
    let token = localStorage.getItem('mytoken')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })
// 登录验证
export const checkUser = params => {
    return axios.post('login',params).then(res => res.data)
}
// 用户列表
export const getUserList = params => {
  return axios.get('users',params).then(res => res.data) 
}
// 修改用户状态
export const changeUserState = params => {
  return axios.put(`users/${params.uid}/state/${params.type}`).then(res => res.data)
}
// 添加用户
export const addUser = params => {
  return axios.post('users',params).then(res => res.data)
}
// 根据id获取用户信息
export const getUserById = params => {
  return axios.get(`users/${params}`).then(res => res.data)
}
// 编辑用户
export const editUser = params => {
  return axios.put(`users/${params.id}`, params).then(res => res.data)
}
// 删除用户
export const deleteUser = params => {
  return axios.delete(`users/${params}`, params).then(res => res.data)
}
// 获取角色列表
export const getRoleList = params => {
  return axios.get('roles').then(res => res.data)
}
// 分配角色
export const grantUserRow = params => {
  return axios.put(`users/${params.id}/role`,{id: params.id,rid: params.rid}).then(res => res.data)
}
// 获取权限列表
export const getRightList = params => {
  return axios.get(`rights/${params.type}`).then(res => res.data)
}
// 左侧菜单权限
export const getMenu = params => {
  return axios.get('menus').then(res => res.data)
}
// 删除角色指定权限
export const deleteRight = params => {
  return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`).then(res => res.data)
}
// 角色授权
export const grantRoleRight = (roleId, rids) => {
  return axios.post(`roles/${roleId}/rights`, rids).then(res => res.data)
}
// 添加角色 
export const addRoles = params => {
  return axios.post('roles',params).then(res => res.data)
}
// 获取商品列表
export const getCategories = params => {
  return axios.get('categories', { params: params }).then(res => res.data)
}
// 添加商品分类
export const addCategories = params => {
  return axios.post('categories', params).then(res => res.data)
}
// 删除商品分类
export const deleteCategoried = params => {
  return axios.delete(`categories/${params.id}`).then(res => res.data)
}