import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { VaccinationListComponent } from "./vaccination-list/vaccination-list.component";
import { VaccinationListItemComponent } from "./vaccination-list-item/vaccination-list-item.component";
import { VaccinationDetailsComponent } from "./vaccination-details/vaccination-details.component";
import { VaccinationStoreService } from "./shared/vaccination-store.service";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing-module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { VaccinationFormComponent } from "./vaccination-form/vaccination-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { VaccinationFormErrorMessagesComponent } from "./vaccination-form-error-messages/vaccination-form-error-messages.component";
import { LoginComponent } from "./login/login.component";
import { AuthenticationService } from "./shared/authentication.service";
import { TokenInterceptorService } from "./shared/token-interceptor.service";
import { JwtInterceptorService } from "./shared/jwt-interceptor.service";
import { VaccinatePeopleComponent } from './vaccinate-people/vaccinate-people.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    VaccinationListComponent,
    VaccinationListItemComponent,
    VaccinationDetailsComponent,
    HomeComponent,
    VaccinationFormComponent,
    VaccinationFormErrorMessagesComponent,
    LoginComponent,
    VaccinatePeopleComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    VaccinationStoreService,
    AuthenticationService,
    TokenInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class AppModule {}
