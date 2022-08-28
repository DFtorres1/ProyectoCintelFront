import {
  Component, OnInit, ViewEncapsulation
} from "@angular/core";
import { Chequeo } from "../../core/models/tables.models/listaDeChequeo.model";
import { TablesService } from "../shared/tableChequeo.service";

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
  "MTC",
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
  displayedColumns = Columns;
  title = "Chequeo.UI";
  listaChequeos: Chequeo[] = []

  //Variable para el almacenamiento local de la tabla
  private localStorageService: Storage;


  constructor(private tableService: TablesService) {
    this.localStorageService = localStorage;
  }

  ngOnInit() {
    this.tableService.getListaDeChequeo().subscribe(
      result => this.setCurrentTable(result));

    this.listaChequeos = this.loadTable();

    console.log(this.listaChequeos);

  }

  //Setter de la tabla en el almacenamiento
  setCurrentTable(table: Chequeo[]): void {
    this.localStorageService.setItem('currentTable', JSON.stringify(table));
  }

  //Loader de la tabla guardada en el almacenamiento
  loadTable(): Chequeo[] {
    var tableStr = this.localStorageService.getItem('currentTable');
    return (tableStr) ? <Chequeo[]>JSON.parse(tableStr) : null;
  }

  create(): Chequeo {
    return;
  }

  delete(): Chequeo {
    return;
  }

}
