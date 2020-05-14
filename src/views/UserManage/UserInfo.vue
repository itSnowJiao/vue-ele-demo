<template>
  <div class="user-info">
    <div class="img-box">
      <h2 class="title">About Me</h2>
      <img :src="require('@/assets/'+ user.key + '.jpg')" alt />
      <h4>{{user.username}}</h4>
    </div>
    <div class="info-box">
      <h2 class="title">Account</h2>
      <!-- form表单 -->
      <el-form class="userForm" :model="userData">
        <el-form-item label="用户名">
          <el-input v-model="user.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="userData.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="submit()"
            :disabled="!userData.pwd"
            type="primary"
            :loading="loading"
          >修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "UserInfo",
  data() {
    return {
      userData: {
        username: "",
        pwd: ""
      },
      loading: false //是否发起网络请求
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    submit() {
      this.userData.username = this.$store.getters.user.username;
      this.loading = true;
      // 发起请求
      this.$axios
        .post("/api/users/changePwd", this.userData)
        .then(res => {
          // console.log(res.data)
          this.loading = false;
          this.$message({
            message: res.data.msg,
            type: "success"
          });
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.user-info {
  display: flex;
  padding-bottom: 20px;
  .img-box {
    width: 400px;
    height: 100vh;
    background-color: #fff;
    .title {
      padding: 20px;
      border-bottom: 1px solid #ccc;
    }
    img {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      margin-left: 120px;
      margin-top: 170px;
      margin-bottom: 10px;
    }
    h4 {
      text-align: center;
    }
  }
  .info-box {
    flex: 1;
    background-color: #fff;
    margin-left: 10px;
    .title {
      padding: 20px;
      border-bottom: 1px solid #ccc;
    }
    .userForm {
      margin: 20px;
    }
  }
}
</style>
