//封装axios
import axios from 'axios'
import Vue from 'vue'

//设置基地址
axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
// 响应拦截
axios.interceptors.response.use(res => res.data
)
// 注册成全局方法
Vue.prototype.$axios = axios
export default axios