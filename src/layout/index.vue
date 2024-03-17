<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ menu_fold: fold }">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :default-active="defaultActive"
          background-color="#001529"
          text-color="white"
          :collapse="fold"
          :collapse-transition="false"
          router
        >
          <!-- 根据路由动态生成菜单 -->
          <Menu :menu-list="menuRoutes"></Menu>
          <el-menu-item>二级菜单动画卡顿</el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabber" :class="{ menu_fold: fold }">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区 -->
    <div class="layout_main" :class="{ menu_fold: fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
  import Logo from '@/layout/logo/index.vue'
  import Menu from '@/layout/menu/index.vue'
  import useUserStore from '@/store/modules/user'
  import Main from '@/layout/main/index.vue'
  import { useRoute } from 'vue-router'
  import Tabbar from '@/layout/tabbar/index.vue'
  import useSettingStore from '@/store/modules/setting'
  import { storeToRefs } from 'pinia'
  import { toRef } from 'vue'
  // 获取用户仓库中的路由数组
  const userStore = useUserStore()
  const { menuRoutes } = userStore
  const route = useRoute()
  // 当前路由路径（响应式）
  const defaultActive = toRef(route, 'path')
  const settingStore = useSettingStore()
  // 左侧导航菜单折叠标识（响应式）
  const { fold } = storeToRefs(settingStore)
</script>

<style lang="scss" scoped>
  .layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
      width: $base-menu-width;
      height: 100vh;
      background-color: $base-menu-background;
      color: #fff;
      transition: all 0.3s;
      .scrollbar {
        width: 100%;
        /* 滚动组件的高度为当前视图的高度减去logo组件的高度 */
        height: calc(100vh - $base-menu-logo-height);
        .el-menu {
          border-right: none;
        }
      }
      &.menu_fold {
        width: $base-menu-min-width;
      }
    }
    .layout_tabber {
      position: fixed;
      /* 顶部导航的宽度等于页面的宽度减去左侧菜单的宽度 */
      width: calc(100% - $base-menu-width);
      height: $base-tabber-height;
      top: 0px;
      left: $base-menu-width;
      transition: all 0.3s;
      &.menu_fold {
        left: $base-menu-min-width;
        width: calc(100vw - $base-menu-min-width);
      }
    }
    .layout_main {
      position: absolute;
      width: calc(100% - $base-menu-width);
      height: calc(100vh - $base-tabber-height);
      background-color: orange;
      left: $base-menu-width;
      top: $base-tabber-height;
      padding: 20px;
      overflow: auto;
      transition: all 0.3s;
      &.menu_fold {
        width: calc(100vw - $base-menu-min-width);
        left: $base-menu-min-width;
      }
    }
  }
</style>
