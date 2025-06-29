import { describe, test, expect } from 'vitest';
import { DefaultReplaceStr, replaceEmpty, fmtAddressStr } from '@/main';

describe('string', () => {
  test('空值替换_遍历', () => {
    const arr = [null, undefined, ''];
    arr.forEach((item) => {
      expect(replaceEmpty(item)).toBe(DefaultReplaceStr);
    });
  });

  test('空值替换_单个', () => {
    expect(replaceEmpty()).toBe(DefaultReplaceStr);
  });

  test('地址格式化_空白拼接', () => {
    const result = fmtAddressStr({
      addressStr: '山东省,青岛市,崂山区',
      needSplit: true,
      needJoin: true,
      extraStrArr: ['xx街道xx号'],
      joinFlag: '',
    });
    const matchResult = '山东省青岛市崂山区xx街道xx号';
    expect(result).toEqual(matchResult);
  });

  test('地址格式化_逗号拼接', () => {
    const result = fmtAddressStr({
      addressStr: '山东省,青岛市,崂山区',
      needSplit: true,
      needJoin: true,
      extraStrArr: ['xx街道xx号'],
    });
    const matchResult = '山东省,青岛市,崂山区,xx街道xx号';
    expect(result).toEqual(matchResult);
  });

  test('地址格式化_空前缀地址', () => {
    const result = fmtAddressStr({
      addressStr: '',
      extraStrArr: ['xx街道xx号'],
    });
    const matchResult = 'xx街道xx号';
    expect(result).toEqual(matchResult);
  });

  test('地址格式化_空详情地址', () => {
    const result = fmtAddressStr({
      addressStr: '山东省,青岛市,崂山区',
      needSplit: true,
      needJoin: true,
      extraStrArr: [],
    });
    const matchResult = '山东省,青岛市,崂山区';
    expect(result).toEqual(matchResult);
  });
});
