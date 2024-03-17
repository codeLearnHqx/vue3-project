<template>
  <div class="tabbar">
    <!-- 左 -->
    <div class="tabbar_left">
      <!-- 顶部面包屑 -->
      <Breadcrumb></Breadcrumb>
    </div>
    <!-- 右 -->
    <div class="tabbar_right">
      <TabbarRight></TabbarRight>
    </div>
  </div>
</template>

<script setup lang="ts" name="Tabbar">
  import Breadcrumb from '@/layout/tabbar/breadcrumb/index.vue'
  import TabbarRight from '@/layout/tabbar/tabbar-right/index.vue'
</script>

<style lang="scss" scoped>
  .tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .tabbar_left {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }
    .tabbar_right {
      display: flex;
      align-items: center;
    }
  }
</style>
