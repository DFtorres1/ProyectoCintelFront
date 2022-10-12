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
  private basePath = `${environment.apiUrl}/Consolidado/`;

  getConsolidadoGeneral(): Observable<Consolidado[]> {
    const request = this.http.get<Consolidado[]>(this.basePath + "all/");
    return request;
  }
  
  postConsolidadoGeneral(consolidado: Consolidado): Observable<Consolidado[]> {
    const result = this.http.post<Consolidado[]>(this.basePath + "create/", consolidado);
    return result;
  }

  deleteConsolidadoGeneral(id: number): any {
    const request = this.http.delete<Consolidado[]>(this.basePath + `delete/${id}`);
    return request;
  }

  putConsolidadoGeneral(consolidado: Consolidado): Observable<Consolidado[]> {
    const request = this.http.put<Consolidado[]>(this.basePath + "edit/", consolidado);
    return request;
  }

}