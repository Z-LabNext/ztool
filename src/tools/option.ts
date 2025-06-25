import { isArray, isPlainObject } from 'lodash-es';
import type {
  Options,
  DataSourceItem,
  FieldsName,
  GetLabelOptions,
} from '../models/option/option.interfaces';
import { DefaultReplaceStr, replaceEmpty } from './string';
import { fmtErrorMsg, warn } from '../utils';

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
  labelMap: Record<DataSourceItem['label'], DataSourceItem> = {};
  /**
   * 值映射为选项
   */
  valueMap: Record<DataSourceItem['value'], DataSourceItem> = {};

  constructor(options: Options) {
    const { dataSource, fieldsName = DefaultFieldsName } = options;
    this.setDataSource(dataSource);
    this.setFieldsName(fieldsName);
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
      if (!(item.label in this.labelMap)) {
        this.labelMap[item.label] = item;
      }
      // 生成valueMap
      if (!(item.value in this.valueMap)) {
        this.valueMap[item.value] = item;
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
   * 获取label
   * @deprecated 推荐使用 getLabelTextByValue
   */
  getLabel(options: GetLabelOptions): string {
    if (!isPlainObject(options)) {
      throw new Error(fmtErrorMsg('getLabel的参数必须是一个对象'));
    }
    const {
      key,
      allowReplaceEmpty = false,
      replaceStr = DefaultReplaceStr,
    } = options;
    const item = this.labelMap[key];
    const label = isPlainObject(item) ? item.label : '';
    if (allowReplaceEmpty) {
      return replaceEmpty(label, replaceStr) as string;
    }
    return label;
  }

  /**
   * 根据value来获取对应的下拉选项
   */
  getItemByValue(value: DataSourceItem['value']): DataSourceItem | undefined {
    return this.valueMap[value];
  }

  /**
   * 根据label来获取对应的下拉选项
   */
  getItemByLabel(label: DataSourceItem['label']): DataSourceItem | undefined {
    return this.labelMap[label];
  }

  /**
   * 根据value来获取对应的label文本
   */
  getLabelTextByValue(
    value: DataSourceItem['value'],
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
    this.setDataSource(dataSource);
    this.setFieldsName(fieldsName);
  }
}
