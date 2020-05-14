<template>
  <div class="layout-header">
    <el-row>
      <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="18">
        <div class="base-info">
          <span class="title">公司名称</span>
        </div>
      </el-col>
      <el-col :xs="14" :sm="12" :md="12" :lg="8" :xl="6">
        <el-dropdown @command="userCommand" class="base-user">
          <span class="user-inner">
            {{user.username}}
            <img :src="require('@/assets/' + user.key + '.jpg')" alt />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
            <el-dropdown-item divided command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "LayoutHeader",
  computed: {
    // 获取vuex中的user信息
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    userCommand(command) {
      if (command == "logout") {
        localStorage.removeItem("userToken");
        this.$router.replace("/login");
      }
      if (command == "usercenter") {
        // console.log('个人中心');
        this.$router.push("/user");
      }
    }
  }
};
</script>

<style lang="scss">
.layout-header {
  background-color: #271894;
  width: 100%;
  height: 60px;
  line-height: 60px;
  .base-info {
    margin-left: 15px;
    .title {
      font-size: 16px;
      color: #fff;
    }
  }
  .base-user {
    text-align: right;
    float: right;
    padding-right: 15px;
    .user-inner {
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
  }
}
</style>
