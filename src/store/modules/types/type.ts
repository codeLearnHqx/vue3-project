import { RouteRecordRaw } from 'vue-router'

// 仓库state类型
export interface UserState {
  token: string
  menuRoutes: RouteRecordRaw[]
}
