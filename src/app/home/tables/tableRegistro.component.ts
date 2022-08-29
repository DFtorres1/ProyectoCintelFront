import {
    Component, OnInit, ViewEncapsulation
  } from "@angular/core";
  import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
  import { Users } from "../../core/models/tables.models/users.model";
  import { TablesService } from "../shared/tableUsers.service";

  /**
   *
   *    TABLA DE LA LISTA DE CHEQUEO
   *
   */

  const Columns = [
    {
      name: 'Nombre',
      formControl: 'name',
      type: 'text'
    },
    {
      name: 'Apellido',
      formControl: 'surname',
      type: 'text'
    },
    {
      name: 'Usuario',
      formControl: 'user',
      type: 'text'
    },
    {
      name: 'Email',
      formControl: 'email',
      type: 'text'
    },
    {
      name: 'Contraseña',
      formControl: 'password',
      type: 'text'
    },
    {
      name: 'Rol',
      formControl: 'role',
      type: 'text'
    },
    {
      name: 'CC',
      formControl: 'cc',
      type: 'text'
    },
    {
      name: 'Celular',
      formControl: 'cel',
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
    listaChequeos: Users[] = [];
    templateTable: FormGroup;
    control: FormArray;

    //Variable para el almacenamiento local de la tabla
    private localStorageService: Storage;

    constructor(private tableService: TablesService, private fb: FormBuilder) {
      this.localStorageService = localStorage;
    }

    ngOnInit(): void {
      this.tableService
        .getUsuarios()
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
        name: [""],
        surname: [""],
        user: [""],
        email: [""],
        password: [""],
        role: [""],
        cc: [""],
        cel: [""],
        isEditable: [true],
      });
    }

    //Setter de la tabla en el almacenamiento
    setCurrentTable(table: Users[]): void {
      this.localStorageService.setItem("usersTable", JSON.stringify(table));
    }

    //Loader de la tabla guardada en el almacenamiento
    loadTable(): Users[] {
      var tableStr = this.localStorageService.getItem("usersTable");
      return tableStr ? <Users[]>JSON.parse(tableStr) : null;
    }

    addRowDetails() {
      const userDetail = this.initiateForm();
      this.formFields.forEach(field =>
        userDetail.addControl(field.formControl, this.fb.control([]))
      );
      return userDetail;
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
