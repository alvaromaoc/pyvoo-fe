import {ListStateEnum} from "./list-state.enum";
import {User} from "./user";

export class List {
  idList: number;
  owner: User;
  listState: ListStateEnum;
  name: string;
  description: string;
  maxParticipants: number;
}
