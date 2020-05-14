<template>
  <div class="table">
    <div class="search-box">
      <el-input size="small" v-model="searchVal" placeholder="请输入搜索内容"></el-input>
      <el-button size="small" @click="handleSearch" type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%;" :height="tHeight" class="table-box">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column label="课程名称" prop="title"></el-table-column>
      <el-table-column width="120" label="课程等级" prop="level"></el-table-column>
      <el-table-column width="120" label="技术栈" prop="type"></el-table-column>
      <el-table-column width="120" label="报名人数" prop="count"></el-table-column>
      <el-table-column width="160" label="上线日期" prop="date"></el-table-column>
      <el-table-column v-if="user.key !== 'vistor'" width="160" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index,scope.row)" size="mini">编辑</el-button>
          <el-button @click="handleDelete(scope.$index,scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages" ref="page-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5,10,20]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 编辑表单的组件 -->
    <edit-data @closeDialog="closeDialog" :formData="formData" :dialog="dialog"></edit-data>
  </div>
</template>

<script>
// @ is an alias to /src
import EditData from "./EditData";
export default {
  name: "Table",
  data() {
    return {
      searchVal: "",
      tHeight: document.body.offsetHeight - 240, //表格高度，除去搜索框、翻页等的高度
      tableData: [], // 表格数据
      page: 1, // 当前页数
      size: 5, // 请求数据个数
      total: 0, // 总数据
      loading: false, // 是否加载按钮
      dialog: false, //是否展示编辑界面
      formData: {
        title: "",
        type: "",
        level: "",
        count: "",
        date: ""
      }
    };
  },
  components: {
    EditData
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loading = true;
      this.$axios
        .get(`/api/profiles/loadMore/${this.page}/${this.size}`)
        .then(res => {
          // console.log(res.data);
          this.loading = false;
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleSizeChange(val) {
      this.size = val;
      // console.log(this.size);
      this.page = 1;
      // 加载搜索数据，判断在搜索值是否存在，不存在执行loadData，存在执行loadSearchData
      this.searchVal ? this.loadSearchData() : this.loadData();
    },
    handleCurrentChange(val) {
      this.page = val;
      // console.log(this.page);
      // 加载搜索数据，判断在搜索值是否存在，不存在执行loadData，存在执行loadSearchData
      this.searchVal ? this.loadSearchData() : this.loadData();
    },
    handleSearch() {
      // 点击搜索时，先让page为1
      this.page = 1;
      // 加载搜索数据，判断在搜索值是否存在，不存在执行loadData，存在执行loadSearchData
      this.searchVal ? this.loadSearchData() : this.loadData();
    },
    loadSearchData() {
      this.loading = true;
      this.$axios
        .get(`/api/profiles/search/${this.searchVal}/${this.page}/${this.size}`)
        .then(res => {
          console.log(res.data);
          this.loading = false;
          this.tableData = res.data.datas.list;
          this.total = res.data.datas.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleEdit(index, row) {
      // console.log(index,row)
      this.formData = row;
      this.dialog = true;
    },
    // 对话框的取消事件
    closeDialog() {
      this.dialog = false;
    },
    // 删除表格内容
    handleDelete(index, row) {
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        // 更新表格
        this.tableData.splice(index, 1);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  margin-bottom: 10px;
  .el-input {
    margin-right: 10px;
  }
}
.pages {
  background-color: #fff;
  margin: 10px 0;
  padding: 10px;
  text-align: right;
}
</style>
