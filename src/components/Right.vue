<template>
  <div>
    <!-- 头部信息组件 -->
    <Panel :width="'100%'">
      <template #header>
        <span v-if="userinfo">个人信息</span>
        <span v-else>网站信息</span>
      </template>
      <template #contentwarp>
        <!-- 使用useinfo组件 -->
        <UserInfo v-if="userinfo" :userinfo="userinfo" />
        <div v-else>
          <h3>CNode Node.js专业中文社区</h3>
          <span>你可以选择登录：</span>
          <el-button type="primary" @click="tologin">登录按钮</el-button>
        </div>
      </template>
    </Panel>
    <!-- 发布话题 -->
    <div class="postmessage">
      <span class="postbtn" @click="postmessage">发布话题</span>
    </div>

    <!-- 积分组件 -->
    <Panel>
      <template #header>
        <span>积分排行</span>
      </template>
      <template #contentwarp>
        <p><span>aaa</span> <span>55555</span></p>
        <p><span>aaa</span> <span>55555</span></p>
        <p><span>aaa</span> <span>55555</span></p>
        <p><span>aaa</span> <span>55555</span></p>
      </template>
    </Panel>

    <!-- 友情社区组件 -->
    <Panel>
      <template #header>
        <span>友情社区</span>
      </template>
      <template #contentwarp>
        <div class="friendimg">
          <img
            src="https://static2.cnodejs.org/public/images/ruby-china-20150529.png"
            alt=""
          />
        </div>
        <div class="friendimg">
          <img
            src="https://static2.cnodejs.org/public/images/golangtc-logo.png"
            alt=""
          />
        </div>
        <div class="friendimg">
          <img
            src="https://static2.cnodejs.org/public/images/phphub-logo.png"
            alt=""
          />
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel";
import UserInfo from "./UserInfo";
export default {
  components: {
    Panel,
    UserInfo
  },
  props: ["userinfo"],
  methods: {
    tologin() {
      // 先判断是不是已经登录（浏览器中缓存数据），如果是登录就不显示登录按钮，显示对应的个人信息，如果没有登录就显示登录按钮，跳转到登录
      this.$router.push("/login");
    },

    // 跳转到发布页
    postmessage() {
      this.$router.push("/topic/create");
    }
  }
};
</script>

<style lang="less">
.friendimg img {
  width: 150px;
}
.postmessage {
  padding: 10px;
  margin-bottom: 30px;
  background: white;
  line-height: 32px;
  .postbtn {
    padding: 5px 10px;
    background: yellowgreen;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
