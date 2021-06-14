<template>
  <div class="login">
    <div class="login-content">
      <div class="form">
        <span>用户名</span>
        <el-input
          placeholder="随便输入点啥"
          type="text"
          v-model.trim="token1"
        ></el-input>
      </div>
      <div class="form">
        <span>登录密码</span>
        <el-input v-model.trim="token" type="text"></el-input>
      </div>
      <el-button class="loginbtn" type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token1: "",
      token: "ecf878d1-6052-476a-8262-824760c7872b"
      // token: "f6138a13-f201-4453-afcd-04a6d7d8255b",
      // token: "4dd5f353-accd-4044-b89a-38c1b8b633e6"
    };
  },

  methods: {
    // 点击login，将数据提交给后台接口地址/accesstoken
    async login() {
      this.$axios
        .post("/accesstoken", { accesstoken: this.token })
        .then(res => {
          // 将数据提交成功的话就跳转页面
          console.log(res);
          this.$message({
            showClose: true,
            message: "密码正确即将跳转页面",
            type: "success",
            duration: 1500
          });

          this.$router.push("/");
          // 将数据放在vuex中，所以取到整个登录信息
          const userInfoRes = res;
          //  将这个数据传递给mutation去修改state数据
          this.$store.commit("getuserinfo", userInfoRes);
          // 是将这个登录信息存储起来

          const { token } = this;
          // 将这个token也存储到浏览器中
          sessionStorage.setItem("token", token);
          // 因为sessionStorage.set不能存储对象，所以需要将对象先装换成字符串
          if (typeof userInfoRes === "object") {
            const useres = JSON.stringify(userInfoRes);
            console.log(useres);
            sessionStorage.setItem("userinfo", useres);
          }
        })
        .catch(res => {
          //这里可以使用弹窗，提示密码错误
          console.log(res);
          this.$message({
            showClose: true,
            message: "亲，密码输错了！！！！！",
            type: "error"
          });
        });

      const res = await this.$axios.get(
        `/message/count?accesstoken=${this.token}`
      );
      this.$store.commit("getMessage", res.data);
    }
  }
};
</script>

<style lang="less">
.login {
  padding-top: 100px;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../assets/1.webp");
  .login-content {
    width: 300px;
    padding: 20px;
    background: rgb(192, 236, 241);
    margin: 0 auto;
    border-radius: 5px;
    .loginbtn {
      width: 100%;
    }
  }
  .form {
    display: flex;
    margin: 20px 0;
    span {
      width: 30%;
      line-height: 40px;
    }
  }
}
</style>
