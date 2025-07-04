/**
 * @vitest-environment jsdom
 */
import { beforeAll, describe, test, expect, vi } from 'vitest';
import { InputType } from '@/external/tools/file/types/file.enums';
import {
  downloadArrayBuffer,
  downloadFile,
  downloadFileV2,
  downloadUrl,
} from '@/main';

beforeAll(() => {
  window.URL.createObjectURL = vi.fn(() => '');
  window.URL.revokeObjectURL = vi.fn();
});

describe('file', () => {
  test('下载ArrayBuffer', () => {
    const arrayBuffer = new ArrayBuffer(8);
    const filename = 'test.txt';
    const result = downloadArrayBuffer(arrayBuffer, filename);
    expect(result).toBe(true);
  });

  test('下载url', () => {
    const url = 'https://s2.loli.net/2024/04/26/z9NEnaI7lJqwrx5.png';
    const filename = 'test.png';
    const result = downloadUrl(url, filename);
    expect(result).toBe(true);
  });

  test('下载文件(传入url)', () => {
    const url = 'https://s2.loli.net/2024/04/26/z9NEnaI7lJqwrx5.png';
    const filename = 'test.png';
    const result = downloadFile({
      inputType: InputType.URL,
      url,
      filename,
    });
    expect(result).toBe(true);
  });

  test('下载文件(传入arrayBuffer)', () => {
    const arrayBuffer = new ArrayBuffer(8);
    const filename = 'test.txt';
    const result = downloadFile({
      inputType: InputType.ArrayBuffer,
      arrayBuffer,
      filename,
    });
    expect(result).toBe(true);
  });

  test('下载文件v2(传入url)', () => {
    const url = 'https://s2.loli.net/2024/04/26/z9NEnaI7lJqwrx5.png';
    const filename = 'test.png';
    const result = downloadFileV2({
      type: InputType.URL,
      filename,
      dataSource: url,
    });
    expect(result).toBe(true);
  });

  test('下载文件v2(传入url,自动提取filename)', () => {
    const url = 'https://s2.loli.net/2024/04/26/z9NEnaI7lJqwrx5.png';
    const filename = 'test.png';
    const result = downloadFileV2({
      type: InputType.URL,
      dataSource: url,
      autoPickFilename: true,
    });
    expect(result).toBe(true);
  });

  test('下载文件v2(传入arrayBuffer)', () => {
    const arrayBuffer = new ArrayBuffer(8);
    const filename = 'test.txt';
    const result = downloadFileV2({
      type: InputType.ArrayBuffer,
      filename,
      dataSource: arrayBuffer,
    });
    expect(result).toBe(true);
  });

  test('下载文件v2(传入arrayBuffer,自动提取filename)', () => {
    const arrayBuffer = new ArrayBuffer(8);
    const filename = 'test.txt';
    const result = downloadFileV2({
      type: InputType.ArrayBuffer,
      dataSource: arrayBuffer,
      autoPickFilename: true,
    });
    expect(result).toBe(true);
  });
});
