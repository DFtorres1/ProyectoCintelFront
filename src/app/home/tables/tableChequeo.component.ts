import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  UntypedFormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Consulta } from "../../core/models/tables.models/consulta.model";
import { Chequeo } from "../../core/models/tables.models/listaDeChequeo.model";
import { TablesServiceChequeo } from "../shared/tableChequeo.service";
import { TablesServiceTAC } from "../shared/tableConsultaTAC.service";

/**
 *
 *    TABLA DE LA LISTA DE CHEQUEO
 *
 */

const Columns = [
  {
    name: "Radicado",
    formControl: "settled",
    type: "text",
  },
  {
    name: "Fecha de entrada",
    formControl: "entryDate",
    type: "date",
  },
  {
    name: "Tipo de usuario",
    formControl: "userType",
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
    name: "TAC",
    formControl: "tac",
    type: "text",
  },
  {
    name: "Consulta TAC",
    formControl: "tacquery",
    type: "text",
  },
  {
    name: "Etiqueta",
    formControl: "label",
    type: "text",
  },
  {
    name: "FCC",
    formControl: "fcc",
    type: "text",
  },
  {
    name: "ANATEL",
    formControl: "anatel",
    type: "text",
  },
  {
    name: "IC",
    formControl: "ic",
    type: "text",
  },
  {
    name: "NCC",
    formControl: "ncc",
    type: "text",
  },
  {
    name: "OFCA",
    formControl: "ofca",
    type: "text",
  },
  {
    name: "MTC",
    formControl: "mtc",
    type: "text",
  },
  {
    name: "MIC",
    formControl: "mic",
    type: "text",
  },
  {
    name: "CCC-CO",
    formControl: "cccCo",
    type: "text",
  },
  {
    name: "CE",
    formControl: "ce",
    type: "text",
  },
  {
    name: "OTROS",
    formControl: "others",
    type: "text",
  },
  {
    name: "703MHz",
    formControl: "mhz700",
    type: "text",
  },
  {
    name: "824MHz",
    formControl: "mhz850",
    type: "text",
  },
  {
    name: "1710MHz",
    formControl: "mhz1700",
    type: "text",
  },
  {
    name: "1850MHz",
    formControl: "mhz1900",
    type: "text",
  },
  {
    name: "2500MHz",
    formControl: "mhz2500",
    type: "text",
  },
  {
    name: "SAR",
    formControl: "sar",
    type: "text",
  },
  {
    name: "Ente certificador",
    formControl: "certifyingEntity",
    type: "text",
  },
  {
    name: "Numero certificado",
    formControl: "certifierNumber",
    type: "text",
  },
  {
    name: "Laboratorio",
    formControl: "laboratory",
    type: "text",
  },
  {
    name: "Respuesta",
    formControl: "answer",
    type: "text",
  },
  {
    name: "Complementos",
    formControl: "complements",
    type: "text",
  },
];

@Component({
  selector: "tableChequeo",
  styleUrls: ["../assets/tables.component.css"],
  templateUrl: "tableTemplate.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class TableChequeo implements OnInit {
  //Definicion de las variables a usar
  nametl: string;
  formFields = Columns;
  mode: boolean;
  touchedRows: any;
  chequeos: Chequeo;
  consultas: Consulta;
  listaChequeos: Chequeo[] = [];
  templateTable: FormGroup;
  control: UntypedFormArray;
  validform = true;

  //Variable para el almacenamiento local de la tabla
  private localStorageService: Storage;

  constructor(
    private tableService: TablesServiceChequeo,
    private tableServiceTAC: TablesServiceTAC,
    private fb: FormBuilder
  ) {
    this.localStorageService = localStorage;
    this.nametl = "LISTA DE CHEQUEO";
  }

  ngOnInit(): void {
    this.tableService
      .getListaDeChequeo()
      .subscribe((result) => this.setCurrentTable(result));

    this.listaChequeos = this.loadTable();

    this.touchedRows = [];
    this.templateTable = this.fb.group({
      tableRows: this.fb.array([]),
    });

    this.loadTable().map((result) => this.addRow(result));

    this.addRow();
  }

  ngAfterOnInit() {
    this.control = this.templateTable.get("tableRows") as UntypedFormArray;
  }

  initiateForm(chequeo?: Chequeo): FormGroup {
    if (chequeo != undefined) {
      return this.fb.group({
        idLc: [chequeo.idLc],
        settled: [chequeo.settled],
        entryDate: [chequeo.entryDate],
        userType: [chequeo.userType],
        brand: [chequeo.brand],
        model: [chequeo.model],
        tac: [chequeo.tac],
        tacquery: [chequeo.tacquery],
        label: [chequeo.label],
        fcc: [chequeo.fcc],
        anatel: [chequeo.anatel],
        ic: [chequeo.ic],
        ncc: [chequeo.ncc],
        ofca: [chequeo.ofca],
        mtc: [chequeo.mtc],
        mic: [chequeo.mic],
        cccCo: [chequeo.cccCo],
        ce: [chequeo.ce],
        others: [chequeo.others],
        mhz700: [chequeo.mhz700],
        mhz850: [chequeo.mhz850],
        mhz1700: [chequeo.mhz1700],
        mhz1900: [chequeo.mhz1900],
        mhz2500: [chequeo.mhz2500],
        sar: [chequeo.sar],
        certifyingEntity: [chequeo.certifyingEntity],
        certifierNumber: [chequeo.certifierNumber],
        laboratory: [chequeo.laboratory],
        answer: [chequeo.answer],
        complements: [chequeo.complements],
        agent: [chequeo.agent],
        isEditable: [false],
        new: [false],
        tacEdited: [false],
        lastTac: [chequeo.tac],
      });
    } else {
      return this.fb.group({
        idLc: [""],
        settled: [""],
        entryDate: [""],
        userType: [""],
        brand: [""],
        model: [""],
        tac: [""],
        tacquery: [""],
        label: [""],
        fcc: [""],
        anatel: [""],
        ic: [""],
        ncc: [""],
        ofca: [""],
        mtc: [""],
        mic: [""],
        cccCo: [""],
        ce: [""],
        others: [""],
        mhz700: [""],
        mhz850: [""],
        mhz1700: [""],
        mhz1900: [""],
        mhz2500: [""],
        sar: [""],
        certifyingEntity: [""],
        certifierNumber: [""],
        laboratory: [""],
        answer: [""],
        complements: [""],
        isEditable: [true],
        new: [true],
        tacEdited: [false],
        lastTac: [""],
      });
    }
  }

  // Setter de la tabla en el almacenamiento
  setCurrentTable(table: Chequeo[]): void {
    this.localStorageService.setItem("currentTable", JSON.stringify(table));
  }

  // Loader de la tabla guardada en el almacenamiento
  loadTable(): Chequeo[] {
    var tableStr = this.localStorageService.getItem("currentTable");
    return tableStr ? <Chequeo[]>JSON.parse(tableStr) : null;
  }

  addRowDetails(chequeo?: Chequeo) {
    const chequeoDetail = this.initiateForm(chequeo);

    this.formFields.forEach((field) =>
      chequeoDetail.addControl(field.formControl, this.fb.control([]))
    );
    return chequeoDetail;
  }

  addRow(chequeo?: Chequeo) {
    const control = this.templateTable.get("tableRows") as UntypedFormArray;
    control.push(this.addRowDetails(chequeo));
  }

  deleteRow(index: number, group: FormGroup) {
    const control = this.templateTable.get("tableRows") as UntypedFormArray;
    control.removeAt(index);

    this.tableService
      .deleteListaDeChequeo(group.get("idLc").value)
      .subscribe((check: Chequeo[]) => this.setCurrentTable(check));
  }

  editRow(group: FormGroup) {
    group.get("isEditable").setValue(true);
    group.get("new").setValue(false);
  }

  doneRow(group: FormGroup) {
    var settledtmp = JSON.stringify(group.get("settled").value);
    var tactmp = JSON.stringify(group.get("tac").value);

    if (settledtmp.length - 2 == 10 && tactmp.length - 2 == 8) {
      group.get("isEditable").setValue(false);
      this.validform = true;
      if (group.get("new").value) {
        this.chequeos = {
          settled: group.get("settled").value,
          entryDate: group.get("entryDate").value,
          userType: group.get("userType").value,
          brand: group.get("brand").value,
          model: group.get("model").value,
          tac: group.get("tac").value,
          tacquery: group.get("tacquery").value,
          label: group.get("label").value,
          fcc: group.get("fcc").value === ("true" || "1"),
          anatel: group.get("anatel").value === ("true" || "1"),
          ic: group.get("ic").value === ("true" || "1"),
          ncc: group.get("ncc").value === ("true" || "1"),
          ofca: group.get("ofca").value === ("true" || "1"),
          mtc: group.get("mtc").value === ("true" || "1"),
          mic: group.get("mic").value === ("true" || "1"),
          cccCo: group.get("cccCo").value === ("true" || "1"),
          ce: group.get("ce").value === ("true" || "1"),
          others: group.get("others").value === ("true" || "1"),
          mhz700: group.get("mhz700").value === ("true" || "1"),
          mhz850: group.get("mhz850").value === ("true" || "1"),
          mhz1700: group.get("mhz1700").value === ("true" || "1"),
          mhz1900: group.get("mhz1900").value === ("true" || "1"),
          mhz2500: group.get("mhz2500").value === ("true" || "1"),
          sar: group.get("sar").value === ("true" || "1"),
          certifyingEntity: group.get("certifyingEntity").value,
          certifierNumber: group.get("certifierNumber").value,
          laboratory: group.get("laboratory").value,
          answer: group.get("answer").value,
          complements: group.get("complements").value,
        };

        this.consultas = {
          queryDate: null,
          responsible: null,
          tac: group.get("tac").value,
          brand: group.get("brand").value,
          model: group.get("model").value,
          gsmabrand: null,
          gsmamodel: null,
          crctacapp: null,
          brand_C: null,
          model_C: null,
          manufacturer: null,
          question: null,
          answer: null,
          applicantEMail: null,
          consultationDay: null,
        };

        this.tableService
          .postListaDeChequeo(this.chequeos)
          .subscribe((check: Chequeo[]) => this.setCurrentTable(check));

        this.tableServiceTAC.postConsultaDeTAC(this.consultas).subscribe();
      } else if (group.get("lastTac").value == group.get("tac").value) {
        this.chequeos = {
          idLc: group.get("idLc").value,
          settled: group.get("settled").value,
          entryDate: group.get("entryDate").value,
          userType: group.get("userType").value,
          brand: group.get("brand").value,
          model: group.get("model").value,
          tac: group.get("tac").value,
          tacquery: group.get("tacquery").value,
          label: group.get("label").value,
          fcc: group.get("fcc").value === ("true" || "1"),
          anatel: group.get("anatel").value === ("true" || "1"),
          ic: group.get("ic").value === ("true" || "1"),
          ncc: group.get("ncc").value === ("true" || "1"),
          ofca: group.get("ofca").value === ("true" || "1"),
          mtc: group.get("mtc").value === ("true" || "1"),
          mic: group.get("mic").value === ("true" || "1"),
          cccCo: group.get("cccCo").value === ("true" || "1"),
          ce: group.get("ce").value === ("true" || "1"),
          others: group.get("others").value === ("true" || "1"),
          mhz700: group.get("mhz700").value === ("true" || "1"),
          mhz850: group.get("mhz850").value === ("true" || "1"),
          mhz1700: group.get("mhz1700").value === ("true" || "1"),
          mhz1900: group.get("mhz1900").value === ("true" || "1"),
          mhz2500: group.get("mhz2500").value === ("true" || "1"),
          sar: group.get("sar").value === ("true" || "1"),
          certifyingEntity: group.get("certifyingEntity").value,
          certifierNumber: group.get("certifierNumber").value,
          laboratory: group.get("laboratory").value,
          answer: group.get("answer").value,
          complements: group.get("complements").value,
        };

        this.tableService
          .putListaDeChequeo(this.chequeos)
          .subscribe((check: Chequeo[]) => this.setCurrentTable(check));
      } else {
        this.chequeos = {
          idLc: group.get("idLc").value,
          settled: group.get("settled").value,
          entryDate: group.get("entryDate").value,
          userType: group.get("userType").value,
          brand: group.get("brand").value,
          model: group.get("model").value,
          tac: group.get("tac").value,
          tacquery: group.get("tacquery").value,
          label: group.get("label").value,
          fcc: group.get("fcc").value === ("true" || "1"),
          anatel: group.get("anatel").value === ("true" || "1"),
          ic: group.get("ic").value === ("true" || "1"),
          ncc: group.get("ncc").value === ("true" || "1"),
          ofca: group.get("ofca").value === ("true" || "1"),
          mtc: group.get("mtc").value === ("true" || "1"),
          mic: group.get("mic").value === ("true" || "1"),
          cccCo: group.get("cccCo").value === ("true" || "1"),
          ce: group.get("ce").value === ("true" || "1"),
          others: group.get("others").value === ("true" || "1"),
          mhz700: group.get("mhz700").value === ("true" || "1"),
          mhz850: group.get("mhz850").value === ("true" || "1"),
          mhz1700: group.get("mhz1700").value === ("true" || "1"),
          mhz1900: group.get("mhz1900").value === ("true" || "1"),
          mhz2500: group.get("mhz2500").value === ("true" || "1"),
          sar: group.get("sar").value === ("true" || "1"),
          certifyingEntity: group.get("certifyingEntity").value,
          certifierNumber: group.get("certifierNumber").value,
          laboratory: group.get("laboratory").value,
          answer: group.get("answer").value,
          complements: group.get("complements").value,
        };

        this.consultas = {
          queryDate: null,
          responsible: null,
          tac: group.get("tac").value,
          brand: group.get("brand").value,
          model: group.get("model").value,
          gsmabrand: null,
          gsmamodel: null,
          crctacapp: null,
          brand_C: null,
          model_C: null,
          manufacturer: null,
          question: null,
          answer: null,
          applicantEMail: null,
          consultationDay: null,
        };
        this.tableService
          .putListaDeChequeo(this.chequeos)
          .subscribe((check: Chequeo[]) => this.setCurrentTable(check));

        this.tableServiceTAC.postConsultaDeTAC(this.consultas).subscribe();
      }
      this.ngOnInit();
    } else {
      this.validform = false;
    }
  }

  submitForm() {
    const control = this.templateTable.get("tableRows") as UntypedFormArray;
    this.touchedRows = control.controls
      .filter((row) => row.touched)
      .map((row) => row.value);
    console.log(this.touchedRows);
  }

  toggleTheme() {
    this.mode = !this.mode;
  }

  get getFormControls() {
    const control = this.templateTable.get("tableRows") as UntypedFormArray;
    return control;
  }
}
