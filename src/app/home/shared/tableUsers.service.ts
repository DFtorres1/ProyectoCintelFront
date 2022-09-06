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
  private basePath = `${environment.apiUrl}/Users/`;
  // private basePath = `${environment.apiUrl}/Lista`;

  getUsuarios(): Observable<Users[]> {
    const request = this.http.get<Users[]>(this.basePath + "all/");
    return request;
  }
  
  postUsuarios(user: Users): Observable<Users[]> {
    const result = this.http.post<Users[]>(this.basePath + "create/", user);
    return result;
  }

  deleteUsuarios(id: number): any {
    const request = this.http.delete<Users[]>(this.basePath + `delete/${id}`);
    return request;
  }

  putUsuarios(user: Users): Observable<Users[]> {
    const request = this.http.put<Users[]>(this.basePath + "edit/", user);
    return request;
  }

}
