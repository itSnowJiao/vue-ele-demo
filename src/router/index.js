import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Layout from '../views/Layout/Index.vue'
import jwt from 'jwt-decode'

Vue.use(VueRouter)


export const asyncRouterMap = [
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    hidden: true,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '首页', icon: 'fa fa-home' },
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/dataManage',
    name: 'dataManage',
    hidden: true,
    meta: { title: '数据管理', icon: 'fa fa-database' },
    component: Layout,
    redirect: '/tableData',
    children: [
      {
        path: '/tableData',
        name: 'tableData',
        meta: { title: '表格管理', icon: 'fa fa-table' },
        component: () => import('@/views/DataManage/Table.vue')
      },
      {
        path: '/chartsData',
        name: 'chartsData',
        meta: { title: '图表管理', icon: 'fa fa-bar-chart' },
        component: () => import('@/views/DataManage/Charts.vue')
      },
      {
        path: '/formData',
        name: 'formData',
        meta: {
          title: '表单管理',
          icon: 'fa fa-file-text-o',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/DataManage/Form.vue')
      }
    ]
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: Layout,
    hidden: true,
    redirect: '/accountData',
    children: [
      {
        path: '/accountData',
        name: 'accountData',
        meta: {
          title: '账户管理',
          icon: 'fa fa-user-plus',
          roles: ['admin']
        },
        component: () => import('@/views/UserManage/AccountData.vue')
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/userInfo',
    hidden: false,
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: { title: '个人中心' },
        component: () => import('@/views/UserManage/UserInfo.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    hidden: false,
    meta: { title: '404' },
    component: () => import('@/views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/login',
    name: 'login',
    hidden: false,
    meta: { title: '系统登录' },
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/password',
    name: 'password',
    hidden: false,
    meta: { title: '找回密码' },
    component: () => import('@/views/Login/Password.vue')
  }
]

// const routes = [
//   {
//     path: '/',
//     name: 'Layout',
//     component: Layout
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: () => import('@/views/Login/Login.vue')
//   },
//   {
//     path: '/password',
//     name: 'Password',
//     component: () => import('@/views/Login/Password.vue')
//   }
// ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap
})

// 路由，全局前置守卫(判断是否存在token，如果存在那么就继续，不存在就跳转到login页面)
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.userToken ? true : false;
  if (to.path == '/login' || to.path == '/password') {
    next();
  } else {
    // 如果已经登录了，要判断当前key值是否拥有该权限，没有该权限的话就跳到404页面，如果没有登陆就跳到login页面
    if (isLogin) {
      const decoded = jwt(localStorage.userToken);
      const { key } = decoded;
      // 权限判断
      if (hasPermission(key, to)) {
        next()
      } else { //不拥有权限
        next('/404') //无权限
      }
    } else { // 没有登陆，就跳到login页面
      next('/login')
    }
    // isLogin ? next() : next('/login');
  }
})

// 判断当前角色是否有权限
function hasPermission(roles, route) {
  // 判断路由里是否有meta并且meta下是否有roles字段，如果roles中包含当前角色key值，那么就拥有权限，反之无权限
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some(role => role.indexOf(roles) >= 0)
  } else {
    // 默认不设置权限（就是说，根本没有meta.roles这个字段，说明路由都是公用的）
    return true;
  }
}

export default router
