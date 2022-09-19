import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ListComponent} from "./components/list/list.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: ':id',
    component: ListComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
