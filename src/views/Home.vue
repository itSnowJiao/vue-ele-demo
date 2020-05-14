<template>
  <div class="home">
    <div class="home-body">
      <h3 class="title">这是一个模拟的后台管理系统</h3>
      <el-button @click="learn">进入百度</el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  methods: {
    learn() {
      // 打开新窗口
      window.open("https://www.baidu.com/");
    }
  }
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat;
  background-size: 100% 100%;
  .home-body {
    height: 100vh;
    background-color: rgba(0,0,0,.4);
    text-align: center;
    padding: 100px;
    color: #fff;
    h3 {
      font-weight: bold;
      font-size: 26px;
    }
    .el-button {
      margin: 20px 0;
    }
  }
}
</style>
