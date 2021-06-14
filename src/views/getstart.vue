<template>
  <div>
    <Panel>
      <template #header>
        <div><router-link to="/">主页</router-link>/<span>新手上路</span></div>
      </template>
      <template #contentwarp>
        <div>
          <h2>Node.js 入门</h2>
          <p>《<strong>汇智网 Node.js 课程</strong>》</p>
          <p>
            <a href="http://www.hubwiz.com/course/?type=nodes"
              >http://www.hubwiz.com/course/?type=nodes</a
            >
          </p>
          <p>《<strong>快速搭建 Node.js 开发环境以及加速 npm</strong>》</p>
          <p>
            <a href="https://github.com/alsotang/node-lessons"
              >https://github.com/alsotang/node-lessons</a
            >
          </p>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel }
};
</script>

<style>
p a {
  color: #08c;
}
</style>
