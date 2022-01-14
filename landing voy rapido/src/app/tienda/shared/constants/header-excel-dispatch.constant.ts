import { Column, Font, Style } from 'exceljs/dist/exceljs.min.js';

const font: Partial<Font> = {
  bold: true,
  size: 12,
  italic: true,
  color: { argb: 'FFC0000' },
};

const style: Partial<Style> = {
  alignment: { horizontal: 'center', vertical: 'middle' },
  font,
};

export const HeaderDispatch: Partial<Column>[] = [
  { header: 'Nombre del cliente', key: 'name', width: 25, style },
  { header: 'Comuna', key: 'commune', width: 25, style },
  { header: 'Teléfono', key: 'phone', width: 20, style },
  { header: 'Dirección', key: 'address', width: 30, style },
  {
    header: 'Detalles (Número de departamento/casa,...)',
    key: 'addressDetails',
    width: 45,
    style,
  },
  { header: 'Observaciones', key: 'observations', width: 25, style },
];
