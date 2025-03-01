/**
 * 拆分日期区间_传参
 */
export interface SplitDateRangeOptions {
  /**
   * 日期区间
   */
  dateRange: string[];
  /**
   * 输出的开始日期字段
   */
  outStartField?: string;
  /**
   * 输出的结束日期字段
   */
  outEndField?: string;
  /**
   * 默认值
   */
  defaultValue?: string | null;
}

/**
 * 拆分日期区间_返回值
 */
export type SplitDateRangeReturn = Record<string, string | null>;

/**
 * 组合日期区间_传参
 */
export interface CombineDateRangeOptions {
  /**
   * 对象参数
   */
  obj: Record<string, string | null>;
  /**
   * 输入的开始日期字段
   */
  inStartField: string;
  /**
   * 输入的结束日期字段
   */
  inEndField: string;
}

/**
 * 组合日期区间_返回值
 */
export type CombineDateRangeReturn = Array<string | number>;
