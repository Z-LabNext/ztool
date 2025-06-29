import { isFunction } from 'lodash-es';
import {
  ErrorTrapGlobalConfig,
  ErrorTrapOptions,
} from './types/errorTrap.interfaces';
import { fmtErrorMsg } from '@/utils';

/**
 * 接口错误捕获器_全局配置
 */
let errorTrapGlobalConfig: ErrorTrapGlobalConfig = {};

/**
 * 接口错误捕获器
 * @param options - 配置选项
 * @returns {boolean} - 有错误: true; 无错误: false
 */
export function errorTrap(options: ErrorTrapOptions): boolean | undefined {
  const {
    code,
    message,
    successCode = errorTrapGlobalConfig.successCode,
    successCallback = errorTrapGlobalConfig.successCallback,
    errorCode = errorTrapGlobalConfig.errorCode,
    errorCallback = errorTrapGlobalConfig.errorCallback,
  } = options;

  if (!isFunction(errorCallback)) {
    throw new Error(fmtErrorMsg('errorCallback必须是函数类型'));
  }

  if (!isFunction(successCallback)) {
    throw new Error(fmtErrorMsg('successCallback必须是函数类型'));
  }

  // 接口返回失败
  if (code === errorCode) {
    errorCallback(code, message);
    return true;
  }

  // 接口返回成功
  if (code === successCode) {
    successCallback(code, message);
    return false;
  }

  // 异常code
  throw new Error(fmtErrorMsg(`未知的code类型: ${code}`));
}

/**
 * 设置_接口错误捕获器_全局配置
 */
export function setErrorTrapGlobalConfig(globalConfig: ErrorTrapGlobalConfig) {
  errorTrapGlobalConfig = globalConfig;
}
