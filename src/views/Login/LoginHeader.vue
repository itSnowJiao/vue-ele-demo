<template>
  <div class="login-header">
    <h3>后台管理系统</h3>
    <div class="detail">
      <span>这是一个模拟的后台管理系统</span>
    </div>
    <!-- 插槽 -->
    <div class="container">
      <slot name="container"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginHeader"
};
</script>

<style lang="scss" scoped>
$boxShadow: 3px 3px 16px rgba(0, 0, 0, 0.3);
.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
//   background-image: linear-gradient(to bottom, skyblue, #fff);
  h3 {
    margin: 20px 0;
    font-size: 26px;
    font-weight: bold;
  }
  .detail {
    margin-bottom: 20px;
    span {
      font-size: 14px;
    }
  }
  .container {
    box-shadow: $boxShadow;
    padding: 30px;
  }
}
</style>