import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Consulta } from "../../core/models/tables.models/consulta.model";
import { environment } from "../../../environments/environment";
import { Consolidado } from "../../core/models/tables.models/consolidado.model";

/**
 *
 *      SERVICIO QUE CONECTA CON EL API PARA LA OBTENCION DE LAS TABLAS
 *
 */

@Injectable({ providedIn: "root" })
export class TablesService {
  constructor(private http: HttpClient) {}
  result: any;
  private basePath = `${environment.apiUrl}/Consulta/all`;
  // private basePath = `${environment.apiUrl}/Lista`;

  getConsultaDeTAC(): Observable<Consulta[]> {
    const request = this.http.get<Consulta[]>(this.basePath);
    return request;
  }
}