<template>
  <header>
    <div class="logo">
      <img src="../assets/logo.png" alt="" style="height:50px" />
    </div>
    <div class="menu">
      <router-link to="/">首页</router-link>
      <router-link to="/message"
        ><span v-if="token && message" class="noreadmessage">{{
          message
        }}</span>
        未读消息</router-link
      >
      <router-link to="/getstart">新手入门</router-link>
      <router-link to="/">关于</router-link>
      <router-link to="/">设置</router-link>
      <a @click="clearUserInfo">退出</a>
    </div>
  </header>
</template>

<script>
export default {
  name: "Headerdemo",
  props: ["token"],
  computed: {
    message() {
      return this.$store.state.message;
    }
  },
  methods: {
    clearUserInfo() {
      // 触发清空store数据函数
      this.$message({
        showClose: true,
        message: "成功退出登录"
      });
      this.$store.commit("clearUserInfo");
      // 同时将浏览器中的数据清除掉
      sessionStorage.removeItem("userinfo");
      sessionStorage.removeItem("token");
    }
  }
};
</script>

<style lang="less">
header {
  display: flex;
  width: 100%;
  padding: 0 60px;
  background: #444;
  .logo {
    display: block;
    width: 60px;
    height: 50px;
    .logo img {
      height: 50px;
    }
  }
  .menu {
    flex: 1;
    text-align: right;
    line-height: 50px;
  }
  .menu a {
    display: inline-block;
    margin: 0 20px;
    color: white;
    cursor: pointer;
  }
  .noreadmessage {
    padding: 5px 10px;

    border-radius: 60px;
    background: tomato;
  }
}
</style>
