# Table Merge API

Helps you easily handle "cell merging" in tables.

## Features

- [x] Merge `rows` and `columns`
- [x] Generate sequence numbers after merging
- [x] Data segmentation

## Quick Start

### Merge "Rows"

![capture-1740817082040.png](https://s2.loli.net/2025/03/01/hT2ZmlvECi4xWpj.png)

```js
import { getMergedData, Mode, getFieldSpan } from '@zlabnext/ztool';

const dataSource = [
  {
    id: 1,
    name: 'Zhang Sanfeng',
    jobNumber: 'A001',
    residential: 'Hubei',
    register: 'Hubei',
    date: '2025-02-21',
  },
  {
    id: 2,
    name: 'Zhang Wuji',
    jobNumber: 'A002',
    residential: 'Hubei',
    register: 'Beijing',
    date: '2025-02-21',
  },
  {
    id: 3,
    name: 'Zhao Min',
    jobNumber: 'A003',
    residential: 'Beijing',
    register: 'Beijing',
    date: '2025-02-21',
  },
  {
    id: 4,
    name: 'Zhao Min',
    jobNumber: 'A004',
    residential: 'Shanghai',
    register: 'Beijing',
    date: '2025-02-21',
  },
  {
    id: 5,
    name: 'Zhou Zhiruo',
    jobNumber: 'A005',
    residential: 'Sichuan',
    register: 'Jiangsu',
    date: '2025-02-21',
  },
  {
    id: 6,
    name: 'Zhang San',
    jobNumber: 'A006',
    residential: 'Shanghai',
    register: 'Beijing',
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
// The processed data after merging, ready to be assigned to the table
const mergedData = getMergedData(options);
// Function to handle merging
function spanMethod({ row, column }) {
  // Returns { rowspan: n, colspan: n }, where n is the calculated value
  return getFieldSpan(row, column.property);
}
```

### Merge "Columns"

![capture-1740817073222.png](https://s2.loli.net/2025/03/01/7o2zNxwduamXMkI.png)

```js
import { getMergedData, Mode, getFieldSpan } from '@zlabnext/ztool';

const columns = [
  { prop: 'name', label: 'Name' },
  { prop: 'jobNumber', label: 'Job Number' },
  { prop: 'residential', label: 'Residential Address' },
  { prop: 'register', label: 'Registered Address' },
  { prop: 'date', label: 'Registration Date' },
];
const dataSource = [
  {
    id: 1,
    name: 'Zhang Sanfeng',
    jobNumber: 'A001',
    residential: 'Hubei',
    register: 'Hubei',
    date: '2025-02-21',
  },
  {
    id: 2,
    name: 'Zhang Wuji',
    jobNumber: 'A002',
    residential: 'Hubei',
    register: 'Beijing',
    date: '2025-02-21',
  },
  {
    id: 3,
    name: 'Zhao Min',
    jobNumber: 'A003',
    residential: 'Beijing',
    register: 'Beijing',
    date: '2025-02-21',
  },
  {
    id: 4,
    name: 'Zhao Min',
    jobNumber: 'A004',
    residential: 'Shanghai',
    register: 'Beijing',
    date: '2025-02-21',
  },
  {
    id: 5,
    name: 'Zhou Zhiruo',
    jobNumber: 'A005',
    residential: 'Sichuan',
    register: 'Jiangsu',
    date: '2025-02-21',
  },
  {
    id: 6,
    name: 'Zhang San',
    jobNumber: 'A006',
    residential: 'Shanghai',
    register: 'Beijing',
    date: '2025-02-21',
  },
];
const options = {
  mode: Mode.Col, // Column merging mode
  dataSource,
  mergeFields: columns.map((item) => item.prop), // Must pass all column props
};
// The processed data after merging, ready to be assigned to the table
const mergedData = getMergedData(options);
// Function to handle merging
const spanMethod = ({ row, column, columnIndex }) => {
  if (columnIndex === 0) {
    return { rowspan: 1, colspan: 1 };
  }
  return getFieldSpan(row, column.property);
};
```

## API

### CellMerger

Utility class for cell merging

- Syntax

`new CellMerger(options)`

- `options` Properties

| Name                        | Type      | Required | Default | Description                                                        |
| --------------------------- | --------- | -------- | ------- | ------------------------------------------------------------------ |
| dataSource                  | `Array`   | Yes      |         | Data source                                                        |
| [mergeFields](#mergefields) | `Array`   | Yes      |         | Fields to perform "row merging"                                    |
| genSort                     | `boolean` | No       |         | Whether to generate sequence numbers after "row merging"           |
| sortBy                      | `string`  | No       |         | Sort by this field (defaults to the first item in mergeFields)     |
| [mode](#mode)               | `number`  | Yes      |         | Merging mode                                                       |
| [columns](#columns)         | `Array`   | No       |         | Column headers                                                     |
| reCalc                      | `boolean` | No       | false   | Whether to recalculate merging (e.g., after dynamic table updates) |

- Instance Methods

| Name          | Parameters | Description     |
| ------------- | ---------- | --------------- |
| getMergedData | --         | Get merged data |

- Example Code

```js
import { CellMerger, Mode } from '@zlabnext/ztool';

// Property configuration
const options = {
  mode: Mode.Row,
  dataSource: [
    { province: 'Shandong', name: 'Zhang San' },
    { province: 'Shandong', name: 'Zhang San' },
    { province: 'Jiangsu', name: 'Li Si' },
  ],
  mergeFields: [
    {
      field: 'province',
      callback(curItem, nextItem) {
        // Custom merging condition
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
// Merged data
const mergedData = cellMerger.getMergedData();
```

#### mode

Merging Mode

- Properties

| Name       | Type         | Value | Description                                                                                    |
| ---------- | ------------ | ----- | ---------------------------------------------------------------------------------------------- |
| Row        | `number`     | 0     | Merge rows                                                                                     |
| Col        | `number`     | 1     | Merge columns                                                                                  |
| ~~RowCol~~ | ~~`number`~~ | ~~2~~ | ~~Merge rows and columns (deprecated)~~ :rotating_light: Poor display effect, hence deprecated |

- Example Code

```js
import { Mode } from '@zlabnext/ztool';

const mode = Mode.Row;
```

#### mergeFields

When performing "column" merging, all column props must be passed.

- Syntax

`mergeFields: item[]`

- `item` Properties

| Name     | Type       | Required | Description                    |
| -------- | ---------- | -------- | ------------------------------ |
| field    | `string`   | Yes      | Field name                     |
| callback | `Function` | Yes      | Custom logic for "row merging" |

- Example Code

```js
const mergeFields = ['province'];
/* 
Or use custom conditions
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

Define column array, typically used in "column" merging.

- Syntax

`columns: item[]`

- `item` Properties

| Name | Type     | Required | Description  |
| ---- | -------- | -------- | ------------ |
| prop | `string` | Yes      | Column field |

- Example Code

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

Get merged data

- Syntax

`getMergedData(options)`

- `options` Properties

Same as [CellMerger](#cellmerger)

- Example Code

```js
import { getMergedData, Mode } from '@zlabnext/ztool';

// Property configuration
const options = {
  mode: Mode.Row,
  dataSource: [
    { province: 'Shandong', name: 'Zhang San' },
    { province: 'Shandong', name: 'Zhang San' },
    { province: 'Jiangsu', name: 'Li Si' },
  ],
  mergeFields: [
    {
      field: 'province',
      callback(curItem, nextItem) {
        // Custom merging condition
        return (
          curItem.name === nextItem.name &&
          curItem.province === nextItem.province
        );
      },
    },
  ],
  genSort: true,
};
// Merged data
const mergeData = getMergedData(options);
```

### getFieldSpan

Get field merging configuration, e.g., for handling `spanMethod` in [Element UI Table](https://element.eleme.io/#/en-US/component/table).

- Syntax

`getFieldSpan(row, field)`

- Parameters

| Name  | Type     | Required | Description                |
| ----- | -------- | -------- | -------------------------- |
| row   | `Object` | Yes      | Row data                   |
| field | `string` | Yes      | Target field's merged data |

- Example Code

```js
import { getFieldSpan } from '@zlabnext/ztool';

const spanMethod = ({ row, columnIndex }) => {
  if (columnIndex === 0) {
    // Core code
    return getFieldSpan(row, 'province');
  }

  return {
    rowspan: 1,
    colspan: 1,
  };
};
```

### splitIntoFragments

Split data into a 2D array, typically used for paginated PDF printing.

- Syntax

`splitIntoFragments(options)`

- `options` Properties

| Name     | Type     | Required | Description                 |
| -------- | -------- | -------- | --------------------------- |
| pageSize | `number` | Yes      | Number of items per segment |

::: tip
Other properties are the same as [CellMerger](#cellmerger)
:::

- Example Code

```js
import { splitIntoFragments } from '@zlabnext/ztool';

const result = splitIntoFragments({
  mode: Mode.Row,
  dataSource: getDataSource(),
  pageSize: 3,
  mergeFields: ['name'],
  genSort: true, // Can generate sequence numbers
});

/* Before: Data before processing */
// [
//   {
//     name: 'Zhang San',
//   },
//   {
//     name: 'Li Si',
//   },
//   {
//     name: 'Wang Wu',
//   },
//   {
//     name: 'Ma Liu',
//   },
// ];

/* After: Data after processing */
// [
//   [
//     {
//       // 1
//       name: 'Zhang San',
//     },
//     {
//       // 2
//       name: 'Li Si',
//     },
//     {
//       // 3
//       name: 'Wang Wu',
//     },
//   ],
//   [
//     {
//       // 4
//       name: 'Ma Liu',
//     },
//   ],
// ];
```

### getSortNo

Get sequence number, used in "row" merging.

- Syntax

`getSortNo(row)`

- Parameters

| Name | Type     | Required | Description |
| ---- | -------- | -------- | ----------- |
| row  | `Object` | Yes      | Row data    |

- Example Code

```js
import { getSortNo } from '@zlabnext/ztool';
```

```html
<el-table-column label="No." width="80">
  <template #default="{ row }"> {{ getSortNo(row) }} </template>
</el-table-column>
```

## FAQ

### Why does merging rows by group cause misalignment?

1. Add a unique `groupId` to the groups that need to be merged to distinguish them.
2. Add a pre-check for `groupId` in the `mergeFields` custom merging logic.

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

### Does it currently support `mode.RowCol`?

It is supported, but not recommended, as the display effect after merging is poor.
