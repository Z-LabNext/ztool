import { describe, test, expect } from 'vitest';
import {
  combineDateRange,
  splitDateRange,
} from '../../src/mingTool/params/index';

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
});
