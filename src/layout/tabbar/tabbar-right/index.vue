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
  <!-- src="https://tse3-mm.cn.bing.net/th/id/OIP-C.ny2RhljTWP6TSo7y3eDCGAAAAA?rs=1&pid=ImgDetMain" -->
  <img class="tabbar_right_avatar" :src="avatar" />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span style="cursor: pointer">
      {{ username }}
      <el-icon>
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="TabbarRight">
  import { useFullscreen } from '@vueuse/core' // VueUse插件
  import useSettingStore from '@/store/modules/setting'
  import useUserStore from '@/store/modules/user'
  import { storeToRefs } from 'pinia'
  import { useRoute, useRouter } from 'vue-router'
  import { toastSuccess } from '@/utils/elementplus-util'

  const { isFullscreen, enter, exit } = useFullscreen()
  const settingStore = useSettingStore()
  const userStore = useUserStore()
  const { username, avatar } = storeToRefs(userStore)
  const router = useRouter()
  const route = useRoute()

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

    // 使用 VueUse 插件实现全屏效果（兼容性好）
    if (!isFullscreen.value) {
      // 打开全屏模式
      enter()
    } else {
      // 退出全屏模式
      exit()
    }
  }
  // 退出登陆按钮
  function logout() {
    userStore.logout()
    router.push({
      path: '/login',
      query: {
        redirect: route.path, // 需要重定向的路径
      },
    })
    toastSuccess('退出成功')
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
