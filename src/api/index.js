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

export const checkUser = params => {
    return axios.post('login',params).then(res => res.data)
}