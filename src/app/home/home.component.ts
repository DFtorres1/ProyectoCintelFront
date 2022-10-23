import { Component, OnInit } from "@angular/core";
import { StorageService } from "../core/services/storage.service";
import { AuthenticationService } from "../login/shared/authentication.service";
import { Users } from "../core/models/tables.models/users.model";

@Component({
  selector: "home",
  templateUrl: "home.component.html",
  styleUrls: ["./assets/home.component.css"],
})
export class HomeComponent implements OnInit {
  user: Users;
  access = false;
  chequeo: Boolean = false;
  tac: Boolean = false;
  consolidado: Boolean = false;
  registro: Boolean = false;
  cssUrl: string;
  cintelLogo = true;

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService
  ) {
    this.cssUrl = "/assets/home.component.css";
  }

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();

    let authUsers = [
      "Administrador",
      "Lider",
      "Gerente",
      "administrador",
      "lider",
      "gerente",
    ];

    for (let i = 0; i < authUsers.length; i++) {
      if (this.user.role == authUsers[i]) {
        this.access = true;
        console.log("si soy");
        break;
      } else {
        this.access = false;
        console.log("no soy");
      }
    }
  }

  logout(): void {
    this.authenticationService.logout().subscribe((response) => {
      if (response) {
        this.storageService.logout();
      }
    });
  }

  showChequeo() {
    (this.chequeo = true),
      (this.consolidado = false),
      (this.tac = false),
      (this.registro = false),
      (this.cintelLogo = false);
  }

  showConsolidado() {
    (this.chequeo = false),
      (this.consolidado = true),
      (this.tac = false),
      (this.registro = false),
      (this.cintelLogo = false);
  }

  showTAC() {
    (this.chequeo = false),
      (this.consolidado = false),
      (this.tac = true),
      (this.registro = false),
      (this.cintelLogo = false);
  }

  showRegistro() {
    (this.chequeo = false),
      (this.consolidado = false),
      (this.tac = false),
      (this.registro = true),
      (this.cintelLogo = false);
  }
}
