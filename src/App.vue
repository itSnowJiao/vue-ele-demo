<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
    </div>-->
    <router-view />
  </div>
</template>

<script>
// import jwt_decode from "jwt-decode";
export default {
  // 刚开始时触发钩子函数，让vuex首先存储localstorage中的token
  created() {
    // const decode = jwt_decode(localStorage.userToken);
    this.$store.dispatch("setUser", localStorage.getItem('userToken'));
  }
};
</script>

<style lang="scss">
#app {
  background-color: #cfcfcf;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
