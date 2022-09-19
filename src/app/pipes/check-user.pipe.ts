import {Pipe, PipeTransform} from '@angular/core';
import {HttpService} from "../services/http.service";

@Pipe({
  name: 'checkUser'
})
export class CheckUserPipe implements PipeTransform {

  transform(username: string): unknown {
    let token = localStorage.getItem(HttpService.tokenStorage);
    if (token) {
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      return decodedJWT.sub === username;
    } else {
      return false;
    }
  }

}
