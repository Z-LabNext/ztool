import { isArray, isPlainObject } from 'lodash-es';
import type { Options, FieldsName } from './types/option.interfaces';
import { DefaultReplaceStr, replaceEmpty } from '../string';
import { fmtErrorMsg } from '@/utils';
import { DataSourceItem } from '@/external/merger/types/merger.types';

export const DefaultFieldsName: FieldsName = { label: 'label', value: 'value' };

export class Option {
  /**
   * 数据源
   */
  dataSource: DataSourceItem[] = [];
  /**
   * label、value对应的字段名
   */
  fieldsName: FieldsName = DefaultFieldsName;
  /**
   * 标签映射为选项
   */
  labelMap: Record<string, DataSourceItem> = {};
  /**
   * 值映射为选项
   */
  valueMap: Record<string, DataSourceItem> = {};

  constructor(options: Options) {
    const { dataSource, fieldsName = DefaultFieldsName } = options;
    this.setFieldsName(fieldsName);
    this.setDataSource(dataSource);
  }

  get labelKey() {
    return this.fieldsName.label;
  }

  get valueKey() {
    return this.fieldsName.value;
  }

  /**
   * 获取下拉选项
   */
  get options(): DataSourceItem[] {
    return this.dataSource;
  }

  /**
   * 设置dataSource
   */
  setDataSource(newDataSource: DataSourceItem[]) {
    this.labelMap = {};
    this.valueMap = {};

    if (!isArray(newDataSource)) {
      throw new Error(fmtErrorMsg('newDataSource必须为数组类型'));
    }
    if (newDataSource.length < 1) {
      return;
    }
    for (let i = 0; i < newDataSource.length; i++) {
      const item = newDataSource[i];
      // 生成labelMap
      const labelStr = item[this.labelKey] as string;
      if (!(labelStr in this.labelMap)) {
        this.labelMap[labelStr] = item;
      }
      // 生成valueMap
      const valueStr = item[this.valueKey] as string;
      if (!(valueStr in this.valueMap)) {
        this.valueMap[valueStr] = item;
      }
    }
    this.dataSource = newDataSource;
  }

  /**
   * 设置fieldsName
   */
  setFieldsName(newFieldsName: FieldsName) {
    if (!isPlainObject(newFieldsName)) {
      return;
    }
    this.fieldsName = newFieldsName;
  }

  /**
   * 根据value来获取对应的下拉选项
   */
  getItemByValue(
    value: DataSourceItem[keyof DataSourceItem],
  ): DataSourceItem | undefined {
    return this.valueMap[value];
  }

  /**
   * 根据label来获取对应的下拉选项
   */
  getItemByLabel(
    label: DataSourceItem[keyof DataSourceItem],
  ): DataSourceItem | undefined {
    return this.labelMap[label];
  }

  /**
   * 根据value来获取对应的label文本
   */
  getLabelTextByValue(
    value: DataSourceItem[keyof DataSourceItem],
    allowReplaceEmpty = false,
    replaceStr = DefaultReplaceStr,
  ): DataSourceItem['label'] {
    const item = this.getItemByValue(value);
    if (!item) {
      return allowReplaceEmpty
        ? (replaceEmpty('', replaceStr) as DataSourceItem['label'])
        : '';
    }
    return item.label;
  }

  /**
   * 更新
   */
  update(options: Options): void {
    if (!isPlainObject(options)) {
      throw new Error(fmtErrorMsg('update的参数必须是一个对象'));
    }
    const { dataSource, fieldsName = DefaultFieldsName } = options;
    this.setFieldsName(fieldsName);
    this.setDataSource(dataSource);
  }
}
