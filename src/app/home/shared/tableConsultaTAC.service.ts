import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Consulta } from "../../core/models/tables.models/consulta.model";
import { environment } from "../../../environments/environment";

/**
 *
 *      SERVICIO QUE CONECTA CON EL API PARA LA OBTENCION DE LAS TABLAS
 *
 */

@Injectable({ providedIn: "root" })
export class TablesServiceTAC {
  constructor(private http: HttpClient) {}
  result: any;
  private basePath = `${environment.apiUrl}/Consulta/`;

  getConsultaDeTAC(): Observable<Consulta[]> {
    const request = this.http.get<Consulta[]>(this.basePath + "all/");
    return request;
  }
  
  postConsultaDeTAC(consulta: Consulta): Observable<Consulta[]> {
    const result = this.http.post<Consulta[]>(this.basePath + "create/", consulta);
    return result;
  }

  deleteConsultaDeTAC(id: number): any {
    const request = this.http.delete<Consulta[]>(this.basePath + `delete/${id}`);
    return request;
  }

  putConsultaDeTAC(consulta: Consulta): Observable<Consulta[]> {
    const request = this.http.put<Consulta[]>(this.basePath + "edit/", consulta);
    return request;
  }


}