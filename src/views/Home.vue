<template>
  <div class="home">
    <el-button type="primary" @click="openDialog">添加</el-button>
    <el-input v-model="input" placeholder="请输入内容" style="width:300px"></el-input>
    <el-button type="primary" @click="onSearch">搜索</el-button>
    <ModelForm :id="id" :flag="dialogVisible" :handleOK="handleOK" :handleClose="handleClose" />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编码" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ModelForm from "@/components/ModelForm";
import "./style.less";
export default {
  created() {
    //钩子可以用来在一个实例被创建之后执行代码
    this.$store.dispatch("FETCH_TABLE_DATA");
  },
  data() {
    //定义数据
    return {
      input: "", //  搜索框的值
      dialogVisible: false,
      id: ""
    };
  },

  computed: {
    // 计算属性
    ...mapState(["tableData"])
  },
  methods: {
    //方法
    openDialog() {
      this.id = "";
      this.dialogVisible = true;
    },
    onSearch() {
      console.log(this.$data.input);
      this.$store.dispatch("FETCH_ACTION_SEARCH", this.$data.input);
    },
    handleOK() {
      this.id = "";
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleDelete(row) {
      this.$store.dispatch("FETCH_TABLE_DELETE", row.id);
    },
    handleEdit(row) {
      console.log(row);
      this.id = row.id;
      this.dialogVisible = true;
    }
  },
  components: {
    //引入组件
    ModelForm
  }
};
</script>
