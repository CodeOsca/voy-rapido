import { Commune } from './../interfaces/commune.interface';
import { Injectable } from '@angular/core';
import { DataValidation, Workbook, Worksheet } from 'exceljs';
import { saveAs } from 'file-saver';
import { HeaderDispatch } from '../constants/header-excel-dispatch.constant';
import { CommunesService } from './communes.service';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  private name = 'Agregar Productos';
  private type =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  private workbook = new Workbook();
  private worksheet: Worksheet;
  private worksheetCommunes: Worksheet;

  constructor(private communeService: CommunesService) {
    this.worksheet = this.workbook.addWorksheet(this.name);
    this.worksheetCommunes = this.workbook.addWorksheet('communes', {
      state: 'veryHidden',
    });
  }

  generate() {
    this.communeService.getAll().subscribe((communes: Commune[]) => {
      this.buildCommunesSheet(communes);
      this.worksheet.columns = HeaderDispatch;
      this.generateFakeCells();
      this.setAutocompleteCommunes();
      this.save();
    });
  }

  private buildCommunesSheet(communes: Commune[]) {
    const data = communes.map((commune) => [commune.name]);
    this.worksheetCommunes.addRows(data);
  }

  private generateFakeCells() {
    const dataFake = new Array(250).fill(0).map(() => ['']);
    this.worksheet
      .addRows(dataFake)
      .forEach((row) => (row.font = { color: { argb: 'FFF' } }));
  }

  private async setAutocompleteCommunes() {
    const column = this.worksheet.getColumn('B');
    const config: DataValidation = {
      type: 'list',
      formulae: ['=communes!$A$1:$A$100'],
    };
    column.eachCell((cell) => (cell.dataValidation = config));
  }

  private async save() {
    const data = await this.workbook.xlsx.writeBuffer();
    const blob = new Blob([data], { type: this.type });
    saveAs(blob, this.name + '.xlsx');
  }
}
