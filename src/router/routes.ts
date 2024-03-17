// 对外暴露配置的路由
export const constantRoute = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录', // 菜单标题
      hidden: true, // 是否在菜单中隐藏
    },
  },
  // 登录成功后展示数据的路由
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      title: '',
      hidden: false, // 是否在菜单中隐藏
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false, // 是否在菜单中隐藏
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/screen',
    name: 'screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据大屏',
      hidden: false, // 是否在菜单中隐藏
      icon: 'Platform',
    },
  },
  {
    path: '/acl',
    name: 'acl',
    component: () => import('@/layout/index.vue'),
    redirect: '/acl/user',
    meta: {
      title: '权限管理',
      hidden: false, // 是否在菜单中隐藏
      icon: 'Lock',
    },
    children: [
      {
        path: '/acl/user',
        name: 'user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          hidden: false, // 是否在菜单中隐藏
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        name: 'role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          hidden: false, // 是否在菜单中隐藏
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        name: 'permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          hidden: false, // 是否在菜单中隐藏
          icon: 'Monitor',
        },
      },
    ],
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/layout/index.vue'),
    redirect: '/product/trademark',
    meta: {
      title: '商品管理',
      hidden: false, // 是否在菜单中隐藏
      icon: 'Goods',
    },
    children: [
      {
        path: '/product/trademark',
        name: 'trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',
          hidden: false, // 是否在菜单中隐藏
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        name: 'attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '属性管理',
          hidden: false, // 是否在菜单中隐藏
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        name: 'spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'SPU管理',
          hidden: false, // 是否在菜单中隐藏
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        name: 'sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'SKU管理',
          hidden: false, // 是否在菜单中隐藏
          icon: 'Orange',
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true, // 是否在菜单中隐藏
    },
  },
  // 如果上面的路由都没有匹配到，就会匹配到下面的路由
  {
    path: '/:pathMatch(.*)*',
    name: 'Any',
    redirect: '/404',
    meta: {
      title: '任意路由',
      hidden: true, // 是否在菜单中隐藏
    },
  },
]
