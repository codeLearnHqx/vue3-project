/**
 * 定义全部接口返回数据拥有类型
 */
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

/**
 * 登录接口
 */
export interface LoginForm {
  username: string
  password: string
}
export interface LoginResponseData extends ResponseData {
  data: string
}

/**
 * 用户信息接口
 */
export interface UserInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    avatar: string
    name: string
  }
}
