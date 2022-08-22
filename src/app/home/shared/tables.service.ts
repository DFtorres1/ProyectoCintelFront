import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { getTable } from "../../core/models/tables.models/table.model";

/**
 * 
 *      SERVICIO QUE CONECTA CON EL API PARA LA OBTENCION DE LAS TABLAS
 * 
 */

@Injectable({ providedIn: 'root' })
export class TablesService {

    constructor(private http: HttpClient) { }
    result: any;
    private basePath = 'https://localhost:7062/api/Lista/';

    getListaDeChequeo(): Observable<getTable> {
        this.result = JSON.stringify(this.http.get<any>(this.basePath + 'all'));
        console.log(this.result);
        return this.http.get<getTable>(this.basePath + 'all');
    }

}