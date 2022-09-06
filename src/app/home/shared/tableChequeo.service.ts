import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Chequeo } from "../../core/models/tables.models/listaDeChequeo.model";

/**
 *
 *      SERVICIO QUE CONECTA CON EL API PARA LA OBTENCION DE LAS TABLAS
 *
 */

@Injectable({ providedIn: "root" })
export class TablesServiceChequeo {
  constructor(private http: HttpClient) {}
  result: any;
  private basePath = `${environment.apiUrl}/Lista/`;
  // private basePath = `${environment.apiUrl}/Lista`;

  getListaDeChequeo(): Observable<Chequeo[]> {
    const request = this.http.get<Chequeo[]>(this.basePath + "all/");
    return request;
  }

  postListaDeChequeo(lista: Chequeo): Observable<Chequeo[]> {
    const result = this.http.post<Chequeo[]>(this.basePath + "create/", lista);
    return result;
  }

  deleteListaDeChequeo(id: number): any {
    const request = this.http.delete<Chequeo[]>(this.basePath + `delete/${id}`);
    return request;
  }

  putListaDeChequeo(lista: Chequeo): Observable<Chequeo[]> {
    const request = this.http.put<Chequeo[]>(this.basePath + "edit/", lista);
    return request;
  }

}
