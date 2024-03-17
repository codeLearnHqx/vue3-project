<template>
  <!-- 收缩图标 -->
  <el-icon style="margin-right: 10px; cursor: pointer" @click="changeIcon">
    <!-- <Expand /> -->
    <!-- <Fold /> -->
    <!-- 通过component动态加载组件，true加载<Expand />，false加载<Fold />   -->
    <component :is="fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-show="item.meta.title"
      v-for="item in matched"
      :key="item.path"
      :to="item.path"
    >
      <div class="breadcrumb_item_content">
        <!-- 图标 -->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 面包屑展示路由标题 -->
        <span style="margin: 0 3px">{{ item.meta.title }}</span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
  import useSettingStore from '@/store/modules/setting'
  import { ArrowRight } from '@element-plus/icons-vue'
  import { storeToRefs } from 'pinia'
  import { toRef } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  // 匹配到的路由
  const matched = toRef(route, 'matched')

  const settingStore = useSettingStore()
  // 菜单折叠标识（响应式）
  const { fold } = storeToRefs(settingStore)
  // 图标点击
  function changeIcon() {
    fold.value = !fold.value
  }
</script>

<style lang="scss" scoped>
  .breadcrumb_item_content {
    display: flex;
    align-items: center;
  }
</style>
