import { Component, OnInit } from "@angular/core";
import { StorageService } from "../core/services/storage.service";
import { User } from "../core/models/user.model";
import { AuthenticationService } from "../login/shared/authentication.service";
import { Users } from "../core/models/tables.models/users.model";
import { ImgSrcDirective } from "@angular/flex-layout";

@Component({
  selector: "home",
  templateUrl: "home.component.html",
  styleUrls: ["./assets/home.component.css"],
})
export class HomeComponent implements OnInit {
  user: Users;
  access: Boolean = false;
  chequeo: Boolean = false;
  tac: Boolean = false;
  consolidado: Boolean = false;
  registro: Boolean = false;
  cssUrl: string;

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService
  ) {
    this.cssUrl = "/assets/home.component.css";
  }

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();

    if (this.user.role == "Administrador") {
      this.access = true;
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
    (this.registro = false);
  }

  showConsolidado() {
    (this.chequeo = false),
    (this.consolidado = true),
    (this.tac = false),
    (this.registro = false);
  }
  
  showTAC() {
    (this.chequeo = false),
    (this.consolidado = false),
    (this.tac = true),
    (this.registro = false);
  }
  
  showRegistro() {
    (this.chequeo = false),
    (this.consolidado = false),
    (this.tac = false),
    (this.registro = true);
  }

}
