import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Users } from "../models/tables.models/users.model";

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private user: Users) {}

  canActivate() {
    if (this.user.role == "Administrator") {
      return true;
    }
    return false;
  }
}
