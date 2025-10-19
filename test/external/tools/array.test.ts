import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { arrayTojson, jsonToArray } from '@/external/tools/array';

describe('array工具方法', () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // 模拟console.warn，避免测试时输出警告信息
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // 恢复console.warn
    consoleWarnSpy.mockRestore();
  });

  describe('arrayTojson', () => {
    test('正常数组转JSON字符串', () => {
      const arr = [1, 2, 3, 'test', { name: 'ztool' }];
      const result = arrayTojson(arr);
      expect(result).toBe(JSON.stringify(arr));
      expect(result).toBe('[1,2,3,"test",{"name":"ztool"}]');
    });

    test('空数组转JSON字符串', () => {
      const arr: unknown[] = [];
      const result = arrayTojson(arr);
      expect(result).toBe('[]');
    });

    test('包含特殊字符的数组', () => {
      const arr = ['hello', 'world', '测试', '🚀'];
      const result = arrayTojson(arr);
      expect(result).toBe(JSON.stringify(arr));
    });

    test('嵌套数组转JSON', () => {
      const arr = [
        [1, 2],
        [3, 4],
        ['a', 'b'],
      ];
      const result = arrayTojson(arr);
      expect(result).toBe(JSON.stringify(arr));
    });

    test('包含null和undefined的数组', () => {
      const arr = [null, undefined, 0, false, ''];
      const result = arrayTojson(arr);
      expect(result).toBe(JSON.stringify(arr));
    });

    test('非数组参数 - 返回原值', () => {
      const nonArray = 'not an array';
      const result = arrayTojson(nonArray as any);
      expect(result).toBe(nonArray);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('arr必须是数组'),
      );
    });

    test('非数组参数 - 数字', () => {
      const result = arrayTojson(123 as any);
      expect(result).toBe(123);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('arr必须是数组'),
      );
    });

    test('非数组参数 - 对象', () => {
      const obj = { a: 1, b: 2 };
      const result = arrayTojson(obj as any);
      expect(result).toBe(obj);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('arr必须是数组'),
      );
    });

    test('JSON序列化异常处理', () => {
      // 创建包含循环引用的对象来触发JSON.stringify异常
      const circularObj: any = { name: 'test' };
      circularObj.self = circularObj;
      const arr = [circularObj];

      const result = arrayTojson(arr);
      expect(result).toBe('[]');
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Converting circular structure to JSON'),
      );
    });
  });

  describe('jsonToArray', () => {
    test('正常JSON字符串转数组', () => {
      const jsonStr = '[1,2,3,"test",{"name":"ztool"}]';
      const result = jsonToArray(jsonStr);
      expect(result).toEqual([1, 2, 3, 'test', { name: 'ztool' }]);
    });

    test('空数组JSON字符串', () => {
      const jsonStr = '[]';
      const result = jsonToArray(jsonStr);
      expect(result).toEqual([]);
    });

    test('包含特殊字符的JSON字符串', () => {
      const jsonStr = '["hello","world","测试","🚀"]';
      const result = jsonToArray(jsonStr);
      expect(result).toEqual(['hello', 'world', '测试', '🚀']);
    });

    test('嵌套数组JSON字符串', () => {
      const jsonStr = '[[1,2],[3,4],["a","b"]]';
      const result = jsonToArray(jsonStr);
      expect(result).toEqual([
        [1, 2],
        [3, 4],
        ['a', 'b'],
      ]);
    });

    test('包含null和undefined的JSON字符串', () => {
      const jsonStr = '[null,null,0,false,""]';
      const result = jsonToArray(jsonStr);
      expect(result).toEqual([null, null, 0, false, '']);
    });

    test('非字符串参数 - 返回原值', () => {
      const nonString = 123;
      const result = jsonToArray(nonString as any);
      expect(result).toBe(nonString);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('jsonStr必须是字符串'),
      );
    });

    test('非字符串参数 - 数组', () => {
      const arr = [1, 2, 3];
      const result = jsonToArray(arr as any);
      expect(result).toBe(arr);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('jsonStr必须是字符串'),
      );
    });

    test('非数组格式的JSON字符串', () => {
      const jsonStr = '{"name":"test","age":25}';
      const result = jsonToArray(jsonStr);
      expect(result).toEqual([]);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('jsonStr不是合法的数组字符串'),
      );
    });

    test('不以[开头的字符串', () => {
      const jsonStr = 'not an array string';
      const result = jsonToArray(jsonStr);
      expect(result).toEqual([]);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('jsonStr不是合法的数组字符串'),
      );
    });

    test('不以]结尾的字符串', () => {
      const jsonStr = '[1,2,3';
      const result = jsonToArray(jsonStr);
      expect(result).toEqual([]);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('jsonStr不是合法的数组字符串'),
      );
    });

    test('无效的JSON格式', () => {
      const jsonStr = '[1,2,3,]'; // 多余的逗号
      const result = jsonToArray(jsonStr);
      expect(result).toEqual([]);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Unexpected token'),
      );
    });

    test('空字符串', () => {
      const result = jsonToArray('');
      expect(result).toEqual([]);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('jsonStr不是合法的数组字符串'),
      );
    });

    test('只有[的字符串', () => {
      const result = jsonToArray('[');
      expect(result).toEqual([]);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('jsonStr不是合法的数组字符串'),
      );
    });

    test('只有]的字符串', () => {
      const result = jsonToArray(']');
      expect(result).toEqual([]);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('jsonStr不是合法的数组字符串'),
      );
    });
  });

  describe('边界情况测试', () => {
    test('arrayTojson处理undefined参数', () => {
      const result = arrayTojson(undefined as any);
      expect(result).toBeUndefined();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('arr必须是数组'),
      );
    });

    test('jsonToArray处理null参数', () => {
      const result = jsonToArray(null as any);
      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('jsonStr必须是字符串'),
      );
    });

    test('大数组性能测试', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      const jsonStr = arrayTojson(largeArray);
      const result = jsonToArray(jsonStr);
      expect(result).toEqual(largeArray);
    });
  });
});
