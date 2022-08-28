import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Chequeo } from "../../core/models/tables.models/listaDeChequeo.model";

/**
 *
 *      SERVICIO QUE CONECTA CON EL API PARA LA OBTENCION DE LAS TABLAS
 *
 */

@Injectable({ providedIn: "root" })
export class TablesService {
  constructor(private http: HttpClient) {}
  result: any;
  private basePath = `${environment.apiUrl}/Lista/all`;
  // private basePath = `${environment.apiUrl}/Lista`;

  getListaDeChequeo(): Observable<Chequeo[]> {
    const request = this.http.get<Chequeo[]>(this.basePath);
    return request;
  }
}
