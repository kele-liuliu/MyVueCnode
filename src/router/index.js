import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // 因为下面有动态路由参数会被匹配，所以将登录路由放在它前面
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },

  // 头部导航的路由匹配
  {
    path: '/message',
    component: () => import('../views/message.vue')
  },
  {
    path: '/getstart',
    component: () => import('../views/getstart.vue')
  },
 // topic发布话题页面
  {
    path: '/topic/create',
    component: () => import('../views/CreateTopic.vue')
  },
   // 文章详情页
  {
    path: '/topic/:topicid',
    name:'Topic',
    component: () => import('../views/Topic.vue')
  },
 
  // 用户详情页,比如在回复别人评论时，想查看别人信息，就会跳转到这个页面
  {
    path: '/user/:loginname',
    name:'User',
    component: () => import('../views/User.vue')
  },


  // 主页
  {
    // localhost8080设置成home页面
    path: '/',
    // name: 'Home',
    component: Home,
  },
  // 因为这里是一个动态路由参数，都能匹配到home组件，所以将它放在后面
  {
    path: '/:tab',
    component: Home,


  },

]

const router = new VueRouter({
  mode: 'hash',
  // 设置跳转基地址
  base: process.env.BASE_URL,
  routes
})

export default router
