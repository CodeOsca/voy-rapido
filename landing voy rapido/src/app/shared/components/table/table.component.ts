import { Columns } from "../../interfaces/columns.interface";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatColumnDef, MatHeaderRowDef, MatTable, MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: [
    "../../scss/table.scss",
    "../../scss/form.scss",
    "./table.component.scss"
  ],
})
export class TableComponent<T> {
  verSelect: boolean = false;
  form: FormGroup;
  is1024: boolean = false;
  is768: boolean = false;
  is680: boolean = false;
  is480: boolean = false;
  headers: string[][] = [];
  columnsSelect: string[] = [];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<T>;
  selection: SelectionModel<T>;
  @Input() filterOptions: string[] = [];
  @Input() columns: Columns;
  @Input() hasHeaderOptions = false;
  @Input() hasSearchInput = true;
  @Input() laberPerPage: string;
  private _data: T[] = [];
  @Input() set data(data: T[]) {
    if (data) {
      this._data = data;
      this.setData();
    }
  }
  get data() {
    return this._data;
  }
  @Output() onSelection = new EventEmitter<T[]>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<T>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ContentChildren(MatHeaderRowDef) headerDefs: QueryList<MatHeaderRowDef>;

  constructor(private fb: FormBuilder, private pag: MatPaginatorIntl, public breakObsrv: BreakpointObserver) {
    this.form = this.fb.group({ buscar: [""] });
  }

  ngAfterContentInit(): void {
    this.headers = this.columns.columns;
    this.columnsSelect = this.columns.columnsSelect;
    this.displayedColumns = this.columns.displayedColumns;
    this.headerDefs.forEach((headerDef) => this.table.addHeaderRowDef(headerDef));
    this.columnDefs.forEach((columnDef) => this.table.addColumnDef(columnDef));
    this.setData();
    this.pag.itemsPerPageLabel = this.laberPerPage;
    this.pag.nextPageLabel = "Siguiente";
    this.pag.previousPageLabel = "Anterior";

    this.breakObsrv
      .observe([
        "(max-width: 1024px)",
        "(max-width: 768px)",
        "(max-width: 680px)",
        "(max-width: 480px)",
        "(orientation: portrait)",
        "(orientation: landscape)",
      ])
      .subscribe((lay) => {
        this.is1024 = lay.breakpoints["(max-width: 1024px)"];
        this.is768 = lay.breakpoints["(max-width: 768px)"];
        this.is680 = lay.breakpoints["(max-width: 680px)"];
        this.is480 = lay.breakpoints["(max-width: 480px)"];

        if (lay.breakpoints["(max-width: 480px)"]) {
          this.displayedColumns = this.columns[480];
          this.columnsSelect = this.columns[480];
        } else if (lay.breakpoints["(max-width: 680px)"]) {
          this.displayedColumns = this.columns[680];
          this.columnsSelect = this.columns[680];
        } else if (lay.breakpoints["(max-width: 768px)"]) {
          this.displayedColumns = this.columns[768];
          this.columnsSelect = this.columns[768];
        } else {
          this.displayedColumns = this.columns[1024];
          this.columnsSelect = this.columns[1024];
        }
      });
  }

  setData() {
    this.dataSource = new MatTableDataSource(this._data);
    this.dataSource.paginator = this.paginator;
    this.selection = new SelectionModel<T>(true, []);
    this.selection.changed.subscribe((selection) => {
      const data = selection["source"]["selected"];
      this.onSelection.emit(data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search(event: Event) {
    const value = (<HTMLInputElement>event.target).value;
    this.applyFilter(value);
  }

  filter(value: string) {
    (<HTMLInputElement>document.getElementById("inputSearch")!).value = value;
    this.applyFilter(value);
  }

  applyFilter(value: string) {
    this.dataSource.filter = value;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggle(value: string) {
    var index = this.columnsSelect.indexOf(value);
    if (index === -1) {
      if (this.is1024 && this.columnsSelect.length === 5) {
        this.columnsSelect.splice(-2, 1);
      }
      if (this.is768 && this.columnsSelect.length === 4) {
        this.columnsSelect.splice(-2, 1);
      }
      if (this.is680 && this.columnsSelect.length === 3) {
        this.columnsSelect.splice(-2, 1);
      }
      if (this.is480 && this.columnsSelect.length === 2) {
        this.columnsSelect.splice(-2, 1);
      }
    }

    if (index === -1) {
      const position = this.headers.findIndex((column) => column[1] === value);
      this.columnsSelect.splice(position, 0, value);
    } else this.splice(value);
    this.splice("opciones");
    this.columnsSelect.push("opciones");
    this.displayedColumns = this.columnsSelect;
  }

  exists(value: string) {
    return this.columnsSelect.indexOf(value) > -1;
  }

  splice(value: string) {
    var index = this.columnsSelect.indexOf(value);
    this.columnsSelect.splice(index, 1);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return "";
  }
}