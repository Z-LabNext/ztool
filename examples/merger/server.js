import { resolve } from 'path';
import { readFileSync } from 'fs';
import { createRequire } from 'module';

const __filename = new URL(import.meta.url).pathname;
const __dirname = resolve(__filename, '..');
const require = createRequire(import.meta.url);
const {
  Mode,
  getMergedData,
  getFieldSpan,
} = require('../../dist/cjs/ztool.min.cjs');

(function main() {
  const data = JSON.parse(readFileSync(resolve(__dirname, './data.json')));
  const mergedData = getMergedData({
    mode: Mode.Row,
    dataSource: data.dataSource,
    mergeFields: [data.columns[0].prop],
  });
  const fieldSpan = getFieldSpan(mergedData[0], data.columns[0].prop);
  console.log(fieldSpan);
})();
