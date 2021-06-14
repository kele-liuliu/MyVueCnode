<template>
  <div>
    <div class="infocontent">
      <router-link
        class="lineheight40"
        :to="{
          name: 'User',
          params: { loginname: userinfo.loginname }
        }"
        ><el-avatar
          shape="square"
          :size="60"
          :src="userinfo.avatar_url"
        ></el-avatar
      ></router-link>
      <p>用户名：{{ userinfo.loginname }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userinfo"]
};
</script>

<style lang="less">
.infocontent {
  display: flex;
  p {
    margin: 0 0 0 20px;
    line-height: 60px;
  }
}
</style>
