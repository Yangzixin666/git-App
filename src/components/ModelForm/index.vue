<template>
  <div>
    <el-dialog
      :title="id ? '修改' : '添加'"
      :visible="flag"
      width="60%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <span>
        <el-form :model="form" label-width="100px">
          <el-form-item label="名字" prop="name">
            <el-input type="text" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="msg">
            <el-input type="text" v-model="form.msg"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["flag", "id", "handleOK", "handleClose"],
  data() {
    return {
      form: {
        name: "",
        msg: ""
      }
    };
  },
  methods: {}
};
</script>