/**
 * 打印警告
 */
export function warn(msg: string): void {
  console.warn(fmtErrorMsg(msg));
}

/**
 * 格式化错误消息
 * @param msg - 原始错误信息
 */
export function fmtErrorMsg(msg: string): string {
  return `[${__APP_NAME__} v${__APP_VERSION__}] ${msg}`;
}
