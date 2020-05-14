<template>
  <div class="password">
    <login-header>
      <!-- 表单 -->
      <el-form
        slot="container"
        :model="form"
        :rules="rules"
        ref="form"
        label-position="left"
        label-width="0px"
      >
        <div class="title">
          <h3>找回密码</h3>
        </div>
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            type="text"
            v-model="form.username"
            auto-complete="off"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input type="text" v-model="form.email" placeholder="邮箱">
            <i class="fa fa-envelope-o" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <!-- 确定 -->
        <el-form-item>
          <el-button
            @click.native.prevent="handleSubmit('form')"
            type="primary"
            :loading="loading"
            style="width:100%;"
          >确定</el-button>
        </el-form-item>
      </el-form>
    </login-header>
  </div>
</template>

<script>
import LoginHeader from "./LoginHeader";
export default {
  name: "Password",
  data() {
    return {
      loading: false, //是否发起网络请求
      form: {
        username: "",
        email: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ]
      }
    };
  },
  components: {
    LoginHeader
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.loading = true;
          // 发起网络请求
          this.$axios
            .post("/api/users/findPwd", this.form)
            .then(res => {
              this.loading = false;
              console.log(res.data);
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.$router.push("/login");
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
.title {
  margin-bottom: 20px;
  h3 {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
}
</style>