<template>
  <div class="no-found">
    <div class="pic">
      <img src="@/assets/404_images/404.png" alt="">
    </div>
    <div class="toast">
      <span>访问页面不存在</span>
      <span>你可以尝试<a @click="$router.go(-1)">上一页</a></span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'NoFound'
}
</script>

<style lang="scss">
.no-found {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  .pic img {
    margin-left: 200px;
    max-width: 600px;
  }
  .toast {
    flex: 1;
    span {
      margin: 0 5px;
    }
    a {
      color: blue;
      margin: 0 5px;
      cursor: pointer;
    }
  }
}
</style>
