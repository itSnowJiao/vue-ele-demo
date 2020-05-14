import jwt_decode from 'jwt-decode';
// 在actions中处理所有路由，操纵权限
import { asyncRouterMap } from '../router/index';

const actions = {
  setUser: ({ commit }, user) => {
    // 先解析，再提交
    const decoded = jwt_decode(user);
    commit("SET_USER", decoded);
    // 从decoded中拿到key值
    const { key } = decoded;
    // 返回当前用户拥有权限的路由
    const accessedRouters = filterAsyncRouter(asyncRouterMap, key);
    commit("GET_ROUTERS",accessedRouters);
  }
  // getRouters: ({ commit }, routers) => {
  //   commit("GET_ROUTERS", routers)
  // }
}

// 递归过滤异步路由表，返回符合用户角色权限的路由表
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    //  console.log(router)
    if (hasPermission(roles, route)) {
      // 判断如果路由里有children并且children有值，那么需要再次执行递归事件进行遍历判断
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

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

export default actions;