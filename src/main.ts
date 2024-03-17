import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss' // 全局样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// svg图标使用
import 'virtual:svg-icons-register'
// 引入自定义插件对象，用于统一注册全局组件
import globalComponent from '@/components'
import router from './router'
import pinia from './store'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn, // 设置 element plus 中文
})
// 安装自定义插件
app.use(globalComponent)
// 注册路由
app.use(router)
// 注册pinia
app.use(pinia)

app.mount('#app')
