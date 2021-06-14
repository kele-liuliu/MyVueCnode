<template>
  <div>
    <h1>根据不同的路由去展示不同的数据</h1>
    <h3>我是{{ $route.params.tab || "good" }}下的List列表</h3>
    <div>
      <div v-for="ele in postlist" :key="ele.id" class="content">
        <a href="#" class="infoimg changeblock">
          <!-- 设置title是为了滑过出现小提示框 -->
          <img
            :title="ele.author.loginname"
            :src="ele.author.avatar_url"
            alt=""
          />
        </a>

        <span class="changeblock"
          >{{ ele.reply_count }}/{{ ele.visit_count }}</span
        >
        <span class="tabbtn changeblock">
          {{ ele.tab }}
        </span>
        <a href="#" v-html="ele.title" class="changeblock"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: ["tab"],
  data() {
    return {
      postlist: [
        // {
        //   id: "603b70b14655eacd6a218de1",
        //   author_id: "603b703b4655ea7626218dd9",
        //   tab: "job",
        //   content:
        //     "<div class='markdown-text'>蚂蚁集团体验…格式要求的邮件会得到团队的优先处理哦。</div>",
        //   title: "蚂蚁体验技术部 2022 届春招火热进行中",
        //   reply_count: 6,
        //   visit_count: 5885,
        //   author: {
        //     loginname: "charleylla",
        //     avatar_url:
        //       "https://avatars.githubusercontent.com/u/16316329?v=4&s=120"
        //   }
        // }
      ]
    };
  }

  // 监听动态路由参数的变化。来获取对应的数据内容
};
</script>

<style lang="less">
.content {
  line-height: 50px;
  width: 100%;
  padding: 10px;
  display: flex;
  .changeblock {
    display: block;
    margin: 0 20px;
  }
  .infoimg {
    width: 50px;
    height: 50px;
  }
  img {
    width: 100%;
  }
  .tabbtn {
    padding: 2px 4px;
    background-color: #80bd01;
    color: white;
    text-align: center;
  }
}
</style>
