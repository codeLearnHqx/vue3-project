/**
 * 获取当前时间对应的 早、上、下、晚
 */
export default function getTime() {
  let message = ''
  const hours = new Date().getHours()
  if (hours < 9) {
    message = '早上'
  } else if (hours <= 12) {
    message = '上午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
