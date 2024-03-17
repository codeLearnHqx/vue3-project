/**
 * 用户相关接口
 */
import request from '@/utils/request'
import type { LoginForm, LoginResponseData, UserResponseData } from './type'

/**
 * 统一接口管理
 */
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

/**
 * 请求函数
 */
// 登录
export const reqLogin = (data: LoginForm) => {
  return request.post<any, LoginResponseData>(API.LOGIN_URL, data)
}
// 获取用户信息
export const reqUserInfo = () => {
  return request.get<any, UserResponseData>(API.USERINFO_URL)
}
