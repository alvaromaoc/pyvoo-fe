import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ListComponent} from './components/list/list.component';
import {HttpClientModule} from "@angular/common/http";
import {CheckAuthorityPipe} from './pipes/check-authority.pipe';
import {CheckUserPipe} from './pipes/check-user.pipe';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListComponent,
    CheckAuthorityPipe,
    CheckUserPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CheckAuthorityPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
