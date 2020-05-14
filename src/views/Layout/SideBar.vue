<template>
  <el-scrollbar class="el-scrollbar">
    <el-menu class="el-menu-slide" :default-active="$router.currentRoute.path" router>
      <template v-for="item in routers">
        <!-- 一个子元素的导航 -->
        <el-menu-item
          v-if="item.children.length == 1"
          :index="item.children[0].path"
          :key="item.name"
        >
          <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
          <span slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
        <!-- 多个子元素的导航 -->
        <el-submenu v-else :key="item.name" :index="item.children[0].path">
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.name">
            <i v-if="child.meta && child.meta.icon" :class="child.meta.icon"></i>
            <span v-if="child.meta && child.meta.title">{{child.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
// @ is an alias to /src

export default {
  name: "SideBar",
  computed: {
    // 获取vuex中的routers信息
    routers() {
      let routers = [];
      this.$store.getters.routers.forEach(item => {
        if (item.hidden && item.children && item.children.length > 0) {
          routers.push(item);
        }
      });
      return routers;
    }
  }
};
</script>

<style lang="scss">
.el-menu-slide {
  span {
    margin: 0 10px;
  }
}
</style>
