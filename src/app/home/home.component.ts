import { Component, OnInit } from "@angular/core";
import { StorageService } from "../core/services/storage.service";
import { User } from "../core/models/user.model";
import { AuthenticationService } from "../login/shared/authentication.service";

@Component({
  selector: "home",
  templateUrl: "home.component.html",
  styleUrls: ["./assets/home.component.css"],
})
export class HomeComponent implements OnInit {
  public user: User;
  public access: Boolean = false;

  public placeholder: Boolean = false;

  public chequeo: Boolean = false;
  public TAC: Boolean = false;
  public Consolidado: Boolean = false;
  public registro: Boolean = false;

  cssUrl: string;

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService
  ) {
    this.cssUrl = "/assets/home.component.css";
  }

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();

    if (this.user.accessLevel >= 2) {
      this.access = true;
    }
  }

  public logout(): void {
    this.authenticationService.logout().subscribe((response) => {
      if (response) {
        this.storageService.logout();
      }
    });
  }

  public showChequeo() {
    return (this.chequeo = true), (this.placeholder = false);
  }

  public showPlaceholder() {
    return (this.chequeo = false), (this.placeholder = true);
  }
}
