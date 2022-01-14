import { Columns } from './../../../shared/interfaces/columns.interface';
export const HistoricoColumns: Columns = {
  columns: [
    ['Método', 'media'],
    ['Tipo', 'typeReference'],
    ['Total pagado', 'amount'],
    ['Fecha del pago', 'paymentDate'],
  ],
  columnsSelect: ['media', 'typeReference', 'amount', 'paymentDate', 'opciones'],
  displayedColumns: ['media', 'typeReference', 'amount', 'paymentDate', 'opciones'],
  480: ['amount'],
  680: ['media', 'amount', 'opciones'],
  768: ['media', 'typeReference', 'amount', 'paymentDate', 'opciones'],
  1024: ['media', 'typeReference', 'amount', 'paymentDate', 'opciones'],
};
