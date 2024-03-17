import router from '@/router'
//@ts-ignore
import NProgress from 'nprogress'
// 进度条样式
import 'nprogress/nprogress.css'
import useUserStore from './store/modules/user'
import setting from './setting'

// 要想在这里使用store，需要引入pinia
import pinia from './store'
const userStore = useUserStore(pinia)

// 隐藏进度条圆圈
NProgress.configure({ showSpinner: false })

/**
 * 路由鉴权
 */
// 全局前置路由守卫
router.beforeEach(async (to, _, next) => {
  NProgress.start() // 进度条开始
  let token = userStore.token
  let username = userStore.username
  if (token) {
    // 已登录
    if (to.path === '/login') {
      // 不给访问登录页面
      next({ path: '/' })
    } else {
      // 登录页面之外的其它页面
      if (username) {
        // 存在用户信息，放行
        next()
      } else {
        // 不存在用户信息时，请求到用户信息再放行
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          // token 过期，获取用户信息失败
          // 用户手动修改了本地 token
          userStore.logout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 未登录
    if (to.path === '/login') {
      next()
    } else {
      // 强制跳转到登录页面（并将想去的页面路径设置为重定向参数）
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局前置路由守卫
router.afterEach((to, _) => {
  document.title = (setting.title + '-' + to.meta.title) as string // 设置页面标题
  NProgress.done() // 进度条结束
})
