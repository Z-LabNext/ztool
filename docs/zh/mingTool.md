# 工具API

开发过程中，高频使用的方法。

## 特性

- :white_check_mark: [公共下拉选项](#option)
- :white_check_mark: [空值替换](#replaceempty)
- :white_check_mark: [下载文件](#downloadfilev2)
- :white_check_mark: [随机颜色](#getrandomcolor)
- :white_check_mark: [图片转 Webp](#convert2webp)
- :white_check_mark: [根据 url 获取文件名及后缀](#getfilenamefromurl)
- :white_check_mark: [根据 content-disposition 获取文件名及后缀](#getfilenamefromdisposition)
- :white_check_mark: ~~[浏览器兼容性提示](#compatibility)~~
- :white_check_mark: [拆分日期区间](#splitdaterange)
- :white_check_mark: [组合日期区间](#combinedaterange)
- :white_check_mark: [格式化地址字符串](#fmtaddressstr)

## API

### Option

公共下拉选项

- 语法

`new Option(options)`

- options 属性

| 字段       | 类型     | 默认                                 | 描述         |
| ---------- | -------- | ------------------------------------ | ------------ |
| dataSource | `Array`  | -                                    | 数据源       |
| fieldsName | `Object` | `{ label: 'label', value: 'value' }` | 选项字段配置 |

- 实例方法

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

- 示例代码

```js
import { Option } from '@zLabNext/ztool';

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
  label: '其他'，
  value: 3
})
option.update({dataSource})
// 清空
option.update({dataSource: []})
```

### replaceEmpty

空值替换

- 语法

`replaceEmpty(value, replaceStr)`

- 参数说明

| 字段       | 类型      | 默认 | 描述       |
| ---------- | --------- | ---- | ---------- |
| value      | `unknown` | -    | 原始值     |
| replaceStr | `string`  | `--` | 空值占位符 |

- 示例代码

```js
import { replaceEmpty } from '@zLabNext/ztool';

console.log(replaceEmpty(null)); // --
console.log(replaceEmpty(undefined)); // --
console.log(replaceEmpty('')); // --
console.log(replaceEmpty('你好')); // 你好
console.log(replaceEmpty(true)); // true
console.log(replaceEmpty(false)); // false
```

### ~~downloadFile~~ <Badge type="danger" text="弃用" />

下载文件

> [!NOTE]
>
> 请使用 [downloadFileV2](#downloadfilev2)

### downloadFileV2

下载文件

- 语法

`downloadFileV2(options)`

- 参数

options

| 字段       | 类型                   | 默认 | 描述                                  |
| ---------- | ---------------------- | ---- | ------------------------------------- |
| type       | `string`               | -    | 输入类型 (` 'url'`、`'arrayBuffer' `) |
| filename   | `string`               | -    | 文件名称                              |
| dataSource | `string / ArrayBuffer` | -    | 文件 url 或 arrayBuffer               |

- 示例

```js
import { downloadFileV2 } from '@zLabNext/ztool';

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

### getRandomRgb

随机 rgb 色值

- 示例代码

```js
import { getRandomRgb } from '@zLabNext/ztool';

console.log(getRandomRgb()); // 获取一个随机的rgb色值，例：rgb(0, 0, 0)
```

### getRandomHex

随机 hex 色值

- 示例代码

```js
import { getRandomHex } from '@zLabNext/ztool';

console.log(getRandomHex()); // 获取一个随机的hex色值，例：#000000
```

### getRandomColor

随机 rgb / hex 色值

- 示例代码

```js
import { getRandomColor } from '@zLabNext/ztool';

console.log(getRandomColor({ type: 'rgb' })); // 获取一个随机的rgb色值，例：rgb(0, 0, 0)
console.log(getRandomColor({ type: 'hex' })); // 获取一个随机的hex色值，例：#000000
```

### convert2Webp

图片转 Webp 格式

- 语法

`convert2Webp(file, quality)`

- 参数说明

| 字段    | 类型           | 默认 | 描述           |
| ------- | -------------- | ---- | -------------- |
| file    | `File \| Blob` | -    | 文件对象       |
| quality | `number`       | -    | 压缩率 `(0~1)` |

- 示例代码

```js
import { convert2Webp, downloadArrayBuffer } from '@zLabNext/ztool';

// file是文件对象
const webpBlob = convert2Webp(file, 0.6);
// 下载转换后的Webp图片
downloadArrayBuffer(webpBlob, 'example.webp');
```

### getFilenameFromUrl

根据 url 获取文件名及后缀

- 语法

`getFilenameFromUrl(url)`

- 参数说明

| 字段 | 类型     | 默认 | 描述     |
| ---- | -------- | ---- | -------- |
| url  | `string` | -    | 文件链接 |

- 示例代码

```js
import { getFilenameFromUrl } from '@zLabNext/ztool';

const url = 'https://www.baidu.com/abc.jpg';
getFilenameFromUrl(url); // abc.jpg
```

### getFilenameFromDisposition

根据 content-disposition 获取文件名及后缀

- 语法

`getFilenameFromDisposition(contentDispotition)`

- 参数说明

| 字段               | 类型       | 默认                 | 描述         |
| ------------------ | ---------- | -------------------- | ------------ |
| contentDispotition | `string`   | -                    | 响应头内容   |
| decode             | `boolean`  | `true`               | 是否解码     |
| decodeCallback     | `function` | `decodeURIComponent` | 解码回调函数 |

- 示例代码

```js
import { getFilenameFromDisposition } from '@zLabNext/ztool';

console.log(getFilenameFromDisposition('attachment; filename="example.txt"')); // 'example.txt'
console.log(getFilenameFromDisposition('attachment; filename=example.txt')); // 'example.txt'
console.log(getFilenameFromDisposition('attachment; filename*=UTF-8''%e4%b8%ad%e6%96%87.txt')); // '中文.txt'
console.log(getFilenameFromDisposition('attachment')); // null
console.log(getFilenameFromDisposition(null)); // null
```

### ~~Compatibility~~ <Badge type="danger" text="废弃" />

浏览器兼容性提示

> [!NOTE]
>
> 推荐使用 [bowser](https://github.com/bowser-js/bowser?tab=readme-ov-file)

### splitDateRange

拆分日期区间，一般用来提交给后端。

- 语法

`splitDateRange(options)`

- options 属性

| 字段          | 类型             | 必填 | 默认      | 描述               |
| ------------- | ---------------- | ---- | --------- | ------------------ |
| dateRange     | `string[]`       | 是   | -         | 日期区间           |
| outStartField | `string`         | 否   | startDate | 输出的开始日期字段 |
| outEndField   | `string`         | 否   | endDate   | 输出的结束日期字段 |
| defaultValue  | `string \| null` | 否   | null      | 默认值             |

- 示例代码

```js
import { splitDateRange } from '@zLabNext/ztool';

const result = splitDateRange({
  dateRange: ['2024-11-13', '2024-11-14'],
});

console.log(result); // { startDate: '2024-11-13', endDate: '2024-11-14' }
```

### combineDateRange

组合日期区间，一般用来给前端回显。

- 语法

`combineDateRange(options)`

- options 属性

| 字段         | 类型                             | 必填 | 默认      | 描述               |
| ------------ | -------------------------------- | ---- | --------- | ------------------ |
| obj          | `Record<string, string \| null>` | 是   | -         | 对象参数           |
| inStartField | `string`                         | 否   | startDate | 输入的开始日期字段 |
| inEndField   | `string`                         | 否   | endDate   | 输入的结束日期字段 |

- 示例代码

```js
import { combineDateRange } from '@zLabNext/ztool';

const result = combineDateRange({
  obj: { startDate: '2024-11-13', endDate: '2024-11-14' },
});

console.log(result); // ['2024-11-13', '2024-11-14']
```

### fmtAddressStr

格式化地址字符串

- 语法

`fmtAddressStr(options)`

- options 属性

| 字段        | 类型       | 必填 | 默认 | 描述                             |
| ----------- | ---------- | ---- | ---- | -------------------------------- |
| addressStr  | `string`   | 是   | -    | 原始地址字符串                   |
| needSplit   | `boolean`  | 否   | true | 是否需要分隔                     |
| splitFlag   | `boolean`  | 否   | true | 分隔符                           |
| needJoin    | `boolean`  | 否   | true | 是否需要拼接                     |
| joinFlag    | `string`   | 否   | ,    | 拼接符                           |
| extraStrArr | `string[]` | 否   |      | 额外的字符串数组(例如，详情地址) |

- 示例代码

```js
import { fmtAddressStr } from '@zLabNext/ztool';

const result = fmtAddressStr({
  addressStr: '山东省,青岛市,崂山区',
  needSplit: true,
  needJoin: true,
  extraStrArr: ['xx街道xx号'],
  joinFlag: '',
});

console.log(result); // 山东省青岛市崂山区xx街道xx号
```
