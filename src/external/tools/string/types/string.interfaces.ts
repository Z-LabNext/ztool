export interface FmtAddressStrOptions {
  /**
   * 原始地址字符串
   */
  addressStr: string;
  /**
   * 是否需要分隔
   */
  needSplit?: boolean;
  /**
   * 分隔符
   */
  splitFlag?: string;
  /**
   * 是否需要拼接
   */
  needJoin?: boolean;
  /**
   * 拼接符
   */
  joinFlag?: string;
  /**
   * 额外的字符串数组
   */
  extraStrArr?: string[];
}
