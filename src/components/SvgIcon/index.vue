<template>
  <div>
    <!-- svg:图标外层容器节点，内部需要与use标签配合使用 -->
    <svg :style="{ width, height }">
      <!-- xlink:href 使用哪个图标，属性值务必 #icon-图标名字 -->
      <!-- use标签fill属性可以设置图标的颜色，如果不生效到svg图片中查看存不存在 fill属性 -->
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
  // 接受父组件传递过来的颜色
  defineProps({
    // 图标前缀
    prefix: {
      type: String,
      default: '#icon-',
    },
    // 图标名称
    name: {
      type: String,
    },
    // 图标颜色
    color: {
      type: String,
      default: '',
    },
    // 图标宽度
    width: {
      type: String,
      default: '16px',
    },
    // 图标宽度
    height: {
      type: String,
      default: '16px',
    },
  })
</script>

<style scoped></style>
