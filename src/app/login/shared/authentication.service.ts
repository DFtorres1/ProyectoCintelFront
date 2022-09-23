import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LoginObject} from "./login-object.model";
import {Session} from "../../core/models/session.model";
import {HttpClient} from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  private basePath = `${environment.apiUrl}/Users/`;

  login(loginObj: LoginObject): Observable<Session> {
    return this.http.post<Session>(this.basePath + "authenticate", loginObj);
  }

  logout(): Observable<Boolean> {
    return this.http.post<Boolean>(this.basePath + 'logout', {});
  }
}
