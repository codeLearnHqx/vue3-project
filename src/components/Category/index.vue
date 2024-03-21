<template>
  <!-- 三级分类全局组件 -->
  <el-card>
    <el-form :inline="true" class="attr_form">
      <el-form-item label="一级分类">
        <el-select
          :disabled="scene === 1"
          placeholder="请选择"
          v-model="c1Id"
          @change="c1Handler"
          clearable
        >
          <el-option
            v-for="c1 in c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="scene === 1"
          placeholder="请选择"
          v-model="c2Id"
          @change="c2Handler"
          clearable
        >
          <el-option
            v-for="c2 in c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="scene === 1"
          placeholder="请选择"
          v-model="c3Id"
          clearable
        >
          <el-option
            v-for="c3 in c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts" name="Category">
  import useCategoryStore from '@/store/modules/category'
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'

  defineProps<{ scene: number }>()

  const categoryStore = useCategoryStore()
  const { c1Arr, c1Id, c2Arr, c2Id, c3Arr, c3Id } = storeToRefs(categoryStore) // 分类数据

  onMounted(() => {
    getC1()
  })

  /**
   * 获取一级分类数据
   */
  function getC1() {
    // 清空一级选择框数据
    c1Arr.value = []
    c1Id.value = ''
    // 清空二级、三级选择框数据
    c2Arr.value = []
    c2Id.value = ''
    c3Arr.value = []
    c3Id.value = ''
    // 仓库中获取
    categoryStore.getC1()
  }

  /**
   * 一级分类选择框change事件回调
   */
  function c1Handler() {
    // 清空二级、三级选择框数据
    c2Arr.value = []
    c2Id.value = ''
    c3Arr.value = []
    c3Id.value = ''
    // 通知仓库获取二级分类数据
    categoryStore.getC2()
  }
  /**
   * 二级分类选择框change事件回调
   */
  function c2Handler() {
    // 清空三级选择框数据
    c3Arr.value = []
    c3Id.value = ''
    // 通知仓库获取三级分类数据
    categoryStore.getC3()
  }
</script>

<style lang="scss" scoped>
  .attr_form {
    :deep(.el-select) {
      width: 240px;
    }
  }
</style>
