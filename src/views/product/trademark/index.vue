<template>
  <div>
    <el-card>
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button
        type="primary"
        size="default"
        @click="addTradeMark"
        icon="Plus"
      >
        添加品牌
      </el-button>
      <!-- 表格组件 -->
      <el-table
        style="margin: 10px 0"
        :data="trademarkArr"
        v-loading="tbLoading"
        border
        stripe
      >
        <el-table-column
          label="序号"
          width="100px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO" prop="logoUrl">
          <template #default="{ row }">
            <img
              style="width: 50px; height: 50px"
              :src="row.logoUrl"
              alt="未有图片"
            />
          </template>
        </el-table-column>
        <el-table-column width="250px" label="操作">
          <template #default="{ row }">
            <el-button
              type="warning"
              size="default"
              @click="updateTradeMark(row)"
              icon="Edit"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`您确定要删除${row.tmName}？`"
              icon="Delete"
              icon-color="red"
              width="180px"
              @confirm="removeTrademark(row)"
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
      <!-- 分页器组件 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 10, 20]"
        layout="prev, pager, next, jumper,->, sizes, total"
        :total="total"
        @current-change="changePageNo"
        @size-change="changePageSize"
        background
      />
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkFormData.id ? '修改品牌' : '添加品牌'"
      width="600"
    >
      <el-form ref="formRef" :model="trademarkFormData" :rules="rules">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            v-model="trademarkFormData.tmName"
            placeholder="请您输入品牌名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
          >
            <img
              class="avatar"
              v-if="trademarkFormData.logoUrl"
              :src="trademarkFormData.logoUrl"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="comfirm">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import {
    reqAddTradeMark,
    reqHasTrademark,
    reqRemoveTradeMark,
    reqUpdateTradeMark,
  } from '@/api/product/trademark'
  import {
    Records,
    TradeMark,
    TradeMarkResponseData,
  } from '@/api/product/trademark/type'
  import { toastError, toastSuccess } from '@/utils/elementplus-util'
  import { FormInstance, UploadProps } from 'element-plus'
  import { onMounted, reactive, ref } from 'vue'

  const pageNo = ref<number>(1) // 当前页码
  const pageSize = ref<number>(3) // 每页显示数据条数
  const total = ref<number>(0) // 数据总条数
  const trademarkArr = ref<Records>([]) // 品牌分页数据
  const dialogFormVisible = ref<boolean>(false) // 对话框显示与隐藏
  const tbLoading = ref<boolean>(true) // 表格加载
  const formRef = ref<FormInstance>() // 表单实例对象
  // 新增表单数据
  const trademarkFormData = reactive<TradeMark>({
    id: undefined,
    tmName: '',
    logoUrl: '',
  })

  // 表单校验规则对象
  const rules = reactive({
    tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
    // 这个图片上传的校验触发方式写不写都无所谓
    logoUrl: [{ required: true, validator: validatorLogoUrl }],
  })

  /**
   * 品牌名称自定义校验规则方法
   */
  function validatorTmName(rule: any, value: any, callback: any) {
    if (value.trim().length >= 2) {
      callback()
    } else {
      callback(new Error('品牌名称位数需要大于等于两位'))
    }
  }
  function validatorLogoUrl(rule: any, value: any, callback: any) {
    // value 是图片上传后的地址
    if (value) {
      callback()
    } else {
      callback(new Error('LOGO图片必须要上传'))
    }
  }

  /**
   * 获取品牌分页数据
   */
  async function getHasTrademark() {
    try {
      const res: TradeMarkResponseData = await reqHasTrademark(
        pageNo.value,
        pageSize.value,
      )
      if (res.code === 200) {
        total.value = res.data.total
        trademarkArr.value = res.data.records
      }
    } catch (error) {
      toastError(error as string)
    } finally {
      tbLoading.value = false
    }
  }
  /**
   * 页面挂载时触发
   */
  onMounted(() => {
    getHasTrademark()
  })

  /**
   * 切换页码回调
   */
  function changePageNo() {
    getHasTrademark()
  }
  /**
   * 切换每页数目回调
   */
  function changePageSize() {
    getHasTrademark()
  }

  /**
   * 清空表单数据
   */
  function clearFormData() {
    // 重置表单数据
    Object.assign(trademarkFormData, {
      id: undefined,
      tmName: '',
      logoUrl: '',
    })
    // 清理表单字段验证的所有提示信息
    formRef.value?.clearValidate()
  }

  /**
   * 添加品牌按钮回调
   */
  function addTradeMark() {
    dialogFormVisible.value = true
    clearFormData()
  }
  /**
   * 编辑品牌按钮回调
   */
  function updateTradeMark(row: TradeMark) {
    dialogFormVisible.value = true
    clearFormData()
    // 将需要修改的品牌数据对象赋值给表单数据对象展示在页面上
    trademarkFormData.id = row.id
    trademarkFormData.logoUrl = row.logoUrl
    trademarkFormData.tmName = row.tmName
  }
  /**
   * 对话框取消
   */
  function cancel() {
    dialogFormVisible.value = false
    clearFormData()
  }
  /**
   * 对话框确认
   */
  async function comfirm() {
    // 表单校验
    try {
      await formRef.value?.validate()
    } catch (error) {
      console.log('校验未通过')
      return
    }
    dialogFormVisible.value = true
    let res: any = {}
    if (!trademarkFormData.id) {
      res = await reqAddTradeMark(trademarkFormData)
    } else {
      res = await reqUpdateTradeMark(trademarkFormData)
    }
    if (res.code === 200) {
      dialogFormVisible.value = false
      toastSuccess(trademarkFormData.id ? '修改品牌成功' : '添加品牌成功')
      // 重新获取所有品牌数据
      getHasTrademark()
    } else {
      toastError(trademarkFormData.id ? '修改品牌失败' : '添加品牌失败')
    }
  }
  /**
   * 上传文件之前的钩子，参数为上传的文件
   */
  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // 限制上传文件的格式和大小
    if (
      rawFile.type === 'image/png' ||
      rawFile.type === 'image/jpeg' ||
      rawFile.type === 'image/gif'
    ) {
      // 文件需要小于 4M
      if (rawFile.size / 1024 / 1024 < 4) {
        return true
      } else {
        return false
      }
    } else {
      toastError('上传的文件格式必须是PNG|JPG|GIF')
      return false
    }
  }
  /**
   * 文件上传成功的钩子
   */
  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    trademarkFormData.logoUrl = response.data
    // 清理logoUrl表单验证的提示信息
    formRef.value?.clearValidate(['logoUrl'])
  }
  /**
   * 删除按钮气泡确认框确认回调
   */
  async function removeTrademark(row: TradeMark) {
    const res: any = await reqRemoveTradeMark(row.id as number)
    if (res.code === 200) {
      toastSuccess(`删除${row.tmName}成功`)
      getHasTrademark()
    } else {
      toastError(`删除${row.tmName}失败`)
    }
  }
</script>

<style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader :deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
  }

  :deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>
