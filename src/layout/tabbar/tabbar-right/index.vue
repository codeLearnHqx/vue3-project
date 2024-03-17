<template>
  <el-button size="default" @click="reflsh" circle>
    <el-icon><Refresh /></el-icon>
  </el-button>
  <el-button size="default" @click="fullScreent" circle>
    <el-icon><FullScreen /></el-icon>
  </el-button>
  <el-button size="default" circle>
    <el-icon><Setting /></el-icon>
  </el-button>
  <!-- 头像 -->
  <img
    class="tabbar_right_avatar"
    src="https://tse3-mm.cn.bing.net/th/id/OIP-C.ny2RhljTWP6TSo7y3eDCGAAAAA?rs=1&pid=ImgDetMain"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span style="cursor: pointer">
      admin
      <el-icon>
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="TabbarRight">
  import { useFullscreen } from '@vueuse/core' // VueUse插件
  import useSettingStore from '@/store/modules/setting'

  const { isFullscreen, enter, exit } = useFullscreen()
  const settingStore = useSettingStore()
  // 刷新按钮点击
  function reflsh() {
    settingStore.flush = !settingStore.flush
  }
  // 全屏按钮点击
  function fullScreent() {
    // 原生api实现全屏切换会有浏览器兼容性问题
    // // 全屏标识（不是全屏时为null）
    // let full = document.fullscreenElement
    // if (!full) {
    //   // 打开全屏模式
    //   document.documentElement.requestFullscreen()
    // } else {
    //   // 退出全屏模式
    //   document.exitFullscreen()
    // }

    // 使用 VueUse 插件实现全屏效果
    if (!isFullscreen.value) {
      // 打开全屏模式
      enter()
    } else {
      // 退出全屏模式
      exit()
    }
  }
</script>

<style lang="scss" scoped>
  .tabbar_right_avatar {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin: 0 10px;
  }
</style>
