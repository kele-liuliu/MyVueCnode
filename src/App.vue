<template>
  <div id="app">
    <Headerdemo :token="token" />
    <div class="main">
      <!-- 展示导航的信息 -->
      <!-- 因为login页面的路由展示使用router-view，所以宽度需要根据页面跳转进行判断 -->
      <div
        class="main-left"
        :style="$route.path === '/login' ? { width: '100%' } : { width: '72%' }"
      >
        <router-view class="homecontent" />
      </div>

      <!-- 右边个人信息的部分 ,当跳转到登录页面就不展示右边这个组件-->
      <div class="main-right" v-if="!$route.path.includes('login')">
        <!-- 将整个右边的信息放在一个组件中 -->
        <Right :userinfo="userinfo" />
      </div>
    </div>
    <Bottom />
  </div>
</template>

<script>
import Bottom from "./components/Bottom.vue";
// ecf878d1-6052-476a-8262-824760c7872b
import Headerdemo from "./components/Headerdemo.vue";
import Right from "./components/Right.vue";
export default {
  name: "app",
  components: { Headerdemo, Right, Bottom },

  async created() {
    console.log("daoAPP");
    const token = this.token;
    if (token) {
      const res = await this.$axios.get(`/message/count?accesstoken=${token}`);
      this.$nextTick(function() {
        this.$store.commit("getMessage", res.data);
      });
    }

    // 在渲染之前取到从浏览器的数据，因为保存的时候是字符串，所以这样将结果在转换成js对象，将结果提交给mutation函数
    const useres = JSON.parse(sessionStorage.getItem("userinfo"));
    // console.log(useres);
    this.$store.commit("getuserinfo", useres);
  },
  computed: {
    userinfo() {
      // 获取用户信息
      return this.$store.state.userinfo;
    },
    token() {
      return sessionStorage.getItem("token");
    }
  }
};
</script>

<style lang="less">
.main {
  background: #dfdcdc;
  padding: 10px 60px;
  display: flex;
  .main-left {
    width: 72%;
  }
  .main-right {
    width: 25%;
    margin-left: 3%;
  }
  .homecontent {
    flex-grow: 1;
  }
  .contentwarp {
    h3 {
      margin: 0 0 10px 0;
    }
  }
}
</style>
