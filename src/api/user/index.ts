/**
 * 用户相关接口
 */
import request from '@/utils/request'
import type {
  LoginForm,
  LoginResponseData,
  ResponseData,
  UserInfoResponseData,
} from './type'

/**
 * 统一接口管理
 */
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

/**
 * 登录
 */
export const reqLogin = (data: LoginForm) => {
  return request.post<any, LoginResponseData>(API.LOGIN_URL, data)
}
/**
 * 获取用户信息
 */
export const reqUserInfo = () => {
  return request.get<any, UserInfoResponseData>(API.USERINFO_URL)
}

/**
 * 退出登陆
 */
export const reqLogout = () => {
  return request.post<any, ResponseData>(API.LOGOUT_URL)
}
