import { reqLogin, reqUserInfo } from '@/api/user'
import type {
  LoginForm,
  LoginResponseData,
  UserResponseData,
} from '@/api/user/type'
import { defineStore } from 'pinia'
import { UserState } from './types/type'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'

// 常量路由
import { constantRoute } from '@/router/routes'

const useUserStore = defineStore('User', {
  state(): UserState {
    return {
      token: GET_TOKEN() ?? '', // 用户唯一标识
      menuRoutes: constantRoute, // 菜单路由数组
      username: '',
      avatar: '',
    }
  },
  actions: {
    /**
     * 用户登录
     * @param data 登录表单数据
     */
    async userLogin(data: LoginForm) {
      const res: LoginResponseData = await reqLogin(data)
      // 登录成功 200 -> token
      if (res.code === 200) {
        this.token = res.data.token as string
        // 本地持久化一份数据
        SET_TOKEN(this.token)
        // 返回成功的Promise对象
        return 'ok'
      } else {
        // 登录失败 201 -> 登录失败信息
        return Promise.reject(res.data.message)
      }
    },
    /**
     * 获取用户信息
     */
    async userInfo() {
      const res: UserResponseData = await reqUserInfo()
      if (res.code === 200) {
        this.username = res.data.checkUser?.username
        this.avatar = res.data.checkUser?.avatar
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
    /**
     * 退出登陆
     */
    logout() {
      // 清空本地用户数据
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
      //TODO 通知服务器用户唯一标识失效
    },
  },
  getters: {},
})

export default useUserStore
