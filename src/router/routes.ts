import { RouteRecordRaw } from 'vue-router'
// 对外暴露配置的路由
export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
  },
  // 如果上面的路由都没有匹配到，就会匹配到下面的路由
  {
    path: '/:pathMatch(.*)*',
    name: 'Any',
    redirect: '/404',
  },
]
