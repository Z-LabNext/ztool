import { describe, test, expect } from 'vitest';
import { DefaultReplaceStr, Option } from '../../src/main';
import { DataSourceItem } from '../../src/models/option/option.interfaces';

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

  test('下拉选项', () => {
    expect(dataSource).toEqual(option.options);
  });

  test('value映射为label文本', () => {
    const labels: DataSourceItem['label'][] = [];
    const values: DataSourceItem['value'][] = [];
    dataSource.forEach((item) => {
      labels.push(item.label);
      values.push(item.value);
    });
    const result = values.map((value, index) => {
      return option.getLabelTextByValue(value) === labels[index];
    });
    expect(result.indexOf(false) === -1).toBe(true);
  });

  test('value映射为下拉选项', () => {
    const values = dataSource.map((item) => item.value);
    const result = values.map((value, index) => {
      const item = option.getItemByValue(value);
      return item === option.options[index];
    });
    expect(result.indexOf(false) === -1).toBe(true);
  });

  test('label映射为下拉选项', () => {
    const labels = dataSource.map((item) => item.label);
    const result = labels.map((label, index) => {
      const item = option.getItemByLabel(label);
      return item === option.options[index];
    });
    expect(result.indexOf(false) === -1).toBe(true);
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
    const result = options.getLabelTextByValue('foo', true);
    expect(result).toBe(DefaultReplaceStr);
  });
});
