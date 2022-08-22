import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LoginObject} from "./login-object.model";
import {Session} from "../../core/models/session.model";
import {HttpClient} from "@angular/common/http";
/**
 * Created by xavi on 5/16/17.
 */
@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  //private basePath = 'https://localhost:7062/api/Users';
  private basePath = '/api/';

  login(loginObj: LoginObject): Observable<Session> {
    return this.http.post<Session>(this.basePath + 'authenticate/login', loginObj);
  }

  logout(): Observable<Boolean> {
    return this.http.post<Boolean>(this.basePath + 'logout', {});
  }
}
