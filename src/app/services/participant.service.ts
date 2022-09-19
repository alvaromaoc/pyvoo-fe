import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {Participant} from "../model/participant";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService extends HttpService {

  private serviceUrl = 'participant';

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getFromList(idList: number): Observable<Participant[]> {
    return this.get(`${this.serviceUrl}?idList=${idList}`);
  }

  public create(participant: Participant): Observable<Participant> {
    return this.post(this.serviceUrl, participant);
  }

  public deleteById(idParticipant: number): Observable<Participant> {
    return this.delete(`${this.serviceUrl}?idParticipant=${idParticipant}`);
  }
}
