/**
 * 计算页码(删除数据后)
 */
export function calcPageAfterDelete(
  page: number,
  pageSize: number,
  total: number,
): number {
  // 如果删除后数据量小于等于0，返回第一页
  if (total <= 0) {
    return 1;
  }

  // 如果当前页码大于总页数，返回最后一页
  const totalPages = Math.ceil(total / pageSize);
  if (page > totalPages) {
    return totalPages;
  }

  // 否则返回当前页码
  return page;
}
