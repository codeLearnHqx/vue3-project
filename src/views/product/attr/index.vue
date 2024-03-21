<template>
  <div class="attr_container">
    <!-- 三级分类全局组件 -->
    <Category :scene="scene"></Category>
    <!-- 表格数据 -->
    <el-card>
      <div v-show="scene === 0">
        <el-button
          type="primary"
          size="default"
          @click="addAttr"
          :disabled="c3Id ? false : true"
          icon="Plus"
        >
          添加平台属性
        </el-button>
        <el-table style="margin: 10px 0" :data="attrArr" border>
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row }">
              <el-tag
                style="margin-left: 10px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220px">
            <template #default="{ row }">
              <el-button
                type="warning"
                size="default"
                icon="Edit"
                @click="updateAttr(row)"
              >
                编辑
              </el-button>
              <el-popconfirm
                :title="`你确定要删除${row.attrName}?`"
                icon="Delete"
                icon-color="red"
                width="180px"
                @confirm="removeAttr(row)"
              >
                <template #reference>
                  <el-button type="danger" size="default" icon="Delete">
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1">
        <!-- 添加和修改属性 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              v-model="attrParams.attrName"
              placeholder="请您输入属性名称"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          :disabled="!attrParams.attrName"
          type="primary"
          size="default"
          @click="addAttrValue"
          icon="Plus"
        >
          添加属性值
        </el-button>
        <el-button size="default" @click="cancel">取消</el-button>
        <el-table :data="attrParams.attrValueList" style="margin: 10px" border>
          <el-table-column
            width="80px"
            type="index"
            align="center"
            label="序号"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputArr[$index] = vc)"
                v-if="row.flag"
                @blur="toLook(row, $index)"
                v-model="row.valueName"
                placeholder="请您输入属性值名称"
              ></el-input>
              <div @click="toEdit(row, $index)" v-else>{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #default="{ row, $index }">
              <el-button
                type="danger"
                size="small"
                @click="() => attrParams.attrValueList.splice($index, 1)"
                icon="Delete"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          :disabled="!(attrParams.attrValueList.length > 0)"
          type="primary"
          size="default"
          @click="save"
        >
          保存
        </el-button>
        <el-button size="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import {
    reqAddOrUpdateAttr,
    reqAttr,
    reqRemoveAttr,
  } from '@/api/product/attr'
  import {
    Attr,
    AttrList,
    AttrResponseData,
    AttrValue,
    ResponseData,
  } from '@/api/product/attr/type'
  import useCategoryStore from '@/store/modules/category'
  import {
    toastError,
    toastSuccess,
    toastWarning,
  } from '@/utils/elementplus-util'
  import { storeToRefs } from 'pinia'
  import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'

  const categoryStore = useCategoryStore()

  const { c3Id } = storeToRefs(categoryStore) // 获取仓库中的三级分类id
  const attrArr = ref<AttrList>() // 已有属性和属性值
  const scene = ref<number>(0) // 卡片内容场景切换，0显示表格，1添加修改属性
  const attrParams = reactive<Attr>({
    attrName: '',
    attrValueList: [],
    categoryId: '',
    id: '',
    categoryLevel: 3, // 代表三级分类
  })
  const inputArr = ref<any[]>([]) // input实例数组

  /**
   * 监听仓库三级分类id
   */
  watch(c3Id, () => {
    // 清空 attrArr
    attrArr.value = []
    // c3Id不存在就不发请求
    if (!c3Id.value) return
    getAttr()
  })

  onBeforeUnmount(() => {
    // 组件销毁前清空仓库数据
    categoryStore.$reset()
  })

  /**
   * 获取分类对应的已有属性及属性值
   */
  async function getAttr() {
    const { c1Id, c2Id, c3Id } = categoryStore

    const res: AttrResponseData = await reqAttr(
      c1Id as number,
      c2Id as number,
      c3Id as number,
    )
    attrArr.value = res.data
  }

  /**
   * 添加属性按钮回调
   */
  function addAttr() {
    // 重置数据
    Object.assign(attrParams, {
      attrName: '',
      attrValueList: [],
      categoryId: c3Id.value, // 收集三级分类id
      id: '',
      categoryLevel: 3, // 代表三级分类
    })
    scene.value = 1
  }

  /**
   * 修改属性按钮回调
   */
  function updateAttr(row: AttrValue) {
    scene.value = 1
    // 赋值显示数据在页面上（深拷贝）
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  }

  /**
   * 取消按钮回调
   */
  function cancel() {
    scene.value = 0
  }
  /**
   * 添加属性值按钮回调
   */
  function addAttrValue() {
    attrParams.attrValueList.push({
      valueName: '',
      flag: true, // 控制属性值的编辑模式和查看模式的切换
    })
    // 获取到更新后的组件实例
    nextTick(() => {
      // input框聚焦
      inputArr.value[inputArr.value.length - 1].focus()
    })
  }

  /**
   * 保存按钮回调
   */
  async function save() {
    // 发送请求
    const res: ResponseData = await reqAddOrUpdateAttr(attrParams)
    if (res.code === 200) {
      await getAttr()
      scene.value = 0
      toastSuccess(attrParams.id ? '修改属性成功' : '添加属性成功')
    } else {
      toastError(attrParams.id ? '修改属性失败' : '添加属性失败')
    }
  }

  /**
   * 属性值表单元素失去焦点
   */
  function toLook(row: AttrValue, $index: number) {
    // 1. 非空情况判断
    if (row.valueName.trim() === '') {
      // 通过数据在数组中的索引值删除数组中对应的数据
      attrParams.attrValueList.splice($index, 1)
      toastWarning('属性值不能为空')
      return
    }

    // 2. 数据重复判断
    const repeat = attrParams.attrValueList.find((item) => {
      // 不要与自己做比较
      if (item !== row) {
        return item.valueName === row.valueName
      }
    })
    if (repeat) {
      // 通过数据在数组中的索引值删除数组中对应的数据
      attrParams.attrValueList.splice($index, 1)
      toastWarning('属性值不能重复')
      return
    }

    // 3. 相应的row的flag变成false查看模式
    row.flag = false
  }

  /**
   * 属性值div点击事件
   */
  function toEdit(row: AttrValue, $index: number) {
    // 相应的row的flag变成true编辑模式
    row.flag = true
    // 获取到更新后的组件实例
    nextTick(() => {
      // 让对应的input框聚焦
      console.log(inputArr.value[$index])
      inputArr.value[$index].focus()
    })
  }

  /**
   * 删除属性
   */
  async function removeAttr(row: Attr) {
    const res: ResponseData = await reqRemoveAttr(row.id as number)
    if (res.code === 200) {
      toastSuccess(`删除属性[${row.attrName}]成功`)
      await getAttr()
    } else {
      toastError(`删除属性[${row.attrName}]失败`)
    }
  }
</script>

<style lang="scss" scoped></style>
