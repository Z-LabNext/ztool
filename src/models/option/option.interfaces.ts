export interface DataSourceItem {
  label: string;
  value: string | number;
}

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

export type LabelMap = Record<DataSourceItem['value'], DataSourceItem['label']>;

export interface GetLabelOptions {
  key: string;
  allowReplaceEmpty?: boolean;
  replaceStr?: string;
}
