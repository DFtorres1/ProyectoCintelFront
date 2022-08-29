import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Users } from "../../core/models/tables.models/users.model";
import { environment } from "../../../environments/environment";

/**
 *
 *      SERVICIO QUE CONECTA CON EL API PARA LA OBTENCION DE LAS TABLAS
 *
 */

@Injectable({ providedIn: "root" })
export class TablesService {
  constructor(private http: HttpClient) {}
  result: any;
  private basePath = `${environment.apiUrl}/Users/all`;
  // private basePath = `${environment.apiUrl}/Lista`;

  getUsuarios(): Observable<Users[]> {
    const request = this.http.get<Users[]>(this.basePath);
    return request;
  }
}
