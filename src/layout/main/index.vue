<template>
  <!-- 将组件注入到 transition 组件内部通过component渲染使用-->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component v-if="flag" :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts" name="Main">
  import useSettingStore from '@/store/modules/setting'
  import { storeToRefs } from 'pinia'
  import { nextTick, ref, watch } from 'vue'

  // 控制当前组件是否销毁重建
  const flag = ref(true)

  const settingStore = useSettingStore()
  const { flush } = storeToRefs(settingStore)
  // 监听仓库内部数据flush的是否发生变化
  watch(flush, () => {
    // 点击刷新：路由组件销毁
    flag.value = false
    // 使用 nextTick 在dom更新后（组件销毁完成后）再重新渲染组件
    nextTick(() => {
      flag.value = true
    })
  })
</script>

<style scoped>
  /* 路由切换过度动画 */
  .fade-enter-from {
    opacity: 0;
    transform: scale(0);
  }

  .fade-enter-active {
    transition: all 1s;
  }

  .fade-enter-to {
    opacity: 1;
    transform: scale(1);
  }
</style>
