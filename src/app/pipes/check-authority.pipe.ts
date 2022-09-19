import {Pipe, PipeTransform} from '@angular/core';
import {AuthorityEnum} from "../model/authority.enum";
import {HttpService} from "../services/http.service";

@Pipe({
  name: 'checkAuthority'
})
export class CheckAuthorityPipe implements PipeTransform {

  transform(authority: AuthorityEnum): boolean {
    let token = localStorage.getItem(HttpService.tokenStorage);
    if (token) {
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      return decodedJWT.authorities.includes(authority.toString());
    } else {
      return false;
    }
  }

}
