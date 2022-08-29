import {
    Component, OnInit, ViewEncapsulation
  } from "@angular/core";
  import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
  import { Chequeo } from "../../core/models/tables.models/listaDeChequeo.model";
  import { TablesService } from "../shared/tableChequeo.service";
  
  /**
   *
   *    TABLA DEL CONSOLIDADO GENERAL
   *
   */
  
  const Columns = [
    {
      name: 'Radicación entrada',
      formControl: 'entrySettlement',
      type: 'text'
    },
    {
      name: 'Fecha Entrada CRC',
      formControl: 'crcentryDate',
      type: 'text'
    },
    {
      name: 'Responsable',
      formControl: 'responsible',
      type: 'text'
    },
    {
      name: 'Fecha límite',
      formControl: 'deadlineDate',
      type: 'text'
    },
    {
      name: 'Vencimiento CRC',
      formControl: 'crcexpiration',
      type: 'text'
    },
    {
      name: 'Vencimiento Cintel',
      formControl: 'cintelExpiration',
      type: 'text'
    },
    {
      name: '',
      formControl: '',
      type: 'text'
    },
    {
      name: '',
      formControl: '',
      type: 'text'
    },
    {
      name: '',
      formControl: '',
      type: 'text'
    },
    {
      name: '',
      formControl: '',
      type: 'text'
    }
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
    listaChequeos: Chequeo[] = [];
    chequeoTable: FormGroup;
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
      this.chequeoTable = this.fb.group({
        tableRows: this.fb.array([])
      });
      this.addRow();
  
      console.log(this.listaChequeos);
    }
  
    ngAfterOnInit() {
      this.control = this.chequeoTable.get('tableRows') as FormArray;
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
      const control = this.chequeoTable.get('tableRows') as FormArray;
      control.push(this.addRowDetails());
    }
  
    deleteRow(index: number) {
      const control = this.chequeoTable.get('tableRows') as FormArray;
      control.removeAt(index);
    }
  
    editRow(group: FormGroup) {
      group.get('isEditable').setValue(true);
    }
  
    doneRow(group: FormGroup) {
      group.get('isEditable').setValue(false);
    }
  
    submitForm() {
      const control = this.chequeoTable.get('tableRows') as FormArray;
      this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
      console.log(this.touchedRows);
    }
  
    toggleTheme() {
      this.mode = !this.mode;
    }
  
    get getFormControls() {
      const control = this.chequeoTable.get('tableRows') as FormArray;
      return control;
    }
  }
  