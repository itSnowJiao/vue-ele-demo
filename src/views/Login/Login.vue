<template>
  <div class="login">
    <login-header>
      <!-- 表单 -->
      <el-form
        :rules="rules"
        :model="form"
        ref="form"
        label-position="left"
        label-width="0px"
        slot="container"
      >
        <div class="title">
          <h3>账号密码登录</h3>
        </div>
        <!-- username -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            type="text"
            v-model="form.username"
            auto-complete="off"
            placeholder="账号"
          >
            <!-- <i slot="prefix" class="fa fa-user-o"></i> -->
          </el-input>
        </el-form-item>
        <!-- pwd -->
        <el-form-item prop="pwd">
          <el-input type="password" v-model="form.pwd" auto-complete="off" placeholder="密码">
            <i slot="prefix" class="fa fa-lock"></i>
          </el-input>
        </el-form-item>
        <!-- 登录 -->
        <el-form-item>
          <el-button
            :loading="isLogin"
            @click.native.prevent="handleSubmit('form')"
            type="primary"
            style="width: 100%;"
          >登录</el-button>
        </el-form-item>
        <!-- 七天登录 -->
        <el-form-item>
          <el-checkbox v-model="form.autoLogin" :checked="form.autoLogin">7天内自动登录</el-checkbox>
          <el-button @click="$router.push('/password')" type="text" class="forget">忘记密码？</el-button>
        </el-form-item>
      </el-form>
    </login-header>
  </div>
</template>

<script>
import LoginHeader from "./LoginHeader";
export default {
  name: "Login",
  data() {
    return {
      isLogin: false,
      form: {
        username: "",
        pwd: "",
        autoLogin: true // 是否自动登录
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
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
          // console.log("校验通过");
          // 在数据校验时，让其按钮处于加载状态
          this.isLogin = true;
          this.$axios
            .post("/api/users/login", this.form)
            .then(res => {
              // 请求成功后，取消加载状态
              this.isLogin = false;
              // console.log(res.data)
              // 存储token
              localStorage.setItem("userToken", res.data.token);
              // 存储token到vuex中
              this.$store.dispatch('setUser',res.data.token);
              // 登录成功，跳转到首页
              this.$router.push('/');
            })
            .catch(() => {
              // 请求失败后，取消加载状态
              this.isLogin = false;
            });
        } else {
          console.log("校验失败");
          return false;
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
.forget {
  float: right;
}
</style>