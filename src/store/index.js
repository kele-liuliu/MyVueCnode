import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: null,

    // 消息数据
    message: null
  },
  mutations: {
    getuserinfo: (state, userInfoRes) => {
      state.userinfo = userInfoRes
    },
    clearUserInfo: (state) => {
      state.userinfo = null
       state.message = ""
    },


    getMessage: (state, message) => {
      state.message = message
    },
    clearMessage:(state)=>{
       state.message = null
    }
    
  },
  actions: {
    // 发送后台请求取数据
    // 请求消息通知
   getMessage:  async({ commit }) => {
      const res = await axios.get('/messages/mdrender=ture')
      console.log(res)
      commit("getMessage", res)
    }
  },
  modules: {
  }
})
