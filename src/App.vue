<template>
  <div class="box">
    <h1>App根组件</h1>
  </div>
</template>
<script setup lang="ts">
var str = '我爱祖国11111111111'
const fun = () => {
  console.log(111111)
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
