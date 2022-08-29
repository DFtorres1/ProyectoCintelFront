import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Consolidado } from "../../core/models/tables.models/consolidado.model";
import { TablesService } from "../shared/tableConsolidado.service";

/**
 *
 *    TABLA DEL CONSOLIDADO GENERAL
 *
 */

const Columns = [
  {
    name: "Radicación Entrada",
    formControl: "entrySettlement",
    type: "text",
  },
  {
    name: "Fecha Entrada CRC",
    formControl: "crcentryDate",
    type: "text",
  },
  {
    name: "Responsable",
    formControl: "responsible",
    type: "text",
  },
  {
    name: "Fecha Límite",
    formControl: "deadlineDate",
    type: "text",
  },
  {
    name: "Vencimiento CRC",
    formControl: "crcexpiration",
    type: "text",
  },
  {
    name: "Vencimiento CINTEL",
    formControl: "cintelExpiration",
    type: "text",
  },
  {
    name: "Fecha Entrada CINTEL",
    formControl: "cintelEntryDate",
    type: "text",
  },
  {
    name: "Fecha Entrada Responsable",
    formControl: "responsibleEntryDate",
    type: "text",
  },
  {
    name: "Fecha Salida Responsable",
    formControl: "responsibleExitDate",
    type: "text",
  },
  {
    name: "Días Hábiles",
    formControl: "businessDays",
    type: "text",
  },
  {
    name: "Estado",
    formControl: "status",
    type: "text",
  },
  {
    name: "Temática",
    formControl: "theme",
    type: "text",
  },
  {
    name: "Clasificación",
    formControl: "classification",
    type: "text",
  },
  {
    name: "Asigna Radicado",
    formControl: "settlementAssign",
    type: "text",
  },
  {
    name: "Revisor",
    formControl: "reviewer",
    type: "text",
  },
  {
    name: "Fecha Revisión",
    formControl: "reviewDate",
    type: "text",
  },
  {
    name: "Fecha Salida CINTEL",
    formControl: "cintelExitDate",
    type: "text",
  },
  {
    name: "Observaciones Responsable",
    formControl: "responsibleObs",
    type: "text",
  },
  {
    name: "Observaciones Revisión",
    formControl: "reviewObs",
    type: "text",
  },
  {
    name: "Observaciones Adicionales",
    formControl: "aditionalObs",
    type: "text",
  },
  {
    name: "Complementos",
    formControl: "complements",
    type: "text",
  },
];

@Component({
  selector: "tableConsolidado",
  styleUrls: ["../assets/tables.component.css"],
  templateUrl: "tableTemplate.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class TableConsolidado implements OnInit {
  //Definicion de las variables a usar
  formFields = Columns;
  mode: boolean;
  touchedRows: any;
  listaConsolidados: Consolidado[] = [];
  templateTable: FormGroup;
  control: FormArray;

  //Variable para el almacenamiento local de la tabla
  private localStorageService: Storage;

  constructor(private tableService: TablesService, private fb: FormBuilder) {
    this.localStorageService = localStorage;
  }

  ngOnInit(): void {
    this.tableService
      .getConsolidadoGeneral()
      .subscribe((result) => this.setCurrentTable(result));

    this.listaConsolidados = this.loadTable();

    this.touchedRows = [];
    this.templateTable = this.fb.group({
      tableRows: this.fb.array([]),
    });
    this.addRow();

    console.log(this.listaConsolidados);
  }

  ngAfterOnInit() {
    this.control = this.templateTable.get("tableRows") as FormArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      entrySettlement: [""],
      crcentryDate: [""],
      responsible: [""],
      deadlineDate: [""],
      crcexpiration: [""],
      cintelExpiration: [""],
      cintelEntryDate: [""],
      responsibleEntryDate: [""],
      responsibleExitDate: [""],
      businessDays: [""],
      status: [""],
      theme: [""],
      classification: [""],
      settlementAssign: [""],
      reviewer: [""],
      reviewDate: [""],
      cintelExitDate: [""],
      responsibleObs: [""],
      reviewObs: [""],
      aditionalObs: [""],
      complements: [""],
      isEditable: [true]
    });
  }

  //Setter de la tabla en el almacenamiento
  setCurrentTable(table: Consolidado[]): void {
    this.localStorageService.setItem("consolidadoTable", JSON.stringify(table));
  }

  //Loader de la tabla guardada en el almacenamiento
  loadTable(): Consolidado[] {
    var tableStr = this.localStorageService.getItem("consolidadoTable");
    return tableStr ? <Consolidado[]>JSON.parse(tableStr) : null;
  }

  addRowDetails() {
    const consolidadoDetail = this.initiateForm();
    this.formFields.forEach((field) =>
      consolidadoDetail.addControl(field.formControl, this.fb.control([]))
    );
    return consolidadoDetail;
  }

  addRow() {
    const control = this.templateTable.get("tableRows") as FormArray;
    control.push(this.addRowDetails());
  }

  deleteRow(index: number) {
    const control = this.templateTable.get("tableRows") as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get("isEditable").setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get("isEditable").setValue(false);
  }

  submitForm() {
    const control = this.templateTable.get("tableRows") as FormArray;
    this.touchedRows = control.controls
      .filter((row) => row.touched)
      .map((row) => row.value);
    console.log(this.touchedRows);
  }

  toggleTheme() {
    this.mode = !this.mode;
  }

  get getFormControls() {
    const control = this.templateTable.get("tableRows") as FormArray;
    return control;
  }
}
