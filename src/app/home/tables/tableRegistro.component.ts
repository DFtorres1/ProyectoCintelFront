import {
    Component, OnInit, ViewEncapsulation
  } from "@angular/core";
  import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
  import { Chequeo } from "../../core/models/tables.models/listaDeChequeo.model";
  import { TablesService } from "../shared/tableChequeo.service";
  
  /**
   *
   *    TABLA DE LA LISTA DE CHEQUEO
   *
   */
  
  const Columns = [
    {
      name: 'Radicado',
      formControl: 'settled',
      type: 'text'
    },
    {
      name: 'Fecha de entrada',
      formControl: 'entryDate',
      type: 'text'
    },
    {
      name: 'Tipo de usuario',
      formControl: 'userType',
      type: 'text'
    },
    {
      name: 'Marca',
      formControl: 'brand',
      type: 'text'
    },
    {
      name: 'Modelo',
      formControl: 'model',
      type: 'text'
    },
    {
      name: 'TAC',
      formControl: 'tac',
      type: 'text'
    },
    {
      name: 'Consulta TAC',
      formControl: 'tacquery',
      type: 'text'
    },
    {
      name: 'Etiqueta',
      formControl: 'label',
      type: 'text'
    },
    {
      name: 'FCC',
      formControl: 'fcc',
      type: 'text'
    },
    {
      name: 'ANATEL',
      formControl: 'anatel',
      type: 'text'
    },
    {
      name: 'IC',
      formControl: 'ic',
      type: 'text'
    },
    {
      name: 'NCC',
      formControl: 'ncc',
      type: 'text'
    },
    {
      name: 'OFCA',
      formControl: 'ofca',
      type: 'text'
    },
    {
      name: 'MTC',
      formControl: 'mtc',
      type: 'text'
    },
    {
      name: 'MIC',
      formControl: 'mic',
      type: 'text'
    },
    {
      name: 'CCC-CO',
      formControl: 'cccCo',
      type: 'text'
    },
    {
      name: 'CE',
      formControl: 'ce',
      type: 'text'
    },
    {
      name: 'OTROS',
      formControl: 'others',
      type: 'text'
    },
    {
      name: '703MHz',
      formControl: 'mhz703',
      type: 'text'
    },
    {
      name: '824MHz',
      formControl: 'mhz824',
      type: 'text'
    },
    {
      name: '1710MHz',
      formControl: 'mhz1710',
      type: 'text'
    },
    {
      name: '1850MHz',
      formControl: 'mhz1850',
      type: 'text'
    },
    {
      name: '2500MHz',
      formControl: 'mhz2500',
      type: 'text'
    },
    {
      name: 'SAR',
      formControl: 'sar',
      type: 'text'
    },
    {
      name: 'Ente certificador',
      formControl: 'certifyingEntity',
      type: 'text'
    },
    {
      name: 'Numero certificado',
      formControl: 'certifierNumber',
      type: 'text'
    },
    {
      name: 'Laboratorio',
      formControl: 'laboratory',
      type: 'text'
    },
    {
      name: 'Respuesta',
      formControl: 'answer',
      type: 'text'
    },
    {
      name: 'Complementos',
      formControl: 'complements',
      type: 'text'
    }
  ];
  
  @Component({
    selector: "tableRegistro",
    styleUrls: ["../assets/tables.component.css"],
    templateUrl: "tableTemplate.component.html",
    encapsulation: ViewEncapsulation.None,
  })
  export class TableRegistro implements OnInit {
    //Definicion de las variables a usar
    formFields = Columns;
    mode: boolean;
    touchedRows: any;
    listaChequeos: Chequeo[] = [];
    templateTable: FormGroup;
    control: FormArray;
  
    //Variable para el almacenamiento local de la tabla
    private localStorageService: Storage;
  
    constructor(private tableService: TablesService, private fb: FormBuilder) {
      this.localStorageService = localStorage;
    }
  
    ngOnInit(): void {
      this.tableService
        .getListaDeChequeo()
        .subscribe((result) => this.setCurrentTable(result));
  
      this.listaChequeos = this.loadTable();
  
      this.touchedRows = [];
      this.templateTable = this.fb.group({
        tableRows: this.fb.array([])
      });
      this.addRow();
  
      console.log(this.listaChequeos);
    }
  
    ngAfterOnInit() {
      this.control = this.templateTable.get('tableRows') as FormArray;
    }
  
    initiateForm(): FormGroup {
      return this.fb.group({
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
        mhz703: [""],
        mhz824: [""],
        mhz1710: [""],
        mhz1850: [""],
        mhz2500: [""],
        sar: [""],
        certifyingEntity: [""],
        certifierNumber: [""],
        laboratory: [""],
        answer: [""],
        complements: [""],
        isEditable: [true],
      });
    }
  
    //Setter de la tabla en el almacenamiento
    setCurrentTable(table: Chequeo[]): void {
      this.localStorageService.setItem("currentTable", JSON.stringify(table));
    }
  
    //Loader de la tabla guardada en el almacenamiento
    loadTable(): Chequeo[] {
      var tableStr = this.localStorageService.getItem("currentTable");
      return tableStr ? <Chequeo[]>JSON.parse(tableStr) : null;
    }
  
    addRowDetails() {
      const chequeoDetail = this.initiateForm();
      this.formFields.forEach(field =>
        chequeoDetail.addControl(field.formControl, this.fb.control([]))
      );
      return chequeoDetail;
    }
  
    addRow() {
      const control = this.templateTable.get('tableRows') as FormArray;
      control.push(this.addRowDetails());
    }
  
    deleteRow(index: number) {
      const control = this.templateTable.get('tableRows') as FormArray;
      control.removeAt(index);
    }
  
    editRow(group: FormGroup) {
      group.get('isEditable').setValue(true);
    }
  
    doneRow(group: FormGroup) {
      group.get('isEditable').setValue(false);
    }
  
    submitForm() {
      const control = this.templateTable.get('tableRows') as FormArray;
      this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
      console.log(this.touchedRows);
    }
  
    toggleTheme() {
      this.mode = !this.mode;
    }
  
    get getFormControls() {
      const control = this.templateTable.get('tableRows') as FormArray;
      return control;
    }
  }
  