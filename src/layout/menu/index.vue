<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- children 不存在 -->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta?.hidden" :index="item.path">
        <el-icon><component :is="item.meta?.icon" /></el-icon>
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- children只存在一个路由 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta?.hidden"
        :index="item.children[0].path"
      >
        <el-icon><component :is="item.children[0].meta?.icon" /></el-icon>
        <template #title>
          <span>{{ item.children[0].meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- children存在多个路由 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <el-icon><component :is="item.meta?.icon" /></el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <!-- 递归生成二级菜单 -->
      <Menu :menu-list="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts" name="Menu">
  import { RouteRecordRaw } from 'vue-router'
  defineProps<{ menuList: RouteRecordRaw[] }>()
</script>

<style scoped></style>
