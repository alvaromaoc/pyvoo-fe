import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {List} from "../model/list";

@Injectable({
  providedIn: 'root'
})
export class ListService extends HttpService {

  private serviceUrl = 'list';

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getById(idList: number): Observable<any> {
    return this.get(`${this.serviceUrl}?idList=${idList}`);
  }

  public edit(list: List): Observable<List> {
    return this.put(this.serviceUrl, list);
  }

  public create(list: List): Observable<List> {
    return this.post(this.serviceUrl, list);
  }

  public getByOwner(loggedUsername: any) {
    return this.get(`${this.serviceUrl}/collection?ownerUsername=${loggedUsername}`);
  }
}
