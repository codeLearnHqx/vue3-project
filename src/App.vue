<template>
  <div class="box">
    <h1>App根组件</h1>
  </div>
</template>
<script setup lang="ts">
const fun = () => {
  console.log(11111222222222222222221)
}
fun()
</script>

<style lang="scss" scoped>
.box {
  width: 600px;
  height: 400px;
  background-color: black;
  h1 {
    color: white;
  }
}
</style>
