import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Chequeo } from "../../core/models/tables.models/listaDeChequeo.model";
import { Consolidado } from "../../core/models/tables.models/consolidado.model";
import { TablesService } from "../shared/tableConsolidado.service";
import { TablesServiceChequeo } from "../shared/tableChequeo.service";

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
    type: "date",
  },
  {
    name: "Responsable",
    formControl: "responsible",
    type: "text",
  },
  {
    name: "Fecha Límite",
    formControl: "deadlineDate",
    type: "date",
  },
  {
    name: "Vencimiento CRC",
    formControl: "crcexpiration",
    type: "date",
  },
  {
    name: "Vencimiento CINTEL",
    formControl: "cintelExpiration",
    type: "date",
  },
  {
    name: "Fecha Entrada CINTEL",
    formControl: "cintelEntryDate",
    type: "date",
  },
  {
    name: "Fecha Entrada Responsable",
    formControl: "responsibleEntryDate",
    type: "date",
  },
  {
    name: "Fecha Salida Responsable",
    formControl: "responsibleExitDate",
    type: "date",
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
    type: "date",
  },
  {
    name: "Fecha Salida CINTEL",
    formControl: "cintelExitDate",
    type: "date",
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
  consolidados: Consolidado;
  chequeos: Chequeo;
  listaConsolidados: Consolidado[] = [];
  templateTable: FormGroup;
  control: FormArray;

  //Variable para el almacenamiento local de la tabla
  private localStorageService: Storage;

  constructor(private tableService: TablesService, private tableChequeoService: TablesServiceChequeo, private fb: FormBuilder) {
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

    this.loadTable().map((result) => this.addRow(result));

    this.addRow();
  }

  ngAfterOnInit() {
    this.control = this.templateTable.get("tableRows") as FormArray;
  }

  initiateForm(consolidado?: Consolidado): FormGroup {
    if (consolidado != undefined) {
      return this.fb.group({
        idCg: [consolidado.idCg],
        entrySettlement: [consolidado.entrySettlement],
        crcentryDate: [consolidado.crcentryDate],
        responsible: [consolidado.responsible],
        deadlineDate: [consolidado.deadlineDate],
        crcexpiration: [consolidado.crcexpiration],
        cintelExpiration: [consolidado.cintelExpiration],
        cintelEntryDate: [consolidado.cintelEntryDate],
        responsibleEntryDate: [consolidado.responsibleEntryDate],
        responsibleExitDate: [consolidado.responsibleExitDate],
        businessDays: [consolidado.businessDays],
        status: [consolidado.status],
        theme: [consolidado.theme],
        classification: [consolidado.classification],
        settlementAssign: [consolidado.settlementAssign],
        reviewer: [consolidado.reviewer],
        reviewDate: [consolidado.reviewDate],
        cintelExitDate: [consolidado.cintelExitDate],
        responsibleObs: [consolidado.responsibleObs],
        reviewObs: [consolidado.reviewObs],
        aditionalObs: [consolidado.aditionalObs],
        complements: [consolidado.complements],
        isEditable: [false],
        new: [false],
      });
    } else {
      return this.fb.group({
        idCg: [""],
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
        isEditable: [true],
        new: [true],
      });
    }
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

  addRowDetails(consolidado?: Consolidado) {
    const consolidadoDetail = this.initiateForm(consolidado);

    this.formFields.forEach((field) =>
      consolidadoDetail.addControl(field.formControl, this.fb.control([]))
    );
    return consolidadoDetail;
  }

  addRow(consolidado?: Consolidado) {
    const control = this.templateTable.get("tableRows") as FormArray;
    control.push(this.addRowDetails(consolidado));
  }

  deleteRow(index: number, group: FormGroup) {
    const control = this.templateTable.get("tableRows") as FormArray;
    control.removeAt(index);

    this.tableService
      .deleteConsolidadoGeneral(group.get("idCg").value)
      .subscribe((consolidado: Consolidado[]) =>
        this.setCurrentTable(consolidado)
      );
  }

  editRow(group: FormGroup) {
    group.get("isEditable").setValue(true);
    group.get("new").setValue(false);
  }

  doneRow(group: FormGroup) {
    group.get("isEditable").setValue(false);

    if (group.get("new").value) {
      this.consolidados = {
        entrySettlement: group.get("entrySettlement").value,
        crcentryDate: group.get("crcentryDate").value,
        responsible: group.get("responsible").value,
        deadlineDate: group.get("deadlineDate").value,
        crcexpiration: group.get("crcexpiration").value,
        cintelExpiration: group.get("cintelExpiration").value,
        cintelEntryDate: group.get("cintelEntryDate").value,
        responsibleEntryDate: group.get("responsibleEntryDate").value,
        responsibleExitDate: group.get("responsibleExitDate").value,
        businessDays: group.get("businessDays").value,
        status: group.get("status").value,
        theme: group.get("theme").value,
        classification: group.get("classification").value,
        settlementAssign: group.get("settlementAssign").value,
        reviewer: group.get("reviewer").value,
        reviewDate: group.get("reviewDate").value,
        cintelExitDate: group.get("cintelExitDate").value,
        responsibleObs: group.get("responsibleObs").value,
        reviewObs: group.get("reviewObs").value,
        aditionalObs: group.get("aditionalObs").value,
        complements: group.get("complements").value,
      };

      this.chequeos = {
        settled: group.get("entrySettlement").value,
        entryDate: null,
        userType: null,
        brand: null,
        model: null,
        tac: null,
        tacquery: null,
        label: null,
        fcc: null,
        anatel: null,
        ic: null,
        ncc: null,
        ofca: null,
        mtc: null,
        mic: null,
        cccCo: null,
        ce: null,
        others: null,
        mhz700: null,
        mhz850: null,
        mhz1700: null,
        mhz1900: null,
        mhz2500: null,
        sar: null,
        certifyingEntity: null,
        certifierNumber: null,
        laboratory: null,
        answer: null,
        complements: null,
        agent: group.get("responsible").value
      }

      this.tableChequeoService.postListaDeChequeo(this.chequeos).subscribe();

      this.tableService
        .postConsolidadoGeneral(this.consolidados)
        .subscribe((consolidado: Consolidado[]) => {
          this.setCurrentTable(consolidado);
          this.ngOnInit;
        });
    } else {
      this.consolidados = {
        idCg: group.get("idCg").value,
        entrySettlement: group.get("entrySettlement").value,
        crcentryDate: group.get("crcentryDate").value,
        responsible: group.get("responsible").value,
        deadlineDate: group.get("deadlineDate").value,
        crcexpiration: group.get("crcexpiration").value,
        cintelExpiration: group.get("cintelExpiration").value,
        cintelEntryDate: group.get("cintelEntryDate").value,
        responsibleEntryDate: group.get("responsibleEntryDate").value,
        responsibleExitDate: group.get("responsibleExitDate").value,
        businessDays: group.get("businessDays").value,
        status: group.get("status").value,
        theme: group.get("theme").value,
        classification: group.get("classification").value,
        settlementAssign: group.get("settlementAssign").value,
        reviewer: group.get("reviewer").value,
        reviewDate: group.get("reviewDate").value,
        cintelExitDate: group.get("cintelExitDate").value,
        responsibleObs: group.get("responsibleObs").value,
        reviewObs: group.get("reviewObs").value,
        aditionalObs: group.get("aditionalObs").value,
        complements: group.get("complements").value,
      };

      this.tableService
        .putConsolidadoGeneral(this.consolidados)
        .subscribe((consolidado: Consolidado[]) =>
          this.setCurrentTable(consolidado)
        );
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
