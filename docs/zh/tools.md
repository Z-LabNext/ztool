# 工具函数

## 特性

- [x] [公共下拉选项](#公共下拉选项)
- [x] [空值替换](#空值替换)
- [x] [下载文件](#下载文件v2)
- [x] [随机颜色](#随机rgb色值)
- [x] [图片转webp格式](#图片转webp格式)
- [x] [根据url获取文件名及后缀](#根据url获取文件名及后缀)
- [x] [根据content-disposition获取文件名及后缀](#根据content-disposition获取文件名及后缀)
- [x] ~~[浏览器兼容性提示](#浏览器兼容性提示-badge-typedanger-text废弃-)~~
- [x] [拆分日期区间](#拆分日期区间)
- [x] [组合日期区间](#组合日期区间)
- [x] [格式化地址字符串](#格式化地址字符串)
- [x] [数组转字符串](#数组转字符串)
- [x] [字符串转数组](#字符串转数组)

## API

### 公共下拉选项

**语法**

`new Option(配置项)`

**参数**

| 字段                     | 类型   | 默认    | 描述         |
| ------------------------ | ------ | ------- | ------------ |
| options                  | Object | -       | 配置项       |
| options.dataSource       | Array  | -       | 数据源       |
| options.fieldsName       | Object | -       | 选项字段配置 |
| options.fieldsName.label | String | 'label' | label 字段名 |
| options.fieldsName.value | String | 'value' | value 字段名 |

**方法**

| 名称     | 参数              | 返回 | 描述       |
| -------- | ----------------- | ---- | ---------- |
| update   | `同 options`      | -    | 新参数配置 |
| getLabel | `GetLabelOptions` | -    | 获取 label |

```ts
export interface GetLabelOptions {
  /**
   * 传入的value值
   */
  key: string;
  /**
   * 是否允许空值替换
   */
  allowReplaceEmpty?: boolean;
  /**
   * 允许空值替换的占位符
   */
  replaceStr?: string;
}
```

**示例代码**

```js
import { Option } from '@zlabnext/ztool';

const dataSource = [
  {
    label: '关闭',
    value: 0,
  },
  {
    label: '开启',
    value: 1,
  },
  {
    label: '暂停',
    value: 2,
  },
];

/* 1.初始数据 */
const option = new Option({
  dataSource,
});
// 下拉选项 (一般用于下拉筛选项)
// option.options
// 名称映射对象 (value映射为label)
// option.labelMap

/* 2.更新数据 */
// 添加一个对象
dataSource.push({
  label: '其他',
  value: 3,
});
option.update({ dataSource });
// 清空
option.update({ dataSource: [] });
```

### 空值替换

**语法**

`replaceEmpty(value, replaceStr)`

**参数**

| 字段       | 类型      | 默认 | 描述       |
| ---------- | --------- | ---- | ---------- |
| value      | `unknown` | -    | 原始值     |
| replaceStr | `string`  | `--` | 空值占位符 |

**示例代码**

```js
import { replaceEmpty } from '@zlabnext/ztool';

console.log(replaceEmpty(null)); // --
console.log(replaceEmpty(undefined)); // --
console.log(replaceEmpty('')); // --
console.log(replaceEmpty('你好')); // 你好
console.log(replaceEmpty(true)); // true
console.log(replaceEmpty(false)); // false
```

### ~~下载文件~~ <Badge type="danger" text="弃用" />

> [!NOTE]
>
> 请使用 [下载文件v2](#下载文件v2)

### 下载文件v2

**语法**

`downloadFileV2(参数对象)`

**参数**

| 字段               | 类型                   | 默认 | 描述                                  |
| ------------------ | ---------------------- | ---- | ------------------------------------- |
| options.type       | `string`               | -    | 输入类型 (` 'url'`、`'arrayBuffer' `) |
| options.filename   | `string`               | -    | 文件名称                              |
| options.dataSource | `string / ArrayBuffer` | -    | 文件 url 或 arrayBuffer               |

**示例代码**

```js
import { downloadFileV2 } from '@zlabnext/ztool';

/* 根据文件流进行下载，文件流一般从接口返回(例如excel导出) */
// const str = '大道泛兮，其可左右。';
// const encoder = new TextEncoder();
// const encodedData = encoder.encode(str);
// const buffer = new ArrayBuffer(encodedData.byteLength);
// const uint8Array = new Uint8Array(buffer);
// uint8Array.set(encodedData);
// downloadFileV2({
//   type: 'arrayBuffer',
//   filename: 'example.txt',
//   dataSource: buffer,
// })

/* 根据url进行下载 */
const url = './demo.png'; // 或者提供一个附件资源地址
const filename = 'test.png';
downloadFileV2({
  type: 'url',
  filename,
  dataSource: url,
});
```

> [!NOTE]
>
> - 当采用 “url” 方式时，如果是非同源地址，会导致无法下载文件 ( 例如，只打开一个新标签页展示 )
> - 建议用接口获取文件流，然后采用 “arrayBuffer” 方式下载
> - 如果是附件服务的资源地址，则正常下载 ( 前提，附件服务器已配置允许下载 )
> - 如果 web 应用地址是 http 协议，则下载时浏览器会提示是否阻止下载 ( 浏览器的安全策略 )

### 随机rgb色值

**示例代码**

```js
import { getRandomRgb } from '@zlabnext/ztool';

console.log(getRandomRgb()); // 获取一个随机的rgb色值，例：rgb(0, 0, 0)
```

### 随机hex色值

**示例代码**

```js
import { getRandomHex } from '@zlabnext/ztool';

console.log(getRandomHex()); // 获取一个随机的hex色值，例：#000000
```

### 随机rgb/hex色值

**示例代码**

```js
import { getRandomColor } from '@zlabnext/ztool';

console.log(getRandomColor({ type: 'rgb' })); // 获取一个随机的rgb色值，例：rgb(0, 0, 0)
console.log(getRandomColor({ type: 'hex' })); // 获取一个随机的hex色值，例：#000000
```

### 图片转webp格式

**语法**

`convert2Webp(file, quality)`

**参数**

| 字段    | 类型           | 默认 | 描述           |
| ------- | -------------- | ---- | -------------- |
| file    | `File \| Blob` | -    | 文件对象       |
| quality | `number`       | -    | 压缩率 `(0~1)` |

**示例代码**

```js
import { convert2Webp, downloadArrayBuffer } from '@zlabnext/ztool';

// file是文件对象
const webpBlob = convert2Webp(file, 0.6);
// 下载转换后的Webp图片
downloadArrayBuffer(webpBlob, 'example.webp');
```

### 根据url获取文件名及后缀

**语法**

`getFilenameFromUrl(url)`

**参数**

| 字段 | 类型     | 默认 | 描述     |
| ---- | -------- | ---- | -------- |
| url  | `string` | -    | 文件链接 |

**示例代码**

```js
import { getFilenameFromUrl } from '@zlabnext/ztool';

const url = 'https://www.baidu.com/abc.jpg';

getFilenameFromUrl(url); // abc.jpg
```

### 根据content-disposition获取文件名及后缀

**语法**

`getFilenameFromDisposition(contentDispotition, decode, decodeCallback)`

**参数**

| 字段               | 类型       | 默认                 | 描述         |
| ------------------ | ---------- | -------------------- | ------------ |
| contentDispotition | `string`   | -                    | 响应头内容   |
| decode             | `boolean`  | `true`               | 是否解码     |
| decodeCallback     | `function` | `decodeURIComponent` | 解码回调函数 |

**示例代码**

```js
import { getFilenameFromDisposition } from '@zlabnext/ztool';

// 'example.txt'
console.log(getFilenameFromDisposition('attachment; filename="example.txt"'));
// 'example.txt'
console.log(getFilenameFromDisposition('attachment; filename=example.txt'));
// '中文.txt'
console.log(
  getFilenameFromDisposition(
    "attachment; filename*=UTF-8''%e4%b8%ad%e6%96%87.txt",
  ),
);
// null
console.log(getFilenameFromDisposition('attachment'));
// null
console.log(getFilenameFromDisposition(null));
```

### ~~浏览器兼容性提示~~ <Badge type="danger" text="废弃" />

> [!NOTE]
>
> 推荐使用 [bowser](https://github.com/bowser-js/bowser?tab=readme-ov-file)

### 拆分日期区间

一般用来提交给后端

**语法**

`splitDateRange(options)`

**参数**

| 字段                  | 类型             | 必填 | 默认      | 描述               |
| --------------------- | ---------------- | ---- | --------- | ------------------ |
| options.dateRange     | `string[]`       | 是   | -         | 日期区间           |
| options.outStartField | `string`         | 否   | startDate | 输出的开始日期字段 |
| options.outEndField   | `string`         | 否   | endDate   | 输出的结束日期字段 |
| options.defaultValue  | `string \| null` | 否   | null      | 默认值             |

**示例代码**

```js
import { splitDateRange } from '@zlabnext/ztool';

const result = splitDateRange({
  dateRange: ['2024-11-13', '2024-11-14'],
});

console.log(result); // { startDate: '2024-11-13', endDate: '2024-11-14' }
```

### 组合日期区间

一般用来给前端回显。

**语法**

`combineDateRange(options)`

**参数**

| 字段         | 类型                             | 必填 | 默认      | 描述               |
| ------------ | -------------------------------- | ---- | --------- | ------------------ |
| obj          | `Record<string, string \| null>` | 是   | -         | 对象参数           |
| inStartField | `string`                         | 否   | startDate | 输入的开始日期字段 |
| inEndField   | `string`                         | 否   | endDate   | 输入的结束日期字段 |

**示例代码**

```js
import { combineDateRange } from '@zlabnext/ztool';

const result = combineDateRange({
  obj: { startDate: '2024-11-13', endDate: '2024-11-14' },
});

console.log(result); // ['2024-11-13', '2024-11-14']
```

### 格式化地址字符串

**语法**

`fmtAddressStr(options)`

**参数**

| 字段                | 类型       | 必填 | 默认 | 描述                             |
| ------------------- | ---------- | ---- | ---- | -------------------------------- |
| options.addressStr  | `string`   | 是   | -    | 原始地址字符串                   |
| options.needSplit   | `boolean`  | 否   | true | 是否需要分隔                     |
| options.splitFlag   | `boolean`  | 否   | true | 分隔符                           |
| options.needJoin    | `boolean`  | 否   | true | 是否需要拼接                     |
| options.joinFlag    | `string`   | 否   | ,    | 拼接符                           |
| options.extraStrArr | `string[]` | 否   |      | 额外的字符串数组(例如，详情地址) |

**示例代码**

```js
import { fmtAddressStr } from '@zlabnext/ztool';

const result = fmtAddressStr({
  addressStr: '山东省,青岛市,崂山区',
  needSplit: true,
  needJoin: true,
  extraStrArr: ['xx街道xx号'],
  joinFlag: '',
});

console.log(result); // 山东省青岛市崂山区xx街道xx号
```

### 数组转字符串

**语法**

`arrToStr(str, joinFlag)`

**参数**

| 字段     | 类型     | 必填 | 默认 | 描述       |
| -------- | -------- | ---- | ---- | ---------- |
| str      | `string` | 是   | -    | 原始字符串 |
| joinFlag | `string` | 否   | ,    | 拼接符     |

**示例代码**

```js
import { arrToStr } from '@zlabnext/ztool';

const result1 = arrToStr(['1', '2', '3']);
console.log(result1); // 1,2,3

const result2 = arrToStr(['1', '2', '3'], '');
console.log(result2); // 123
```

### 字符串转数组

**语法**

`strToArr(str, splitFlag)`

**参数**

| 字段      | 类型     | 必填 | 默认 | 描述       |
| --------- | -------- | ---- | ---- | ---------- |
| str       | `string` | 是   | -    | 原始字符串 |
| splitFlag | `string` | 否   | ,    | 拼接符     |

**示例代码**

```js
import { strToArr } from '@zlabnext/ztool';

const result1 = strToArr('1,2,3');
console.log(result1); // ['1', '2', '3']

const result2 = strToArr('1,2,3', '');
console.log(result2); // ['123']
```
