import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public static tokenStorage = 'pyvoo_token'

  private baseUrl = 'http://localhost:8080'

  constructor(protected httpClient: HttpClient) { }

  public login(username: string, password: string) {
    return this.post('auth/login', {username: username, password: password})
      .pipe(tap((res: any) => {
        localStorage.setItem(HttpService.tokenStorage, res.token);
      }));
  }

  signup(username: string, password: string) {
    return this.post('auth/signup', {username: username, password: password});
  }

  getLoggedUsername() {
    let token = localStorage.getItem(HttpService.tokenStorage);
    if (token) {
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      return decodedJWT.sub;
    } else {
      return null;
    }
  }

  protected get(path: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${path}`, {headers: this.getHeaders()});
  }

  protected post(path: string, body: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${path}`, body, {headers: this.getHeaders()});
  }

  protected put(path: string, body: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${path}`, body, {headers: this.getHeaders()});
  }

  protected delete(path: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${path}`, {headers: this.getHeaders()});
  }

  private getHeaders(): HttpHeaders | { [header: string]: string | string[]; } | undefined {
    const token = localStorage.getItem(HttpService.tokenStorage);
    if (token) {
      return {'Authorization': `Bearer ${token}`};
    }
    return {};
  }
}
