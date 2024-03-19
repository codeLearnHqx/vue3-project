import request from '@/utils/request'
import { TradeMark, TradeMarkResponseData } from './type'

/**
 * 接口地址
 */
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_RUL = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  REMOVETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

/**
 * 获取已有品牌接口
 */
export const reqHasTrademark = (pageNo: number, pageSize: number) => {
  return request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${pageNo}/${pageSize}`,
  )
}

/**
 * 添加品牌接口
 */
export const reqAddTradeMark = (data: TradeMark) => {
  return request.post<any, any>(API.ADDTRADEMARK_RUL, data)
}
/**
 * 修改品牌接口
 */
export const reqUpdateTradeMark = (data: TradeMark) => {
  return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
}

/**
 * 删除品牌接口
 */
export const reqRemoveTradeMark = (trademarkId: number) => {
  return request.delete<any, any>(API.REMOVETRADEMARK_URL + trademarkId)
}
