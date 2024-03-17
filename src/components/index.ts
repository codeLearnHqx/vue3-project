import { App, Component } from 'vue'
// 项目中的全局组件
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // icon图标库

// 自定义全局组件对象
const allGlobalComponent: { [name: string]: Component } = {
  SvgIcon,
  Pagination,
}

/**
 * 对外暴露插件对象，用于统一注册全局组件
 */
export default {
  // install 方法名字固定
  install(app: App) {
    // 遍历注册成全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
    // 将elementplus提供的图标注册成全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
