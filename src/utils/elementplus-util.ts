import { ElMessage, ElNotification } from 'element-plus'
import type { EpPropMergeType } from 'element-plus/es/utils/vue/props/types'

//**************************************中间消息******************************************* */
/**
 *
 * @param msg 提示的内容
 * @param type 提示的类型
 */
function showToast(
  msg: string,
  type: EpPropMergeType<
    StringConstructor,
    'success' | 'warning' | 'info' | 'error',
    unknown
  >,
) {
  ElMessage({
    message: msg,
    type,
  })
}

function toastSuccess(msg: string) {
  showToast(msg, 'success')
}
function toastWarning(msg: string) {
  showToast(msg, 'warning')
}
function toastInfo(msg: string) {
  showToast(msg, 'info')
}
function toastError(msg: string) {
  showToast(msg, 'error')
}

//**************************************右侧消息******************************************* */

/**
 *
 * @param msg 提示的内容
 * @param type 提示的类型
 */
function showNotification(
  msg: string,
  type: EpPropMergeType<
    StringConstructor,
    'success' | 'warning' | 'info' | 'error',
    unknown
  >,
  title?: string,
) {
  ElNotification({
    message: msg,
    type,
    title: title,
  })
}

function notificationSuccess(msg: string, title?: string) {
  showNotification(msg, 'success', title)
}
function notificationWarning(msg: string, title?: string) {
  showNotification(msg, 'warning', title)
}
function notificationInfo(msg: string, title?: string) {
  showNotification(msg, 'info', title)
}
function notificationError(msg: string, title?: string) {
  showNotification(msg, 'error', title)
}

export {
  toastSuccess,
  toastWarning,
  toastInfo,
  toastError,
  notificationSuccess,
  notificationWarning,
  notificationInfo,
  notificationError,
}
