import { DataSource } from "@angular/cdk/collections";
import {
  AfterContentInit,
  Component,
  ViewEncapsulation,
  ContentChildren,
  Input,
  AfterViewInit,
  QueryList,
  ViewChild,
  ContentChild,
  OnInit,
} from "@angular/core";
import { MatSort } from "@angular/material/sort";
import {
  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import { getTable } from "../../core/models/tables.models/table.model";
import { Chequeo } from "../../core/models/tables.models/listaDeChequeo.model";
import { TablesService } from "../shared/tables.service";

/**
 *
 *    TABLA DE LA LISTA DE CHEQUEO
 *
 */

const Columns: string[] = [
  "radicado",
  "fechaEntrada",
  "tipoUsu",
  "marca",
  "modelo",
  "numTAC",
  "consultaTAC",
  "etiqueta",
  "FCC",
  "ANATEL",
  "IC",
  "NCC",
  "OFCA",
  "MT",
  "MIC",
  "CCC-CO",
  "CE",
  "OTROS",
  "703MHz",
  "824MHz",
  "1710MHz",
  "1850MHz",
  "2500MHz",
  "SAR",
  "enteCert",
  "numCert",
  "laboratorio",
  "respuesta",
  "complementos",
];

@Component({
  selector: "tableChequeo",
  styleUrls: ["../assets/tables.component.css"],
  templateUrl: "tableChequeo.html",
  encapsulation: ViewEncapsulation.None,
})
export class TableChequeo implements OnInit {
  //Definicion de las variables a usar
  displayedColumns: string[] = Columns;
  dataSource: any;
  chequeos: Chequeo[] = [];
  listaChequeos: Chequeo[] = []

  //Variable para el almacenamiento local de la tabla
  private localStorageService: Storage;


  constructor(private tableService: TablesService) {
    this.localStorageService = localStorage;
    this.dataSource = this.loadTable();
  }

  ngOnInit() {
    this.tableService.getListaDeChequeo().subscribe(
      result => this.setCurrentTable(result));

    this.dataSource = this.loadTable();

    this.dataSource.map(factor => {
      this.listaChequeos.push(factor);
    });

    console.log(this.listaChequeos);

  }

  //Setter de la tabla en el almacenamiento
  setCurrentTable(table: getTable): void {
    this.localStorageService.setItem('currentTable', JSON.stringify(table));
  }

  //Loader de la tabla guardada en el almacenamiento
  loadTable(): getTable {
    var tableStr = this.localStorageService.getItem('currentTable');
    return (tableStr) ? <getTable>JSON.parse(tableStr) : null;
  }

  create(): Chequeo {
    return;
  }

  delete(): Chequeo {
    return;
  }

}
