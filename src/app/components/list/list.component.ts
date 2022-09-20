import {Component, OnDestroy, OnInit} from '@angular/core';
import {List} from "../../model/list";
import {ListStateEnum} from "../../model/list-state.enum";
import {ListService} from "../../services/list.service";
import {ActivatedRoute} from "@angular/router";
import {ParticipantService} from "../../services/participant.service";
import {Participant} from "../../model/participant";
import {forkJoin} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, OnDestroy {

  list: List;
  participants: Participant[] = [];

  listStates = ListStateEnum;

  intervalId = setInterval(() => {
    if (this.list && this.list.listState === ListStateEnum.OPENED) {
      this.participantSvc.getFromList(this.list.idList).subscribe(res => {
        this.participants = res;
      })
    }
  }, 10 * 1000);

  formGroupParticipant: FormGroup;

  constructor(
    private listSvc: ListService,
    private participantSvc: ParticipantService,
    private route: ActivatedRoute
  ) {
    this.formGroupParticipant = new FormGroup<any>({
      name: new FormControl(null, Validators.required)
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listSvc.getById(params['id']).subscribe(list => {
        this.list = list;
      });
      this.participantSvc.getFromList(params['id']).subscribe(res => {
        this.participants = res;
      })
    })
  }

  submit() {
    this.participantSvc.create(
      {list: this.list, name: this.formGroupParticipant.value.name} as Participant
    ).subscribe(() => {
      forkJoin({
        list: this.listSvc.getById(this.list.idList),
        participants: this.participantSvc.getFromList(this.list.idList)
      }).subscribe(res => {
        this.list = res.list;
        this.participants = res.participants;
        this.formGroupParticipant.reset();
      })
    });
  }

  removeParticipant(idParticipant: number) {
    this.participantSvc.deleteById(idParticipant).subscribe(() => {
      this.participantSvc.getFromList(this.list.idList).subscribe(res => {
        this.participants = res;
      })
    })
  }

  changeState(state: ListStateEnum) {
    this.list.listState = state;
    this.listSvc.edit(this.list).subscribe(res => {
      this.list = res;
    })
  }

  changeMaxParticipants(value: string) {
    this.list.maxParticipants = Number(value);
    this.listSvc.edit(this.list).subscribe(res => {
      this.list = res;
    })
  }
}
