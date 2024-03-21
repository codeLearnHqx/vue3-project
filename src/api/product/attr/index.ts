/**
 * 属性管理模块相关接口
 */

import request from '@/utils/request'
import {
  Attr,
  AttrResponseData,
  CategoryResponseData,
  ResponseData,
} from './type'

enum API {
  C1_URL = '/admin/product/getCategory1', // 一级分类
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  ATTR_URL = '/admin/product/attrInfoList/', // 获取分类下已有属性与属性值
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo', // 新增或者修改属性值
  REMOVEATTR_URL = '/admin/product/deleteAttr/',
}

/**
 * 获取一级分类接口
 */
export const reqC1 = () => {
  return request.get<any, CategoryResponseData>(API.C1_URL)
}

/**
 * 获取二级分类接口
 */
export const reqC2 = (category1Id: number) => {
  return request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
}

/**
 * 获取三级分类接口
 */
export const reqC3 = (category2Id: number) => {
  return request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
}

/**
 * 获取对应分类下已有属性与属性值
 */
export const reqAttr = (
  category1Id: number,
  category2Id: number,
  category3Id: number,
) => {
  return request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  )
}

/**
 * 新增或者修改已有属性接口
 */
export const reqAddOrUpdateAttr = (data: Attr) => {
  return request.post<any, ResponseData>(API.ADDORUPDATEATTR_URL, data)
}

/**
 * 删除属性接口
 */
export const reqRemoveAttr = (attrId: number) => {
  return request.delete<any, ResponseData>(API.REMOVEATTR_URL + attrId)
}
