<template>
  <div>
    <Panel>
      <template #header>
        <router-link to="/">主页</router-link>
        <div class="line-heigt40">
          <el-avatar shape="square" :src="users.avatar_url"></el-avatar>
          <span>{{ users.githubUsername }}</span>
        </div>
        <p>注册时间{{ users.create_at | fromNowTime }}</p>
      </template>
    </Panel>
    <Panel>
      <template #header>
        <div v-if="users.recent_topics">
          <h3>最近创建的话题</h3>
          <TitleWrapper :post="users.recent_topics" />
        </div>
        <div v-else>
          <h2>最近没有创建话题</h2>
        </div>
      </template>
    </Panel>
    <Panel>
      <template #header>
        <div v-if="users.recent_replies.length">
          <h3>最近参与的话题</h3>
          <TitleWrapper :post="users.recent_replies" />
        </div>
        <div v-else>
          <h2>最近没有参与话题</h2>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import TitleWrapper from "../components/TitleWrapper.vue";
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel, TitleWrapper },
  data() {
    return {
      users: {}
    };
  },
  watch: {
    // 当我们点击该页面下的参与的话题下的用户头像时，还需要获取对应用户的信息，所以监听用户名的变化，重新发请求取数据
    "$route.params.loginname": {
      handler(newvlaue) {
        // 如果有新变化就重新发请求
        if (newvlaue) {
          this.infobyLoginname();
        }
      },
      immediate: true
    }
  },
  created() {
    this.infobyLoginname();
  },
  methods: {
    // 将整个请求放在了一个方法中
    async infobyLoginname() {
      // 根据跳转的用户名来发请求,动态路由的参数是loginname
      const loginname = this.$route.params.loginname;
      const res = await this.$axios.get(`/user/${loginname}`);
      console.log(res.data);
      this.users = res.data;

      // 获取对应的用户信息将用户信息传递给mutation函数
      const useres = res.data;
      this.$store.commit("getuserinfo", useres);
    }
  }
};
</script>

<style lang="less">
.header {
  .line-heigt40 {
    margin-top: 30px;
    display: flex;
    height: 40px;
    line-height: 40px;
    span {
      margin-right: 20px;
    }
  }
}
</style>
