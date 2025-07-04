import { isArrayBuffer, isString } from 'lodash-es';
import { fmtErrorMsg, warn } from '@/utils';
import {
  type DownloadFileOpts,
  type DownloadFileV2Opts,
} from './types//file.interfaces';
import { InputType } from './types//file.enums';
import { getFilenameFromDisposition, getFilenameFromUrl } from '../url';

/**
 * 下载文件(arrayBuffer)
 */
export function downloadArrayBuffer(
  stream: ArrayBuffer,
  filename: string,
): boolean {
  try {
    const blob = new Blob([stream], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.click();
    URL.revokeObjectURL(url);
    return true;
  } catch (e: any) {
    warn(`下载文件流失败 ${e.message}`);
    return false;
  }
}

/**
 * 转换为webp格式
 */
export function convert2Webp(file: File | Blob, quality = 0.8): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('不是图片类型'));
      return;
    }
    if (file.type === 'image/webp') {
      resolve(file);
      return;
    }
    const url = window.URL.createObjectURL(file);
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx === null) {
        reject(new Error('无法获取canvas上下文'));
        window.URL.revokeObjectURL(url);
        return;
      }
      ctx.drawImage(img, 0, 0, img.width, img.height);
      canvas.toBlob(
        (blob) => {
          if (blob == null) {
            reject(new Error('无法获取blob对象'));
            window.URL.revokeObjectURL(url);
            return;
          }
          resolve(blob);
          window.URL.revokeObjectURL(url);
        },
        'image/webp',
        quality,
      );
    };
    img.onerror = (err) => {
      reject(err);
      window.URL.revokeObjectURL(url);
    };
  });
}

/**
 * 下载文件(url)
 */
export function downloadUrl(url: string, filename: string): boolean {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (e: any) {
    warn(`下载文件失败 ${e.message}`);
    return false;
  }
}

/**
 * 下载文件
 * @deprecated 从 1.2.3 版本开始
 * 请使用 downloadFileV2 代替
 */
export function downloadFile(options: DownloadFileOpts): boolean {
  const { inputType = InputType.URL, filename, url, arrayBuffer } = options;
  if (!isString(filename)) {
    warn('filename 不能为空');
    return false;
  }
  if (inputType === InputType.ArrayBuffer) {
    if (!isArrayBuffer(arrayBuffer)) {
      warn('arrayBuffer 不能为空');
      return false;
    }
    return downloadArrayBuffer(arrayBuffer, filename);
  }
  if (!isString(url)) {
    warn('url 不能为空');
    return false;
  }
  return downloadUrl(url, filename);
}

/**
 * 下载文件 v2
 */
export function downloadFileV2(options: DownloadFileV2Opts): boolean {
  const {
    type = InputType.URL,
    filename,
    dataSource,
    autoPickFilename,
    disposition,
  } = options;
  let localFilename = filename;

  // 检测文件名是否传入
  if (!autoPickFilename && !isString(localFilename)) {
    warn('filename 不能为空');
    return false;
  }

  // 从arrayBuffer中下载
  if (type === InputType.ArrayBuffer) {
    if (!isArrayBuffer(dataSource)) {
      throw new Error(fmtErrorMsg('dataSource 不能为空'));
    }
    if (autoPickFilename && disposition) {
      localFilename = getFilenameFromDisposition(disposition);
      if (!isString(localFilename)) {
        throw new Error(fmtErrorMsg(`未能从${disposition}解析出文件名`));
      }
    }
    return downloadArrayBuffer(dataSource, localFilename as string);
  }

  // 从url中下载
  if (!isString(dataSource)) {
    throw new Error(fmtErrorMsg('dataSource 不能为空'));
  }
  if (autoPickFilename) {
    localFilename = getFilenameFromUrl(dataSource);
  }
  return downloadUrl(dataSource, localFilename as string);
}
