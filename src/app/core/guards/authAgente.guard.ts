import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Users } from "../models/tables.models/users.model";

@Injectable()
export class AuthAgenteGuard implements CanActivate {
  constructor(private user: Users) {}

  canActivate() {
    if (this.user.role == "Agente") {
      return true;
    }
    return false;
  }
}
