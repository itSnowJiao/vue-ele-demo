<template>
  <div class="layout">
    <!-- 头部 -->
    <layout-header></layout-header>
    <!-- 内容 -->
    <Content>
        <side-bar slot="left"></side-bar>
        <router-view slot="content"></router-view>
    </Content>
  </div>
</template>

<script>
// @ is an alias to /src
import layoutHeader from './LayoutHeader';
import Content from './Content';
import SideBar from './SideBar';
export default {
  name: 'Layout',
  components: {
      layoutHeader,
      Content,
      SideBar
  }
}
</script>

<style lang="scss">

</style>
