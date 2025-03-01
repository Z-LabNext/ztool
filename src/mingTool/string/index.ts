import { isArray, isPlainObject, isString } from 'lodash-es';
import { type FmtAddressStrOptions } from '../../models/mingTool/string/string.interfaces';
import { warn } from '../../utils/warning';

export const DefaultReplaceStr = '--';
export const DefaultSplitStr = ',';

/**
 * 空值替换
 */
export function replaceEmpty(
  str?: unknown,
  replaceStr: string = DefaultReplaceStr,
): unknown {
  if (str === null || str === undefined || str === '') {
    return replaceStr;
  }
  return str;
}

/**
 * 格式化地址字符串
 */
export function fmtAddressStr(
  options: FmtAddressStrOptions,
): string | string[] {
  if (!isPlainObject(options)) {
    warn('options必须是一个对象');
  }
  const {
    addressStr,
    needSplit = true,
    splitFlag = DefaultSplitStr,
    needJoin = true,
    joinFlag = DefaultSplitStr,
    extraStrArr = [],
  } = options;
  if (!isString(addressStr)) {
    warn('addressStr必须是一个字符串');
    return addressStr;
  }
  let addressArr: string[] = [];
  if (needSplit) {
    addressArr = addressStr.split(splitFlag).filter((item) => item !== '');
  }
  if (isArray(extraStrArr)) {
    addressArr.push(...extraStrArr);
  } else {
    warn('extraStrArr必须是一个数组');
  }
  if (needJoin) {
    return addressArr.join(joinFlag);
  }
  return addressArr;
}
