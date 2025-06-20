import { cloneDeep, isArray, isPlainObject } from 'lodash-es';
import type {
  LabelMap,
  Options,
  DataSourceItem,
  FieldsName,
  GetLabelOptions,
} from '../models/option/option.interfaces';
import { DefaultReplaceStr, replaceEmpty } from './string';
import { warn } from '../utils';

export const DefaultFieldsName: FieldsName = { label: 'label', value: 'value' };

export class Option {
  dataSource: DataSourceItem[] = [];
  fieldsName: FieldsName = DefaultFieldsName;

  constructor(options: Options) {
    const { dataSource, fieldsName } = options;
    this.dataSource = isArray(dataSource) ? cloneDeep(dataSource) : [];
    this.fieldsName = isPlainObject(fieldsName)
      ? (fieldsName as FieldsName)
      : DefaultFieldsName;
  }

  /**
   * 获取下拉选项
   */
  get options(): DataSourceItem[] {
    return this.dataSource;
  }

  /**
   * 获取label映射对象
   */
  get labelMap(): LabelMap {
    const map: Record<DataSourceItem['value'], DataSourceItem['label']> = {};
    this.dataSource.forEach((item) => {
      if (this.fieldsName.value in item && this.fieldsName.label in item) {
        const key = item[this.fieldsName.value as keyof typeof item];
        const label = item[
          this.fieldsName.label as keyof typeof item
        ] as DataSourceItem['label'];
        map[key] = label;
      }
    });
    return map;
  }

  /**
   * 获取label
   */
  getLabel(options: GetLabelOptions): string {
    if (!isPlainObject(options)) {
      warn('getLabel的参数必须是一个对象');
    }
    const {
      key,
      allowReplaceEmpty = false,
      replaceStr = DefaultReplaceStr,
    } = options;
    const label = this.labelMap[key];
    return allowReplaceEmpty
      ? (replaceEmpty(label, replaceStr) as string)
      : label;
  }

  /**
   * 更新
   */
  update(options: Options): void {
    if (!isPlainObject(options)) {
      warn('update的参数必须是一个对象');
    }
    const { dataSource, fieldsName } = options;
    if (isArray(dataSource)) {
      this.dataSource = cloneDeep(dataSource);
    }
    if (isPlainObject(fieldsName)) {
      this.fieldsName = fieldsName as FieldsName;
    }
  }
}
