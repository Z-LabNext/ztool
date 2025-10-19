import { warn } from '@/utils';
import { isArray, isString } from 'lodash-es';

/**
 * 数组转JSON字符串
 */
export function arrayTojson(arr: unknown[]): string {
  try {
    if (!isArray(arr)) {
      warn('arr必须是数组');
      return arr;
    }
    return JSON.stringify(arr);
  } catch (e: any) {
    warn(e.message);
    return '[]';
  }
}

/**
 * JSON字符串转数组
 */
export function jsonToArray(jsonStr: string): unknown[] {
  try {
    if (!isString(jsonStr)) {
      warn('jsonStr必须是字符串');
      return jsonStr;
    }

    // 匹配合法的数组字符串
    if (jsonStr.startsWith('[') && jsonStr.endsWith(']')) {
      return JSON.parse(jsonStr);
    }

    warn('jsonStr不是合法的数组字符串');
    return [];
  } catch (e: any) {
    warn(e.message);
    return [];
  }
}
