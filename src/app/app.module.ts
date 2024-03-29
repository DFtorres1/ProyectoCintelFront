import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "./core/core.module";
import { Routing } from "./app.routing";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatListModule } from "@angular/material/list";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from '@angular/material/table';
import { environment } from "../environments/environment";
import { ServiceWorkerModule } from "@angular/service-worker";
import { TableChequeo   } from "./home/tables/tableChequeo.component";
import { TableConsolidado } from "./home/tables/tableConsolidado.component";
import { TableTAC } from "./home/tables/tableTAC.component";
import { TableRegistro } from "./home/tables/tableRegistro.component";
import { MatNativeDateModule } from "@angular/material/core";

const modules = [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  BrowserAnimationsModule,
  CoreModule,
  ReactiveFormsModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSortModule,
  MatListModule,
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TableChequeo,
    TableConsolidado,
    TableTAC,
    TableRegistro
  ],
  imports: [
    ...modules,
    Routing,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  exports: [
    ...modules
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
