import { RouterOptions, createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'

// 路由器参数对象
const options: RouterOptions = {
  history: createWebHashHistory(),
  routes,
  // 设置路由切换后页面的水平、垂直滚动条位置
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
}

// 创建并暴露路由器
export default createRouter(options)
