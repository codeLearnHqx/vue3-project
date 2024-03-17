<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          ref="ruleFormRef"
          :model="loginForm"
          :rules="rules"
        >
          <h1>hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              class="login_input"
              type="text"
              placeholder="输入用户名"
              :prefix-icon="User"
              v-model="loginForm.username"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="login_input"
              type="password"
              placeholder="输入密码"
              :prefix-icon="Lock"
              show-password
              v-model="loginForm.password"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              :loading="loading"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import type { LoginForm } from '@/api/user/type'
  import useUserStore from '@/store/modules/user'
  import {
    notificationError,
    notificationSuccess,
  } from '@/utils/elementplus-util'
  import getTime from '@/utils/time'
  import { User, Lock } from '@element-plus/icons-vue'
  import { FormInstance } from 'element-plus'
  import { reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()
  // 表单对象
  const ruleFormRef = ref<FormInstance>()
  // 用户仓库
  const userStore = useUserStore()

  // 按钮加载
  const loading = ref(false)

  // 登录表单数据
  let loginForm = reactive<LoginForm>({
    username: 'admin',
    password: '111111',
  })

  // 登录回调
  async function login() {
    if (!ruleFormRef.value) return
    // 表单校验，校验通过valid为true
    ruleFormRef.value.validate(async (valid) => {
      if (valid) {
        // 按钮加载动画
        loading.value = true
        try {
          await userStore.userLogin(loginForm)
          // 如果重定向参数存在就跳转到指定页面
          router.replace((route.query.redirect as string) || '/')
          notificationSuccess('欢迎回来', `HI，${getTime()}好`)
        } catch (error) {
          notificationError(error as string)
        } finally {
          loading.value = false
        }
      } else {
        console.log('表单校验未通过')
      }
    })
  }

  // 表单校验规则对象
  const rules = {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  }
</script>

<style lang="scss" scoped>
  .login_container {
    width: 100%;
    /* 视图高度 */
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
      position: relative;
      width: 50%;
      top: 30vh;
      background: url('../../assets/images/login_form.png');
      padding: 40px;
      h1 {
        color: white;
        font-size: 40px;
      }
      h2 {
        color: white;
        font-size: 20px;
        margin: 20px 0;
      }
      .login_input {
        height: 40px;
      }
      .login_btn {
        width: 100%;
      }
    }
  }
</style>
