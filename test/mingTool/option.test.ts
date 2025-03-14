import { describe, test, expect } from 'vitest';
import { DefaultReplaceStr, Option } from '../../src/main';

describe('option', () => {
  const dataSource = [
    {
      label: '关闭',
      value: 0,
    },
    {
      label: '开启',
      value: 1,
    },
    {
      label: '暂停',
      value: 2,
    },
  ];
  const option = new Option({
    dataSource,
  });

  test('克隆数据源', () => {
    expect(dataSource === option.options).toBe(false);
  });

  test('下拉选项', () => {
    expect(JSON.stringify(dataSource) === JSON.stringify(option.options)).toBe(
      true,
    );
  });

  test('value映射为label', () => {
    const labelKeys = dataSource.map((item) => item.value);
    for (const key in option.labelMap) {
      expect(labelKeys.includes(Number(key))).toBe(true);
    }
  });

  test('更新数据源', () => {
    dataSource.push({
      label: '测试',
      value: 3,
    });
    option.update({
      dataSource,
    });

    expect(dataSource.length === option.options.length).toBe(true);
  });

  test('未匹配到label时, 返回空值替换字符', () => {
    const emptyDataSource = [
      {
        label: '选项1',
        value: 0,
      },
    ];
    const options = new Option({
      dataSource: emptyDataSource,
    });

    const result = options.getLabel({ key: 'foo', allowReplaceEmpty: true });

    expect(result).toBe(DefaultReplaceStr);
  });
});
