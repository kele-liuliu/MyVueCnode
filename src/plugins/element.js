import Vue from 'vue'


// 按需引入element组件
import {Avatar,Button,Pagination,Input,Message,Select,Option}from 'element-ui'




// 使用element组件

Vue.use(Avatar)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.prototype.$message = Message