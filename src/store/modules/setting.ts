import { defineStore } from 'pinia'

// layout组件相关配置
const useSettingStore = defineStore('Setting', {
  state() {
    return {
      fold: false, // 导航菜单折叠标识
      flush: false, // 控制刷新
    }
  },
})

export default useSettingStore
