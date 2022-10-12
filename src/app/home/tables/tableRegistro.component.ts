import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
} from "@angular/forms";
import { Users } from "../../core/models/tables.models/users.model";
import { TablesService } from "../shared/tableUsers.service";

/**
 *
 *    TABLA DE LA LISTA DE REGISTRO
 *
 */

const Columns = [
  {
    name: "Nombre",
    formControl: "name",
    type: "text",
  },
  {
    name: "Apellido",
    formControl: "surname",
    type: "text",
  },
  {
    name: "Usuario",
    formControl: "user",
    type: "text",
  },
  {
    name: "Email",
    formControl: "email",
    type: "text",
  },
  {
    name: "Contraseña",
    formControl: "password",
    type: "text",
  },
  {
    name: "Rol",
    formControl: "role",
    type: "text",
  },
  {
    name: "CC",
    formControl: "cc",
    type: "text",
  },
  {
    name: "Celular",
    formControl: "cel",
    type: "text",
  },
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
  registros: Users;
  listaUsuarios: Users[] = [];
  templateTable: UntypedFormGroup;
  control: UntypedFormArray;
  validform = true;

  //Variable para el almacenamiento local de la tabla
  private localStorageService: Storage;

  constructor(
    private tableService: TablesService,
    private fb: UntypedFormBuilder
  ) {
    this.localStorageService = localStorage;
  }

  ngOnInit(): void {
    this.tableService
      .getUsuarios()
      .subscribe((result) => this.setCurrentTable(result));

    this.listaUsuarios = this.loadTable();
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

  initiateForm(registro?: Users): UntypedFormGroup {
    if (registro != undefined) {
      return this.fb.group({
        idUser: [registro.idUser],
        name: [registro.name],
        surname: [registro.surname],
        user: [registro.user],
        email: [registro.email],
        password: [registro.password],
        role: [registro.role],
        cc: [registro.cc],
        cel: [registro.cel],
        isEditable: [false],
        new: [false],
      });
    } else {
      return this.fb.group({
        idUser: [""],
        name: [""],
        surname: [""],
        user: [""],
        email: [""],
        password: [""],
        role: [""],
        cc: [""],
        cel: [""],
        isEditable: [true],
        new: [true],
      });
    }
  }

  // Setter de la tabla en el almacenamiento
  setCurrentTable(table: Users[]): void {
    this.localStorageService.setItem("usersTable", JSON.stringify(table));
  }

  //Loader de la tabla guardada en el almacenamiento
  loadTable(): Users[] {
    var tableStr = this.localStorageService.getItem("usersTable");
    return tableStr ? <Users[]>JSON.parse(tableStr) : null;
  }

  addRowDetails(registro?: Users) {
    const userDetail = this.initiateForm(registro);

    this.formFields.forEach((field) =>
      userDetail.addControl(field.formControl, this.fb.control([]))
    );
    return userDetail;
  }

  addRow(registro?: Users) {
    const control = this.templateTable.get("tableRows") as UntypedFormArray;
    control.push(this.addRowDetails(registro));
  }

  deleteRow(index: number, group: UntypedFormGroup) {
    const control = this.templateTable.get("tableRows") as UntypedFormArray;
    control.removeAt(index);

    this.tableService
      .deleteUsuarios(group.get("idUser").value)
      .subscribe((users: Users[]) => this.setCurrentTable(users));
  }

  editRow(group: UntypedFormGroup) {
    group.get("isEditable").setValue(true);
    group.get("new").setValue(false);
  }

  doneRow(group: UntypedFormGroup) {
    group.get("isEditable").setValue(false);

    if (group.get("new").value) {
      this.registros = {
        name: group.get("name").value,
        surname: group.get("surname").value,
        user: group.get("user").value,
        email: group.get("email").value,
        password: group.get("password").value,
        role: group.get("role").value,
        cc: group.get("cc").value,
        cel: group.get("cel").value,
      };

      this.tableService
        .postUsuarios(this.registros)
        .subscribe((registro: Users[]) => {
          this.setCurrentTable(registro);
          this.ngOnInit();
        });
    } else {
      this.registros = {
        idUser: group.get("idUser").value,
        name: group.get("name").value,
        surname: group.get("surname").value,
        user: group.get("user").value,
        email: group.get("email").value,
        password: group.get("password").value,
        role: group.get("role").value,
        cc: group.get("cc").value,
        cel: group.get("cel").value,
      };

      this.tableService
        .putUsuarios(this.registros)
        .subscribe((users: Users[]) => this.setCurrentTable(users));
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
