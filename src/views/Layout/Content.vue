<template>
  <el-container class="layout-content">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <slot name="left"></slot>
    </el-aside>
    <!-- 右侧页面 -->
    <el-main>
      <!-- 面包屑 -->
      <div class="top">
        <i class="fa fa-reorder"></i>
        <el-breadcrumb class="breadcrumb">
          <el-breadcrumb-item v-for="item in breadCrumbItems" :key="item.index" :to="{path: item.path}">
            {{item.title}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 页面内容 -->
      <div class="content">
        <slot name="content"></slot>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Content",
  data() {
    return {
      breadCrumbItems: []
    };
  },
  created() {
    this.initBreadCrumbItems(this.$route);
    // console.log(this.$route);
  },
  watch: {
    $route(to) {
      this.initBreadCrumbItems(to);
    }
  },
  methods: {
    initBreadCrumbItems(router) {
      // console.log(router)
      // 根路由title
      let breadCrumbItems = [{ path: "/", title: "后台管理系统" }];
      // 遍历父级到当前子路由的页面的title和path，存储到数组中
      for (let index in router.matched) {
        if (router.matched[index].meta && router.matched[index].meta.title) {
          breadCrumbItems.push({
            path: router.matched[index].path ? router.matched[index].path : "/",
            title: router.matched[index].meta.title
          });
        }
      }
      this.breadCrumbItems = breadCrumbItems;
      // console.log(this.breadCrumbItems);
    }
  }
};
</script>

<style lang="scss">
.layout-content {
  width: 100%;
  height: 100%;
  .el-aside {
    min-height: 100vh;
    background-color: #fff;
  }
  .el-main {
    padding: 0;
    overflow: hidden;
    .top {
      background: #fff;
      height: 54px;
      border-right: none;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        cursor: pointer;
        padding-left: 16px;
      }
      .breadcrumb {
        padding-left: 16px;
      }
    }
    .content {
      margin: 10px;
      height: calc(100% - 54px);
      box-sizing: border-box;
    }
  }
}
</style>
