import { DataSourceItem } from '@/external/merger/types/merger.types';

export interface FieldsName {
  label: string;
  value: string;
}

export interface Options {
  /**
   * 原始下拉选项
   */
  dataSource: DataSourceItem[];
  /**
   * 字段名
   */
  fieldsName?: FieldsName;
}

export interface GetLabelOptions {
  key: string;
  allowReplaceEmpty?: boolean;
  replaceStr?: string;
}
