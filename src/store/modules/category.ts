/**
 * 商品分类全局组件仓库
 */

import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import { defineStore } from 'pinia'
import { CategoryState } from './types/type'
import { CategoryResponseData } from '@/api/product/attr/type'

const useCategoryStore = defineStore('Category', {
  state(): CategoryState {
    return {
      c1Arr: [], // 一级分类数据
      c1Id: '', // 一级分类id
      c2Arr: [], // 二级分类数据
      c2Id: '', // 二级分类id
      c3Arr: [], // 三级分类数据
      c3Id: '', // 三级分类id
    }
  },
  actions: {
    /**
     * 获取一级分类数据
     */
    async getC1() {
      const res: CategoryResponseData = await reqC1()
      if (res.code === 200) {
        this.c1Arr = res.data
        return 'ok'
      } else {
        return Promise.reject(new Error('获取一级分类数据失败'))
      }
    },
    /**
     * 获取二级分类数据
     */
    async getC2() {
      const res: CategoryResponseData = await reqC2(this.c1Id as number)
      if (res.code === 200) {
        this.c2Arr = res.data
        return 'ok'
      } else {
        return Promise.reject(new Error('获取二级分类数据失败'))
      }
    },
    /**
     * 获取二级分类数据
     */
    async getC3() {
      const res: CategoryResponseData = await reqC3(this.c2Id as number)
      if (res.code === 200) {
        this.c3Arr = res.data
        return 'ok'
      } else {
        return Promise.reject(new Error('获取三级分类数据失败'))
      }
    },
  },
})

export default useCategoryStore
