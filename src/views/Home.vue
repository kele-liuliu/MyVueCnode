<template>
  <div>
    <div class="home">
      <Panel :width="'100%'">
        <template #header>
          <div class="nav" v-if="!$route.path.includes('/detai')">
            <router-link to="/">首页</router-link>
            <router-link to="/good">精华</router-link>
            <router-link to="/share">分享</router-link>
            <router-link to="/ask">问答</router-link>
            <router-link to="/job">招聘</router-link>
            <router-link to="/dev">客户端</router-link>
          </div>
        </template>
        <!-- 传递内容插槽 -->
        <template #contentwarp>
          <el-pagination
            layout="prev, pager, next"
            :total="400"
            :page-size="20"
            @current-change="getPostByPage"
            :current-page="currentpage"
          >
          </el-pagination>
          <!-- 通过分页器自带的current-change切换事件，将路由的跳转放在事件中去处理 -->
          <div v-if="post.length">
            <!-- 这里将整个title信息制作成一个组件 -->
            <TitleWrapper :post="post" :tab="tab" />
          </div>
        </template>
      </Panel>
    </div>
  </div>
</template>

<script>
import TitleWrapper from "../components/TitleWrapper.vue";
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel, TitleWrapper },
  name: "Home",
  data() {
    return {
      post: [],
      currentpage: 1
    };
  },

  created() {
    this.$axios.get("/topics?tab=all&limit=20").then(res => {
      this.post = res.data;
      console.log(res.data);
    });

    // 页面还没被渲染就获取到了当前页
    // 获取sessionStorage中保留的当前页,将当前页赋值给currentpage,因为拿到的是字符串，所以需要将其转换成数字
    // console.log(typeof this.currentpage);
    this.currentpage = Number(sessionStorage.getItem("currentpage"));

    // 当从文章详情页面跳出时，还需要获取登录的信息
    const useres = JSON.parse(sessionStorage.getItem("userinfo"));
    this.$store.commit("getuserinfo", useres);
  },
  // 当切换不同的导航时（切换路由），要去获取不同的数据，但是在这个组件的created中请求不到切换路由时获取的诗句，也就不会引起视图的变化，所以需要监听数据的变化，数据变，视图变，
  watch: {
    // 监听的就是动态路由参数这里监听变化的就是tab =good还是tab = ask
    tab: {
      async handler(newvalue) {
        // console.log(newvalue);
        //因为没有进行路由切换时，默认展示的是tab=all 的内容,所以这里进行一个或运算。当newvalue不存在直接等于all。
        const tab = newvalue || "all";
        // 直接根据不同的路由去取数据
        const res = await this.$axios.get(`/topics?tab=${tab}&limit=20`);
        this.post = res.data;
      }
    }
  },
  computed: {
    tab() {
      return this.$route.params.tab;
    }
  },
  methods: {
    async getPostByPage(page) {
      // 分页器自带事件current-change回调一个page参数

      // 因为这需要拿到当前的路径，所以通过拿动态路由参数，但是在首页的时候没有参数，所以直接定义成空
      const path = this.$route.params.tab || "";
      // let { currentpage } = this;
      this.currentpage = page;
      //  通过换页取到不同的数据， 根据不同路由下获取不同页的数据
      const res = await this.$axios.get(
        `/topics?tab=${path}&page=${this.currentpage}&limit=20`
      );

      // console.log(this.$route);
      this.post = res.data;
      // console.log(res.data);
      // thia.currentpage = page

      // 将当前的page保留在session中
      sessionStorage.setItem("currentpage", page);
    }
  }
};
</script>

<style lang="less">
.home {
  width: 100%;
  margin: 0 auto;
  display: flex;
}
.nav {
  a {
    color: #000;
    text-align: center;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
  }
  .router-link-exact-active {
    color: white;
    background: tomato;
  }
}
</style>
