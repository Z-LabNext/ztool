import { type InputType } from './file.enums';

/**
 * 下载文件配置
 */
export interface DownloadFileOpts {
  /**
   * 输入类型
   */
  inputType: InputType;
  /**
   * 文件名
   */
  filename: string;
  /**
   * @deprecated 从 1.2.3 版本开始
   * 请使用 dataSource 代替
   */
  url?: string;
  /**
   * @deprecated 从 1.2.3 版本开始
   * 请使用 dataSource 代替
   */
  arrayBuffer?: ArrayBuffer;
}

/**
 * 下载文件配置 v2
 */
export interface DownloadFileV2Opts {
  /**
   * 类型
   */
  type: InputType;
  /**
   * 文件名
   */
  filename?: string;
  /**
   * 数据源
   */
  dataSource: string | ArrayBuffer;
  /**
   * 自动提取文件名
   */
  autoPickFilename?: boolean;
  /**
   * 如果是arrayBuffer类型，则需要传入'content-disposition'
   */
  disposition?: string;
}
