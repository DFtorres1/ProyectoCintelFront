import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthorizatedGuard } from "./core/guards/authorizated.guard";
import { TableChequeo } from "./home/tables/tableChequeo.component";
import { TableConsolidado } from "./home/tables/tableConsolidado.component";
import { TableTAC } from "./home/tables/tableTAC.component";
import { TableRegistro } from "./home/tables/tableRegistro.component";
import { AuthAdminGuard } from "./core/guards/authAdmin.guard";

const appRoutes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthorizatedGuard],
    children: [
      {path: 'chequeo', component: TableChequeo},
      {path: 'consolidado', component: TableConsolidado},
      {path: 'tac', component: TableTAC},
      {path: 'registro', component: TableRegistro, canActivate: [AuthAdminGuard]}
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home" },
];

export const Routing = RouterModule.forRoot(appRoutes, {
  relativeLinkResolution: "legacy",
});
