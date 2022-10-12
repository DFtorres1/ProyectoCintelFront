import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Consulta } from "../../core/models/tables.models/consulta.model";
import { TablesServiceTAC } from "../shared/tableConsultaTAC.service";

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
  nametl: string;
  formFields = Columns;
  mode: boolean;
  touchedRows: any;
  consultas: Consulta;
  listaConsulta: Consulta[] = [];
  templateTable: FormGroup;
  control: FormArray;

  //Variable para el almacenamiento local de la tabla
  private localStorageService: Storage;

  constructor(private tableService: TablesServiceTAC, private fb: FormBuilder) {
    this.localStorageService = localStorage;
    this.nametl = 'CONSULTA TAC';
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

    this.loadTable().map((result) => this.addRow(result));

    this.addRow();
  }

  ngAfterOnInit() {
    this.control = this.templateTable.get("tableRows") as FormArray;
  }

  initiateForm(consulta?: Consulta): FormGroup {
    if (consulta != undefined) {
      return this.fb.group({
        idCt: [consulta.idCt],
        queryDate: [consulta.queryDate],
        responsible: [consulta.responsible],
        tac: [consulta.tac],
        brand: [consulta.brand],
        model: [consulta.model],
        gsmabrand: [consulta.gsmabrand],
        gsmamodel: [consulta.gsmamodel],
        crctacapp: [consulta.crctacapp],
        brand_C: [consulta.brand_C],
        model_C: [consulta.model_C],
        manufacturer: [consulta.manufacturer],
        question: [consulta.question],
        answer: [consulta.answer],
        applicantEMail: [consulta.applicantEMail],
        consultationDay: [consulta.consultationDay],
        isEditable: [false],
        new: [false],
      });
    } else {
      return this.fb.group({
        idCt: [""],
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
        isEditable: [true],
        new: [true],
      });
    }
  }

  // Setter de la tabla en el almacenamiento
  setCurrentTable(table: Consulta[]): void {
    this.localStorageService.setItem("consultaTable", JSON.stringify(table));
  }

  // Loader de la tabla guardada en el almacenamiento
  loadTable(): Consulta[] {
    var tableStr = this.localStorageService.getItem("consultaTable");
    return tableStr ? <Consulta[]>JSON.parse(tableStr) : null;
  }

  addRowDetails(consulta?: Consulta) {
    const consultaDetail = this.initiateForm(consulta);

    this.formFields.forEach((field) =>
      consultaDetail.addControl(field.formControl, this.fb.control([]))
    );
    return consultaDetail;
  }

  addRow(consulta?: Consulta) {
    const control = this.templateTable.get("tableRows") as FormArray;
    control.push(this.addRowDetails(consulta));
  }

  deleteRow(index: number, group: FormGroup) {
    const control = this.templateTable.get("tableRows") as FormArray;
    control.removeAt(index);

    this.tableService
      .deleteConsultaDeTAC(group.get("idCt").value)
      .subscribe((consulta: Consulta[]) => this.setCurrentTable(consulta));
  }

  editRow(group: FormGroup) {
    group.get("isEditable").setValue(true);
    group.get("new").setValue(false);
  }

  doneRow(group: FormGroup) {
    group.get("isEditable").setValue(false);

    if (group.get("new").value) {
      this.consultas = {
        queryDate: group.get("queryDate").value,
        responsible: group.get("responsible").value,
        tac: group.get("tac").value,
        brand: group.get("brand").value,
        model: group.get("model").value,
        gsmabrand: group.get("gsmabrand").value,
        gsmamodel: group.get("gsmamodel").value,
        crctacapp: group.get("crctacapp").value,
        brand_C: group.get("brand_C").value,
        model_C: group.get("model_C").value,
        manufacturer: group.get("manufacturer").value,
        question: group.get("question").value,
        answer: group.get("answer").value,
        applicantEMail: group.get("applicantEMail").value,
        consultationDay: group.get("consultationDay").value,
      };

      this.tableService
        .postConsultaDeTAC(this.consultas)
        .subscribe((consulta: Consulta[]) => {
          this.setCurrentTable(consulta);
          group.get("idLc").setValue(consulta[-1].idCt);
        });
    } else {
      this.consultas = {
        idCt: group.get("idCt").value,
        queryDate: group.get("queryDate").value,
        responsible: group.get("responsible").value,
        tac: group.get("tac").value,
        brand: group.get("brand").value,
        model: group.get("model").value,
        gsmabrand: group.get("gsmabrand").value,
        gsmamodel: group.get("gsmamodel").value,
        crctacapp: group.get("crctacapp").value,
        brand_C: group.get("brand_C").value,
        model_C: group.get("model_C").value,
        manufacturer: group.get("manufacturer").value,
        question: group.get("question").value,
        answer: group.get("answer").value,
        applicantEMail: group.get("applicantEMail").value,
        consultationDay: group.get("consultationDay").value,
      };

      this.tableService
        .putConsultaDeTAC(this.consultas)
        .subscribe((consulta: Consulta[]) => this.setCurrentTable(consulta));
    }
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
