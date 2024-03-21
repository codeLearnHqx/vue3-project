export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 分类ts类型
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

// 分类接口返回数据类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

// 属性与属性值的ts
// 属性值
export interface AttrValue {
  id?: number | string
  valueName: string
  attrId?: number | string
  flag?: boolean // 控制属性值的编辑模式和查看模式的切换
}
// 属性值数组
export type AttrValueList = AttrValue[]
// 属性对象
export interface Attr {
  id?: number | string
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}
// 属性对象数组
export type AttrList = Attr[]
// 属性接口返回数据类型
export interface AttrResponseData extends ResponseData {
  data: AttrList
}
