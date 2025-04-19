# 表格合并API

帮助您轻松处理“单元格的合并”

## 特性

- [x] 合并`行`、`列`
- [x] 生成`合并`后的序号
- [x] 数据`分段`

## 快速上手

合并 " 行 "

![capture-1740817031905.png](https://s2.loli.net/2025/03/01/mxlb8P6JvyASqa4.png)

```js
import { getMergedData, Mode, getFieldSpan } from '@zlabnext/ztool';

const dataSource = [
  {
    id: 1,
    name: '张三丰',
    jobNumber: 'A001',
    residential: '湖北',
    register: '湖北',
    date: '2025-02-21',
  },
  {
    id: 2,
    name: '张无忌',
    jobNumber: 'A002',
    residential: '湖北',
    register: '北京',
    date: '2025-02-21',
  },
  {
    id: 3,
    name: '赵敏',
    jobNumber: 'A003',
    residential: '北京',
    register: '北京',
    date: '2025-02-21',
  },
  {
    id: 4,
    name: '赵敏',
    jobNumber: 'A004',
    residential: '上海',
    register: '北京',
    date: '2025-02-21',
  },
  {
    id: 5,
    name: '周芷若',
    jobNumber: 'A005',
    residential: '四川',
    register: '江苏',
    date: '2025-02-21',
  },
  {
    id: 6,
    name: '张三',
    jobNumber: 'A006',
    residential: '上海',
    register: '北京',
    date: '2025-02-21',
  },
];
const mergeFields = [
  {
    field: 'name',
    callback(curItem, nextItem) {
      return curItem.name === nextItem.name;
    },
  },
  'residential',
  'register',
  'date',
];
const options = {
  mode: Mode.Row,
  dataSource,
  mergeFields,
  genSort: true,
};
// 这里是计算完毕后的数据，赋值给表格即可
const mergedData = getMergedData(options);
// 处理合并的函数
function spanMethod({ row, column }) {
  // 这里会输出 { rowspan: n, colspan: n }，n就是经过计算后，得到的值。
  return getFieldSpan(row, column.property);
}
```

合并 " 列 "

![capture-1740817051358.png](https://s2.loli.net/2025/03/01/xoI12bhTt8lwUCy.png)

```js
import { getMergedData, Mode, getFieldSpan } from '@zlabnext/ztool';

const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'jobNumber', label: '工号' },
  { prop: 'residential', label: '居住地址' },
  { prop: 'register', label: '户籍地址' },
  { prop: 'date', label: '注册日期' },
];
const dataSource = [
  {
    id: 1,
    name: '张三丰',
    jobNumber: 'A001',
    residential: '湖北',
    register: '湖北',
    date: '2025-02-21',
  },
  {
    id: 2,
    name: '张无忌',
    jobNumber: 'A002',
    residential: '湖北',
    register: '北京',
    date: '2025-02-21',
  },
  {
    id: 3,
    name: '赵敏',
    jobNumber: 'A003',
    residential: '北京',
    register: '北京',
    date: '2025-02-21',
  },
  {
    id: 4,
    name: '赵敏',
    jobNumber: 'A004',
    residential: '上海',
    register: '北京',
    date: '2025-02-21',
  },
  {
    id: 5,
    name: '周芷若',
    jobNumber: 'A005',
    residential: '四川',
    register: '江苏',
    date: '2025-02-21',
  },
  {
    id: 6,
    name: '张三',
    jobNumber: 'A006',
    residential: '上海',
    register: '北京',
    date: '2025-02-21',
  },
];
const options = {
  mode: Mode.Col, // 合并列模式
  dataSource,
  mergeFields: columns.map((item) => item.prop), // 必须传入全部列的prop
};
// 这里是计算完毕后的数据，赋值给表格即可
const mergedData = getMergedData(options);
// 处理合并的函数
const spanMethod = ({ row, column, columnIndex }) => {
  if (columnIndex === 0) {
    return { rowspan: 1, colspan: 1 };
  }
  return getFieldSpan(row, column.property);
};
```

## API

### CellMerger

单元格合并工具类

- 语法

`new CellMerger(options)`

- options 属性

| 名称                        | 类型      | 必填 | 默认值 | 描述                                                     |
| --------------------------- | --------- | ---- | ------ | -------------------------------------------------------- |
| dataSource                  | `Array`   | 是   |        | 数据源                                                   |
| [mergeFields](#mergefields) | `Array`   | 是   |        | 需要进行「行合并」的字段                                 |
| genSort                     | `boolean` | 否   |        | 是否生成「行合并」后的序号                               |
| sortBy                      | `string`  | 否   |        | 按照该字段的纬度进行排序 ( 默认取 mergeFields 的第一项 ) |
| [mode](#mode)               | `number`  | 是   |        | 合并模式                                                 |
| [columns](#columns)         | `Array`   | 否   |        | 列头                                                     |
| reCalc                      | `boolean` | 否   | false  | 是否重新计算合并 ( 例如，动态表格增加后重新计算合并 )    |

- 实例方法

| 名称          | 参数 | 描述             |
| ------------- | ---- | ---------------- |
| getMergedData | --   | 获取合并后的数据 |

- 示例代码

```js
import { CellMerger, Mode } from '@zlabnext/ztool';

// 属性配置
const options = {
  mode: Mode.Row,
  dataSource: [
    { province: '山东省', name: '张三' },
    { province: '山东省', name: '张三' },
    { province: '江苏省', name: '李四' },
  ],
  mergeFields: [
    {
      field: 'province',
      callback(curItem, nextItem) {
        // 自定义合并条件
        return (
          curItem.name === nextItem.name &&
          curItem.province === nextItem.province
        );
      },
    },
  ],
  genSort: true,
};
const cellMerger = new CellMerger(options);
// 合并后的数据
const mergedData = cellMerger.getMergedData();
```

#### mode

合并模式

- 属性

| 名称       | 类型         | 值    | 描述                                                                   |
| ---------- | ------------ | ----- | ---------------------------------------------------------------------- |
| Row        | `number`     | 0     | 合并行                                                                 |
| Col        | `number`     | 1     | 合并列                                                                 |
| ~~RowCol~~ | ~~`number`~~ | ~~2~~ | ~~合并行和列 (已弃用)~~ :rotating_light:: 实际展示效果不好，所以废弃了 |

- 示例代码

```js
import { Mode } from '@zlabnext/ztool';

const mode = Mode.Row;
```

#### mergeFields

在进行“列”合并时，必须传入全部列的 prop。

- 语法

`mergeFields: item[]`

- item 属性

| 名称     | 类型       | 必填 | 描述                         |
| -------- | ---------- | ---- | ---------------------------- |
| field    | `string`   | 是   | 字段名称                     |
| callback | `Function` | 是   | 自定义逻辑进行「行合并计算」 |

- 示例代码

```js
const mergeFields = ['province'];
/* 
或者使用自定义条件
const mergeFields = [
  {
    field: 'province',
    callback(curItem, nextItem) {
      return curItem.province === nextItem.province;
    },
  },
]; */
```

#### columns

定义列数组，一般在“列”合并中使用。

- 语法

`columns: item[]`

- item 属性

| 名称 | 类型     | 必填 | 描述   |
| ---- | -------- | ---- | ------ |
| prop | `string` | 是   | 列字段 |

- 示例代码

```js
const columns = [
  {
    prop: 'name',
  },
  {
    prop: 'age',
  },
  {
    prop: 'address',
  },
];
```

### getMergedData

获取合并后的数据

- 语法

`getMergedData(options)`

- options 属性

同 [CellMerger](#cellmerger)

- 示例代码

```js
import { getMergedData, Mode } from '@zlabnext/ztool';

// 属性配置
const options = {
  mode: Mode.Row,
  dataSource: [
    { province: '山东省', name: '张三' },
    { province: '山东省', name: '张三' },
    { province: '江苏省', name: '李四' },
  ],
  mergeFields: [
    {
      field: 'province',
      callback(curItem, nextItem) {
        // 自定义合并条件
        return (
          curItem.name === nextItem.name &&
          curItem.province === nextItem.province
        );
      },
    },
  ],
  genSort: true,
};
// 合并后的数据
const mergeData = getMergedData(options);
```

### getFieldSpan

获取字段合并配置，例如为 [el-table](https://element.eleme.io/#/zh-CN/component/table) 处理 spanMethod

- 语法

`getFieldSpan(row, field)`

- 参数说明

| 名称  | 类型     | 必填 | 描述               |
| ----- | -------- | ---- | ------------------ |
| row   | `Object` | 是   | 行数据             |
| field | `string` | 是   | 目标字段的合并数据 |

- 示例代码

```js
import { getFieldSpan } from '@zlabnext/ztool';

const spanMethod = ({ row, columnIndex }) => {
  if (columnIndex === 0) {
    // 核心代码
    return getFieldSpan(row, 'province');
  }

  return {
    rowspan: 1,
    colspan: 1,
  };
};
```

### splitIntoFragments

将数据拆分为二维数组，一般用于分页打印 PDF。

- 语法

`splitIntoFragments(options)`

- options 属性

| 名称     | 类型     | 必填 | 描述     |
| -------- | -------- | ---- | -------- |
| pageSize | `number` | 是   | 每段条数 |

::: tip
其他属性同 [CellMerger](#cellmerger)
:::

- 示例代码

```js
import { splitIntoFragments } from '@zlabnext/ztool';

const result = splitIntoFragments({
  mode: Mode.Row,
  dataSource: getDataSource(),
  pageSize: 3,
  mergeFields: ['name'],
  genSort: true, // 可生成排序
});

/* Before: 处理前的数据 */
// [
//   {
//     name: '张三',
//   },
//   {
//     name: '李四',
//   },
//   {
//     name: '王五',
//   },
//   {
//     name: '马六',
//   },
// ];

/* After: 处理后的数据 */
// [
//   [
//     {
//       // 1
//       name: '张三',
//     },
//     {
//       // 2
//       name: '李四',
//     },
//     {
//       // 3
//       name: '王五',
//     },
//   ],
//   [
//     {
//       // 4
//       name: '马六',
//     },
//   ],
// ];
```

### getSortNo

获取序号值，在“行”合并时使用。

- 语法

`getSortNo(row)`

- 参数说明

| 名称 | 类型     | 必填 | 描述   |
| ---- | -------- | ---- | ------ |
| row  | `Object` | 是   | 行数据 |

- 示例代码

```js
import { getSortNo } from '@zlabnext/ztool';
```

```html
<el-table-column label="序号" width="80">
  <template #default="{ row }"> {{ getSortNo(row) }} </template>
</el-table-column>
```

## FAQ

### 按分组来 “合并行” 出现错版的情况 ?

1. 给需要合并的分组添加统一的`groupId`来区分是否为一组。
2. `mergeFields`自定义合并逻辑，加上前置判断`groupId`。

```js
const mergeFields = [
  {
    field: 'name',
    callback(curItem, nextItem) {
      return (
        curItem.groupId === nextItem.groupId && curItem.name === nextItem.name
      );
    },
  },
];
```

### 目前是否支持 mode.RowCol ?

支持，但是不建议使用，因为合并后展示效果不好。
