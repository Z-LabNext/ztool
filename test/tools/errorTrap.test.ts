import { describe, expect, test } from 'vitest';
import { errorTrap, setErrorTrapGlobalConfig } from '../../src/tools/errorTrap';

describe('errorTrap', () => {
  test('设置errorTrap全局配置', () => {
    const code = 0;
    const message = '请求成功';

    setErrorTrapGlobalConfig({
      successCode: 0,
      successCallback: (code: number, message: string) =>
        console.log(`successCallback ${code} ${message}`),
      errorCode: 1,
      errorCallback: (code: number, message: string) =>
        console.log(`errorCallback ${code} ${message}`),
    });

    const hasErr = errorTrap({ code, message });
    expect(hasErr).toBe(false);
  });

  test('调用errorTrap(接口成功)', () => {
    const code = 0;
    const message = '请求成功';
    const hasErr = errorTrap({ code, message });
    expect(hasErr).toBe(false);
  });

  test('调用errorTrap(接口失败)', () => {
    const code = 1;
    const message = '请求失败';
    const hasErr = errorTrap({ code, message });
    expect(hasErr).toBe(true);
  });
});
