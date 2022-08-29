import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Consulta } from "../../core/models/tables.models/consulta.model";
import { TablesService } from "../shared/tableConsultaTAC.service";

/**
 *
 *    TABLA DE LA CONSULTA DE TAC
 *
 */

const Columns = [
  {
    name: "Fecha de Consulta",
    formControl: "queryDate",
    type: "text",
  },
  {
    name: "Responsable",
    formControl: "responsible",
    type: "text",
  },
  {
    name: "TAC",
    formControl: "tac",
    type: "text",
  },
  {
    name: "Marca",
    formControl: "brand",
    type: "text",
  },
  {
    name: "Modelo",
    formControl: "model",
    type: "text",
  },
  {
    name: "Marca GSMA SI/NO",
    formControl: "gsmabrand",
    type: "text",
  },
  {
    name: "Modelo GSMA SI/NO",
    formControl: "gsmamodel",
    type: "text",
  },
  {
    name: "TAC Homologado en CRC",
    formControl: "crctacapp",
    type: "text",
  },
  {
    name: "Marca",
    formControl: "brand_C",
    type: "text",
  },
  {
    name: "Modelo",
    formControl: "model_C",
    type: "text",
  },
  {
    name: "Fabricante",
    formControl: "manufacturer",
    type: "text",
  },
  {
    name: "Observaciones y Aclaraciones, Pregunta",
    formControl: "question",
    type: "text",
  },
  {
    name: "Observaciones y Aclaraciones, Respuesta",
    formControl: "answer",
    type: "text",
  },
  {
    name: "Correo del Solicitante",
    formControl: "applicantEMail",
    type: "text",
  },
  {
    name: "Jornada de Consulta",
    formControl: "consultationDay",
    type: "text",
  },
];

@Component({
  selector: "tableTAC",
  styleUrls: ["../assets/tables.component.css"],
  templateUrl: "tableTemplate.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class TableTAC implements OnInit {
  //Definicion de las variables a usar
  formFields = Columns;
  mode: boolean;
  touchedRows: any;
  listaConsulta: Consulta[] = [];
  templateTable: FormGroup;
  control: FormArray;

  //Variable para el almacenamiento local de la tabla
  private localStorageService: Storage;

  constructor(private tableService: TablesService, private fb: FormBuilder) {
    this.localStorageService = localStorage;
  }

  ngOnInit(): void {
    this.tableService
      .getConsultaDeTAC()
      .subscribe((result) => this.setCurrentTable(result));

    this.listaConsulta = this.loadTable();

    this.touchedRows = [];
    this.templateTable = this.fb.group({
      tableRows: this.fb.array([]),
    });
    this.addRow();

    console.log(this.listaConsulta);
  }

  ngAfterOnInit() {
    this.control = this.templateTable.get("tableRows") as FormArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      queryDate: [""],
      responsible: [""],
      tac: [""],
      brand: [""],
      model: [""],
      gsmabrand: [""],
      gsmamodel: [""],
      crctacapp: [""],
      brand_C: [""],
      model_C: [""],
      manufacturer: [""],
      question: [""],
      answer: [""],
      applicantEMail: [""],
      consultationDay: [""],
      isEditable: [true]
    });
  }

  //Setter de la tabla en el almacenamiento
  setCurrentTable(table: Consulta[]): void {
    this.localStorageService.setItem("consultaTable", JSON.stringify(table));
  }

  //Loader de la tabla guardada en el almacenamiento
  loadTable(): Consulta[] {
    var tableStr = this.localStorageService.getItem("consultaTable");
    return tableStr ? <Consulta[]>JSON.parse(tableStr) : null;
  }

  addRowDetails() {
    const consultaDetail = this.initiateForm();
    this.formFields.forEach((field) =>
      consultaDetail.addControl(field.formControl, this.fb.control([]))
    );
    return consultaDetail;
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
