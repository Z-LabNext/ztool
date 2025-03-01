import { CellMerger } from './cellMerger';
import * as constants from '../models/mergeHelper/cellMerger/cellMerger.constants';
import { Mode } from '../models/mergeHelper/cellMerger/cellMerger.enums';
import {
  getMergedData,
  splitIntoFragments,
  getSortNo,
  getFieldSpan,
} from '../api';

export {
  CellMerger,
  constants,
  Mode,
  getFieldSpan,
  getMergedData,
  splitIntoFragments,
  getSortNo,
};
