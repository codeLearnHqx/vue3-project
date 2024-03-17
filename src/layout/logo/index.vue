<template>
  <div
    class="logo"
    :class="{ logo_fold: fold, display: !fold }"
    v-if="logoHidden"
  >
    <!-- 这里应该放一个logo图片，而不是一个svg图标 -->
    <SvgIcon name="vue" width="40px" height="40px" />
    <p v-show="!fold">{{ title }}</p>
  </div>
</template>

<script setup lang="ts" name="Logo">
  import setting from '@/setting'
  import useSettingStore from '@/store/modules/setting'
  import { storeToRefs } from 'pinia'
  // 项目的标题
  const { title, logoHidden } = setting
  const settingStore = useSettingStore()
  // 导航菜单折叠标识，控制标题隐藏、显示
  const { fold } = storeToRefs(settingStore)
</script>

<style lang="scss" scoped>
  .logo {
    display: flex;
    align-items: center;
    width: 100%;
    height: $base-menu-logo-height;
    padding: 10px;
    p {
      font-size: $base-logo-title-fontSize;
      margin-left: 10px;
    }
    &.logo_fold {
      justify-content: center;
    }
    &.display {
      animation-name: changeTitle;
      animation-duration: 1.5s;
    }
  }
  @keyframes changeTitle {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
