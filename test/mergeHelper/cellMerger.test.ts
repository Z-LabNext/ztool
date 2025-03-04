import { test, expect } from 'vitest';
import { isNumber, isPlainObject, isString } from 'lodash-es';
import { CellMerger } from '../../src/main';
import type {
  CellMergerOptions,
  DataSourceItem,
} from '../../src/models/mergeHelper/cellMerger/cellMerger.types';
import {
  MERGE_OPTS_KEY,
  SORT_NO_KEY,
} from '../../src/models/mergeHelper/cellMerger/cellMerger.constants';
import data from '../../examples/mergeHelper/data.json';
import { Mode, getFieldSpan, getMergedData, getSortNo } from '../../src/main';

const validMergedData = (mergedData: DataSourceItem[]): boolean => {
  const result = mergedData.every((item) => {
    const obj = isPlainObject(item) ? item[MERGE_OPTS_KEY] : null;
    const isValid =
      obj != null &&
      Object.keys(obj as Record<string, unknown>).length ===
        data.columns.length;
    return isValid;
  });
  return result;
};

const validMergedDataSort = (
  mergedData: DataSourceItem[],
  sortBy?: string,
): boolean => {
  if (!isString(sortBy)) {
    return false;
  }
  const result = mergedData
    .filter((item) => item[MERGE_OPTS_KEY][sortBy].rowspan !== 0)
    .every((item) => isNumber(item[SORT_NO_KEY]));
  return result;
};

test('指定字段合并', () => {
  const options: CellMergerOptions = {
    mode: Mode.Row,
    dataSource: data.dataSource,
    mergeFields: data.columns.map((item) => item.prop),
  };
  const cellMerger = new CellMerger(options);
  const mergedData = cellMerger.getMergedData();
  const result = validMergedData(mergedData);
  expect(result).toEqual(true);
});

test('指定字段对象合并', () => {
  const options: CellMergerOptions = {
    mode: Mode.Row,
    dataSource: data.dataSource,
    mergeFields: data.columns.map((item) => {
      if (item.prop === 'province') {
        return {
          field: 'province',
          callback(curItem, nextItem) {
            return (
              curItem.name === nextItem.name &&
              curItem.province === nextItem.province
            );
          },
        };
      }
      return item.prop;
    }),
  };
  const cellMerger = new CellMerger(options);
  const mergedData = cellMerger.getMergedData();
  const result = validMergedData(mergedData);
  expect(result).toEqual(true);
});

test('自动生成序号', () => {
  const options: CellMergerOptions = {
    mode: Mode.Row,
    dataSource: data.dataSource,
    mergeFields: data.columns.map((item) => item.prop),
    genSort: true,
  };
  const cellMerger = new CellMerger(options);
  const mergedData = cellMerger.getMergedData();
  const result = validMergedDataSort(mergedData, data.columns[0].prop);
  expect(result).toEqual(true);
});

test('不生成序号', () => {
  const cellMerger = new CellMerger({
    mode: Mode.Row,
    dataSource: data.dataSource,
    mergeFields: data.columns.map((item) => item.prop),
  });
  const mergedData = cellMerger.getMergedData();
  const result = mergedData.every((item) => {
    return !isNumber(item[SORT_NO_KEY]);
  });
  expect(result).toEqual(true);
});

test('列合并', () => {
  const options: CellMergerOptions = {
    mode: Mode.Col,
    dataSource: data.dataSource,
    mergeFields: data.columns.map((item) => {
      if (item.prop === 'province') {
        return {
          field: 'province',
          callback(curItem, nextItem) {
            return (
              curItem.name === nextItem.name &&
              curItem.province === nextItem.province
            );
          },
        };
      }
      return item.prop;
    }),
    genSort: true,
    columns: data.columns,
  };
  const cellMerger = new CellMerger(options);
  const mergedData = cellMerger.getMergedData();
  const result = validMergedData(mergedData);

  expect(result).toEqual(true);
});

test('获取行字段的合并配置', () => {
  const options: CellMergerOptions = {
    mode: Mode.Col,
    dataSource: data.dataSource,
    mergeFields: data.columns.map((item) => {
      if (item.prop === 'province') {
        return {
          field: 'province',
          callback(curItem, nextItem) {
            return (
              curItem.name === nextItem.name &&
              curItem.province === nextItem.province
            );
          },
        };
      }
      return item.prop;
    }),
    genSort: true,
    columns: data.columns,
  };
  const cellMerger = new CellMerger(options);
  const mergedData = cellMerger.getMergedData();
  const fieldSpan = getFieldSpan(mergedData[0], 'province');
  expect(fieldSpan).toEqual({ rowspan: 1, colspan: 1 });
});

test('传入参数直接获取合并后的数据', () => {
  const options: CellMergerOptions = {
    mode: Mode.Col,
    dataSource: data.dataSource,
    mergeFields: data.columns.map((item) => {
      if (item.prop === 'province') {
        return {
          field: 'province',
          callback(curItem, nextItem) {
            return (
              curItem.name === nextItem.name &&
              curItem.province === nextItem.province
            );
          },
        };
      }
      return item.prop;
    }),
    genSort: true,
    columns: data.columns,
  };
  const mergedData = getMergedData(options);
  const result = validMergedData(mergedData);
  expect(result).toEqual(true);
});

test('获取排序号', () => {
  const options: CellMergerOptions = {
    mode: Mode.Row,
    dataSource: data.dataSource,
    mergeFields: data.columns.map((item) => {
      if (item.prop === 'province') {
        return {
          field: 'province',
          callback(curItem, nextItem) {
            return (
              curItem.name === nextItem.name &&
              curItem.province === nextItem.province
            );
          },
        };
      }
      return item.prop;
    }),
    genSort: true,
    columns: data.columns,
  };

  const mergedData = getMergedData(options);

  const result = validMergedData(mergedData);

  const flag = getSortNo(mergedData[0]) === 1;

  expect(result && flag).toBe(true);
});
