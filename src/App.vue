<template>
  <div>
    <h1>App根组件</h1>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { reqLogin, reqUserInfo } from './api/user'
  import {
    loginForm,
    loginResponseData,
    userResponseData,
  } from './api/user/type'

  onMounted(async () => {
    const login: loginForm = {
      username: 'admin',
      password: '111111',
    }
    const res: loginResponseData = await reqLogin(login)
    console.log(res.data.token)
    const user: userResponseData = await reqUserInfo()
    console.log(user.data.message)
  })
</script>

<style scoped></style>
