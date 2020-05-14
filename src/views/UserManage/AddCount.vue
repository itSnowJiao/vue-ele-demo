<template>
  <div class="add-count">
    <el-dialog
      width="30%"
      :close-on-click-modal="false"
      :show-close="false"
      title="新增账户"
      :visible.sync="dialogVisible"
    >
      <el-form :rules="rules" ref="form" :model="account" class="form-box" label-width="100px">
        <el-form-item label="请选择角色" prop="role">
          <el-select @change="selectChange" v-model="account.role" placeholder="请选择角色">
            <el-option
              v-for="option in options"
              :label="option.role"
              :value="option.role"
              :key="option.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入账号" prop="username">
          <el-input v-model="account.username" placeholder="请输入账号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('closeDialog')">取消</el-button>
        <el-button :loading="loading" @click="submit('form')" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisible", "options"],
  data() {
    return {
      account: {
        key: "",
        role: "",
        username: "",
        des: ""
      },
      rules: {
        role: { required: true, message: "请选择角色", trigger: "change" },
        username: { required: true, message: "请输入账号", trigger: "blur" }
      },
      loading: false
    };
  },
  methods: {
    // 选择角色时候，将角色的role和des赋值给所选的角色
    selectChange(select) {
      // console.log(select);
      this.options.map(option => {
        if (option.role == select) {
          this.account.key = option.key;
          this.account.des = option.des;
        }
      });
      // console.log(this.account);
    },
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$axios
            .post("/api/users/addUser", this.account)
            .then(res => {
              // console.log(res.data);
              this.loading = false;
              //   成功后，执行关闭dialog的操作
              this.$emit("closeDialog");
              // 成功后，执行刷新页面数据的操作
              this.$emit("updateData");
              // 弹窗提示
              this.$message({
                message: res.data.msg,
                type: "success"
              });
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>