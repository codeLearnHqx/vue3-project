import { CategoryObj } from '@/api/product/attr/type'
import { RouteRecordRaw } from 'vue-router'

// 仓库state类型
export interface UserState {
  token: string
  menuRoutes: RouteRecordRaw[]
  username: string | undefined
  avatar: string | undefined
}

export interface CategoryState {
  c1Arr: CategoryObj[]
  c2Arr: CategoryObj[]
  c3Arr: CategoryObj[]
  c1Id: string | number
  c2Id: string | number
  c3Id: string | number
}
