<template>
  <div>
    <Panel>
      <template #header>
        <div><span>主页</span>/ <span>发布话题</span></div>
      </template>
      <template #contentwarp>
        选择发布的专区：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
          </el-option>
        </el-select>
        <el-input placeholder="填写标题" v-model.lazy="title"></el-input>
        <Editor
          v-model.lazy="editcontent"
          api-key="9mieih2cqsubf30b1omff3w107ojvjfvzhmb7haq4giiy754"
          :init="{
            height: 500,
            menubar: true,
            elementpath: false,
            branding: false,
            formats: {
              p: { block: 'p', classes: 'class1' }
            },
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ]
          }"
        />
        <button @click="getEditContent">获取文本输入的内容</button>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
import Editor from "@tinymce/tinymce-vue";
export default {
  components: { Panel, Editor },
  data() {
    return {
      title: "",
      editcontent: "",

      options: [
        {
          value: "选项1",
          label: "top",
          disabled: true
        },
        {
          value: "选项2",
          label: "share ",
          disabled: true
        },
        {
          value: "选项3",
          label: "ask",
          disabled: true
        },
        {
          value: "选项4",
          label: "dev"
        }
      ],
      value: ""
    };
  },
  methods: {
    async getEditContent() {
      console.log(typeof this.editcontent);
      console.log(typeof this.title);
      const token = sessionStorage.getItem("token");
      let { editcontent } = this;
      editcontent = editcontent.replace(/<[^>]+>/g, "");
      const { title } = this;
      console.log(token);
      // 先判断是否选择了专区
      if (this.value !== "") {
        //再判断输入的字符长度,
        if (title !== "" && title.length > 7) {
          // 这个函数用来提供数据给后台
          const res1 = await this.$axios.post("/topics/", {
            accesstoken: token,
            title: title,
            tab: "dev",
            content: editcontent
          });
          console.log(res1.data);

          this.$message({
            showClose: true,
            message: "成功发布话题",
            type: "success"
          });
        } else {
          // 字数太少不能发布成功
          this.$message({
            showClose: true,
            message: "输入7字以上的标题",
            type: "warning"
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: "请先选择话题专区",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style></style>
