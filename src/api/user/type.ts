/**
 * 登录接口
 */
export interface loginForm {
  username: string
  password: string
}
interface loginResponseDataType {
  token: string
}
export interface loginResponseData {
  code: number
  data: loginResponseDataType
}

/**
 * 用户信息接口
 */
interface userInfo {
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
interface user {
  checkUser?: userInfo
  message?: string
}
export interface userResponseData {
  code: number
  data: user
}
