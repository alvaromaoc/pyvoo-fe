import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../services/http.service";
import {AuthorityEnum} from "../../model/authority.enum";
import {Router} from "@angular/router";
import {List} from "../../model/list";
import {ListService} from "../../services/list.service";
import {CheckAuthorityPipe} from "../../pipes/check-authority.pipe";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  loginFormGroup: FormGroup;
  listFormGroup: FormGroup;

  authorities = AuthorityEnum;
  lists: List[] = [];

  constructor(private httpService: HttpService,
              private listSvc: ListService,
              private router: Router,
              private checkAuthorityPipe: CheckAuthorityPipe) {

    this.loginFormGroup = new FormGroup<any>({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })

    this.listFormGroup = new FormGroup<any>({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      maxParticipants: new FormControl(null, [Validators.required, Validators.min(0)])
    })
  }

  ngOnInit(): void {
    if (this.checkAuthorityPipe.transform(AuthorityEnum.LIST_ADM)) {
      this.listSvc.getByOwner(this.httpService.getLoggedUsername()).subscribe(res => {
        this.lists = res;
      })
    }
  }

  login() {
    this.httpService.login(this.loginFormGroup.value.username, this.loginFormGroup.value.password).subscribe(() => {
      window.location.reload();
    })
  }

  signup() {
    this.httpService.signup(this.loginFormGroup.value.username, this.loginFormGroup.value.password).subscribe(() => {
      this.loginFormGroup.reset();
    })
  }

  createList() {
    this.listSvc.create(this.createListObject()).subscribe(res => {
      this.router.navigate([res.idList]);
    })
  }

  private createListObject(): List {
    return {
      name: this.listFormGroup.value.name,
      description: this.listFormGroup.value.description,
      maxParticipants: this.listFormGroup.value.maxParticipants
    } as List;
  }
}
