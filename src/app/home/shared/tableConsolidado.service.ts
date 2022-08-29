import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
  private basePath = `${environment.apiUrl}/Consolidado/all`;
  // private basePath = `${environment.apiUrl}/Lista`;

  getConsolidadoGeneral(): Observable<Consolidado[]> {
    const request = this.http.get<Consolidado[]>(this.basePath);
    return request;
  }
}