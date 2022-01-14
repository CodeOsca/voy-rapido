import { arraysToObject } from '../../helpers/arrays-to-object.helper';
import { keysToEnglish } from '../../helpers/keys-to-english.helper';
import readXlsxFile from 'read-excel-file';

export class ExcelReader {
  constructor(private buffer: Buffer) {}

  async read() {
    const rows = await readXlsxFile(this.buffer);
    const [_, ...productRows] = [...rows];
    const keys = keysToEnglish();
    return arraysToObject(keys, productRows);
  }
}
