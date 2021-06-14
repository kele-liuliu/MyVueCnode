<template>
  <div>
    <Panel>
      <template #header>
        <div><router-link to="/">主页</router-link>/<span>新消息</span></div>
        <span class="toread" v-if="message" @click="changeRead"
          >全部标记为已读</span
        >
      </template>
      <template #contentwarp>
        <div v-for="ele in NotReadMessage" :key="ele.id" class="cell-message">
          <router-link
            :to="{
              name: 'User',
              params: { loginname: ele.author.loginname }
            }"
          >
            {{ ele.author.loginname }}</router-link
          >
          回复了你的话题
          <router-link
            :to="{ name: 'Topic', params: { topicid: ele.topic.id } }"
            >{{ ele.topic.title }}</router-link
          >
        </div>
      </template>
    </Panel>
    <Panel>
      <template #header>
        <span>过往信息</span>
      </template>
      <template #contentwarp>
        <div v-for="ele in HasReadMessages" :key="ele.id" class="cell-message">
          <router-link
            :to="{
              name: 'User',
              params: { loginname: ele.author.loginname }
            }"
          >
            {{ ele.author.loginname }}</router-link
          >
          回复了你的话题
          <router-link
            :to="{ name: 'Topic', params: { topicid: ele.topic.id } }"
            >{{ ele.topic.title }}</router-link
          >
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
  data() {
    return {
      HasReadMessages: null,
      NotReadMessage: null
    };
  },
  computed: {
    islogin() {
      return sessionStorage.getItem("token");
    },
    message() {
      return this.$store.state.message;
    }
  },

  async created() {
    const token = this.islogin;
    // 获取未读消息个数，更新store数据
    if (token) {
      // 获取未读消息
      const res = await this.$axios.get(`/messages?accesstoken=${token}`);
      console.log(res.data);
      this.HasReadMessages = res.data.has_read_messages;
      this.NotReadMessage = res.data.hasnot_read_messages;
      console.log(this.NotReadMessage);
    }
  },
  methods: {
    async changeRead() {
      // 将信息标记为已读
      const token = this.islogin;
      const res = await this.$axios.post("/message/mark_all", {
        accesstoken: token
      });
      this.NotReadMessage = "";
      this.$store.commit("clearMessage");
      console.log(res.data);
    }
  }
};
</script>

<style>
.cell-message {
  padding: 10px;
}
.header {
  line-height: 30px;
  display: flex;
  justify-content: space-between;
}
.toread {
  /* flex-grow: 1; */
  /* align-self: flex-start; */
  cursor: pointer;
  text-align: center;
  display: inline-block;
  width: 13%;
  text-align: center;
  border-radius: 10px;
  color: white;
  background: lightsalmon;
}
</style>
