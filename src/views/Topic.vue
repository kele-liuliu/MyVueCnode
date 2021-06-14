<template>
  <div>
    <!-- 内容展示部分 -->
    <Panel>
      <template #header>
        <h2>{{ topic.title }}</h2>
        <!-- 需要登录才会出现收藏 -->
        <div class="headerinfo">
          <div>
            ·<span>发布时间：{{ topic.create_at | fromNowTime }}</span>
            <!-- ·<span>作者{{ topic.author.loginname }}</span>  -->
            ·<span>{{ topic.visit_count }}次浏览</span> ·<span
              >来自{{ topic | getPostChineseTab }}</span
            >
          </div>
          <span class="collecbtn" v-if="isLogin" @click="changecollect">
            {{ topic.is_collect ? "取消收藏" : "收藏" }}</span
          >
        </div>
        <span class="editbtn" v-if="userinfo ? true : false">点击编辑</span>
      </template>
      <template #contentwarp>
        <div v-html="topic.content"></div>
      </template>
    </Panel>
    <!-- 评论部分 -->
    <Panel>
      <template #header>
        <p>回复</p>
      </template>
      <template #contentwarp>
        <div>
          <div v-for="(item, index) in topic.replies" :key="item.id">
            <div class="commentwarp">
              <router-link
                class="lineheight40"
                :to="{
                  name: 'User',
                  params: { loginname: item.author.loginname }
                }"
                ><el-avatar :src="item.author.avatar_url"></el-avatar>
              </router-link>

              <span>{{ item.author.loginname }}</span>
              <a href="#"
                >{{ index + 1 }}楼·{{ item.create_at | fromNowTime }}</a
              >
              <!-- 判断是否登录，登录了才能点赞和回复，所以下面弄一个计算属性来判断  登录后，点赞数显示点赞按钮不显示点赞个数0-->
              <div class="flex-gorw">
                <!--将这个评论item.id传给方法使用-->
                <button
                  @click="goToUps(item.id)"
                  :class="{ 'up-active': item.is_uped }"
                >
                  点赞{{ item.ups.length ? item.ups.length : "" }}
                </button>
                <!-- 传递一整个评论数组 -->
                <button v-if="isLogin" @click="respenseother(item)">
                  回复
                </button>
              </div>
            </div>
            <!-- 当前评论id和点击评论id一致就显示对应评论id的输入框 -->
            <div v-if="item.id === reply_id" class="text">
              <textarea ref="textarea" v-model="reply_text"></textarea>
              <!-- 传递一个评论id，告诉后台哪一个评论有新的回复了 -->
              <button @click="submitrespense(item)">提交回复</button>
            </div>
            <p class="textindent70" v-html="item.content"></p>
          </div>
        </div>
        <hr />
        <!-- 最下面大回复，回复文章的 -->
        <div>
          <textarea v-model.trim="text"></textarea>
          <button @click="submit">回复</button>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },

  name: "Topic",
  data() {
    return {
      topic: [],
      //回复整个文章的评论
      text: "",
      //要回复那条评论的id
      reply_id: "",
      // 要回复那个人的内容
      reply_text: ""
    };
  },
  computed: {
    isLogin() {
      // 这个token已经存储到浏览器中，所以直接去取数据
      const token = sessionStorage.getItem("token");
      return token;
    },
    userinfo() {
      const userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
      return userinfo;
    }
    // authorloginname() {
    //   return this.topic.author.loginname;
    // }

    // 从store中取到对应用户的信息和登录的用户信息进行匹配，如果一致就显示编辑按钮
  },
  async created() {
    //在这里获取数据

    // 传递过来的动态路由跳转的参数，拿到对应的文章id
    const { topicid } = this.$route.params;

    // 取token计算属性
    const token = this.isLogin;
    // 先判断是否登录，登录了需要传递对应的token，没有登录直接通过传递过来的id取数据
    const url = token
      ? `/topic/${topicid}?accesstoken=${token}`
      : `/topic/${topicid}`;
    const res = await this.$axios.get(url);
    console.log(res.data);
    this.topic = res.data;
    // 获取到对应文章的作者信息，将信息提交给mutation函数，进行修改个人信息组件

    const author = res.data.author;

    this.$store.commit("getuserinfo", author);
  },
  methods: {
    // 点赞和取消点赞事件
    // 根据所提供的接口，需要被该点赞评论的id传递给后台
    async goToUps(id) {
      //点赞之前需要先判断登录，同时不能给自己的评论点赞(判断登录的用户名和正在点赞的用户名)
      const token = this.isLogin;
      // const userid = JSON.parse(sessionStorage.getItem("userinfo")).loginname;

      // console.log(this.topic.author.loginname);
      // console.log(userid);
      if (token) {
        // 这里同时还需要判断是不是自己的评论

        // post请求传递参数需要使用{}传递
        const res = await this.$axios.post(`/reply/${id}/ups`, {
          accesstoken: this.isLogin
        });
        //从后台返回成功的数据   console.log(res);

        // 因为将数据提交给了后台，我们本地的数据也需要更新本地
        //点赞状态是up的就是已点赞,没有被点赞的是down，更新本地的数据其实就是去更新对应评论的is_uped(点赞状态)和点赞数组ups

        //找到对应评论的id,
        const currentRelies = this.topic.replies.find(item => item.id === id);
        // 根据返回的结果action是up，控制点赞的颜色

        currentRelies.is_uped = res.action === "up" ? true : false;
        // 同时更新点赞数(它的构成是给这个评论点了赞的用户id)，所以将这个点赞人的id添加到这个点赞数组中，否则就是取消点赞（删除对应的那个点赞人的id），
        const userid = this.userinfo.id;
        // 找到对应的索引位置
        const delid = currentRelies.ups.indexOf(userid);
        res.action === "up"
          ? currentRelies.ups.push(userid)
          : currentRelies.ups.splice(delid, 1);
      } else {
        this.$message({
          showClose: true,
          message: "没有登录跳转到登录页面",
          type: "error",
          duration: 1500
        });
        // 没有登录直接跳转到登录页面
        this.$router.push("/login");
      }
    },

    // 提交整个文章的回复，下面那个大回复
    async submit() {
      const { text } = this;
      const userinfo = this.userinfo;
      if (text) {
        // 添加文章评论，向这个接口/topic/:topic_id/replies提交对应文章id(还需要提交token)
        const token = this.isLogin;
        const res = await this.$axios.post(`/topic/${this.topic.id}/replies`, {
          accesstoken: token,
          content: text
        });
        console.log(res.data);
        // 提交文章评论后，本地需要更新数据，所以再新建一个评论内容
        const newreplay = {
          //这是数据提交给后台返回的一个评论id（ res.reply_id）
          id: res.reply_id,
          is_uped: false,
          ups: [],
          content: text,
          author: {
            avatar_url: userinfo.avatar_url,
            loginname: userinfo.loginname
          }
        };

        // 将这个评论内容添加到本地数组中
        this.topic.replies.push(newreplay);
        this.text = "";
      }
    },

    // 回复别人的评论

    respenseother(replayies) {
      // 这里接收整个评论数组，
      // 让对应的富文本框出现
      // 在这里直接使用下面那个文本框
      // 显示框内出现要@的那个人
      this.reply_text = `@${replayies.author.loginname} `;
      // replayies.id评论数组下面的每个评论id
      this.reply_id = replayies.id;

      // 同时点击回复按钮的时候让文本框自动获取到焦点(只能使用原生的focus方法，所以需要使用到dom节点，所以使用ref)
      // 因为点击这函数的时候修改了数据，数据变的时候dom节点重新再渲染，更新完data之后马上获取更新之后的dom是获取不到的，所以需要延迟时间获取dom
      this.$nextTick(function() {
        // console.log(this.$refs.textarea);
        // 拿到是refs结果数组
        this.$refs.textarea[0].focus();
      });
    },

    // 提交回复别人的评论
    async submitrespense(ele) {
      console.log(ele);
      const userinfo = this.userinfo;
      const token = this.isLogin;
      const res = await this.$axios.post(`/topic/${this.topic.id}/replies`, {
        accesstoken: token,
        content: this.reply_text,
        // 这里传递那条被评论的id（告诉后台哪条评论有新的回复）
        reply_id: ele.id
      });

      // 提交文章评论后，本地需要更新数据，所以再新建一个评论内容
      const newreplay = {
        //这是数据提交给后台返回的一个评论id（ res.reply_id）
        id: res.reply_id,
        is_uped: false,
        ups: [],

        // 说明一下正则，将普通的@xx替换成a标签的@xx，[w-]这个可以是数字字母任何符号，+后面还有一个空格是结束符。因为页面上的@xxx 后面有空格
        content: `<p>${this.reply_text.replace(
          /@[w-]+ /,
          `<a href='/user/'>@${ele.author.loginname}</a>`
        )}</p>`,
        author: {
          avatar_url: userinfo.avatar_url,
          loginname: userinfo.loginname
        }
      };
      // 将这个评论内容添加到本地数组中
      this.topic.replies.push(newreplay);
      this.reply_text = "";

      //输入框消失
      this.reply_id = "";
    },

    // 收藏事件
    async changecollect() {
      // is_collect,id这两个都是后台传递过来的属性名(是整篇话题文章的收藏属性和id属性)
      const { is_collect, id } = this.topic;
      const token = this.isLogin;
      if (is_collect) {
        // is_collect等于true，这里是取消收藏请求,将对应的文章id传递给后台
        await this.$axios.post("/topic_collect/de_collect", {
          topic_id: id,
          accesstoken: token
        });
        // 同时更新本地的收藏状态
        this.topic.is_collect = false;
      } else {
        // is_collect等于false，点击收藏将自己的id 传递 给后台
        await this.$axios.post("/topic_collect/collect", {
          topic_id: id,
          accesstoken: token
        });
        this.topic.is_collect = true;
      }
    }
    // 获取作者用户详情
  }
};
</script>

<style lang="less">
.header {
  .headerinfo {
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    span {
      padding: 0 2px;
    }
    .collecbtn {
      cursor: pointer;
      text-align: center;
      display: inline-block;
      width: 96px;
      text-align: center;
      // padding: 0 20px;
      border-radius: 10px;
      color: white;
      background: lightsalmon;
    }
  }
}
.contentwarp p img {
  width: 100%;
}
.commentwarp {
  line-height: 40px;
  height: 40px;
  display: flex;
  .lineheight40 {
    height: 40px;
  }
  span {
    margin: 0 10px;
  }
  .flex-gorw {
    flex-grow: 1;
    text-align: right;
  }
  .up-active {
    background: red;
  }
}
.text textarea {
  width: 100%;
}
.textindent70 {
  overflow: hidden;
  text-indent: 70px;
}
.editbtn {
  cursor: pointer;
  display: inline-block;
  padding: 5px 10px;
  text-align: center;
  border-radius: 10px;
  color: white;
  background: rgb(82, 78, 77);
}
</style>
