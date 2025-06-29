import { describe, test, expect } from 'vitest';
import {
  arrToStr,
  combineDateRange,
  splitDateRange,
  strToArr,
} from '@/external/tools/params';

describe('params', () => {
  test('拆分日期区间', () => {
    const result = splitDateRange({
      dateRange: ['2022-01-01', '2022-01-02'],
      defaultValue: null,
      outStartField: 'startDate',
      outEndField: 'endDate',
    });
    expect({ startDate: '2022-01-01', endDate: '2022-01-02' }).toMatchObject(
      result,
    );
  });

  test('拆分日期区间_默认值', () => {
    const result = splitDateRange({
      dateRange: [],
      defaultValue: '',
      outStartField: 'startDate',
      outEndField: 'endDate',
    });
    expect({ startDate: '', endDate: '' }).toMatchObject(result);
  });

  test('拆分日期区间_默认值_非必填', () => {
    const result = splitDateRange({
      dateRange: [],
      outStartField: 'startDate',
      outEndField: 'endDate',
    });
    expect({ startDate: null, endDate: null }).toMatchObject(result);
  });

  test('组合日期区间', () => {
    const result = combineDateRange({
      inStartField: 'startDate',
      inEndField: 'endDate',
      obj: { startDate: '2022-01-01', endDate: '2022-01-02' },
    });
    expect(['2022-01-01', '2022-01-02']).toMatchObject(result);
  });

  test('数组转字符串', () => {
    const arr = ['a', 'b', 'c'];
    const str = arrToStr(arr);
    expect(str).toBe('a,b,c');
  });

  test('数组转字符串(自定义默认值)', () => {
    const obj: any = undefined;
    const str = arrToStr(obj, ',', '[]');
    expect(str).toBe('[]');
  });

  test('空数组转字符串', () => {
    const arr: string[] = [];
    const str = arrToStr(arr);
    expect(str).toBe('');
  });

  test('非数组类型转字符串', () => {
    const values = [undefined, null, 1, '1', true, false];
    for (let i = 0; i < values.length; i++) {
      const str = arrToStr(values[i] as any);
      expect(str).toBe('');
    }
  });

  test('字符串转数组', () => {
    const targetArr = ['a', 'b', 'c'];
    const str = 'a,b,c';
    const arr = strToArr(str);
    expect(arr).toEqual(targetArr);
  });

  test('字符串转数组(自定义默认值)', () => {
    const str: any = undefined;
    const arr = strToArr(str, ',', [1]);
    expect(arr).toEqual([1]);
  });

  test('空字符串转数组', () => {
    const targetArr: unknown[] = [];
    const str = '';
    const arr = strToArr(str);
    expect(arr).toEqual(targetArr);
  });

  test('非字符串类型转数组', () => {
    const values = [undefined, null, 1, true, false];
    for (let i = 0; i < values.length; i++) {
      const arr = strToArr(values[i] as any);
      expect(arr.length).toBe(0);
    }
  });
});
