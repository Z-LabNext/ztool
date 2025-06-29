export interface ErrorTrapOptions {
  /**
   * 接口返回标识
   */
  code: number;
  /**
   * 接口返回信息
   */
  message: string;
  /**
   * 接口成功标识
   */
  successCode?: number;
  /**
   * 接口返回成功回调
   */
  successCallback?: (
    code: ErrorTrapOptions['code'],
    message: ErrorTrapOptions['message'],
  ) => unknown;
  /**
   * 接口失败标识
   */
  errorCode?: number;
  /**
   * 接口返回失败回调
   */
  errorCallback?: (
    code: ErrorTrapOptions['code'],
    message: ErrorTrapOptions['message'],
  ) => unknown;
}

export interface ErrorTrapGlobalConfig {
  successCode?: ErrorTrapOptions['successCode'];
  successCallback?: ErrorTrapOptions['successCallback'];
  errorCode?: ErrorTrapOptions['errorCode'];
  errorCallback?: ErrorTrapOptions['errorCallback'];
}
