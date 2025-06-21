import { isArray, isNumber, isPlainObject, isString } from 'lodash-es';
import {
  type SplitDateRangeReturn,
  type SplitDateRangeOptions,
  type CombineDateRangeOptions,
  type CombineDateRangeReturn,
} from '../models/params/params.interfaces';
import { warn } from '../utils';
import { DEFAULT_FIELDS } from '../models/params/params.constants';

const JOIN_FLAG = ',';
const SPLIT_FLAG = JOIN_FLAG;

/**
 * 检查日期值是否有效
 */
function checkDateValue(dateValue: unknown): dateValue is string | number {
  return isString(dateValue) || isNumber(dateValue);
}

/**
 * 拆分日期区间
 */
export function splitDateRange(
  options: SplitDateRangeOptions,
): SplitDateRangeReturn {
  if (!isPlainObject(options)) {
    warn('options必须是一个对象');
    return {};
  }
  const {
    dateRange,
    outStartField = DEFAULT_FIELDS.startDate,
    outEndField = DEFAULT_FIELDS.endDate,
    defaultValue = null,
  } = options;
  const result = {
    [outStartField]: defaultValue,
    [outEndField]: defaultValue,
  };
  if (!isArray(dateRange) || dateRange.length !== 2) {
    return result;
  }
  result[outStartField] = dateRange[0];
  result[outEndField] = dateRange[1];
  return result;
}

/**
 * 组合日期区间
 */
export function combineDateRange(
  options: CombineDateRangeOptions,
): CombineDateRangeReturn {
  const result: CombineDateRangeReturn = [];
  if (!isPlainObject(options)) {
    warn('options必须是一个对象');
    return result;
  }
  const {
    obj,
    inStartField = DEFAULT_FIELDS.startDate,
    inEndField = DEFAULT_FIELDS.endDate,
  } = options;
  if (!isPlainObject(obj)) {
    warn('obj必须是一个对象');
    return result;
  }
  const startDateValue = obj[inStartField];
  const endDateValue = obj[inEndField];
  if (!checkDateValue(startDateValue) || !checkDateValue(endDateValue)) {
    return result;
  }
  result.push(startDateValue);
  result.push(endDateValue);
  return result;
}

/**
 * 数组拼接为字符串
 * @param arr - 原始数组
 * @param joinFlag - 拼接符号
 * @param defaultValue - 默认值
 */
export function arrToStr(
  arr: unknown[],
  joinFlag?: string,
  defaultValue?: string,
): string {
  if (!isArray(arr)) {
    return defaultValue || '';
  }
  return isString(joinFlag) ? arr.join(joinFlag) : arr.join(JOIN_FLAG);
}

/**
 * 字符拆分为数组
 * @param str - 原始字符串
 * @param splitFlag - 拆分符号
 * @param defaultValue - 默认值
 */
export function strToArr(
  str: string,
  splitFlag?: string,
  defaultValue?: unknown[],
) {
  if (!isString(str) || str.trim() === '') {
    return defaultValue || [];
  }
  return isString(splitFlag) ? str.split(splitFlag) : str.split(SPLIT_FLAG);
}
