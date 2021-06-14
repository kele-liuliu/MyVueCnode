import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/axios.js'
import './assets/global.less'
import './plugins/element.js'
import './filter/index.js'
 


Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
