<template>
  <!-- 接收传递过来的宽度 ,这里width要用props接收-->
  <div class="panel" :style="{ width: formatwidth }">
    <div class="header">
      <!-- 当这个组件在不同的地方使用时，需要传递slot，这个panel组件接收slot -->
      <slot name="header" />
    </div>
    <div class="contentwarp">
      <slot name="contentwarp" />
    </div>
  </div>
</template>

<script>
// 这是一个布局组件
export default {
  props: {
    width: {
      type: [String, Number],
      default: "100%"
    }
  },
  computed: {
    formatwidth() {
      const { width } = this;
      // 用户传递过来的三种情况   1.'100',2.100  3.100%或者100px
      // 判断传过来的宽度是不是纯数字,是纯数字就加上px，不是纯数字就是直接转换，但是如果传递了一个字符串数字(如1.)，就转换不了想要的结果，所以可以再判断一下，这种字符串数字是不是可以转换成数字 ——使用这个方法Number(width)

      return typeof width === "number" || Number(width) ? width + "px" : width;
    }
  }
};
</script>

<style lang="less">
.panel {
  margin: 0 auto 30px auto;
  border-radius: 4px;
  background-color: #f6f6f6;
  .header {
    padding: 10px;
  }
  .contentwarp {
    padding: 10px;
  }
}
</style>
