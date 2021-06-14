<template>
  <div>
    <div v-for="ele in post" :key="ele.id" class="postwarp">
      <!-- 使用element中的组件，点头像需要跳转到用户信息页，添加一个router-link 跳转页面-->
      <router-link
        class="lineheight40"
        :to="{
          name: 'User',
          params: { loginname: ele.author.loginname }
        }"
        ><el-avatar
          :title="ele.author.loginname"
          :src="ele.author.avatar_url"
        ></el-avatar
      ></router-link>

      <!-- 当tab内容是精华或者是置顶的时候，需要添加样式，这里需要去弄个过滤器判断，getPostChineseTab是过滤器的名字-->
      <!-- 这里加v-if的原因是除了all页面展示这个span按钮，其他页面不展示 ，定义了一个tab的计算属性，用来计算页面路由的地址-->

      <div class="post-title">
        <span
          v-if="!tab || ele.top || ele.good"
          :class="ele.top || ele.good ? 'tabcolor' : 'primarytab'"
          >{{ ele | getPostChineseTab }}</span
        >
        <!-- 根据动态路由参数传递一个文章id -->
        <!-- 添加一个动态路由参数跳转 -->
        <router-link
          :to="{ name: 'Topic', params: { topicid: ele.id } }"
          class="title-content"
          >{{ ele.title }}</router-link
        >
      </div>
      <span v-if="ele.visit_counts || ele.visit_count" class="conut-content">
        <span class="reply-font">{{ ele.reply_count }}</span
        ><span> /</span><span class="visitcount">{{ ele.visit_count }}</span>
      </span>

      <span class="last-time">{{ ele.last_reply_at | fromNowTime }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post", "tab"]
};
</script>

<style lang="less">
.postwarp {
  width: 100%;
  display: flex;
  padding: 10px;
  line-height: 40px;
  .lineheight40 {
    height: 40px;
  }
  .conut-content {
    width: 10%;
    text-align: center;
    margin: 0 3px;
    background: #ddd;
    border-radius: 10px;

    span.reply-font {
      font-size: 11px;
    }
    span.visitcount {
      font-size: 10px;
      color: #b4b4b4;
    }
  }
  .primarytab,
  .tabcolor {
    font-size: 12px;
    margin: 5px;
    align-items: center;
    line-height: 20px;
    padding: 5px 6px;
    border-radius: 5px;
    display: block;
    color: #999;
  }
  .tabcolor {
    background: tomato;
    color: white;
  }
  .post-title {
    display: flex;
    margin: 0 20px 0 15px;
    width: 65%;
    overflow: hidden;
    cursor: pointer;
    white-space: nowrap;
    .title-content {
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;
      color: #08c;
    }
  }
  .last-time {
    flex: 1;
    text-align: right;
  }
}
</style>
