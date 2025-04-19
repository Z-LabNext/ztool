# Tool API

High-frequency methods used during development.

## Features

- [x] [Public Dropdown Options](#option)
- [x] [Replace Empty Values](#replaceempty)
- [x] [Download Files](#downloadfilev2)
- [x] [Random Color](#getrandomcolor)
- [x] [Image to WebP Conversion](#convert2webp)
- [x] [Get Filename and Extension from URL](#getfilenamefromurl)
- [x] [Get Filename and Extension from Content-Disposition](#getfilenamefromdisposition)
- [x] ~~[Browser Compatibility Warning](#compatibility)~~
- [x] [Split Date Range](#splitdaterange)
- [x] [Combine Date Range](#combinedaterange)
- [x] [Format Address String](#fmtaddressstr)
- [x] [Array to String](#arrtostr)
- [x] [String to Array](#strtoarr)

## API

### Option

Public Dropdown Options

- Syntax

`new Option(options)`

- `options` Properties

| Field      | Type     | Default                              | Description         |
| ---------- | -------- | ------------------------------------ | ------------------- |
| dataSource | `Array`  | -                                    | Data source         |
| fieldsName | `Object` | `{ label: 'label', value: 'value' }` | Option field config |

- Instance Methods

| Name     | Parameters        | Return | Description            |
| -------- | ----------------- | ------ | ---------------------- |
| update   | `Same as options` | -      | Update with new config |
| getLabel | `GetLabelOptions` | -      | Get label value        |

```ts
export interface GetLabelOptions {
  /**
   * Input value
   */
  key: string;
  /**
   * Allow replacement of empty values
   */
  allowReplaceEmpty?: boolean;
  /**
   * Placeholder for empty value replacement
   */
  replaceStr?: string;
}
```

- Example Code

```js
import { Option } from '@zlabnext/ztool';

const dataSource = [
  {
    label: 'Off',
    value: 0,
  },
  {
    label: 'On',
    value: 1,
  },
  {
    label: 'Pause',
    value: 2,
  },
];

/* 1. Initial Data */
const option = new Option({
  dataSource,
});
// Dropdown options (typically used for filters)
// option.options
// Label mapping object (value to label)
// option.labelMap

/* 2. Update Data */
// Add an object
dataSource.push({
  label: 'Other',
  value: 3,
});
option.update({ dataSource });
// Clear
option.update({ dataSource: [] });
```

### replaceEmpty

Replace Empty Values

- Syntax

`replaceEmpty(value, replaceStr)`

- Parameters

| Field      | Type      | Default | Description                  |
| ---------- | --------- | ------- | ---------------------------- |
| value      | `unknown` | -       | Original value               |
| replaceStr | `string`  | `--`    | Placeholder for empty values |

- Example Code

```js
import { replaceEmpty } from '@zlabnext/ztool';

console.log(replaceEmpty(null)); // --
console.log(replaceEmpty(undefined)); // --
console.log(replaceEmpty('')); // --
console.log(replaceEmpty('Hello')); // Hello
console.log(replaceEmpty(true)); // true
console.log(replaceEmpty(false)); // false
```

### ~~downloadFile~~ <Badge type="danger" text="Deprecated" />

Download File

> [!NOTE]
>
> Please use [downloadFileV2](#downloadfilev2)

### downloadFileV2

Download File

- Syntax

`downloadFileV2(options)`

- Parameters

`options`

| Field      | Type                   | Default | Description                           |
| ---------- | ---------------------- | ------- | ------------------------------------- |
| type       | `string`               | -       | Input type (`'url'`, `'arrayBuffer'`) |
| filename   | `string`               | -       | File name                             |
| dataSource | `string / ArrayBuffer` | -       | File URL or ArrayBuffer               |

- Example

```js
import { downloadFileV2 } from '@zlabnext/ztool';

/* Download using file stream, typically returned from an API (e.g., Excel export) */
// const str = 'The way is vast, it can go left or right.';
// const encoder = new TextEncoder();
// const encodedData = encoder.encode(str);
// const buffer = new ArrayBuffer(encodedData.byteLength);
// const uint8Array = new Uint8Array(buffer);
// uint8Array.set(encodedData);
// downloadFileV2({
//   type: 'arrayBuffer',
//   filename: 'example.txt',
//   dataSource: buffer,
// });

/* Download using URL */
const url = './demo.png'; // Or provide a resource URL
const filename = 'test.png';
downloadFileV2({
  type: 'url',
  filename,
  dataSource: url,
});
```

> [!NOTE]
>
> - When using "url" method, non-same-origin URLs may fail to download (e.g., it might just open a new tab).
> - It’s recommended to fetch file streams via API and use the "arrayBuffer" method.
> - If using a resource URL from an attachment server, it should work fine (provided the server allows downloads).
> - If the web app uses HTTP, browsers may prompt to block downloads due to security policies.

### getRandomRgb

Random RGB Color Value

- Example Code

```js
import { getRandomRgb } from '@zlabnext/ztool';

console.log(getRandomRgb()); // Returns a random RGB color, e.g., rgb(0, 0, 0)
```

### getRandomHex

Random HEX Color Value

- Example Code

```js
import { getRandomHex } from '@zlabnext/ztool';

console.log(getRandomHex()); // Returns a random HEX color, e.g., #000000
```

### getRandomColor

Random RGB/HEX Color Value

- Example Code

```js
import { getRandomColor } from '@zlabnext/ztool';

console.log(getRandomColor({ type: 'rgb' })); // Returns a random RGB color, e.g., rgb(0, 0, 0)
console.log(getRandomColor({ type: 'hex' })); // Returns a random HEX color, e.g., #000000
```

### convert2Webp

Convert Image to WebP Format

- Syntax

`convert2Webp(file, quality)`

- Parameters

| Field   | Type           | Default | Description            |
| ------- | -------------- | ------- | ---------------------- |
| file    | `File \| Blob` | -       | File object            |
| quality | `number`       | -       | Compression rate (0~1) |

- Example Code

```js
import { convert2Webp, downloadArrayBuffer } from '@zlabnext/ztool';

// `file` is a File object
const webpBlob = convert2Webp(file, 0.6);
// Download the converted WebP image
downloadArrayBuffer(webpBlob, 'example.webp');
```

### getFilenameFromUrl

Get Filename and Extension from URL

- Syntax

`getFilenameFromUrl(url)`

- Parameters

| Field | Type     | Default | Description |
| ----- | -------- | ------- | ----------- |
| url   | `string` | -       | File URL    |

- Example Code

```js
import { getFilenameFromUrl } from '@zlabnext/ztool';

const url = 'https://www.baidu.com/abc.jpg';
getFilenameFromUrl(url); // abc.jpg
```

### getFilenameFromDisposition

Get Filename and Extension from Content-Disposition

- Syntax

`getFilenameFromDisposition(contentDisposition)`

- Parameters

| Field              | Type       | Default              | Description           |
| ------------------ | ---------- | -------------------- | --------------------- |
| contentDisposition | `string`   | -                    | Response header value |
| decode             | `boolean`  | `true`               | Whether to decode     |
| decodeCallback     | `function` | `decodeURIComponent` | Decode callback       |

- Example Code

```js
import { getFilenameFromDisposition } from '@zlabnext/ztool';

console.log(getFilenameFromDisposition('attachment; filename="example.txt"')); // 'example.txt'
console.log(getFilenameFromDisposition('attachment; filename=example.txt')); // 'example.txt'
console.log(getFilenameFromDisposition('attachment; filename*=UTF-8''%e4%b8%ad%e6%96%87.txt')); // '中文.txt'
console.log(getFilenameFromDisposition('attachment')); // null
console.log(getFilenameFromDisposition(null)); // null
```

### ~~Compatibility~~ <Badge type="danger" text="Deprecated" />

Browser Compatibility Warning

> [!NOTE]
>
> Recommended to use [bowser](https://github.com/bowser-js/bowser?tab=readme-ov-file)

### splitDateRange

Split Date Range, typically used for submission to the backend.

- Syntax

`splitDateRange(options)`

- `options` Properties

| Field         | Type             | Required | Default   | Description             |
| ------------- | ---------------- | -------- | --------- | ----------------------- |
| dateRange     | `string[]`       | Yes      | -         | Date range              |
| outStartField | `string`         | No       | startDate | Output start date field |
| outEndField   | `string`         | No       | endDate   | Output end date field   |
| defaultValue  | `string \| null` | No       | null      | Default value           |

- Example Code

```js
import { splitDateRange } from '@zlabnext/ztool';

const result = splitDateRange({
  dateRange: ['2024-11-13', '2024-11-14'],
});

console.log(result); // { startDate: '2024-11-13', endDate: '2024-11-14' }
```

### combineDateRange

Combine Date Range, typically used for frontend display.

- Syntax

`combineDateRange(options)`

- `options` Properties

| Field        | Type                             | Required | Default   | Description            |
| ------------ | -------------------------------- | -------- | --------- | ---------------------- |
| obj          | `Record<string, string \| null>` | Yes      | -         | Object parameter       |
| inStartField | `string`                         | No       | startDate | Input start date field |
| inEndField   | `string`                         | No       | endDate   | Input end date field   |

- Example Code

```js
import { combineDateRange } from '@zlabnext/ztool';

const result = combineDateRange({
  obj: { startDate: '2024-11-13', endDate: '2024-11-14' },
});

console.log(result); // ['2024-11-13', '2024-11-14']
```

### fmtAddressStr

Format Address String

- Syntax

`fmtAddressStr(options)`

- `options` Properties

| Field       | Type       | Required | Default | Description                        |
| ----------- | ---------- | -------- | ------- | ---------------------------------- |
| addressStr  | `string`   | Yes      | -       | Original address string            |
| needSplit   | `boolean`  | No       | true    | Whether to split                   |
| splitFlag   | `boolean`  | No       | true    | Split separator                    |
| needJoin    | `boolean`  | No       | true    | Whether to join                    |
| joinFlag    | `string`   | No       | ,       | Join separator                     |
| extraStrArr | `string[]` | No       |         | Extra string array (e.g., details) |

- Example Code

```js
import { fmtAddressStr } from '@zlabnext/ztool';

const result = fmtAddressStr({
  addressStr: 'Shandong Province,Qingdao City,Laoshan District',
  needSplit: true,
  needJoin: true,
  extraStrArr: ['XX Street No. XX'],
  joinFlag: '',
});

console.log(result); // Shandong ProvinceQingdao CityLaoshan DistrictXX Street No. XX
```

### arrToStr

Array to String

- Syntax

`arrToStr(arr, joinFlag)`

| Field    | Type     | Required | Default | Description       |
| -------- | -------- | -------- | ------- | ----------------- |
| arr      | `string` | Yes      | -       | Source array      |
| joinFlag | `string` | No       | ,       | Joining delimiter |

- Example Code

```js
import { arrToStr } from '@zlabnext/ztool';

const result1 = arrToStr(['1', '2', '3']);
console.log(result1); // 1,2,3

const result2 = arrToStr(['1', '2', '3'], '');
console.log(result2); // 123
```

### strToArr

String to Array

- Syntax

`strToArr(str, splitFlag)`

| Field     | Type     | Required | Default | Description         |
| --------- | -------- | -------- | ------- | ------------------- |
| str       | `string` | Yes      | -       | Source string       |
| splitFlag | `string` | No       | ,       | Splitting delimiter |

- Example Code

```js
import { strToArr } from '@zlabnext/ztool';

const result1 = strToArr('1,2,3');
console.log(result1); // ['1', '2', '3']

const result2 = strToArr('1,2,3', '');
console.log(result2); // ['123']
```
