<template>
  <div class="account-data">
    <div class="add-box">
      <el-button @click="addAcount" type="primary">新增账户</el-button>
    </div>
    <el-table :data="userData" border style="width: 100%; height: 500px;overflow: auto;">
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <el-select @change="selectChange(scope.row)" v-model="scope.row.role" v-if="scope.row.edit">
            <el-option
              v-for="option in options"
              :key="option.key"
              :label="option.role"
              :value="option.role"
            ></el-option>
          </el-select>
          <span v-else>{{scope.row.role}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="180">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.username"></el-input>
          <span v-else>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="des" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" v-if="scope.row.username !== 'admin'">
          <el-button
            @click="handleEdit(scope.$index,scope.row)"
            v-if="!scope.row.edit"
            size="mini"
          >编辑</el-button>
          <el-button
            @click="handleSave(scope.$index,scope.row)"
            v-else
            size="mini"
            type="success"
          >完成</el-button>
          <el-button @click="handleDel(scope.$index,scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-count
      @updateData="getData"
      @closeDialog="closeDialog"
      :dialogVisible="dialogVisible"
      :options="options"
    ></add-count>
  </div>
</template>

<script>
// @ is an alias to /src
import addCount from "./AddCount";
export default {
  name: "AccountData",
  data() {
    return {
      userData: [],
      dialogVisible: false,
      options: [
        {
          key: "admin",
          role: "管理员",
          des: "Super Administrator. Have access to view all pages."
        },
        {
          key: "editor",
          role: "客服",
          des: "Normal Editor. Can see all pages except permission page"
        },
        {
          key: "vistor",
          role: "游客",
          des:
            "Just a visitor. Can only see the home page and the document page"
        }
      ]
    };
  },
  components: {
    addCount
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get(`/api/users/allUsers`).then(res => {
        // 设置编辑状态，给数组新增一个元素
        res.data.datas.forEach(item => {
          item.edit = false;
        });
        // 赋值
        this.userData = res.data.datas;
      });
    },
    addAcount() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    // 编辑
    handleEdit(index, row) {
      row.edit = true;
    },
    // 下拉选框的触发事件
    selectChange(item) {
      this.options.forEach((option) => {
        // 比对option中的选项是否和选择的选项相同，如果相同，那么同步修改item中的key和des值
        if(option.role == item.role) {
          item.key = option.key;
          item.des = option.des;
        }
      })
    },
    // 保存
    handleSave(index, row) {
      row.edit = false;
      // 提交数据
      this.$axios.post(`/api/users/editUser/${row._id}`,row)
      .then(res => {
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
      })
    },
    // 删除
    handleDel(index,row) {
      this.$axios.delete(`/api/users/deleteUser/${row._id}`)
      .then(res => {
        this.$message({
          message: res.data.msg,
          type: 'success'
        });
        this.userData.splice(index,1)
      })
    }
  }
};
</script>

<style scoped lang='scss'>
.add-box {
  margin-bottom: 10px;
}
.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px !important;
}
</style>
