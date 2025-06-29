import { describe, expect, test } from 'vitest';
import { calcPageAfterDelete } from '@/main';

describe('table', () => {
  test('计算页码(删除数据后)', () => {
    const page = 2;
    const pageSize = 15;
    const total = 15;
    const newPage = calcPageAfterDelete(page, pageSize, total);
    expect(newPage).toBe(1);
  });
});
