/**
 * 登录接口
 */
export interface LoginForm {
  username: string
  password: string
}
interface LoginResponseDataType {
  token?: string
  message?: string
}
export interface LoginResponseData {
  code: number
  data: LoginResponseDataType
}

/**
 * 用户信息接口
 */
export interface UserInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: Array<string>
  buttons: Array<string>
  routes: Array<string>
  token: string
}
interface User {
  checkUser?: UserInfo
  message?: string
}
export interface UserResponseData {
  code: number
  data: User
}
