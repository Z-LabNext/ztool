import { describe, test, expect } from 'vitest';
import {
  arrToStr,
  combineDateRange,
  splitDateRange,
  strToArr,
} from '../../src/tools/params';

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

  test('空数组转字符串', () => {
    const arr = [];
    const str = arrToStr(arr);
    expect(str).toBe('');
  });

  test('字符串转数组', () => {
    const targetArr = ['a', 'b', 'c'];
    const str = 'a,b,c';
    const arr = strToArr(str);
    const result: boolean[] = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(arr[i] === targetArr[i]);
    }
    expect(result.indexOf(false) === -1).toBe(true);
  });

  test('空字符串转数组', () => {
    const targetArr = [];
    const str = '';
    const arr = strToArr(str);
    const result: boolean[] = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(arr[i] === targetArr[i]);
    }
    expect(result.indexOf(false) === -1).toBe(false);
  });
});
